<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Services\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Get user's orders (with optional status filter)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = $request->user()->orders()->with(['product.variants', 'review']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 10);
        $orders = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $orders
        ], 200);
    }

    /**
     * Get single order detail
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id)
    {
        // Tambahkan product.variants di sini juga
        $order = $request->user()->orders()->with(['product.variants', 'review'])->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ], 200);
    }

    /**
     * Create a new order
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, MidtransService $midtransService)
    {
        $validator = Validator::make($request->all(), [
            'product_id' => 'required|exists:products,id',
            'variant' => 'required|string',
            'quantity' => 'required|integer|min:1',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'notes' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // 1. Get product and check stock
            $product = Product::with('variants')->find($request->product_id);

            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            if (!$product->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Product is not available'
                ], 400);
            }

            if ($product->stock < $request->quantity) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient stock. Available: ' . $product->stock
                ], 400);
            }

            // 2. Calculate price based on variant
            $selectedVariant = $product->variants
                ->where('size', $request->variant)
                ->first();
            
            $priceToUse = $selectedVariant ? $selectedVariant->price : $product->price;
            $totalPrice = $priceToUse * $request->quantity;

            DB::beginTransaction();

            // 3. Create order WITHOUT snap_token first
            $order = Order::create([
                'user_id' => $request->user()->id,
                'product_id' => $request->product_id,
                'variant' => $request->variant,
                'quantity' => $request->quantity,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'payment_status' => 'unpaid',
                'full_name' => $request->full_name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'notes' => $request->notes,
                'snap_token' => null, // Set null dulu
            ]);

            Log::info('Order created', ['order_id' => $order->id]);

            // 4. Generate Snap Token dari Midtrans
            try {
                $snapToken = $midtransService->generateSnapToken($order);
                
                Log::info('Snap token generated', [
                    'order_id' => $order->id,
                    'snap_token' => $snapToken
                ]);

                // 5. Update order dengan snap_token
                $order->update(['snap_token' => $snapToken]);

                Log::info('Order updated with snap token', [
                    'order_id' => $order->id,
                    'snap_token' => $order->snap_token
                ]);

            } catch (\Exception $e) {
                Log::error('Failed to generate snap token', [
                    'order_id' => $order->id,
                    'error' => $e->getMessage()
                ]);
                
                DB::rollBack();
                
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to generate payment token: ' . $e->getMessage()
                ], 500);
            }

            // 6. Reduce stock
            $product->decrement('stock', $request->quantity);

            DB::commit();

            // 7. Return response dengan snap_token
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'snap_token' => $order->snap_token,
                'order_id' => $order->id,
                'order' => $order->load('product'), // Optional: kirim data order lengkap
                'payment_status' => 'paid'
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            Log::error('Order creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create order: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get order history (completed orders)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function history(Request $request)
    {
        $orders = $request->user()->orders()
            ->with(['product', 'review'])
            ->where('status', Order::STATUS_COMPLETED)
            ->orderBy('updated_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $orders
        ], 200);
    }

    /**
     * Delete order from history (only completed orders)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $order = $request->user()->orders()->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        if (!$order->isCompleted()) {
            return response()->json([
                'success' => false,
                'message' => 'Only completed orders can be deleted from history'
            ], 400);
        }

        $order->delete();

        return response()->json([
            'success' => true,
            'message' => 'Order removed from history'
        ], 200);
    }

    // ==================== ADMIN METHODS ====================

    /**
     * Get all orders (admin)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    // public function adminIndex(Request $request)
    // {
    //     $query = Order::with(['user', 'product', 'review']);

    //     // Filter by status
    //     if ($request->has('status')) {
    //         $query->where('status', $request->status);
    //     }

    //     // Filter by user
    //     if ($request->has('user_id')) {
    //         $query->where('user_id', $request->user_id);
    //     }

    //     // Sorting
    //     $sortBy = $request->get('sort_by', 'created_at');
    //     $sortOrder = $request->get('sort_order', 'desc');
    //     $query->orderBy($sortBy, $sortOrder);

    //     // Pagination
    //     $perPage = $request->get('per_page', 10);
    //     $orders = $query->paginate($perPage);

    //     return response()->json([
    //         'success' => true,
    //         'data' => $orders
    //     ], 200);
    // }

    /**
     * Get single order detail (admin)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminShow($id)
    {
        $order = Order::with(['user', 'product', 'review'])->find($id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $order
        ], 200);
    }

    /**
     * Update order status (admin)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    // public function updateStatus(Request $request, $id)
    // {
    //     $validator = Validator::make($request->all(), [
    //         'status' => 'required|in:pending,processing,shipped,completed,cancelled',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Validation failed',
    //             'errors' => $validator->errors()
    //         ], 422);
    //     }

    //     $order = Order::find($id);

    //     if (!$order) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Order not found'
    //         ], 404);
    //     }

    //     $oldStatus = $order->status;
    //     $order->status = $request->status;
    //     $order->save();

    //     // If cancelled, restore stock
    //     if ($request->status === Order::STATUS_CANCELLED && $oldStatus !== Order::STATUS_CANCELLED) {
    //         $order->product->increment('stock', $order->quantity);
    //     }

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Order status updated successfully',
    //         'data' => $order->load(['user', 'product'])
    //     ], 200);
    // }

    public function adminIndex(Request $request)
    {
        $query = Order::with(['user', 'product.variants', 'review']);

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('id', 'like', "%$search%")
                  ->orWhere('full_name', 'like', "%$search%")
                  ->orWhereHas('product', function($pq) use ($search) {
                      $pq->where('name', 'like', "%$search%");
                  });
            });
        }

        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $query->orderBy('created_at', 'desc');
        $orders = $query->paginate($request->get('per_page', 8));

        $stats = [
            'total'     => Order::count(),
            'pending'   => Order::where('status', 'pending')->count(),
            'shipping'  => Order::where('status', 'shipped')->count(),
            'completed' => Order::where('status', 'completed')->count(),
        ];

        return response()->json([
            'success' => true,
            'data'    => $orders,
            'stats'   => $stats
        ], 200);
    }

    /**
     * Update order status (admin) + Handling Tracking Number
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            // Sesuaikan enum dengan getStatusInfo di React (pending, shipped, completed, cancelled)
            'status' => 'required|in:pending,shipped,processing,completed,cancelled',
            'tracking_number' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $validator->errors()
            ], 422);
        }

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['success' => false, 'message' => 'Order not found'], 404);
        }

        $oldStatus = $order->status;

        // 3. UPDATE DATA: Termasuk nomor resi jika ada
        $order->status = $request->status;
        if ($request->has('tracking_number')) {
            $order->tracking_number = $request->tracking_number;
        }
        $order->save();

        // 4. LOGIKA STOK: Kembalikan stok jika pesanan dibatalkan
        if ($request->status === 'cancelled' && $oldStatus !== 'cancelled') {
            $order->product->increment('stock', $order->quantity);
        }

        return response()->json([
            'success' => true,
            'message' => 'Status pesanan berhasil diperbarui',
            'data'    => $order->load(['user', 'product'])
        ], 200);
    }

    public function checkPaymentStatus(Request $request, $orderId)
{
    try {
        $order = $request->user()->orders()->with('product')->find($orderId);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        // Jika sudah paid, return langsung
        if ($order->payment_status === 'paid') {
            return response()->json([
                'success' => true,
                'message' => 'Payment already confirmed',
                'data' => $order
            ], 200);
        }

        // Check ke Midtrans API
        try {
            \Midtrans\Config::$serverKey = config('midtrans.server_key');
            \Midtrans\Config::$isProduction = config('midtrans.is_production');

            // Generate order ID yang sama dengan saat create
            $midtransOrderId = $order->id . '-' . substr($order->created_at->timestamp, -10);
            
            Log::info('Checking Midtrans status', [
                'order_id' => $order->id,
                'midtrans_order_id' => $midtransOrderId
            ]);

            $status = \Midtrans\Transaction::status($midtransOrderId);

            Log::info('Midtrans status response', [
                'order_id' => $order->id,
                'transaction_status' => $status['transaction_status'] ?? null,
                'payment_type' => $status['payment_type'] ?? null
            ]);

            // Update order berdasarkan status dari Midtrans
            $transactionStatus = $status['transaction_status'] ?? null;
            $fraudStatus = $status['fraud_status'] ?? 'accept';

            if ($transactionStatus == 'capture' && $fraudStatus == 'accept') {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'pending'
                ]);
            } elseif ($transactionStatus == 'settlement') {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'pending'
                ]);
            } elseif ($transactionStatus == 'pending') {
                $order->update(['payment_status' => 'pending']);
            } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
                $order->update([
                    'payment_status' => 'failed',
                    'status' => 'cancelled'
                ]);
                // Restore stock
                $order->product->increment('stock', $order->quantity);
            }

            return response()->json([
                'success' => true,
                'message' => 'Payment status updated from Midtrans',
                'data' => $order->fresh()
            ], 200);

        } catch (\Exception $e) {
            Log::error('Midtrans API Error', [
                'order_id' => $order->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to check payment status from Midtrans',
                'error' => $e->getMessage()
            ], 500);
        }

    } catch (\Exception $e) {
        Log::error('Check payment status error', [
            'order_id' => $orderId,
            'error' => $e->getMessage()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Error checking payment status',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
