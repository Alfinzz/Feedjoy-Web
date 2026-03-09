// Login Modal - Modal popup with LoginForm
import { useEffect } from "react";
import { X } from "lucide-react";
import LoginForm from "../auth/LoginForm";
import { useAuth } from "../../context/AuthContext";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { isAuthenticated } = useAuth();

    // Auto-close modal when user becomes authenticated
    useEffect(() => {
        if (isAuthenticated && isOpen) {
            onClose();
        }
    }, [isAuthenticated, isOpen, onClose]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in fade-in zoom-in duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-2">
                        Masuk ke Akun
                    </h2>
                    <p className="text-gray-500 font-urbanist">
                        Silakan login untuk mengakses halaman ini
                    </p>
                </div>

                {/* Login Form */}
                <LoginForm />
            </div>
        </div>
    );
}
