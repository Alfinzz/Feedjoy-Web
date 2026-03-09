// Create Review Use Case - Simplified with Business Rules

import type { Review, CreateReviewRequest } from '../../entities/Review';
import type { ReviewRepository } from '../../repositories/ReviewRepository';
import type { OrderRepository } from '../../repositories/OrderRepository';

export type CreateReviewInput = CreateReviewRequest;

// ✅ Simple class with validation
export class CreateReviewUseCase {
    private reviewRepository: ReviewRepository;
    private orderRepository: OrderRepository;

    constructor(reviewRepository: ReviewRepository, orderRepository: OrderRepository) {
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
    }

    async execute(input: CreateReviewInput): Promise<Review> {
        this.validateReview(input);

        // Check if order exists and is completed
        const order = await this.orderRepository.getById(input.orderId);
        if (!order) {
            throw new Error('Pesanan tidak ditemukan');
        }

        if (order.status !== 'completed') {
            throw new Error('Hanya pesanan completed yang dapat direview');
        }

        // Check for duplicate review
        const existingReview = await this.reviewRepository.getByOrderId(input.orderId);
        if (existingReview) {
            throw new Error('Anda sudah memberikan review untuk pesanan ini');
        }

        return await this.reviewRepository.create(input);
    }

    private validateReview(review: CreateReviewInput): void {
        if (!review.orderId || review.orderId <= 0) {
            throw new Error('ID pesanan tidak valid');
        }

        if (!review.rating || review.rating < 1 || review.rating > 5) {
            throw new Error('Rating harus antara 1-5');
        }

        if (!review.comment || review.comment.trim().length < 10) {
            throw new Error('Komentar minimal 10 karakter');
        }
    }
}
