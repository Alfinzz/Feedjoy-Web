// Logout Confirmation Modal - Reusable confirmation dialog
// Provides user confirmation before logout action

import { LogOut, X } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export default function LogoutModal({ isOpen, onConfirm, onCancel, isLoading = false, error = null }: LogoutModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 pointer-events-auto transform transition-all"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onCancel}
                        className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Icon */}
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <LogOut className="w-8 h-8 text-red-500" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins text-center mb-2">
                        Konfirmasi Logout
                    </h2>

                    {/* Message */}
                    <p className="text-gray-600 font-urbanist text-center mb-6">
                        Apakah Anda yakin ingin keluar dari akun Anda? Anda perlu login kembali untuk mengakses dashboard.
                    </p>

                    {/* Error Display */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">!</span>
                            </div>
                            <p className="text-sm text-red-600 font-urbanist flex-1">{error}</p>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Batal
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold font-urbanist hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Logout...
                                </>
                            ) : (
                                <>
                                    <LogOut className="w-5 h-5" />
                                    Ya, Logout
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
