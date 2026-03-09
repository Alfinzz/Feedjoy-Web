// src/presentation/hooks/client/useProductDetail.ts
import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useProducts } from "../useProducts";

declare global {
    interface Window {
        snap?: {
            pay: (token: string, options?: {
                onSuccess?: (result: any) => void;
                onPending?: (result: any) => void;
                onError?: (result: any) => void;
                onClose?: () => void;
            }) => void;
        };
    }
}

export interface OrderFormData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    notes: string;
    quantity: number;
    variant: string;
    paymentMethod: string;
}

const API_URL = 'http://localhost:8000/api';

export function useProductDetail() {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchProductById, selectedProduct: product, isLoading: isLoadingProducts } = useProducts();

    const [showOrderForm, setShowOrderForm] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderResponse, setOrderResponse] = useState<any>(null);
    const [snapToken, setSnapToken] = useState<string | null>(null);
    const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
    const [formData, setFormData] = useState<OrderFormData>({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
        quantity: 1,
        variant: "",
        paymentMethod: "QRIS"
    });

    useEffect(() => {
        if (productId) fetchProductById(productId);
    }, [productId, fetchProductById]);

    useEffect(() => {
        if (product) {
            setSelectedImage(product.image);
            if (product.variants && product.variants.length > 0) {
                setFormData(prev => ({ ...prev, variant: product.variants[0].size }));
            }
        }
    }, [product]);

    // Check if Midtrans Snap script is loaded
    useEffect(() => {
        const checkSnapLoaded = () => {
            if (typeof window.snap === 'undefined') {
                console.warn('⚠️ Midtrans Snap belum dimuat. Pastikan script ada di index.html');
            } else {
                console.log('✅ Midtrans Snap berhasil dimuat');
            }
        };

        checkSnapLoaded();
        const timer = setTimeout(checkSnapLoaded, 1000);
        return () => clearTimeout(timer);
    }, []);

    const variantPrice = useMemo(() => {
        if (!product) return 0;
        if (!product.variants || product.variants.length === 0) {
            return Number(product.price) || 0;
        }
        const selected = product.variants.find((v: any) => v.size === formData.variant);
        return selected ? Number(selected.price) || 0 : Number(product.variants[0].price) || 0;
    }, [product, formData.variant]);

    const totalPrice = useMemo(() => {
        return variantPrice * (formData.quantity || 1);
    }, [variantPrice, formData.quantity]);

    // Polling function untuk check payment status
    const checkPaymentStatus = useCallback(async (orderId: number) => {
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.get(`${API_URL}/payment/status/${orderId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const { payment_status, status } = response.data.data;
            console.log('Payment status checked:', { payment_status, status });

            return { payment_status, status };
        } catch (error) {
            console.error('Error checking payment status:', error);
            return null;
        }
    }, []);

    // Open Midtrans Snap with callbacks
    const openMidtransSnap = useCallback((token: string, orderId: number) => {
        if (!window.snap) {
            alert('Payment gateway belum siap. Silakan refresh halaman.');
            return;
        }

        console.log('💳 Membuka Midtrans Snap dengan token:', token.substring(0, 20) + '...');

        window.snap.pay(token, {
            onSuccess: async function (result: any) {
                console.log('✅ Payment Success:', result);
                
                // Polling untuk memastikan backend sudah update
                setTimeout(async () => {
                    const status = await checkPaymentStatus(orderId);
                    if (status && status.payment_status === 'paid') {
                        console.log('✅ Payment confirmed by backend');
                    }
                    
                    alert('✅ Pembayaran Berhasil! Pesanan Anda sedang diproses.');
                    navigate('/dashboard/orders', { 
                        state: { paymentSuccess: true, orderId } 
                    });
                }, 2000);
            },
            onPending: async function (result: any) {
                console.log('⏳ Payment Pending:', result);
                
                alert('⏳ Pesanan tersimpan. Silakan selesaikan pembayaran Anda.');
                navigate('/dashboard/orders', { 
                    state: { paymentPending: true, orderId } 
                });
            },
            onError: function (result: any) {
                console.error('❌ Payment Error:', result);
                alert('❌ Pembayaran gagal. Silakan coba lagi.');
            },
            onClose: async function () {
                console.log('🔒 Payment popup closed by user');
                
                // Check status saat popup ditutup
                const status = await checkPaymentStatus(orderId);
                
                if (status && status.payment_status === 'paid') {
                    alert('✅ Pembayaran berhasil terdeteksi!');
                    navigate('/dashboard/orders', {
                        state: { paymentSuccess: true, orderId }
                    });
                } else {
                    const confirmLeave = confirm(
                        'Anda menutup jendela pembayaran. Pesanan sudah tersimpan.\n\n' +
                        'Apakah Anda ingin melanjutkan pembayaran nanti di menu Pesanan?'
                    );
                    if (confirmLeave) {
                        navigate('/dashboard/orders', {
                            state: { paymentCancelled: true, orderId }
                        });
                    }
                }
            }
        });
    }, [navigate, checkPaymentStatus]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi script Midtrans
        if (typeof window.snap === 'undefined') {
            alert('Payment gateway belum siap. Silakan refresh halaman.');
            console.error('Midtrans Snap tidak ditemukan');
            return;
        }

        setIsSubmitting(true);

        try {
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                alert('Anda belum login. Silakan login terlebih dahulu.');
                navigate('/login');
                return;
            }

            const payload = {
                product_id: productId,
                variant: formData.variant,
                quantity: formData.quantity,
                full_name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                notes: formData.notes || ''
            };

            console.log('📦 Mengirim order dengan payload:', payload);

            // 1. Buat order dan dapatkan snap token
            const response = await axios.post(`${API_URL}/orders`, payload, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('✅ Response dari backend:', response.data);

            const { snap_token, order_id, order } = response.data;

            if (!snap_token) {
                throw new Error('Snap token tidak ditemukan dari server');
            }

            // 2. Simpan data untuk PaymentConfirmation component
            setSnapToken(snap_token);
            
            // Format orderData sesuai dengan component PaymentConfirmation Anda
            const orderData = {
                id: order_id,
                product_name: product?.name || 'Produk',
                variant: formData.variant,
                quantity: formData.quantity,
                total_price: totalPrice,
                ...order
            };
            
            setOrderResponse(orderData);

            // 3. Tampilkan Payment Confirmation
            setShowPaymentConfirmation(true);
            setShowOrderForm(false);

            // 4. Auto-open Midtrans Snap (opsional, bisa dikomentari jika mau manual)
            // setTimeout(() => {
            //     openMidtransSnap(snap_token, order_id);
            // }, 500);

        } catch (error: any) {
            console.error('❌ Error saat membuat order:', error);
            
            if (error.response) {
                const errorMessage = error.response.data?.message || 'Terjadi kesalahan saat memproses pesanan';
                const errorDetails = error.response.data?.errors 
                    ? Object.values(error.response.data.errors).flat().join('\n')
                    : '';
                
                alert(`❌ ${errorMessage}\n${errorDetails}`);
                
                if (error.response.status === 401) {
                    alert('Sesi Anda telah berakhir. Silakan login kembali.');
                    localStorage.removeItem('auth_token');
                    navigate('/login');
                }
            } else if (error.request) {
                alert('❌ Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
            } else {
                alert(`❌ Error: ${error.message}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handler untuk tombol "Kembali" di PaymentConfirmation
    const handleBackFromPayment = useCallback(() => {
        setShowPaymentConfirmation(false);
        setShowOrderForm(true);
        // Reset order data jika perlu
        // setOrderResponse(null);
        // setSnapToken(null);
    }, []);

    return {
        product,
        isLoadingProducts,
        showOrderForm,
        selectedImage,
        formData,
        isSubmitting,
        variantPrice,
        totalPrice,
        handleFormSubmit,
        setVariant: (variant: string) => setFormData(prev => ({ ...prev, variant })),
        updateFormData: (updates: Partial<OrderFormData>) => setFormData(prev => ({ ...prev, ...updates })),
        toggleOrderForm: () => setShowOrderForm(!showOrderForm),
        selectImage: (img: string) => setSelectedImage(img),
        
        // Payment Confirmation related
        orderResponse,
        snapToken,
        showPaymentConfirmation,
        handleBackFromPayment,
        
        // Reset functions
        resetOrder: () => {
            setOrderResponse(null);
            setSnapToken(null);
            setShowPaymentConfirmation(false);
        },
        navigate
    };
}