// useClientOrderDetail Hook - Business logic for Order Detail modal
import { useState } from "react";
import type { Order } from "../../../domain/entities/Order";
import type { Review, CreateReviewRequest } from "../../../domain/entities/Review";
import { useReviews } from "../useReviews";

export function useClientOrderDetail(order: Order) {
    const { getReviewByOrderId, createReview, updateReview, deleteReview } = useReviews();

    // Find existing review for this order
    const existingReview = getReviewByOrderId(order.id);

    const [review, setReview] = useState<Review | null>(existingReview || null);
    const [isEditing, setIsEditing] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);

    const [formData, setFormData] = useState({
        rating: existingReview?.rating || 5,
        comment: existingReview?.comment || ""
    });

    const handleSaveReview = async () => {
        if (!formData.comment.trim()) return;

        const reviewData: CreateReviewRequest = {
            orderId: order.id,
            productId: order.productId,
            productName: order.productName,
            productImage: order.productImage,
            rating: formData.rating,
            comment: formData.comment,
        };

        if (isEditing && review) {
            await updateReview(review.id, reviewData);
            setReview({ ...review, ...reviewData });
        } else {
            const newReview = await createReview(reviewData);
            setReview(newReview);
        }

        setShowReviewForm(false);
        setIsEditing(false);
    };

    const handleDeleteReview = async () => {
        if (review && confirm("Yakin ingin menghapus review ini?")) {
            await deleteReview(review.id);
            setReview(null);
            setFormData({ rating: 5, comment: "" });
        }
    };

    const handleEditReview = () => {
        if (review) {
            setFormData({ rating: review.rating, comment: review.comment });
            setIsEditing(true);
            setShowReviewForm(true);
        }
    };

    const toggleReviewForm = (show: boolean) => {
        setShowReviewForm(show);
        if (!show && !isEditing) {
            setFormData({ rating: 5, comment: "" });
        }
    };

    const updateFormData = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    return {
        review,
        isEditing,
        showReviewForm,
        formData,
        handleSaveReview,
        handleDeleteReview,
        handleEditReview,
        toggleReviewForm,
        updateFormData
    };
}
