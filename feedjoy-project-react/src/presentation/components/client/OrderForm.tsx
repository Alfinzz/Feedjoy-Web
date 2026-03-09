// src/presentation/components/client/OrderForm.tsx
import { Ticket, ShoppingCart, X, Loader2, MapPin, FileText, CreditCard, ShieldCheck, Package, Layers } from "lucide-react";
import { getImageUrl, formatCurrency } from "../../utils";
import type { OrderFormData } from "../../hooks/client/useProductDetail";

interface OrderFormProps {
    product: any;
    formData: OrderFormData;
    isSubmitting: boolean;
    variantPrice: number;
    totalPrice: number;
    productImage?: string;
    onSubmit: (e: React.FormEvent) => void;
    onUpdateForm: (updates: Partial<OrderFormData>) => void;
    onClose: () => void;
}

export default function OrderForm({
    product,
    formData,
    isSubmitting,
    variantPrice,
    totalPrice,
    productImage,
    onSubmit,
    onUpdateForm,
    onClose
}: OrderFormProps) {
    const hasMultipleVariants = product.variants && product.variants.length > 1;

    return (
        <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-bold text-gray-800 font-poppins">Buat Pesanan</h3>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
                {/* Row 1: Name, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Nama Lengkap</label>
                        <input
                            type="text"
                            required
                            value={formData.fullName}
                            onChange={(e) => onUpdateForm({ fullName: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist bg-white"
                            placeholder="Masukkan nama lengkap"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => onUpdateForm({ email: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist bg-white"
                            placeholder="email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">No. HP</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => onUpdateForm({ phone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist bg-white"
                            placeholder="081234567890"
                        />
                    </div>
                </div>

                {/* Row 2: Quantity & Payment Method */}
                <div className={`grid grid-cols-1 ${hasMultipleVariants ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
                    {hasMultipleVariants && (
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                <Layers className="w-4 h-4 text-gray-500" />
                                Pilih Varian
                            </label>
                            <select
                                value={formData.variant}
                                onChange={(e) => onUpdateForm({ variant: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist bg-white cursor-pointer"
                            >
                                {product.variants.map((v: any, index: number) => (
                                    <option key={index} value={v.size}>
                                        {v.size} - {formatCurrency(v.price)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Jumlah Item</label>
                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            required
                            value={formData.quantity}
                            onChange={(e) => onUpdateForm({ quantity: parseInt(e.target.value) || 1 })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist bg-white"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            Metode Pembayaran
                        </label>
                        <div className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 text-gray-600 font-urbanist flex items-center justify-between">
                            <span className="text-sm">Pembayaran Virtual</span>
                            <ShieldCheck className="w-4 h-4 text-green-500" />
                        </div>
                    </div>
                </div>

                {/* Row 3: Address & Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            Alamat Pengiriman
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.address}
                            onChange={(e) => onUpdateForm({ address: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist resize-none bg-white"
                            placeholder="Masukkan alamat lengkap pengiriman"
                        />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            <FileText className="w-4 h-4 text-gray-500" />
                            Catatan Pesanan (Opsional)
                        </label>
                        <textarea
                            rows={4}
                            value={formData.notes}
                            onChange={(e) => onUpdateForm({ notes: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist resize-none bg-white"
                            placeholder="Contoh: Tolong packing rapi."
                        />
                    </div>
                </div>

                {/* RINGKASAN PESANAN */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
                        <h4 className="font-bold text-gray-800 font-poppins text-sm">Ringkasan Pesanan</h4>
                    </div>
                    <div className="bg-white p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {(productImage || product.image) ? (
                                    <img 
                                        src={getImageUrl(productImage || product.image)} 
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
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 font-poppins text-sm mb-1 truncate">{product.name}</p>
                                <p className="text-xs text-gray-500 font-urbanist">Varian: {formData.variant}</p>
                                <p className="text-xs font-bold text-primary font-poppins mt-1">
                                    {formatCurrency(variantPrice)} × {formData.quantity}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-primary font-poppins">{formatCurrency(totalPrice)}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-start">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-bold font-urbanist hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-primary/20"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <CreditCard className="w-5 h-5" />
                                Lanjut ke Pembayaran
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}