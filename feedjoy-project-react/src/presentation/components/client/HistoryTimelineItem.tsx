// History Timeline Item Component
import { Trash2, Package, CheckCircle, MapPin, Phone, CreditCard, User } from "lucide-react";
import type { Order } from "../../../domain/entities/Order";
import { formatCurrency, formatDate } from "../../utils";
import { useState } from "react";
import { Star } from "lucide-react";
import { Pencil } from "lucide-react";
import axios from "axios";
interface HistoryTimelineItemProps {
    order: Order;
    isLast: boolean;
    onDelete: (id: number) => void;
    fetchHistory: () => Promise<void>;
}

export default function HistoryTimelineItem({ order, fetchHistory, isLast, onDelete }: HistoryTimelineItemProps) {
    // State untuk handle form ulasan
    const [isEditing, setIsEditing] = useState(false);
    const [rating, setRating] = useState(order.review?.rating || 0);
    const [comment, setComment] = useState(order.review?.comment || "");

    const handleSaveReview = async () => {
        if (rating === 0) return alert("Pilih rating dulu!");
        
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post('http://localhost:8000/api/reviews', {
                order_id: order.id,
                rating: rating,
                comment: comment
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.data.success) {
                await fetchHistory(); // Refresh data biar tombol berubah jadi tampilan ulasan
                setIsEditing(false);
            }
        } catch (error) {
            alert("Gagal mengirim ulasan");
        }
    };


    return (
        <div className="relative flex gap-4">
            {/* Left Side - Date & ID */}
            <div className="w-32 flex-shrink-0 text-right pr-3">
                <p className="text-sm font-bold text-gray-800 font-poppins">
                    #{order.id.toString().padStart(5, '0')}
                </p>
                <p className="text-xs text-gray-400 font-urbanist mt-1">
                    {formatDate(order.createdAt)}
                </p>
            </div>

            {/* Timeline Dot & Line */}
            <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20 mt-1" />
                {!isLast && (
                    <div className="w-0.5 bg-gray-200 flex-1 mt-2" />
                )}
            </div>

            {/* Right Side - Order Details */}
            <div className="flex-1 pb-4">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-primary/30 transition-colors">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                        {/* Product Info */}
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {order.productImage ? (
                                    <img
                                        src={order.productImage}
                                        alt={order.productName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Package className="w-6 h-6 text-white" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-800 font-poppins">{order.productName}</h4>
                                <p className="text-sm text-gray-500 font-urbanist">
                                    {order.variant} • {order.quantity} item
                                </p>
                            </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                <CheckCircle className="w-3.5 h-3.5" />
                                Selesai
                            </span>
                            <button
                                onClick={() => onDelete(order.id)}
                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                title="Hapus riwayat"
                            >
                                <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <User className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-gray-400 font-urbanist uppercase tracking-wide">Pemesan</p>
                                <p className="text-sm text-gray-700 font-urbanist font-medium truncate">{order.customerName || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Phone className="w-4 h-4 text-green-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-gray-400 font-urbanist uppercase tracking-wide">Telepon</p>
                                <p className="text-sm text-gray-700 font-urbanist font-medium">{order.phone || '-'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <CreditCard className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-gray-400 font-urbanist uppercase tracking-wide">Pembayaran</p>
                                <p className="text-sm text-gray-700 font-urbanist font-medium">{order.paymentMethod || 'QRIS'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-4 h-4 text-primary" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] text-gray-400 font-urbanist uppercase tracking-wide">Total</p>
                                <p className="text-sm text-primary font-poppins font-bold">{formatCurrency(order.totalPrice)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Address Row */}
                    {order.address && (
                        <div className="flex items-start gap-2 mt-4 pt-4 border-t border-gray-200">
                            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-4 h-4 text-orange-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-[10px] text-gray-400 font-urbanist uppercase tracking-wide">Alamat Pengiriman</p>
                                <p className="text-sm text-gray-700 font-urbanist leading-relaxed">{order.address}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                        <h5 className="font-semibold text-gray-800 font-poppins mb-4 flex items-center gap-2 text-sm">
                            <Star className="w-4 h-4 text-yellow-500" />
                            Ulasan Produk
                        </h5>

                        {order.review && !isEditing ? (
                            /* TAMPILAN JIKA SUDAH ADA ULASAN */
                            <div className="bg-white rounded-xl p-4 border border-gray-100 relative group">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-3.5 h-3.5 ${i < order.review!.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 font-urbanist">"{order.review.comment}"</p>
                                <button 
                                    onClick={() => setIsEditing(true)}
                                    className="absolute top-4 right-4 p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-primary transition-all"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                            </div>
                        ) : (
                            /* TAMPILAN FORM INPUT ULASAN */
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <button key={num} onClick={() => setRating(num)}>
                                            <Star className={`w-6 h-6 transition-colors ${num <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Ceritakan kepuasan Anda..."
                                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                                    rows={2}
                                />
                                <div className="flex gap-2">
                                    {isEditing && (
                                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm text-gray-500">Batal</button>
                                    )}
                                    <button 
                                        onClick={handleSaveReview}
                                        className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                                    >
                                        {order.review ? "Update Ulasan" : "Kirim Ulasan"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
            </div>
            
        </div>
    );
}
