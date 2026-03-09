// Get Review By Order ID Use Case - Simplified

import type { Review } from '../../entities/Review';
import type { ReviewRepository } from '../../repositories/ReviewRepository';

export interface GetReviewByOrderIdInput {
    orderId: number;
}

// ✅ Simple class
export class GetReviewByOrderIdUseCase {
    private reviewRepository: ReviewRepository;

    constructor(reviewRepository: ReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async execute(input: GetReviewByOrderIdInput): Promise<Review | null> {
        const { orderId } = input;

        if (!orderId || orderId <= 0) {
            throw new Error('ID pesanan tidak valid');
        }

        return await this.reviewRepository.getByOrderId(orderId);
    }
}
