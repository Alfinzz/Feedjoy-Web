// Stats Card Component - Display stats in card format
import React from 'react';

export interface StatsCardProps {
    icon: React.ElementType;
    label: string;
    value: number;
    color: string;
}

export default function StatsCard({ icon: Icon, label, value, color }: StatsCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-2xl font-bold text-gray-800 font-poppins">{value}</p>
                <p className="text-sm text-gray-500 font-urbanist">{label}</p>
            </div>
        </div>
    );
}
