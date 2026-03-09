// Category Donut Chart - SVG donut chart for product categories
import { PieChart } from 'lucide-react';

export interface CategoryData {
    name: string;
    count: number;
    percentage: number;
}

export interface CategoryDonutProps {
    categories: CategoryData[];
    totalProducts: number;
}

const colors = [
    { stroke: '#22C55E', bg: 'bg-green-500' },  // Ayam
    { stroke: '#3B82F6', bg: 'bg-blue-500' },   // Sapi
    { stroke: '#F59E0B', bg: 'bg-amber-500' },  // Kambing
    { stroke: '#8B5CF6', bg: 'bg-violet-500' }, // Domba
    { stroke: '#06B6D4', bg: 'bg-cyan-500' },   // Bebek
    { stroke: '#EC4899', bg: 'bg-pink-500' },   // Kelinci
];

export default function CategoryDonut({ categories, totalProducts }: CategoryDonutProps) {
    const circumference = 2 * Math.PI * 40; // radius = 40
    let offset = 0;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
                <PieChart className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-gray-800 font-poppins">Kategori Produk</h3>
            </div>

            <div className="flex items-center gap-4">
                {/* SVG Donut */}
                <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        {categories.map((cat, index) => {
                            const dashLength = (cat.percentage / 100) * circumference;
                            const currentOffset = offset;
                            offset += dashLength;

                            return (
                                <circle
                                    key={cat.name}
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    fill="none"
                                    stroke={colors[index % colors.length].stroke}
                                    strokeWidth="12"
                                    strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                                    strokeDashoffset={-currentOffset}
                                    className="transition-all duration-500"
                                />
                            );
                        })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-xl font-bold text-gray-800 font-poppins">{totalProducts}</p>
                            <p className="text-[10px] text-gray-500">Produk</p>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex-1 space-y-1.5">
                    {categories.map((cat, index) => (
                        <div key={cat.name} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${colors[index % colors.length].bg}`} />
                            <span className="text-sm text-gray-600 font-urbanist flex-1">{cat.name}</span>
                            <span className="text-sm font-semibold text-gray-800">{cat.count}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
