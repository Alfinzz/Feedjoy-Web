// Ulasan Saya - Logic separated into custom hook
import { Star, MessageSquare } from "lucide-react";

// Clean Architecture imports
import { useClientReviewList } from "../../hooks/client/useClientReviewList";
import ClientReviewCard from "../../components/client/ClientReviewCard";

export default function ReviewList() {
    const { reviews, stats } = useClientReviewList();

    if (reviews.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">Belum ada ulasan</h3>
                <p className="text-gray-500 font-urbanist mb-4">Ulasan yang Anda berikan akan muncul di sini</p>
                <p className="text-sm text-gray-400 font-urbanist">
                    Untuk memberi ulasan, buka menu <strong>Pesanan</strong> dan pilih pesanan yang sudah selesai.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Stats Summary */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-urbanist">Total Ulasan</p>
                            <p className="text-2xl font-bold text-gray-800 font-poppins">{stats.totalReviews}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-gray-600 font-urbanist">Rata-rata Rating</p>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                            <span className="text-2xl font-bold text-gray-800 font-poppins">{stats.averageRating}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <ClientReviewCard key={review.id} review={review} />
                ))}
            </div>

            {/* Footer Note */}
            <p className="text-center text-xs text-gray-400 font-urbanist mt-6">
                Untuk mengedit atau menghapus ulasan, buka menu <strong>Pesanan</strong>.
            </p>
        </div>
    );
}
