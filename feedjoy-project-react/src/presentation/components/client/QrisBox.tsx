// Qris Box Component - Displays QR code and countdown
import { QrCode, Clock, RefreshCw } from "lucide-react";

interface QrisBoxProps {
    qrisCode: string;
    countdown: number;
}

export default function QrisBox({ qrisCode, countdown }: QrisBoxProps) {
    return (
        <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
            <div className="flex flex-col items-center">
                {/* QRIS Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-emerald-100 rounded-full mb-6">
                    <QrCode className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-primary font-urbanist">Pembayaran QRIS</span>
                </div>

                {/* QR Code Container */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 sm:p-8 border-2 border-dashed border-gray-200 mb-6">
                    {/* Simulated QR Code */}
                    <div className="w-48 h-48 sm:w-56 sm:h-56 bg-white rounded-xl flex items-center justify-center relative">
                        {/* QR Pattern */}
                        <div className="grid grid-cols-10 gap-0.5">
                            {Array.from({ length: 100 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm ${(i < 30 && (i % 10 < 3 || i % 10 > 6)) ||
                                        (i > 69 && i % 10 < 3) ||
                                        (i % 10 === 0 || i % 10 === 9) ||
                                        Math.random() > 0.6
                                        ? "bg-gray-900"
                                        : "bg-white"
                                        }`}
                                />
                            ))}
                        </div>
                        {/* Center Logo */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-emerald-600 rounded-xl shadow-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xs">QRIS</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* QRIS Code */}
                <div className="text-center mb-6">
                    <p className="text-xs text-gray-400 font-urbanist mb-2">Kode Pembayaran</p>
                    <div className="inline-flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100">
                        <span className="font-mono text-sm font-bold text-gray-800 tracking-wider">{qrisCode}</span>
                    </div>
                </div>

                {/* Countdown Timer */}
                <div className="w-full flex items-center justify-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-xs text-amber-700 font-urbanist">Kode akan diperbarui dalam</p>
                        <p className="text-3xl font-bold text-amber-800 font-poppins">
                            00:{countdown.toString().padStart(2, "0")}
                        </p>
                    </div>
                    <RefreshCw className={`w-5 h-5 text-amber-500 ${countdown <= 5 ? "animate-spin" : ""}`} />
                </div>

                {/* Supported Banks */}
                <div className="w-full mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-urbanist text-center mb-3">Didukung oleh</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {["BCA", "BRI", "Mandiri", "BNI", "OVO", "GoPay", "Dana", "ShopeePay"].map((bank) => (
                            <span
                                key={bank}
                                className="px-3 py-1.5 bg-gray-50 rounded-lg text-xs font-medium text-gray-500 border border-gray-100"
                            >
                                {bank}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
