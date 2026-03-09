// useClientReviewList Hook - Business logic for Review List page
import { useMemo } from "react";
import { useReviews } from "../useReviews";

export function useClientReviewList() {
    const { reviews } = useReviews();

    // Calculate stats using useMemo
    const stats = useMemo(() => {
        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
            : "0.0";

        return {
            totalReviews,
            averageRating
        };
    }, [reviews]);

    return {
        reviews,
        stats
    };
}
