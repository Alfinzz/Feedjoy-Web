// Payment Success Page - Standalone success page with logic separated into custom hook
import { Sprout, CheckCircle, Package, ShoppingCart, Copy, Check } from "lucide-react";
import { usePaymentSuccess } from "../../hooks/client/usePaymentSuccess";
import SuccessOrderDetails from "../../components/client/SuccessOrderDetails";
import StatusTimeline from "../../components/client/StatusTimeline";

export default function PaymentSuccessPage() {
    const {
        orderData,
        orderNumber,
        copied,
        handleCopyOrderNumber,
        handleGoToOrders,
        handleShopAgain
    } = usePaymentSuccess();

    // If no order data, show fallback UI
    if (!orderData) {
        return (
            <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
                <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-2">Pembayaran Berhasil!</h2>
                    <p className="text-gray-500 font-urbanist mb-6">Pesanan Anda sedang diproses.</p>
                    <button
                        onClick={handleGoToOrders}
                        className="w-full py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
                    >
                        Lihat Pesanan Saya
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary p-2 rounded-xl shadow-md">
                            <Sprout className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-800 font-poppins">FeedJoy</span>
                    </div>
                    <button
                        onClick={handleShopAgain}
                        className="flex items-center gap-2 text-primary hover:text-primary/80 font-urbanist font-medium transition-colors"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        <span className="hidden sm:inline">Belanja Lagi</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary/20">
                            <span className="text-lg">🎉</span>
                        </div>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-poppins mb-2">Pembayaran Berhasil!</h1>
                    <p className="text-gray-500 font-urbanist">Terima kasih telah berbelanja di FeedJoy</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-3 space-y-5">
                        {/* Order Number Card */}
                        <div className="bg-primary rounded-2xl p-6 text-center text-white shadow-lg">
                            <p className="text-white/80 font-urbanist text-sm mb-2 flex items-center justify-center gap-2">
                                <Package className="w-4 h-4" />
                                Nomor Pesanan Anda
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                <p className="text-3xl sm:text-4xl font-bold font-poppins tracking-widest">#{orderNumber}</p>
                                <button
                                    onClick={handleCopyOrderNumber}
                                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                                    title="Salin nomor pesanan"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-white" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <SuccessOrderDetails orderData={orderData} />
                    </div>

                    {/* Right Column - Status & Actions */}
                    <div className="lg:col-span-2 space-y-4">
                        <StatusTimeline />

                        {/* Action Button */}
                        <button
                            onClick={handleGoToOrders}
                            className="w-full py-4 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Lihat Pesanan Saya
                        </button>

                        {/* Help Text */}
                        <p className="text-xs text-gray-400 font-urbanist text-center">
                            Butuh bantuan? Hubungi{" "}
                            <a href="tel:08123456789" className="text-primary font-medium hover:underline">0812-3456-7890</a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
