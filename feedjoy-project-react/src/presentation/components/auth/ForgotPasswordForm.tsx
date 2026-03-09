// Forgot Password Form - Auth section component

import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { ForgotPasswordUseCase } from "../../../domain/usecases/auth/ForgotPasswordUseCase";
import { authRepository } from "../../../data/repositories/AuthRepositoryImpl";
import { sanitizeEmail, validateEmail } from "../../utils/security";

function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-urbanist">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
}

function SuccessMessage({ email, resetToken }: { email: string; resetToken?: string }) {
    return (
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 font-poppins">Email Terkirim!</h3>
            <p className="text-gray-500 font-urbanist">
                Kami telah mengirimkan link reset password ke <strong>{email}</strong>.
            </p>

            {/* Show reset token in development */}
            {resetToken && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left">
                    <p className="text-xs text-amber-800 font-semibold font-urbanist mb-2">
                        🔧 Development Mode - Reset Token:
                    </p>
                    <code className="text-xs bg-white px-2 py-1 rounded border border-amber-300 font-mono break-all block">
                        {resetToken}
                    </code>
                    <p className="text-xs text-amber-600 font-urbanist mt-2">
                        Copy token ini dan gunakan di halaman reset password
                    </p>
                </div>
            )}

            <Link
                to="/auth/login"
                replace
                className="text-primary font-semibold hover:underline font-urbanist flex items-center gap-2 mx-auto justify-center"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke login
            </Link>
        </div>
    );
}

export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [resetToken, setResetToken] = useState<string | undefined>();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setError(emailValidation.message || null);
            return;
        }

        setIsLoading(true);
        try {
            const useCase = new ForgotPasswordUseCase(authRepository);
            const result = await useCase.execute({ email });

            setResetToken(result.resetToken);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return <SuccessMessage email={email} resetToken={resetToken} />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <p className="text-gray-500 font-urbanist text-center">
                Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
            </p>

            {error && <ErrorAlert message={error} />}

            {/* Email Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                        setEmail(sanitizeEmail(e.target.value));
                        setError(null);
                    }}
                    maxLength={254}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 btn-primary-gradient text-white text-base font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 font-urbanist flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mengirim...
                    </>
                ) : (
                    'Kirim Link Reset'
                )}
            </button>

            <Link
                to="/auth/login"
                replace
                className="w-full text-center text-gray-500 hover:text-primary font-urbanist flex items-center justify-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke login
            </Link>
        </form>
    );
}
