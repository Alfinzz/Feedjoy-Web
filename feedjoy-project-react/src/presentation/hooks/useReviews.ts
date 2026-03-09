// Custom Hook - useReviews (SharedDataStore Version)
// Uses SharedDataStore for synchronization between Admin and User

import { useState, useEffect, useCallback } from 'react';
import type { Review, CreateReviewRequest } from '../../domain/entities/Review';
import { sharedDataStore } from '../../data/datasources/SharedDataStore';
import { useAuth } from '../context/AuthContext';

interface UseReviewsState {
    reviews: Review[];
    isLoading: boolean;
    error: string | null;
}

interface UseReviewsReturn extends UseReviewsState {
    fetchReviews: () => Promise<void>;
    getReviewByOrderId: (orderId: number) => Review | undefined;
    createReview: (request: CreateReviewRequest) => Promise<Review | null>;
    updateReview: (id: number, data: Partial<CreateReviewRequest>) => Promise<Review | null>;
    deleteReview: (id: number) => Promise<boolean>;
    clearError: () => void;
}

export function useReviews(): UseReviewsReturn {
    const { user } = useAuth();

    const [state, setState] = useState<UseReviewsState>({
        reviews: sharedDataStore.getReviews(),
        isLoading: false,
        error: null,
    });

    // Subscribe to SharedDataStore changes
    useEffect(() => {
        const unsubscribe = sharedDataStore.subscribe(() => {
            setState(prev => ({
                ...prev,
                reviews: sharedDataStore.getReviews()
            }));
        });
        return unsubscribe;
    }, []);

    const fetchReviews = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const reviews = sharedDataStore.getReviews();
            setState(prev => ({ ...prev, reviews, isLoading: false }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch reviews'
            }));
        }
    }, []);

    const getReviewByOrderId = useCallback((orderId: number): Review | undefined => {
        return state.reviews.find(r => r.orderId === orderId);
    }, [state.reviews]);

    const createReview = useCallback(async (request: CreateReviewRequest): Promise<Review | null> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const newReview = sharedDataStore.addReview({
                ...request,
                userId: user?.id?.toString() || user?.email || 'anonymous',
                userName: user?.name || 'Anonymous',
                createdAt: new Date().toISOString()
            });

            setState(prev => ({
                ...prev,
                reviews: sharedDataStore.getReviews(),
                isLoading: false
            }));
            return newReview;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to create review'
            }));
            return null;
        }
    }, [user]);

    const updateReview = useCallback(async (id: number, data: Partial<CreateReviewRequest>): Promise<Review | null> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            // Find existing review
            const existingReview = state.reviews.find(r => r.id === id);
            if (!existingReview) {
                throw new Error('Review not found');
            }

            // Delete old review and create updated one
            sharedDataStore.deleteReview(id);
            const updatedReview = sharedDataStore.addReview({
                ...existingReview,
                ...data,
            });

            setState(prev => ({
                ...prev,
                reviews: sharedDataStore.getReviews(),
                isLoading: false
            }));
            return updatedReview;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to update review'
            }));
            return null;
        }
    }, [state.reviews]);

    const deleteReview = useCallback(async (id: number): Promise<boolean> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            const success = sharedDataStore.deleteReview(id);
            if (success) {
                setState(prev => ({
                    ...prev,
                    reviews: sharedDataStore.getReviews(),
                    isLoading: false
                }));
            }
            return success;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to delete review'
            }));
            return false;
        }
    }, []);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        fetchReviews,
        getReviewByOrderId,
        createReview,
        updateReview,
        deleteReview,
        clearError,
    };
}
