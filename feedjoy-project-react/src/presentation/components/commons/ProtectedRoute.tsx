// Protected Route - Shows login modal if not authenticated, checks role authorization
import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { hasRequiredRole, getUnauthorizedMessage } from "../../utils/authHelpers";
import type { UserRole } from "../../../domain/entities/User";
import LoginModal from "./LoginModal";
import { ShieldAlert, Home } from "lucide-react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRoles?: UserRole[]; // Optional: specify which roles can access this route
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, isLoggingOut, user } = useAuth();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();

    // Sync modal state with authentication state
    // Don't show modal if user is logging out (prevents flash during logout)
    useEffect(() => {
        setShowLoginModal(!isAuthenticated && !isLoggingOut);
    }, [isAuthenticated, isLoggingOut]);

    // Show loading state (including during logout to prevent flash of "Akses Ditolak")
    if (isLoading || isLoggingOut) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-urbanist">
                        {isLoggingOut ? 'Logging out...' : 'Memuat...'}
                    </p>
                </div>
            </div>
        );
    }

    // Show login modal if not authenticated
    if (!isAuthenticated) {
        return (
            <>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-2">
                            Akses Terbatas
                        </h2>
                        <p className="text-gray-500 font-urbanist mb-4">
                            Silakan login untuk mengakses halaman ini
                        </p>
                        <button
                            onClick={() => setShowLoginModal(true)}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
                        >
                            Login Sekarang
                        </button>
                    </div>
                </div>
                <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                />
            </>
        );
    }

    // User is authenticated, check role authorization
    if (user && !hasRequiredRole(user.role, allowedRoles)) {
        const message = getUnauthorizedMessage(allowedRoles);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-red-100">
                        {/* Icon */}
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldAlert className="w-10 h-10 text-red-500" />
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-gray-800 font-poppins mb-3">
                            Akses Ditolak
                        </h2>

                        {/* Message */}
                        <p className="text-gray-600 font-urbanist mb-6">
                            {message}
                        </p>

                        {/* Role badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
                            <span className="text-sm text-gray-600 font-urbanist">
                                Role Anda:
                            </span>
                            <span className="text-sm font-semibold text-primary font-urbanist capitalize">
                                {user.role}
                            </span>
                        </div>

                        {/* Action button */}
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                        >
                            <Home className="w-5 h-5" />
                            Kembali
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // User is authenticated and has required role, render children
    return <>{children}</>;
}
