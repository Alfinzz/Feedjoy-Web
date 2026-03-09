import { AlertTriangle, Check } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onConfirm,
    onCancel,
    title,
    message,
    confirmLabel = 'Ya, Konfirmasi',
    cancelLabel = 'Batal',
    type = 'warning',
    isLoading = false
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'danger':
                return <AlertTriangle className="w-6 h-6 text-red-600" />;
            case 'warning':
                return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
            case 'info':
                return <Check className="w-6 h-6 text-primary" />;
        }
    };

    const getBgColor = () => {
        switch (type) {
            case 'danger':
                return 'bg-red-50';
            case 'warning':
                return 'bg-yellow-50';
            case 'info':
                return 'bg-primary/10';
        }
    };

    const getButtonColor = () => {
        switch (type) {
            case 'danger':
                return 'bg-red-500 hover:bg-red-600';
            case 'warning':
                return 'bg-yellow-500 hover:bg-yellow-600';
            case 'info':
                return 'bg-primary hover:bg-primary/90';
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-up overflow-hidden">
                <div className="p-6 text-center">
                    <div className={`w-16 h-16 ${getBgColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        {getIcon()}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">
                        {title}
                    </h3>
                    <p className="text-gray-500 font-urbanist mb-6">
                        {message}
                    </p>

                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold font-urbanist hover:bg-gray-200 transition-colors disabled:opacity-50"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-4 py-2.5 text-white rounded-xl font-semibold font-urbanist transition-colors flex items-center justify-center gap-2 disabled:opacity-50 ${getButtonColor()}`}
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                confirmLabel
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
