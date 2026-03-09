// Client Review Card Component
import { Star, ShoppingBag } from "lucide-react";
import { formatDate } from "../../utils";
import type { Review } from "../../../domain/entities/Review";

interface ClientReviewCardProps {
    review: Review;
}

export default function ClientReviewCard({ review }: ClientReviewCardProps) {
    const renderStars = (rating: number) => (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
            ))}
        </div>
    );

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex gap-3">
                {/* Product Image */}
                {review.productImage ? (
                    <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                    />
                ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-gray-400" />
                    </div>
                )}

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-gray-800 font-poppins truncate">{review.productName}</h3>
                        <span className="text-xs text-gray-400 font-urbanist whitespace-nowrap">{formatDate(review.createdAt)}</span>
                    </div>

                    {renderStars(review.rating)}

                    <p className="mt-2 text-gray-600 font-urbanist text-sm">{review.comment}</p>
                </div>
            </div>
        </div>
    );
}
