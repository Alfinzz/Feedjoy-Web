// Testimonial Modal - Add review to testimonial confirmation
import { CheckCircle } from 'lucide-react';
import type { Review } from '../../../domain/entities/Review';
import StarRating from '../commons/StarRating';

export interface TestimonialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    review: Review | null;
}

export default function TestimonialModal({ isOpen, onClose, onConfirm, review }: TestimonialModalProps) {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">Tambahkan ke Testimonial?</h3>
                    <p className="text-gray-500 font-urbanist mb-4">
                        Review ini akan ditampilkan di halaman public sebagai testimonial.
                    </p>

                    {/* Preview */}
                    <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500 font-urbanist">{review.rating}/5</span>
                        </div>
                        <p className="text-gray-700 font-urbanist text-sm line-clamp-3">"{review.comment}"</p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold font-urbanist hover:bg-green-700"
                        >
                            Tambahkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
