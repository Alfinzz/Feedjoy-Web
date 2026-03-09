// Client Order Card Component - Display individual order with expandable details
import { Star, MapPin, Pencil, Trash2, Package, Phone, User } from 'lucide-react';
import type { Order } from '../../../domain/entities/Order';
import type { Review } from '../../../domain/entities/Review';
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from '../../utils';
import { getStatusIcon } from './OrderStatusIcon.tsx';

export interface ClientOrderCardProps {
    order: Order;
    review: Review | undefined;
    isExpanded: boolean;
    isEditing: boolean;
    isEditMode: boolean;
    formData: { rating: number; comment: string };
    onToggleExpand: (orderId: number) => void;
    onStartEdit: (orderId: number) => void;
    onStartWriteReview: (orderId: number) => void;
    onCancelReview: () => void;
    onSaveReview: (order: Order) => void;
    onDeleteReview: (reviewId: number) => void;
    onUpdateRating: (rating: number) => void;
    onUpdateComment: (comment: string) => void;
}

// Star rating component
function StarRating({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => interactive && onChange?.(star)}
                    className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}
                >
                    <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                </button>
            ))}
        </div>
    );
}

export default function ClientOrderCard({
    order,
    review,
    isExpanded,
    isEditing,
    isEditMode,
    formData,
    onToggleExpand,
    onStartEdit,
    onStartWriteReview,
    onCancelReview,
    onSaveReview,
    onDeleteReview,
    onUpdateRating,
    onUpdateComment
}: ClientOrderCardProps) {
    const isCompleted = order.status === 'completed';

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Order Header */}
            <div
                className={`p-5 ${isCompleted ? 'cursor-pointer hover:bg-gray-50' : ''}`}
                onClick={() => isCompleted && onToggleExpand(order.id)}
            >
                {/* Order Meta Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700 font-urbanist">#{order.id.toString().padStart(5, '0')}</span>
                        <div className="w-1 h-1 bg-gray-300 rounded-full" />
                        <span className="text-sm text-gray-400 font-urbanist">{formatDate(order.createdAt)}</span>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {getStatusLabel(order.status)}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex items-center gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {order.productImage ? (
                            <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                        ) : (
                            <Package className="w-8 h-8 text-white" />
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 font-poppins mb-2 truncate">{order.productName}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-2">
                            <div>
                                <span className="text-gray-400 font-urbanist">Varian: </span>
                                <span className="text-gray-700 font-urbanist font-medium">{order.variant}</span>
                            </div>
                            <div className="w-px h-4 bg-gray-200" />
                            <div>
                                <span className="text-gray-400 font-urbanist">Jumlah: </span>
                                <span className="text-gray-700 font-urbanist font-medium">{order.quantity} item</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                                <User className="w-3.5 h-3.5" />
                                <span className="font-urbanist">{order.customerName || 'Customer'}</span>
                            </div>
                            {order.customerPhone && (
                                <>
                                    <div className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <div className="flex items-center gap-1">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span className="font-urbanist">{order.customerPhone}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end gap-1">
                        <p className="text-xs text-gray-400 font-urbanist">Total</p>
                        <p className="text-xl font-bold text-gray-800 font-poppins">{formatCurrency(order.totalPrice)}</p>
                    </div>
                </div>
            </div>

            {/* Expanded Details - Only for completed orders */}
            {isCompleted && isExpanded && (
                <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                    {/* Order Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-400 font-urbanist mb-1">Alamat Pengiriman</p>
                                    <p className="text-sm text-gray-700 font-urbanist leading-relaxed">{order.address || '-'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs text-gray-400 font-urbanist mb-1">No. Telepon</p>
                                    <p className="text-sm text-gray-700 font-urbanist font-medium">{order.customerPhone || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                        <h5 className="font-semibold text-gray-800 font-poppins mb-4 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            Ulasan Produk
                        </h5>

                        {review && !isEditing ? (
                            <div className="bg-yellow-50/50 rounded-xl p-4 border border-yellow-100">
                                <div className="flex items-center justify-between mb-3">
                                    <StarRating rating={review.rating} />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onStartEdit(order.id); }}
                                            className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteReview(review.id); }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 font-urbanist text-sm leading-relaxed">{review.comment}</p>
                                <p className="text-xs text-gray-400 mt-3 font-urbanist">{formatDate(review.createdAt)}</p>
                            </div>
                        ) : (
                            <div onClick={(e) => e.stopPropagation()}>
                                {!isEditing && !review && (
                                    <button
                                        onClick={() => onStartWriteReview(order.id)}
                                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 font-urbanist flex items-center justify-center gap-2 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all"
                                    >
                                        <Star className="w-5 h-5" />
                                        Tulis Ulasan
                                    </button>
                                )}
                                {isEditing && (
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm text-gray-600 font-urbanist mb-2">Rating</p>
                                            <StarRating rating={formData.rating} interactive onChange={onUpdateRating} />
                                        </div>
                                        <textarea
                                            value={formData.comment}
                                            onChange={(e) => onUpdateComment(e.target.value)}
                                            placeholder="Bagikan pengalaman Anda dengan produk ini..."
                                            className="w-full p-4 border border-gray-200 rounded-xl text-sm font-urbanist resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            rows={3}
                                        />
                                        <div className="flex gap-3">
                                            <button
                                                onClick={onCancelReview}
                                                className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-urbanist hover:bg-gray-100 transition-colors"
                                            >
                                                Batal
                                            </button>
                                            <button
                                                onClick={() => onSaveReview(order)}
                                                disabled={!formData.comment.trim() || formData.rating === 0}
                                                className="flex-1 py-3 bg-primary text-white rounded-xl font-urbanist font-semibold disabled:opacity-50 hover:bg-primary/90 transition-colors"
                                            >
                                                {isEditMode ? 'Update Ulasan' : 'Kirim Ulasan'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
