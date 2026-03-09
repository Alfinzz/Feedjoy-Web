// Sales Chart - Bar chart for weekly sales
import { BarChart3, TrendingUp } from 'lucide-react';

export default function SalesChart() {
    const data = [
        { day: 'Sen', value: 65, orders: 3 },
        { day: 'Sel', value: 45, orders: 2 },
        { day: 'Rab', value: 80, orders: 4 },
        { day: 'Kam', value: 55, orders: 2 },
        { day: 'Jum', value: 90, orders: 5 },
        { day: 'Sab', value: 100, orders: 6 },
        { day: 'Min', value: 70, orders: 3 },
    ];

    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-gray-800 font-poppins flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Penjualan Minggu Ini
                    </h3>
                    <p className="text-sm text-gray-500 font-urbanist">Total 25 pesanan</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    +18%
                </div>
            </div>

            <div className="flex items-end gap-3 h-48">
                {data.map((item, index) => (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600">{item.orders}</span>
                        <div
                            className={`w-full rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer ${index === 5 ? 'bg-gradient-to-t from-primary to-teal-400' : 'bg-gradient-to-t from-gray-200 to-gray-100'
                                }`}
                            style={{ height: `${(item.value / maxValue) * 100}%` }}
                            title={`${item.day}: ${item.orders} pesanan`}
                        />
                        <span className="text-xs text-gray-500 font-urbanist">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
