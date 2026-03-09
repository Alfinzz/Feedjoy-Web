// Activity Item - Recent activity list item
import { ShoppingCart, Users, Star, MessageSquare, Clock } from 'lucide-react';
import type { ActivityType } from '../../hooks/admin/useOverview';

export interface ActivityItemProps {
    type: ActivityType;
    title: string;
    time: string;
    description?: string;
}

export default function ActivityItem({ type, title, time, description }: ActivityItemProps) {
    const getIcon = () => {
        switch (type) {
            case 'order': return <ShoppingCart className="w-4 h-4 text-blue-600" />;
            case 'user': return <Users className="w-4 h-4 text-green-600" />;
            case 'review': return <Star className="w-4 h-4 text-yellow-600" />;
            case 'consultation': return <MessageSquare className="w-4 h-4 text-purple-600" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'order': return 'bg-blue-50 border-blue-100';
            case 'user': return 'bg-green-50 border-green-100';
            case 'review': return 'bg-yellow-50 border-yellow-100';
            case 'consultation': return 'bg-purple-50 border-purple-100';
        }
    };

    return (
        <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
            <div className={`w-10 h-10 ${getBgColor()} rounded-xl flex items-center justify-center flex-shrink-0 border`}>
                {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 font-urbanist truncate">{title}</p>
                {description && (
                    <p className="text-xs text-gray-500 font-urbanist truncate">{description}</p>
                )}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 font-urbanist flex-shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {time}
            </div>
        </div>
    );
}
