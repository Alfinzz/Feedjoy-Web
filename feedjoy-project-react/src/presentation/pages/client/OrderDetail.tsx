// Order Detail - Simple modal with logic separated into custom hook
import { X } from "lucide-react";

// Clean Architecture imports
import type { Order } from "../../../domain/entities/Order";
import { formatCurrency, formatDate, getStatusColor, getStatusLabel } from "../../utils";
import { useClientOrderDetail } from "../../hooks/client/useClientOrderDetail";
import ClientReviewSection from "../../components/client/ClientReviewSection";

interface OrderDetailProps {
    order: Order;
    onClose: () => void;
}

export default function OrderDetail({ order, onClose }: OrderDetailProps) {
    const {
        review,
        isEditing,
        showReviewForm,
        formData,
        handleSaveReview,
        handleDeleteReview,
        handleEditReview,
        toggleReviewForm,
        updateFormData
    } = useClientOrderDetail(order);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
                    <div>
                        <h2 className="font-semibold text-gray-800 font-poppins">Detail Pesanan</h2>
                        <p className="text-sm text-gray-500 font-urbanist">#{order.id}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content - Scrollable */}
                <div className="p-5 space-y-5 overflow-y-auto flex-1">
                    {/* Product */}
                    <div className="flex gap-4">
                        <img
                            src={order.productImage}
                            alt={order.productName}
                            className="w-16 h-16 object-cover rounded-xl"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 font-poppins">{order.productName}</h3>
                            <p className="text-sm text-gray-500 font-urbanist">{order.variant} × {order.quantity}</p>
                            <p className="font-bold text-primary font-poppins mt-1">{formatCurrency(order.totalPrice)}</p>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-between py-3 border-y border-gray-100">
                        <span className="text-gray-600 font-urbanist">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {getStatusLabel(order.status)}
                        </span>
                    </div>

                    {/* Info List */}
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-urbanist text-sm">Tanggal Order</span>
                            <span className="text-gray-800 font-urbanist text-sm">{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500 font-urbanist text-sm">Pembayaran</span>
                            <span className="text-gray-800 font-urbanist text-sm">{order.paymentMethod}</span>
                        </div>
                        <div>
                            <span className="text-gray-500 font-urbanist text-sm">Alamat Pengiriman</span>
                            <p className="text-gray-800 font-urbanist text-sm mt-1">{order.address}</p>
                        </div>
                    </div>

                    {/* Review Section - Only for completed orders */}
                    {order.status === 'completed' && (
                        <ClientReviewSection
                            review={review}
                            showReviewForm={showReviewForm}
                            formData={formData}
                            isEditing={isEditing}
                            onToggleForm={toggleReviewForm}
                            onUpdateForm={(data) => updateFormData(data)}
                            onSave={handleSaveReview}
                            onEdit={handleEditReview}
                            onDelete={handleDeleteReview}
                        />
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-gray-100 flex-shrink-0">
                    <button
                        onClick={onClose}
                        className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold font-urbanist hover:bg-gray-200 transition-colors"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
