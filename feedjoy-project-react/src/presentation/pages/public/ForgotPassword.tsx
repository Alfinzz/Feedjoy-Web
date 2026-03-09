// Forgot Password Page - Enhanced design

import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';

function Header() {
    return (
        <div className="mb-8">
            {/* Animated badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-teal-500/10 border border-primary/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-primary font-urbanist">
                    Reset Password
                </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-poppins mb-2">
                Lupa <span className="bg-gradient-to-r from-primary to-teal-500 bg-clip-text text-transparent">Password?</span>
            </h1>
            <p className="text-gray-500 font-urbanist">
                Masukkan email Anda untuk reset password
            </p>
        </div>
    );
}

export default function ForgotPassword() {
    return (
        <>
            <Header />
            <ForgotPasswordForm />
        </>
    );
}
