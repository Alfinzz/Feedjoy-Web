// Client Delete Modal Component - Reusable confirmation modal
import { Trash2 } from 'lucide-react';

export interface ClientDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    icon?: React.ReactNode;
}

export default function ClientDeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = 'Hapus?',
    message = 'Yakin ingin melanjutkan?',
    icon
}: ClientDeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {icon || <Trash2 className="w-8 h-8 text-red-600" />}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">{title}</h3>
                    <p className="text-gray-500 font-urbanist mb-6">{message}</p>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold font-urbanist hover:bg-red-700"
                        >
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
