// Overview Stats Card - Stats card with gradient background
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface OverviewStatsCardProps {
    title: string;
    value: string;
    change?: string;
    icon: React.ElementType;
    trend?: 'up' | 'down' | 'neutral';
    gradient: string;
}

export default function OverviewStatsCard({ title, value, change, icon: Icon, trend = 'neutral', gradient }: OverviewStatsCardProps) {
    return (
        <div className={`relative overflow-hidden rounded-2xl p-6 ${gradient} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
                <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {change && (
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${trend === 'up' ? 'bg-white/20' : trend === 'down' ? 'bg-red-500/30' : 'bg-white/10'
                            }`}>
                            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                            {change}
                        </div>
                    )}
                </div>
                <h3 className="text-white/80 font-urbanist text-sm mb-1">{title}</h3>
                <p className="text-2xl font-bold font-poppins">{value}</p>
            </div>
        </div>
    );
}
