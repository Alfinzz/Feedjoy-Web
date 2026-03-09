// Edit Product Modal - Form modal for editing products
import { useState, useEffect } from 'react';
import { X, Loader2, Trash2 } from 'lucide-react';
import type { Product, ProductVariant } from '../../../domain/entities/Product';
import { formatPriceInput, parsePrice, generateDummyImages, categories } from '../../hooks/admin/useProductList';

export interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onSave: (product: Omit<Product, 'id'>) => void;
}

export default function EditProductModal({ isOpen, onClose, product, onSave }: EditProductModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        shortDescription: '',
        fullDescription: '',
        price: 0,
        image: '',
        additionalImages: [] as string[],
        stock: 0,
        category: 'Ayam',
        variants: [{ size: '', price: 0, usage: '' }] as ProductVariant[]
    });
    const [priceInputs, setPriceInputs] = useState<string[]>(['']);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData({
                name: product.name,
                shortDescription: product.short_description || '',
                fullDescription: product.description || '',
                price: product.price,
                image: product.image,
                additionalImages: product.additionalImages || [],
                stock: product.stock || 0,
                category: product.category,
                variants: product.variants.length > 0 ? product.variants : [{ size: '', price: 0, usage: '' }]
            });
            setPriceInputs(product.variants.map(v => formatPriceInput(v.price)));
        }
    }, [product]);

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string | number) => {
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData({ ...formData, variants: newVariants });
    };

    const handlePriceInputChange = (index: number, value: string) => {
        const newPriceInputs = [...priceInputs];
        newPriceInputs[index] = value;
        setPriceInputs(newPriceInputs);
        handleVariantChange(index, 'price', parsePrice(value));
    };

    const addVariant = () => {
        setFormData({ ...formData, variants: [...formData.variants, { size: '', price: 0, usage: '' }] });
        setPriceInputs([...priceInputs, '']);
    };

    const removeVariant = (index: number) => {
        if (formData.variants.length > 1) {
            setFormData({ ...formData, variants: formData.variants.filter((_, i) => i !== index) });
            setPriceInputs(priceInputs.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        onSave(formData);
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 font-poppins">Edit Produk</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Nama Produk *</label>
                            <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Kategori *</label>
                                <select value={formData.category} onChange={(e) => {
                                    const newCategory = e.target.value;
                                    const images = generateDummyImages(newCategory);
                                    setFormData({ ...formData, category: newCategory, image: images.main, additionalImages: images.additional });
                                }} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist bg-white">
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Stok *</label>
                                <input type="number" required min="0" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Deskripsi Singkat *</label>
                            <input type="text" required value={formData.shortDescription} onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Deskripsi Lengkap *</label>
                            <textarea required rows={3} value={formData.fullDescription} onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary font-urbanist resize-none" />
                        </div>

                        {formData.image && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">Gambar Produk</label>
                                <div className="flex gap-2">
                                    <img src={formData.image} alt="Main" className="w-20 h-20 object-cover rounded-lg border-2 border-primary" />
                                    {formData.additionalImages.map((img, i) => (
                                        <img key={i} src={img} alt={`Additional ${i + 1}`} className="w-20 h-20 object-cover rounded-lg border opacity-70" />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="block text-sm font-semibold text-gray-700 font-urbanist">Varian Produk *</label>
                                <button type="button" onClick={addVariant} className="text-sm text-primary font-semibold font-urbanist hover:underline">+ Tambah</button>
                            </div>
                            <div className="space-y-3">
                                {formData.variants.map((variant, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-xl space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold text-gray-600 font-urbanist">Varian {index + 1}</span>
                                            {formData.variants.length > 1 && (
                                                <button type="button" onClick={() => removeVariant(index)} className="text-red-500 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input type="text" required value={variant.size} onChange={(e) => handleVariantChange(index, 'size', e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-urbanist text-sm" placeholder="Ukuran" />
                                            <div className="relative">
                                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-urbanist text-sm">Rp</span>
                                                <input type="text" required value={priceInputs[index] || ''} onChange={(e) => handlePriceInputChange(index, e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-urbanist text-sm" placeholder="Harga" />
                                            </div>
                                        </div>
                                        <input type="text" required value={variant.usage} onChange={(e) => handleVariantChange(index, 'usage', e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary font-urbanist text-sm" placeholder="Cara penggunaan" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50">Batal</button>
                        <button type="submit" disabled={isLoading} className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 disabled:opacity-70 flex items-center justify-center gap-2">
                            {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Menyimpan...</> : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
