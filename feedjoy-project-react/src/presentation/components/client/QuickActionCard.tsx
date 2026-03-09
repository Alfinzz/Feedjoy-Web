// Client Quick Action Card Component
import { ChevronRight } from "lucide-react";

interface QuickActionCardProps {
    title: string;
    description: string;
    icon: any;
    iconBg: string;
    iconColor: string;
    onClick: () => void;
}

export default function QuickActionCard({
    title,
    description,
    icon: Icon,
    iconBg,
    iconColor,
    onClick
}: QuickActionCardProps) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        >
            <div className={`w-10 h-10 ${iconBg} rounded-lg flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div className="flex-1">
                <p className="font-semibold text-gray-800 font-urbanist">{title}</p>
                <p className="text-sm text-gray-500 font-urbanist">{description}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
    );
}
