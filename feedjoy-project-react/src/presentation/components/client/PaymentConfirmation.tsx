import { useState, useEffect, useRef } from "react";
import { Ticket, CreditCard, ArrowLeft, ExternalLink, ShieldCheck, Clock, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { getImageUrl, formatCurrency } from "../../utils";

declare const window: Window & { 
    snap: any;
};

interface PaymentConfirmationProps {
    orderData: any;
    snapToken: string;
    onBack: () => void;
    productImage?: string;
    onPaymentSuccess?: (orderId: number) => void;
    onPaymentPending?: (orderId: number) => void;
}

export default function PaymentConfirmation({ 
    orderData, 
    snapToken, 
    onBack, 
    productImage,
    onPaymentSuccess,
    onPaymentPending 
}: PaymentConfirmationProps) {
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'processing' | 'success' | 'failed'>('waiting');
    const [retryCount, setRetryCount] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const maxRetries = 5; // Max 5 retry (15 detik total)
    const retryIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (retryIntervalRef.current) {
                clearInterval(retryIntervalRef.current);
            }
        };
    }, []);

    // Function untuk check payment status dengan retry
    const checkPaymentStatusWithRetry = async (orderId: number, attempt: number = 1): Promise<any> => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await fetch(`http://localhost:8000/api/payment/status/${orderId}`, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log(`[Attempt ${attempt}] Payment status:`, data.data);
            
            return data.data;
        } catch (error) {
            console.error(`[Attempt ${attempt}] Error checking payment:`, error);
            return null;
        }
    };

    // Function untuk poll status sampai paid atau max retry
    const pollPaymentStatus = async (orderId: number) => {
        setStatusMessage('Mengkonfirmasi pembayaran...');
        
        let currentAttempt = 0;
        
        const checkStatus = async () => {
            currentAttempt++;
            setRetryCount(currentAttempt);
            
            const status = await checkPaymentStatusWithRetry(orderId, currentAttempt);
            
            if (status && status.payment_status === 'paid') {
                // ✅ SUCCESS - Payment confirmed!
                console.log('✅ Payment confirmed as PAID');
                setPaymentStatus('success');
                setStatusMessage('Pembayaran berhasil dikonfirmasi!');
                
                if (retryIntervalRef.current) {
                    clearInterval(retryIntervalRef.current);
                }
                
                if (onPaymentSuccess) {
                    onPaymentSuccess(orderId);
                }
                
                // Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = '/dashboard/orders';
                }, 2000);
                
                return true;
            }
            
            if (currentAttempt >= maxRetries) {
                // ⏰ MAX RETRY - Masih belum paid tapi redirect aja
                console.log('⏰ Max retry reached, status:', status?.payment_status);
                setStatusMessage('Mengarahkan ke halaman pesanan...');
                
                if (retryIntervalRef.current) {
                    clearInterval(retryIntervalRef.current);
                }
                
                // Redirect anyway
                setTimeout(() => {
                    alert('✅ Pembayaran berhasil! Status akan diperbarui dalam beberapa saat.');
                    window.location.href = '/dashboard/orders';
                }, 1000);
                
                return true;
            }
            
            // Continue polling
            setStatusMessage(`Memeriksa status pembayaran (${currentAttempt}/${maxRetries})...`);
            return false;
        };
        
        // First check immediately
        const isDone = await checkStatus();
        
        if (!isDone) {
            // Continue checking every 3 seconds
            retryIntervalRef.current = setInterval(async () => {
                const done = await checkStatus();
                if (done && retryIntervalRef.current) {
                    clearInterval(retryIntervalRef.current);
                }
            }, 3000);
        }
    };

    const handleRePay = () => {
        if (!window.snap) {
            alert('Payment gateway belum siap. Silakan refresh halaman.');
            return;
        }

        setIsProcessing(true);
        console.log('🚀 Opening Midtrans Snap for Order ID:', orderData.id);

        window.snap.pay(snapToken, {
            onSuccess: async function(result: any) {
                console.log('✅ Payment Success from Midtrans:', result);
                setPaymentStatus('processing');
                
                // Tunggu 2 detik dulu untuk kasih waktu webhook sampai
                setStatusMessage('Menunggu konfirmasi dari server...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Start polling
                await pollPaymentStatus(orderData.id);
            },
            onPending: async function(result: any) {
                console.log('⏳ Payment Pending:', result);
                setPaymentStatus('waiting');
                setStatusMessage('Pembayaran tertunda, menunggu konfirmasi...');
                
                const status = await checkPaymentStatusWithRetry(orderData.id);
                console.log('Current order status:', status);
                
                if (onPaymentPending) {
                    onPaymentPending(orderData.id);
                }
                
                setTimeout(() => {
                    alert('⏳ Pesanan tersimpan. Silakan selesaikan pembayaran Anda.');
                    window.location.href = '/dashboard/orders';
                }, 1000);
            },
            onError: function(result: any) {
                console.error('❌ Payment Error:', result);
                setPaymentStatus('failed');
                setIsProcessing(false);
                setStatusMessage('Pembayaran gagal');
                alert('❌ Pembayaran gagal. Silakan coba lagi.');
            },
            onClose: async function() {
                console.log('🔒 Payment popup closed by user');
                
                // Check apakah sudah dibayar
                const status = await checkPaymentStatusWithRetry(orderData.id);
                
                if (status && status.payment_status === 'paid') {
                    setPaymentStatus('success');
                    alert('✅ Pembayaran berhasil terdeteksi!');
                    if (onPaymentSuccess) {
                        onPaymentSuccess(orderData.id);
                    }
                    setTimeout(() => {
                        window.location.href = '/dashboard/orders';
                    }, 1000);
                } else {
                    setIsProcessing(false);
                    const confirmLeave = confirm(
                        'Anda menutup jendela pembayaran. Pesanan sudah tersimpan.\n\n' +
                        'Apakah Anda ingin melanjutkan pembayaran nanti di menu Pesanan?'
                    );
                    if (confirmLeave) {
                        window.location.href = '/dashboard/orders';
                    }
                }
            }
        });
    };

    // Show success state
    if (paymentStatus === 'success') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 font-urbanist">
                <div className="bg-green-50 p-8 text-center border-b border-green-100">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins">Pembayaran Berhasil!</h2>
                    <p className="text-gray-500 mt-1">Pesanan Anda sedang diproses</p>
                </div>
                <div className="p-8 text-center">
                    <p className="text-gray-600 mb-4">Mengarahkan ke halaman pesanan...</p>
                    <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
                </div>
            </div>
        );
    }

    // Show processing state
    if (paymentStatus === 'processing') {
        return (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 font-urbanist">
                <div className="bg-blue-50 p-8 text-center border-b border-blue-100">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins">Memproses Pembayaran</h2>
                    <p className="text-gray-500 mt-1">{statusMessage}</p>
                </div>
                <div className="p-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <AlertCircle className="w-5 h-5 text-blue-600" />
                        <p className="text-gray-600">
                            Mohon tunggu, kami sedang mengkonfirmasi pembayaran Anda...
                        </p>
                    </div>
                    {retryCount > 0 && (
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                                <span className="text-sm text-gray-600">
                                    Percobaan ke-{retryCount} dari {maxRetries}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Default waiting state
    return (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 font-urbanist">
            {/* Header Status */}
            <div className="bg-primary/5 p-8 text-center border-b border-gray-100">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                    <Clock className="w-8 h-8 text-primary animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 font-poppins">Menunggu Pembayaran</h2>
                <p className="text-gray-500 mt-1">Silahkan selesaikan pembayaran Anda</p>
            </div>

            <div className="p-8 space-y-6">
                {/* Detail Order */}
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">ID Pesanan</span>
                    <span className="font-bold text-gray-700">#{orderData.id}</span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-5 space-y-4">
                    <div className="flex gap-4">
                        <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden">
                            {productImage ? (
                                <img 
                                    src={getImageUrl(productImage)} 
                                    alt="Product"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://via.placeholder.com/80?text=No+Image';
                                    }}
                                />
                            ) : (
                                <Ticket className="w-8 h-8 text-primary/40" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-800 font-poppins line-clamp-1">
                                {orderData.product_name}
                            </h4>
                            <p className="text-sm text-gray-500">
                                {orderData.variant} • {orderData.quantity} Item
                            </p>
                            <p className="text-primary font-bold mt-1">
                                {formatCurrency(orderData.total_price)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info Ringkasan */}
                <div className="space-y-3 pt-4 border-t border-dashed border-gray-200">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">Metode Pembayaran</span>
                        <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold text-gray-700">Midtrans (Otomatis)</span>
                        </div>
                    </div>
                    <div className="flex justify-between text-lg pt-2">
                        <span className="font-bold text-gray-800">Total Tagihan</span>
                        <span className="font-bold text-primary font-poppins">
                            {formatCurrency(orderData.total_price)}
                        </span>
                    </div>
                </div>

                {/* Keamanan Info */}
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <p className="text-xs text-green-700 leading-relaxed">
                        Pembayaran aman & terenkripsi oleh <strong>Midtrans</strong>. 
                        Saldo akan dikembalikan jika transaksi gagal.
                    </p>
                </div>

                {/* Tombol Aksi */}
                <div className="flex flex-col gap-3 pt-4">
                    <button
                        onClick={handleRePay}
                        disabled={isProcessing}
                        className="w-full py-4 bg-primary text-white rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <ExternalLink className="w-5 h-5" />
                                Bayar Sekarang
                            </>
                        )}
                    </button>
                    <button
                        onClick={onBack}
                        disabled={isProcessing}
                        className="w-full py-3 bg-white text-gray-500 rounded-2xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 disabled:opacity-30"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Produk
                    </button>
                </div>
            </div>
        </div>
    );
}