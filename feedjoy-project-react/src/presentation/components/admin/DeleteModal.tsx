// Delete Modal - Confirmation before deleting product
import { Trash2 } from 'lucide-react';

export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, productName }: DeleteModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 font-poppins mb-2">Hapus Produk?</h3>
                    <p className="text-gray-500 font-urbanist mb-6">
                        Anda yakin ingin menghapus <strong>"{productName}"</strong>? Tindakan ini tidak dapat dibatalkan.
                    </p>
                    <div className="flex gap-3">
                        <button onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50">
                            Batal
                        </button>
                        <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-semibold font-urbanist hover:bg-red-700">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
