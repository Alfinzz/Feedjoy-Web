// Client Product Card Component
import { ShoppingCart, Package } from "lucide-react";
import { formatCurrency } from "../../utils";
import type { Product } from "../../../domain/entities/Product";

interface ClientProductCardProps {
    product: Product;
    onViewDetail: (id: number | string) => void;
    onOrder: (id: number | string) => void;
}

export default function ClientProductCard({
    product,
    onViewDetail,
    onOrder
}: ClientProductCardProps) {
    return (
        <div
            className="border border-gray-100 rounded-xl p-4 hover:border-primary/30 transition-all cursor-pointer group bg-white"
            onClick={() => onViewDetail(product.id)}
        >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Stock Badge */}
                <span className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-semibold ${product.stock > 10 ? 'bg-green-100 text-green-700' :
                    product.stock > 0 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                    }`}>
                    Stok: {product.stock}
                </span>
            </div>

            {/* Product Info */}
            <h4 className="font-semibold text-gray-800 font-poppins mb-1 truncate">{product.name}</h4>
            <p className="text-sm text-gray-500 font-urbanist mb-3 line-clamp-2">
                {product.shortDescription}
            </p>

            {/* Price & Variants */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <p className="text-lg font-bold text-primary font-poppins">
                        {formatCurrency(product.variants[0]?.price || product.price)}
                    </p>
                    <p className="text-xs text-gray-400 font-urbanist">mulai dari</p>
                </div>
                <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-500 font-urbanist">
                    {product.variants.length} varian
                </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(product.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg font-semibold font-urbanist hover:bg-gray-50 transition-colors text-sm"
                >
                    <Package className="w-4 h-4" />
                    Detail
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onOrder(product.id);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-semibold font-urbanist hover:bg-primary/90 transition-colors text-sm"
                >
                    <ShoppingCart className="w-4 h-4" />
                    Pesan
                </button>
            </div>
        </div>
    );
}
