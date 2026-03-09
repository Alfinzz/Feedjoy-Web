// Status Timeline Component for Payment Success
import { CheckCircle, Package, Clock, Truck } from "lucide-react";

export default function StatusTimeline() {
    return (
        <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-gray-800 font-poppins mb-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Status Pesanan
            </h4>
            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />
                <div className="absolute left-5 top-5 w-0.5 h-12 bg-primary" />

                <div className="space-y-5">
                    {/* Step 1 - Completed */}
                    <div className="flex items-center gap-4 relative">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center z-10">
                            <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800 font-urbanist text-sm">Pembayaran Diterima</p>
                            <p className="text-xs text-gray-500 font-urbanist">Baru saja</p>
                        </div>
                    </div>

                    {/* Step 2 - In Progress */}
                    <div className="flex items-center gap-4 relative">
                        <div className="w-10 h-10 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center z-10">
                            <Package className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-primary font-urbanist text-sm">Pesanan Diproses</p>
                            <p className="text-xs text-gray-500 font-urbanist">Menunggu konfirmasi penjual</p>
                        </div>
                    </div>

                    {/* Step 3 - Pending */}
                    <div className="flex items-center gap-4 relative">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center z-10">
                            <Truck className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-400 font-urbanist text-sm">Dalam Pengiriman</p>
                            <p className="text-xs text-gray-400 font-urbanist">Estimasi 3-5 hari kerja</p>
                        </div>
                    </div>

                    {/* Step 4 - Pending */}
                    <div className="flex items-center gap-4 relative">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center z-10">
                            <CheckCircle className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-gray-400 font-urbanist text-sm">Pesanan Selesai</p>
                            <p className="text-xs text-gray-400 font-urbanist">Pesanan telah diterima</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
