// Client Review Section Component for Order Detail
import { Star, Edit2, Trash2 } from "lucide-react";
import { formatDate } from "../../utils";
import type { Review } from "../../../domain/entities/Review";

interface ClientReviewSectionProps {
    review: Review | null;
    showReviewForm: boolean;
    formData: { rating: number; comment: string };
    isEditing: boolean;
    onToggleForm: (show: boolean) => void;
    onUpdateForm: (data: any) => void;
    onSave: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

export default function ClientReviewSection({
    review,
    showReviewForm,
    formData,
    isEditing,
    onToggleForm,
    onUpdateForm,
    onSave,
    onEdit,
    onDelete
}: ClientReviewSectionProps) {
    const renderStars = (rating: number, interactive = false, onChange?: (r: number) => void) => (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onChange?.(star)}
                    className={interactive ? "cursor-pointer" : "cursor-default"}
                >
                    <Star
                        className={`w-5 h-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                </button>
            ))}
        </div>
    );

    return (
        <div className="pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-gray-800 font-poppins mb-3">Ulasan Produk</h4>

            {/* Show existing review */}
            {review && !showReviewForm && (
                <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        {renderStars(review.rating)}
                        <div className="flex gap-1">
                            <button
                                onClick={onEdit}
                                className="p-1.5 hover:bg-gray-200 rounded-lg"
                                title="Edit"
                            >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                            </button>
                            <button
                                onClick={onDelete}
                                className="p-1.5 hover:bg-red-100 rounded-lg"
                                title="Hapus"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 font-urbanist text-sm">{review.comment}</p>
                    <p className="text-xs text-gray-400 font-urbanist mt-2">{formatDate(review.createdAt)}</p>
                </div>
            )}

            {/* Add review button */}
            {!review && !showReviewForm && (
                <button
                    onClick={() => onToggleForm(true)}
                    className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-urbanist hover:border-primary hover:text-primary transition-colors"
                >
                    + Tambah Ulasan
                </button>
            )}

            {/* Review Form */}
            {showReviewForm && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                    <div>
                        <label className="text-sm font-semibold text-gray-700 font-urbanist mb-2 block">Rating</label>
                        {renderStars(formData.rating, true, (r) => onUpdateForm({ rating: r }))}
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-gray-700 font-urbanist mb-2 block">Komentar</label>
                        <textarea
                            value={formData.comment}
                            onChange={(e) => onUpdateForm({ comment: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist text-sm resize-none"
                            placeholder="Tulis ulasan Anda..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onToggleForm(false)}
                            className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg font-urbanist text-sm hover:bg-gray-100"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onSave}
                            className="flex-1 py-2 bg-primary text-white rounded-lg font-urbanist text-sm font-semibold hover:bg-primary/90"
                        >
                            {isEditing ? "Update" : "Simpan"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
