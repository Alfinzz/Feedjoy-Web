// Product Card Component - Display individual product in grid
import { Pencil, Trash2, ImageIcon } from 'lucide-react';
import type { Product } from '../../../domain/entities/Product';
import { formatCurrency } from '../../hooks/admin/useProductList';

export interface ProductCardProps {
    product: any; // Gunakan any jika interface Product belum diupdate ke snake_case
    onEdit: (product: any) => void;
    onDelete: (product: any) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
    // LOGIKA HARGA: 
    // Cari harga terendah dari varian. Jika tidak ada varian, pakai harga utama dari tabel produk.
    const hasVariants = product.variants && product.variants.length > 0;
    const minPrice = hasVariants
        ? Math.min(...product.variants.map((v: any) => Number(v.price)))
        : Number(product.price);

    return (
        <div className="border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer group bg-white">
            <div className="relative overflow-hidden rounded-lg mb-4">
                {product.image ? (
                    <img src={product.image} alt={product.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                    </div>
                )}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-700' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    Stok: {product.stock}
                </span>
            </div>

            <h4 className="font-semibold text-gray-800 font-poppins mb-1 truncate">{product.name}</h4>
            
            {/* PERBAIKAN: Gunakan short_description (snake_case dari Laravel) */}
            <p className="text-sm text-gray-500 font-urbanist mb-3 line-clamp-2">
                {product.short_description || product.shortDescription || "Tidak ada deskripsi"}
            </p>

            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-bold text-primary font-poppins">
                        {formatCurrency(minPrice)}
                    </p>
                    <p className="text-xs text-gray-400 font-urbanist">
                        {hasVariants ? 'mulai dari' : 'harga tetap'}
                    </p>
                </div>
                <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-500 font-urbanist">
                    {product.variants?.length || 0} varian
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold font-urbanist hover:bg-primary/90 transition-colors text-sm"
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete(product); }}
                    className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}