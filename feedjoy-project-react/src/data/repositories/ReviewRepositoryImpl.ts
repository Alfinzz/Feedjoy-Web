// Repository Implementation - Review
// Implements ReviewRepository interface using DummyDataSource

import type { Review, CreateReviewRequest } from '../../domain/entities/Review';
import type { ReviewRepository } from '../../domain/repositories/ReviewRepository';
import { dummyDataSource } from '../datasources/DummyDataSource';

export class ReviewRepositoryImpl implements ReviewRepository {
    async getAll(): Promise<Review[]> {
        return Promise.resolve(dummyDataSource.getReviews());
    }

    async getByOrderId(orderId: number): Promise<Review | null> {
        return Promise.resolve(dummyDataSource.getReviewByOrderId(orderId));
    }

    async getByProductId(productId: number): Promise<Review[]> {
        const reviews = dummyDataSource.getReviews();
        return Promise.resolve(reviews.filter(r => r.productId === productId));
    }

    async create(request: CreateReviewRequest): Promise<Review> {
        const reviews = dummyDataSource.getReviews();
        const newId = Math.max(...reviews.map(r => r.id), 0) + 1;

        const newReview: Review = {
            id: newId,
            orderId: request.orderId,
            productId: request.productId,
            productName: request.productName,
            productImage: request.productImage,
            rating: request.rating,
            comment: request.comment,
            createdAt: new Date().toISOString(),
        };

        return Promise.resolve(dummyDataSource.addReview(newReview));
    }

    async update(id: number, data: Partial<CreateReviewRequest>): Promise<Review | null> {
        return Promise.resolve(dummyDataSource.updateReview(id, data));
    }

    async delete(id: number): Promise<boolean> {
        return Promise.resolve(dummyDataSource.deleteReview(id));
    }
}

// Singleton instance
export const reviewRepository = new ReviewRepositoryImpl();
