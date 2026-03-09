// Review Card Component - Display individual review
import { CheckCircle, Trash2 } from 'lucide-react';
import type { Review } from '../../../domain/entities/Review';
import { formatDate } from '../../hooks/admin/useReviewList';
import StarRating from '../commons/StarRating';

export interface ReviewCardProps {
    review: Review;
    onAddToTestimonial: (review: Review) => void;
    onDelete: (review: Review) => void;
}

const ratingColors = {
    5: 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700',
    4: 'bg-gradient-to-r from-lime-100 to-green-100 text-green-600',
    3: 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-600',
    2: 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700',
    1: 'bg-gradient-to-r from-red-100 to-rose-100 text-red-600'
};

export default function ReviewCard({ review, onAddToTestimonial, onDelete }: ReviewCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
            <div className="flex items-start gap-4">
                {/* Product Image */}
                <img
                    src={review.productImage}
                    alt={review.productName}
                    className="w-14 h-14 object-cover rounded-xl flex-shrink-0 shadow-sm"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Header: Product Name & Rating */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 font-poppins text-sm truncate">{review.productName}</h4>
                            <p className="text-xs text-gray-400 font-urbanist mt-0.5">
                                <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded">#{review.orderId}</span>
                                <span className="mx-1">•</span>
                                {formatDate(review.createdAt)}
                            </p>
                        </div>
                        {/* Rating Badge */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${ratingColors[review.rating as keyof typeof ratingColors]} flex-shrink-0`}>
                            <StarRating rating={review.rating} />
                            <span className="font-bold text-xs font-urbanist">
                                {review.rating}/5
                            </span>
                        </div>
                    </div>

                    {/* Comment with Quote Style */}
                    <div className="relative pl-3 border-l-2 border-primary/30 mb-4">
                        <p className="text-gray-600 font-urbanist leading-relaxed italic text-sm line-clamp-3">
                            "{review.comment}"
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => onAddToTestimonial(review)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg font-semibold font-urbanist text-xs hover:bg-green-100 transition-colors border border-green-100"
                        >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Jadikan Testimonial
                        </button>
                        <button
                            onClick={() => onDelete(review)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg font-semibold font-urbanist text-xs hover:bg-red-100 transition-colors border border-red-100"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
