<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentCallbackController extends Controller
{
    /**
     * Handle Midtrans payment notification callback
     * PENTING: Route ini HARUS accessible tanpa auth (public)
     */
    public function callback(Request $request)
    {
        try {
            // 1. Log semua data yang masuk untuk debugging
            Log::info('Midtrans Callback Received', [
                'all_data' => $request->all(),
                'headers' => $request->headers->all()
            ]);

            // 2. Ambil data dari Midtrans
            $serverKey = config('midtrans.server_key');
            $orderId = $request->order_id;
            $statusCode = $request->status_code;
            $grossAmount = $request->gross_amount;
            $signatureKey = $request->signature_key;

            // 3. VERIFIKASI SIGNATURE (Keamanan Utama)
            $hashed = hash("sha512", $orderId . $statusCode . $grossAmount . $serverKey);

            if ($hashed !== $signatureKey) {
                Log::error('Invalid Midtrans Signature', [
                    'expected' => $hashed,
                    'received' => $signatureKey
                ]);
                return response()->json(['message' => 'Invalid signature'], 403);
            }

            // 4. Cari Order di database
            // Format order_id dari Midtrans: "ID-TIMESTAMP"
            $realOrderId = explode('-', $orderId)[0];
            $order = Order::with('product')->find($realOrderId);

            if (!$order) {
                Log::error('Order not found', ['order_id' => $realOrderId, 'full_order_id' => $orderId]);
                return response()->json(['message' => 'Order not found'], 404);
            }

            // 5. Logika Update Status berdasarkan transaction_status
            $transactionStatus = $request->transaction_status;
            $fraudStatus = $request->fraud_status ?? 'accept';
            $paymentType = $request->payment_type;

            Log::info('Processing transaction', [
                'order_id' => $order->id,
                'transaction_status' => $transactionStatus,
                'fraud_status' => $fraudStatus,
                'payment_type' => $paymentType
            ]);

            // Handle different transaction statuses
            if ($transactionStatus == 'capture') {
                if ($fraudStatus == 'accept') {
                    $order->update([
                        'payment_status' => 'paid',
                        'status' => 'pending'
                    ]);
                    Log::info('Payment captured and accepted', ['order_id' => $order->id]);
                } else {
                    $order->update([
                        'payment_status' => 'failed',
                        'status' => 'cancelled'
                    ]);
                    // Restore stock
                    $order->product->increment('stock', $order->quantity);
                    Log::warning('Payment captured but fraud detected', ['order_id' => $order->id]);
                }
            } elseif ($transactionStatus == 'settlement') {
                $order->update([
                    'payment_status' => 'paid',
                    'status' => 'pending'
                ]);
                Log::info('Payment settled', ['order_id' => $order->id]);
            } elseif ($transactionStatus == 'pending') {
                $order->update(['payment_status' => 'pending']);
                Log::info('Payment pending', ['order_id' => $order->id]);
            } elseif (in_array($transactionStatus, ['deny', 'expire', 'cancel'])) {
                $order->update([
                    'payment_status' => 'failed',
                    'status' => 'cancelled'
                ]);

                // PENTING: Kembalikan stok jika pembayaran gagal/expired
                $order->product->increment('stock', $order->quantity);
                Log::info('Payment failed, stock restored', [
                    'order_id' => $order->id,
                    'transaction_status' => $transactionStatus
                ]);
            }

            return response()->json([
                'message' => 'Notification processed successfully',
                'order_id' => $order->id,
                'status' => $transactionStatus
            ], 200);

        } catch (\Exception $e) {
            Log::error('Midtrans Callback Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check payment status manually (untuk polling dari FE)
     * ROUTE: GET /api/payment/status/{orderId}
     * AUTH: Required
     */
    public function checkStatus(Request $request, $orderId)
    {
        try {
            // Get user's order
            $order = $request->user()->orders()->with('product')->find($orderId);

            if (!$order) {
                return response()->json([
                    'success' => false,
                    'message' => 'Order not found'
                ], 404);
            }

            Log::info('Payment status checked', [
                'order_id' => $order->id,
                'payment_status' => $order->payment_status,
                'status' => $order->status,
                'user_id' => $request->user()->id
            ]);

            return response()->json([
                'success' => true,
                'data' => [
                    'order_id' => $order->id,
                    'payment_status' => $order->payment_status,
                    'status' => $order->status,
                    'snap_token' => $order->snap_token,
                    'total_price' => $order->total_price,
                    'created_at' => $order->created_at,
                    'updated_at' => $order->updated_at
                ]
            ], 200);
            
        } catch (\Exception $e) {
            Log::error('Check status error', [
                'order_id' => $orderId,
                'error' => $e->getMessage(),
                'user_id' => $request->user()->id ?? null
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error checking payment status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}