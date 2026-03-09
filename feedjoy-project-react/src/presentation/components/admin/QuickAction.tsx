// Quick Action Card - Action button with icon and badge
import { ArrowRight } from 'lucide-react';

export interface QuickActionProps {
    title: string;
    description: string;
    icon: React.ElementType;
    onClick: () => void;
    color: string;
    badge?: number;
}

export default function QuickAction({ title, description, icon: Icon, onClick, color, badge }: QuickActionProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all duration-300 text-left w-full group"
        >
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center flex-shrink-0 relative`}>
                <Icon className="w-6 h-6 text-white" />
                {badge !== undefined && badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {badge > 9 ? '9+' : badge}
                    </span>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 font-poppins text-sm">{title}</h4>
                <p className="text-xs text-gray-500 font-urbanist truncate">{description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </button>
    );
}
