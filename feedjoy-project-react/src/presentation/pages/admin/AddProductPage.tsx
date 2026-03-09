// Add Product Page - Full page form for adding new products
import {
    Plus,
    Loader2,
    FileText,
    Image,
    Layers
} from 'lucide-react';
import { useAddProduct, categories } from '../../hooks/admin/useAddProduct';
import Toast from '../../components/commons/Toast';
import VariantCard from '../../components/admin/VariantCard';

export default function AddProductPage() {
    const {
        formData,
        priceInputs,
        isLoading,
        showToast,
        updateFormField,
        handleCategoryChange,
        handleVariantChange,
        handlePriceInputChange,
        addVariant,
        removeVariant,
        handleSubmit,
        handleCancel
    } = useAddProduct();

    return (
        <div className="space-y-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Informasi Produk - dalam border box */}
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 font-poppins">Informasi Produk</h3>
                    </div>
                    <div className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                Nama Produk <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => updateFormField('name', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist transition-colors"
                                placeholder="Contoh: FeedJoy Probiotik Ayam"
                            />
                        </div>

                        {/* Short Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                Deskripsi Singkat <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.shortDescription}
                                onChange={(e) => updateFormField('shortDescription', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist transition-colors"
                                placeholder="Deskripsi singkat produk..."
                            />
                        </div>

                        {/* Full Description */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                Deskripsi Lengkap <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.fullDescription}
                                onChange={(e) => updateFormField('fullDescription', e.target.value)}
                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist resize-none transition-colors"
                                placeholder="Deskripsi lengkap produk..."
                            />
                        </div>
                    </div>
                </div>

                {/* Section 2: Kategori & Gambar - dalam border box */}
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                            <Image className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 font-poppins">Kategori & Gambar</h3>
                    </div>
                    <div className="space-y-5">
                        {/* Category & Stock */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist transition-colors cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                    Stok <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    required
                                    min="0"
                                    value={formData.stock || ''}
                                    onChange={(e) => updateFormField('stock', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist transition-colors"
                                    placeholder="Jumlah stok"
                                />
                            </div>
                        </div>

                        {/* Image Preview */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                Gambar Produk
                            </label>
                            <p className="text-sm text-gray-500 font-urbanist mb-4">
                                1 Gambar Utama + 4 Gambar Pendukung (Auto-generated dari kategori)
                            </p>
                            {formData.image && (
                                <div className="flex gap-4 flex-wrap">
                                    {/* Thumbnail / Main Image */}
                                    <div className="relative">
                                        <img src={formData.image} alt="Main" className="w-28 h-28 object-cover rounded-xl border-2 border-primary" />
                                        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full font-semibold">Utama</span>
                                    </div>
                                    {/* Additional Images (4 images) */}
                                    {formData.additionalImages.slice(0, 4).map((img, i) => (
                                        <img key={i} src={img} alt={`Additional ${i + 1}`} className="w-28 h-28 object-cover rounded-xl border border-gray-200" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 3: Varian Produk - dalam border box */}
                <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                                <Layers className="w-5 h-5 text-purple-500" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 font-poppins">Varian Produk</h3>
                        </div>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="flex items-center gap-1 text-sm text-primary font-semibold font-urbanist hover:underline"
                        >
                            <Plus className="w-4 h-4" />
                            Tambah Varian
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {formData.variants.map((variant, index) => (
                            <VariantCard
                                key={index}
                                variant={variant}
                                index={index}
                                priceInput={priceInputs[index] || ''}
                                onVariantChange={handleVariantChange}
                                onPriceInputChange={handlePriceInputChange}
                                onRemove={removeVariant}
                                canRemove={formData.variants.length > 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Form Footer */}
                <div className="flex justify-end gap-4 pt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-8 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Menyimpan...
                            </>
                        ) : (
                            <>
                                <Plus className="w-5 h-5" />
                                Tambah Produk
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Toast */}
            <Toast message="Produk berhasil ditambahkan!" isVisible={showToast} />
        </div>
    );
}
