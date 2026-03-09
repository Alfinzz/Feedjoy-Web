// Rating Summary - Rating overview with distribution bars
import { Sparkles, Star } from 'lucide-react';

export interface RatingData {
    rating: number;
    count: number;
    percentage: number;
}

export interface RatingSummaryProps {
    averageRating: number;
    totalReviews: number;
    distribution: RatingData[];
}

export default function RatingSummary({ averageRating, totalReviews, distribution }: RatingSummaryProps) {
    return (
        <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h3 className="font-bold text-gray-800 font-poppins">Rating & Ulasan</h3>
            </div>

            <div className="flex items-center gap-6">
                {/* Big Rating */}
                <div className="text-center">
                    <div className="flex items-baseline gap-1 mb-1">
                        <span className="text-5xl font-bold text-gray-800 font-poppins">
                            {averageRating.toFixed(1)}
                        </span>
                        <span className="text-xl text-gray-400 font-urbanist">/5</span>
                    </div>
                    <div className="flex gap-0.5 justify-center mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className={`w-5 h-5 ${star <= Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 font-urbanist">{totalReviews} ulasan</p>
                </div>

                {/* Distribution */}
                <div className="flex-1 space-y-2">
                    {distribution.map((item) => (
                        <div key={item.rating} className="flex items-center gap-2">
                            <span className="text-xs text-gray-600 font-urbanist w-3">{item.rating}</span>
                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percentage}%` }}
                                />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 w-6 text-right">{item.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
