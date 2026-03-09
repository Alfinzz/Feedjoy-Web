// useReviewList Hook - Business logic for Admin Review List
import { useState } from 'react';
import { adminDataSource } from '../../../data/datasources/AdminDataSource';
import type { Review } from '../../../domain/entities/Review';

// Format date helper
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

export interface RatingDistribution {
    rating: number;
    count: number;
    percentage: number;
}

export function useReviewList() {
    const [reviews, setReviews] = useState<Review[]>(adminDataSource.getReviews());
    const [searchQuery, setSearchQuery] = useState('');
    const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');
    const [deleteReview, setDeleteReview] = useState<Review | null>(null);
    const [testimonialReview, setTestimonialReview] = useState<Review | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Calculate stats
    const stats = {
        total: reviews.length,
        average: reviews.length > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
            : '0.0',
        distribution: [5, 4, 3, 2, 1].map(rating => ({
            rating,
            count: reviews.filter(r => r.rating === rating).length,
            percentage: reviews.length > 0
                ? Math.round((reviews.filter(r => r.rating === rating).length / reviews.length) * 100)
                : 0
        })) as RatingDistribution[]
    };

    // Filtered reviews
    const filteredReviews = reviews.filter(review => {
        const matchesSearch =
            review.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRating = ratingFilter === 'all' || review.rating === ratingFilter;
        return matchesSearch && matchesRating;
    });

    // Pagination
    const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
    const paginatedReviews = filteredReviews.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filter changes
    const handleFilterChange = (rating: number | 'all') => {
        setRatingFilter(rating);
        setCurrentPage(1);
    };

    const handleDeleteReview = () => {
        if (deleteReview) {
            adminDataSource.deleteReview(deleteReview.id);
            setReviews(adminDataSource.getReviews());
            setDeleteReview(null);
        }
    };

    const handleAddToTestimonial = () => {
        // In real app, this would save to testimonials
        alert('Review berhasil ditambahkan ke testimonial!');
        setTestimonialReview(null);
    };

    // Modal handlers
    const openDeleteModal = (review: Review) => {
        setDeleteReview(review);
    };

    const closeDeleteModal = () => {
        setDeleteReview(null);
    };

    const openTestimonialModal = (review: Review) => {
        setTestimonialReview(review);
    };

    const closeTestimonialModal = () => {
        setTestimonialReview(null);
    };

    // Pagination
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        setCurrentPage(p => Math.max(1, p - 1));
    };

    const goToNextPage = () => {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    };

    return {
        // State
        reviews,
        searchQuery,
        setSearchQuery,
        ratingFilter,
        deleteReview,
        testimonialReview,
        currentPage,
        itemsPerPage,
        stats,
        filteredReviews,
        totalPages,
        paginatedReviews,
        // Handlers
        handleFilterChange,
        handleDeleteReview,
        handleAddToTestimonial,
        openDeleteModal,
        closeDeleteModal,
        openTestimonialModal,
        closeTestimonialModal,
        // Pagination
        goToPage,
        goToPreviousPage,
        goToNextPage
    };
}
