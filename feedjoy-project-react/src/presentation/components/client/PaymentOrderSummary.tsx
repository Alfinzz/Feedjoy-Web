// Payment Order Summary Component
import { Package } from "lucide-react";
import { formatCurrency } from "../../utils";
import type { OrderData } from "../../hooks/client/useQrisPayment";

interface PaymentOrderSummaryProps {
    orderData: OrderData;
}

export default function PaymentOrderSummary({ orderData }: PaymentOrderSummaryProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
                            <p className="font-semibold text-gray-800 font-poppins text-sm truncate">{orderData.product.name}</p>
                        </div>
                    </div>
                    {/* Variant & Quantity */}
                    <div className="mt-3 flex items-center gap-4 text-sm">
                        <div className="flex-1">
                            <p className="text-xs text-gray-400 font-urbanist">Varian</p>
                            <p className="font-medium text-gray-700 font-urbanist">{orderData.variant}</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200" />
                        <div>
                            <p className="text-xs text-gray-400 font-urbanist">Jumlah</p>
                            <p className="font-medium text-gray-700 font-urbanist">{orderData.quantity} item</p>
                        </div>
                    </div>
                </div>

                {/* Price Details */}
                <div className="py-4 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-urbanist">Harga</span>
                        <span className="text-gray-700 font-urbanist">{formatCurrency(orderData.variantPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-urbanist">Jumlah</span>
                        <span className="text-gray-700 font-urbanist">×{orderData.quantity}</span>
                    </div>
                </div>

                {/* Total */}
                <div className="bg-primary/10 rounded-xl p-4 -mx-1">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700 font-poppins">Total</span>
                        <span className="text-xl font-bold text-primary font-poppins">{formatCurrency(orderData.totalPrice)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
