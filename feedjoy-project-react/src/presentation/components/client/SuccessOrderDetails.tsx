// Success Order Details Component
import { Package, MapPin, User, Phone } from "lucide-react";
import { formatCurrency } from "../../utils";
import type { OrderData } from "../../hooks/client/usePaymentSuccess";

interface SuccessOrderDetailsProps {
    orderData: OrderData;
}

export default function SuccessOrderDetails({ orderData }: SuccessOrderDetailsProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800 font-poppins flex items-center gap-2">
                    <Package className="w-4 h-4 text-primary" />
                    Detail Pesanan
                </h3>
            </div>
            <div className="p-5">
                {/* Product */}
                <div className="pb-4 border-b border-gray-100">
                    <div className="flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] text-white font-semibold text-center px-1 uppercase">{orderData.product.category}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 font-poppins truncate">{orderData.product.name}</p>
                        </div>
                    </div>
                    {/* Product Details */}
                    <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="text-xs text-gray-400 font-urbanist">Varian</p>
                                <p className="text-sm font-medium text-gray-700 font-urbanist">{orderData.variant}</p>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <p className="text-xs text-gray-400 font-urbanist">Jumlah</p>
                                <p className="text-sm font-medium text-gray-700 font-urbanist">{orderData.quantity} item</p>
                            </div>
                        </div>
                        <p className="text-lg font-bold text-primary font-poppins">{formatCurrency(orderData.totalPrice)}</p>
                    </div>
                </div>

                {/* Shipping Address */}
                <div className="py-4 border-b border-gray-100">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-400 font-urbanist mb-1">Alamat Pengiriman</p>
                            <p className="font-medium text-gray-800 font-urbanist leading-relaxed">{orderData.address || "-"}</p>
                        </div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="pt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-urbanist mb-0.5">Nama Pemesan</p>
                            <p className="font-semibold text-gray-800 font-urbanist text-sm">{orderData.customerName}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Phone className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-urbanist mb-0.5">No. Telepon</p>
                            <p className="font-semibold text-gray-800 font-urbanist text-sm">{orderData.customerPhone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
