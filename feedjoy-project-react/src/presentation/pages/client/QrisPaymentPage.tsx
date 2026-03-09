// QRIS Payment Page - Standalone payment page with logic separated into custom hook
import { Sprout, X, Loader2, CheckCircle, ShoppingCart } from "lucide-react";
import { useQrisPayment } from "../../hooks/client/useQrisPayment";
import QrisBox from "../../components/client/QrisBox";
import PaymentOrderSummary from "../../components/client/PaymentOrderSummary";
import ClientDeleteModal from "../../components/client/ClientDeleteModal";

export default function QrisPaymentPage() {
    const {
        orderData,
        qrisCountdown,
        qrisCode,
        isPaymentVerifying,
        showCancelModal,
        openCancelModal,
        closeCancelModal,
        handleSimulatePayment,
        confirmCancel,
        navigate
    } = useQrisPayment();

    // If no order data, redirect to products
    if (!orderData) {
        return (
            <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 font-poppins mb-2">Tidak Ada Pesanan</h2>
                    <p className="text-gray-500 font-urbanist mb-4">Silakan pilih produk untuk melakukan pemesanan.</p>
                    <button
                        onClick={() => navigate('/dashboard/products')}
                        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
                    >
                        Kembali ke Produk
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
                        onClick={openCancelModal}
                        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 font-urbanist transition-colors"
                    >
                        <X className="w-5 h-5" />
                        <span className="hidden sm:inline">Batalkan</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Page Title */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-poppins mb-2">Selesaikan Pembayaran</h1>
                    <p className="text-gray-500 font-urbanist">Scan kode QR di bawah untuk menyelesaikan pesanan Anda</p>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
                    {/* Left Column - QR Code */}
                    <QrisBox qrisCode={qrisCode} countdown={qrisCountdown} />

                    {/* Right Column - Order Summary & Actions */}
                    <div className="lg:col-span-2 space-y-4">
                        <PaymentOrderSummary orderData={orderData} />

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <button
                                onClick={handleSimulatePayment}
                                disabled={isPaymentVerifying}
                                className="w-full py-4 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg"
                            >
                                {isPaymentVerifying ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Memverifikasi...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Saya Sudah Bayar
                                    </>
                                )}
                            </button>

                            <button
                                onClick={openCancelModal}
                                className="w-full py-3 bg-white border-2 border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 hover:border-gray-300 transition-all"
                            >
                                Batalkan Pesanan
                            </button>
                        </div>

                        {/* Help Text */}
                        <p className="text-xs text-gray-400 font-urbanist text-center">
                            Butuh bantuan? Hubungi{" "}
                            <a href="tel:08123456789" className="text-primary font-medium hover:underline">0812-3456-7890</a>
                        </p>
                    </div>
                </div>
            </main>

            {/* Cancel Modal */}
            <ClientDeleteModal
                isOpen={showCancelModal}
                onClose={closeCancelModal}
                onConfirm={confirmCancel}
                title="Batalkan Pesanan?"
                message="Apakah Anda yakin ingin membatalkan pesanan ini? Pesanan yang dibatalkan tidak dapat dipulihkan."
            />
        </div>
    );
}
