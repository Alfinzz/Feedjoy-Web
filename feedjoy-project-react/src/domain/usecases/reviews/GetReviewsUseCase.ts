// Get Reviews Use Case - Simplified

import type { Review } from '../../entities/Review';
import type { ReviewRepository } from '../../repositories/ReviewRepository';

// ✅ Simple class
export class GetReviewsUseCase {
    private reviewRepository: ReviewRepository;

    constructor(reviewRepository: ReviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    async execute(): Promise<Review[]> {
        return await this.reviewRepository.getAll();
    }
}
