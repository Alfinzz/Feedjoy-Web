// Order Card Component - Display individual order with expandable details
import {
    ChevronDown,
    ChevronUp,
    MapPin,
    Phone,
    Mail,
    Package,
    Truck,
    Hash,
    CreditCard,
    Send
} from 'lucide-react';
import type { Order, OrderStatus } from '../../../domain/entities/Order';
import { formatCurrency, formatDate, getStatusInfo, getNextStatusOptions } from '../../hooks/admin/useOrderList';

export interface OrderCardProps {
    order: Order;
    isExpanded: boolean;
    onToggleExpand: (orderId: number) => void;
    onStatusChange: (orderId: number, status: OrderStatus, needsTracking?: boolean) => void;
}

export default function OrderCard({ order, isExpanded, onToggleExpand, onStatusChange }: OrderCardProps) {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;
    const nextOptions = getNextStatusOptions(order.status);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            {/* Order Card - Main Content */}
            <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                        <img
                            src={order.productImage}
                            alt={order.productName}
                            className="w-full sm:w-20 h-28 sm:h-20 object-cover rounded-xl"
                        />
                    </div>

                    {/* Left: Order Info */}
                    <div className="flex-1 min-w-0">
                        {/* Top row: Order ID & Date */}
                        <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">#{order.id}</span>
                            <span>•</span>
                            <span className="font-urbanist">{formatDate(order.createdAt)}</span>
                        </div>

                        {/* Product Name */}
                        <h4 className="font-bold text-gray-800 font-poppins truncate mb-0.5">
                            {order.productName}
                        </h4>

                        {/* Customer Name */}
                        <p className="text-sm text-gray-600 font-urbanist">
                            {order.customerName}
                        </p>
                    </div>

                    {/* Right: Status & Price */}
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${statusInfo.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusInfo.label}
                        </span>
                        <span className="text-lg font-bold text-primary font-poppins">
                            {formatCurrency(order.totalPrice)}
                        </span>
                    </div>

                    {/* Expand Button */}
                    <button
                        onClick={() => onToggleExpand(order.id)}
                        className={`hidden sm:flex w-10 h-10 rounded-xl items-center justify-center transition-all flex-shrink-0 ${isExpanded
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                        ) : (
                            <ChevronDown className="w-5 h-5" />
                        )}
                    </button>
                </div>

                {/* Mobile Expand Button */}
                <button
                    onClick={() => onToggleExpand(order.id)}
                    className={`sm:hidden w-full mt-4 py-2.5 rounded-xl font-semibold font-urbanist text-sm flex items-center justify-center gap-2 transition-all ${isExpanded
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Tutup Detail
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            Lihat Detail
                        </>
                    )}
                </button>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50/50 p-4 sm:p-5 space-y-5">
                    {/* Customer Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {/* Left: Customer Info */}
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <h5 className="font-bold text-gray-800 font-poppins text-sm mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Detail Pelanggan
                            </h5>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-urbanist">{order.customerPhone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-4 h-4 text-green-600" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-urbanist truncate">{order.customerEmail}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-urbanist leading-relaxed">{order.address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Order Info */}
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <h5 className="font-bold text-gray-800 font-poppins text-sm mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                                Detail Pesanan
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Package className="w-4 h-4 text-orange-600" />
                                        </div>
                                        <div className="text-sm text-gray-700 font-urbanist">
                                            <div className="font-medium">Variant</div>
                                            <div className="text-gray-500">{order.variant}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Package className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <div className="text-sm text-gray-700 font-urbanist">
                                            <div className="font-medium">Jumlah</div>
                                            <div className="text-gray-500">{order.quantity} item</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CreditCard className="w-4 h-4 text-green-600" />
                                        </div>
                                        <div className="text-sm font-urbanist">
                                            <div className="font-medium text-gray-700">Total Harga</div>
                                            <div className="font-bold text-primary">{formatCurrency(order.totalPrice)}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Hash className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <div className="text-sm text-gray-700 font-urbanist">
                                            <div className="font-medium">Order ID</div>
                                            <div className="text-gray-500">#{order.id}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <CreditCard className="w-4 h-4 text-teal-600" />
                                        </div>
                                        <div className="text-sm text-gray-700 font-urbanist">
                                            <div className="font-medium">Pembayaran</div>
                                            <div className="text-gray-500">{order.paymentMethod}</div>
                                        </div>
                                    </div>
                                    {order.trackingNumber && (
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Truck className="w-4 h-4 text-indigo-600" />
                                            </div>
                                            <div className="text-sm text-gray-700 font-urbanist">
                                                <div className="font-medium">No. Resi</div>
                                                <div className="text-gray-500">{order.trackingNumber}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Actions */}
                    {nextOptions.length > 0 && (
                        <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <h5 className="font-bold text-gray-800 font-poppins text-sm mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                Ubah Status Pesanan
                            </h5>
                            <div className="flex flex-wrap gap-3">
                                {nextOptions.map(option => (
                                    <button
                                        key={option.status}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onStatusChange(order.id, option.status, option.needsTracking);
                                        }}
                                        className={`px-5 py-2.5 rounded-xl font-semibold font-urbanist text-sm transition-all flex items-center gap-2 ${option.status === 'cancelled'
                                            ? 'border-2 border-red-200 text-red-600 hover:bg-red-50'
                                            : option.needsTracking
                                                ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200'
                                                : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                                            }`}
                                    >
                                        {option.needsTracking && <Send className="w-4 h-4" />}
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
