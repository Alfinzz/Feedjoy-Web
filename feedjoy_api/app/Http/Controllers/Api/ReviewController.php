<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Get user's reviews
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $reviews = $request->user()->reviews()
            ->with(['order.product'])
            ->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $reviews
        ], 200);
    }

    /**
     * Get single review
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Request $request, $id)
    {
        $review = $request->user()->reviews()->with(['order.product'])->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $review
        ], 200);
    }

    /**
     * Create a new review (only for completed orders)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'order_id' => 'required|exists:orders,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if order belongs to user
        $order = $request->user()->orders()->find($request->order_id);

        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found'
            ], 404);
        }

        // Check if order is completed
        if (!$order->isCompleted()) {
            return response()->json([
                'success' => false,
                'message' => 'You can only review completed orders'
            ], 400);
        }

        // Check if already reviewed
        if ($order->review) {
            return response()->json([
                'success' => false,
                'message' => 'This order has already been reviewed'
            ], 400);
        }

        // Create review
        $review = Review::create([
            'user_id' => $request->user()->id,
            'order_id' => $request->order_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
            'is_testimonial' => false,
            'product_id' => $order->product_id,
        ]);

        $review->load('order.product');

        return response()->json([
            'success' => true,
            'message' => 'Review created successfully',
            'data' => $review
        ], 201);
    }

    /**
     * Update review
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $review = $request->user()->reviews()->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'rating' => 'sometimes|required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        if ($request->has('rating')) {
            $review->rating = $request->rating;
        }
        if ($request->has('comment')) {
            $review->comment = $request->comment;
        }

        $review->save();

        return response()->json([
            'success' => true,
            'message' => 'Review updated successfully',
            'data' => $review->load('order.product')
        ], 200);
    }

    /**
     * Delete review
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $review = $request->user()->reviews()->find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ], 200);
    }

    // ==================== PUBLIC METHODS ====================

    /**
     * Get testimonials (public - for landing page)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function testimonials(Request $request)
    {
        $testimonials = Review::testimonials()
            ->with(['user:id,name', 'order.product:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit($request->get('limit', 10))
            ->get();

        return response()->json([
            'success' => true,
            'data' => $testimonials
        ], 200);
    }

    // ==================== ADMIN METHODS ====================

    /**
     * Get all reviews (admin)
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminIndex(Request $request)
    {
        $query = Review::with(['user', 'order.product']);

        // Filter by testimonial status
        if ($request->has('is_testimonial')) {
            $query->where('is_testimonial', $request->is_testimonial === 'true');
        }

        // Filter by rating
        if ($request->has('rating')) {
            $query->where('rating', $request->rating);
        }

        $reviews = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 10));

        return response()->json([
            'success' => true,
            'data' => $reviews
        ], 200);
    }

    /**
     * Toggle testimonial status (admin)
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleTestimonial(Request $request, $id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->is_testimonial = !$review->is_testimonial;
        $review->save();

        $status = $review->is_testimonial ? 'added to' : 'removed from';

        return response()->json([
            'success' => true,
            'message' => "Review {$status} testimonials",
            'data' => $review->load(['user', 'order.product'])
        ], 200);
    }

    /**
     * Delete review (admin)
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminDestroy($id)
    {
        $review = Review::find($id);

        if (!$review) {
            return response()->json([
                'success' => false,
                'message' => 'Review not found'
            ], 404);
        }

        $review->delete();

        return response()->json([
            'success' => true,
            'message' => 'Review deleted successfully'
        ], 200);
    }
}
