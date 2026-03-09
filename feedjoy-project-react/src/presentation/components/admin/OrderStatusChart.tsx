// Order Status Chart - Horizontal stacked bar chart for order statuses
export interface OrderStatus {
    key: string;
    label: string;
    color: string;
    count: number;
}

export interface OrderStatusChartProps {
    statuses: OrderStatus[];
    total: number;
}

export default function OrderStatusChart({ statuses, total }: OrderStatusChartProps) {
    const displayTotal = total || 1;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800 font-poppins">Status Pesanan</h3>
                <span className="text-sm text-gray-500 font-urbanist">{total} total</span>
            </div>

            {/* Stacked Bar */}
            <div className="h-8 rounded-full overflow-hidden flex mb-4 bg-gray-100">
                {statuses.map((status) => (
                    status.count > 0 && (
                        <div
                            key={status.key}
                            className={`${status.color} h-full transition-all duration-500`}
                            style={{ width: `${(status.count / displayTotal) * 100}%` }}
                            title={`${status.label}: ${status.count}`}
                        />
                    )
                ))}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-3 gap-3">
                {statuses.filter(s => s.count > 0 || ['pending', 'completed'].includes(s.key)).map((status) => (
                    <div key={status.key} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${status.color}`} />
                        <span className="text-xs text-gray-600 font-urbanist">{status.label}</span>
                        <span className="text-xs font-bold text-gray-800 ml-auto">{status.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
