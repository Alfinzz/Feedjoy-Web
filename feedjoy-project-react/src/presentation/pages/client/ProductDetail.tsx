import { useMemo } from 'react';
import { ArrowLeft, ShoppingCart, Package, Star, Loader2, CheckCircle2 } from 'lucide-react';
import { useProductDetail } from '../../hooks/client/useProductDetail';
import OrderForm from '../../components/client/OrderForm';
import PaymentConfirmation from '../../components/client/PaymentConfirmation';
import { formatCurrency, getImageUrl } from '../../utils';

export default function ProductDetail() {
    const {
        product,
        isLoadingProducts,
        showOrderForm,
        selectedImage,
        formData,
        isSubmitting,
        variantPrice,
        totalPrice,
        handleFormSubmit,
        setVariant,
        updateFormData,
        toggleOrderForm,
        selectImage,
        navigate,
        showPaymentConfirmation,
        orderResponse,
        snapToken,
        handleBackFromPayment
    } = useProductDetail();

    // 1. Logika Rating Dinamis dari Database
    const ratingInfo = useMemo(() => {
        const reviews = product?.reviews || []; // Mengambil data reviews dari relasi product
        const count = reviews.length;
        
        if (count === 0) return { average: 0, count: 0 };

        // Menghitung total rating dari array reviews
        const totalStars = reviews.reduce((acc: number, rev: any) => acc + (Number(rev.rating) || 0), 0);
        const average = totalStars / count;

        return {
            average: parseFloat(average.toFixed(1)),
            count: count
        };
    }, [product]);

    // 2. Tampilan Loading
    if (isLoadingProducts) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-gray-500 font-urbanist">Memuat detail produk...</p>
                </div>
            </div>
        );
    }

    // 3. Tampilan Error
    if (!product) {
        return (
            <div className="text-center py-20">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Produk Tidak Ditemukan</h3>
                <p className="text-gray-500 mb-6">Produk yang Anda cari tidak tersedia</p>
                <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Kembali ke Katalog
                </button>
            </div>
        );
    }

    // 4. Tampilan Konfirmasi Pembayaran (Step 8 Flow)
    if (showPaymentConfirmation && orderResponse && snapToken) {
        return (
            <PaymentConfirmation
                orderData={orderResponse}
                snapToken={snapToken}
                onBack={handleBackFromPayment}
                productImage={product.image} // Mengirim gambar ke konfirmasi pembayaran
                onPaymentSuccess={(orderId) => {
                    console.log('Payment success for order:', orderId);
                }}
                onPaymentPending={(orderId) => {
                    console.log('Payment pending for order:', orderId);
                }}
            />
        );
    }

    const displayImage = selectedImage ? getImageUrl(selectedImage) : getImageUrl(product.image);
    const hasMultipleVariants = product.variants && product.variants.length > 1;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins">Detail Produk</h2>
                    <p className="text-sm text-gray-500 font-urbanist">Informasi lengkap produk pilihan Anda</p>
                </div>
            </div>

            {/* Product Detail Card */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    
                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-200">
                            <img
                                src={displayImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/500x500?text=No+Image';
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            <button
                                onClick={() => selectImage(product.image)}
                                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                    selectedImage === product.image ? 'border-primary ring-2 ring-primary/20' : 'border-gray-200'
                                }`}
                            >
                                <img src={getImageUrl(product.image)} className="w-full h-full object-cover" />
                            </button>
                        </div>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-semibold">
                            <Package className="w-4 h-4" /> {product.category}
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold text-gray-800 font-poppins mb-2">{product.name}</h1>
                            
                            {/* DYNAMIC RATING */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < Math.round(ratingInfo.average) 
                                                    ? 'fill-yellow-400 text-yellow-400' 
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500 font-urbanist">
                                    ({ratingInfo.average > 0 ? ratingInfo.average : '0.0'}) · {ratingInfo.count} ulasan
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <p className="text-sm text-gray-500 mb-1">Harga Produk</p>
                            <p className="text-4xl font-bold text-primary font-poppins">
                                {formatCurrency(variantPrice || product.price)}
                            </p>
                        </div>

                        {/* Description & Stock */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-600">
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                                <span className="text-sm font-urbanist">Stok tersedia: <strong>{product.stock} unit</strong></span>
                            </div>
                            <p className="text-gray-600 font-urbanist leading-relaxed">
                                {product.description || 'Tidak ada deskripsi produk.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={toggleOrderForm}
                                disabled={!product.is_active || product.stock === 0}
                                className="flex-1 px-6 py-3.5 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-50"
                            >
                                <ShoppingCart className="w-5 h-5" /> {showOrderForm ? 'Tutup Form' : 'Pesan Sekarang'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- ORDER FORM SECTION --- */}
                {showOrderForm && (
                    <div className="border-t border-gray-100 px-8 pb-8">
                        <OrderForm
                            product={product}
                            formData={formData}
                            isSubmitting={isSubmitting}
                            variantPrice={variantPrice}
                            totalPrice={totalPrice}
                            productImage={product.image} // MENGIRIM GAMBAR KE FORM
                            onSubmit={handleFormSubmit}
                            onUpdateForm={updateFormData}
                            onClose={toggleOrderForm}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}