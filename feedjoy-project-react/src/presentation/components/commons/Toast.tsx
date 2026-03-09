// Toast Component - Reusable notification toast
import { Check, X, AlertTriangle, Info } from 'lucide-react';

export interface ToastProps {
    message: string;
    isVisible: boolean;
    variant?: 'success' | 'error' | 'warning' | 'info';
}

const variantStyles = {
    success: {
        bg: 'bg-green-500',
        icon: Check
    },
    error: {
        bg: 'bg-red-500',
        icon: X
    },
    warning: {
        bg: 'bg-amber-500',
        icon: AlertTriangle
    },
    info: {
        bg: 'bg-blue-500',
        icon: Info
    }
};

export default function Toast({ message, isVisible, variant = 'success' }: ToastProps) {
    if (!isVisible) return null;

    const { bg, icon: Icon } = variantStyles[variant];

    return (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-lg ${bg} text-white transition-all duration-300`}>
            <Icon className="w-5 h-5" />
            <span className="font-urbanist font-medium">{message}</span>
        </div>
    );
}
