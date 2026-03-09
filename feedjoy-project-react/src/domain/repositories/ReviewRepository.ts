// Repository Interface - Review
// Contract for review data access, implementation can be dummy or API

import type { Review, CreateReviewRequest } from '../entities/Review';

export interface ReviewRepository {
    /**
     * Get all reviews
     */
    getAll(): Promise<Review[]>;

    /**
     * Get review by order ID (one review per order)
     */
    getByOrderId(orderId: number): Promise<Review | null>;

    /**
     * Get reviews by product ID
     */
    getByProductId(productId: number): Promise<Review[]>;

    /**
     * Create new review
     */
    create(review: CreateReviewRequest): Promise<Review>;

    /**
     * Update existing review
     */
    update(id: number, data: Partial<CreateReviewRequest>): Promise<Review | null>;

    /**
     * Delete review
     */
    delete(id: number): Promise<boolean>;
}
