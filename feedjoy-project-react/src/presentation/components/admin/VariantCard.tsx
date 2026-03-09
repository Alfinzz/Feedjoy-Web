// VariantCard Component - Product variant input card
import { Trash2 } from 'lucide-react';
import type { ProductVariant } from '../../../domain/entities/Product';

export interface VariantCardProps {
    variant: ProductVariant;
    index: number;
    priceInput: string;
    onVariantChange: (index: number, field: keyof ProductVariant, value: string | number) => void;
    onPriceInputChange: (index: number, value: string) => void;
    onRemove: (index: number) => void;
    canRemove: boolean;
}

export default function VariantCard({
    variant,
    index,
    priceInput,
    onVariantChange,
    onPriceInputChange,
    onRemove,
    canRemove
}: VariantCardProps) {
    return (
        <div className="p-5 bg-gray-50/50 rounded-xl space-y-4 border border-gray-100">
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700 font-poppins">
                    Varian {index + 1}
                </span>
                {canRemove && (
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                )}
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="block text-xs text-gray-500 font-urbanist mb-1">Ukuran</label>
                    <input
                        type="text"
                        required
                        value={variant.size}
                        onChange={(e) => onVariantChange(index, 'size', e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm transition-colors"
                        placeholder="500 gram"
                    />
                </div>
                <div>
                    <label className="block text-xs text-gray-500 font-urbanist mb-1">Harga</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-urbanist text-sm font-semibold">Rp</span>
                        <input
                            type="text"
                            required
                            value={priceInput}
                            onChange={(e) => onPriceInputChange(index, e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm transition-colors"
                            placeholder="150.000"
                        />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-xs text-gray-500 font-urbanist mb-1">Cara Penggunaan</label>
                <textarea
                    required
                    rows={2}
                    value={variant.usage}
                    onChange={(e) => onVariantChange(index, 'usage', e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm transition-colors resize-none"
                    placeholder="Campurkan dengan pakan ternak..."
                />
            </div>
        </div>
    );
}
