import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Lock, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";
import { ResetPasswordUseCase } from "../../../domain/usecases/auth/ResetPasswordUseCase";
import { authRepository } from "../../../data/repositories/AuthRepositoryImpl";

function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-urbanist">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
}

function SuccessMessage() {
    return (
        <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 font-poppins">Password Berhasil Direset!</h3>
            <p className="text-gray-500 font-urbanist">
                Password Anda telah berhasil diubah. Silakan login dengan password baru Anda.
            </p>
            <Link
                to="/auth/login"
                replace
                className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
            >
                Login Sekarang
            </Link>
        </div>
    );
}

export default function ResetPasswordForm() {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState("");
    const [token, setToken] = useState(searchParams.get('token') || "");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!email) {
            setError("Email harus diisi");
            return;
        }

        if (!token) {
            setError("Token reset diperlukan");
            return;
        }

        if (!password) {
            setError("Password harus diisi");
            return;
        }

        if (!passwordConfirmation) {
            setError("Konfirmasi password harus diisi");
            return;
        }

        setIsLoading(true);
        try {
            const useCase = new ResetPasswordUseCase(authRepository);
            await useCase.execute({
                email,
                token,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return <SuccessMessage />;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <p className="text-gray-500 font-urbanist text-center">
                Masukkan password baru Anda untuk reset akun.
            </p>

            {error && <ErrorAlert message={error} />}

            {/* Email Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError(null);
                    }}
                    maxLength={254}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
            </div>

            {/* Reset Token Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type="text"
                    placeholder="Reset Token"
                    value={token}
                    onChange={(e) => {
                        setToken(e.target.value);
                        setError(null);
                    }}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
            </div>

            {/* Password Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password baru"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError(null);
                    }}
                    maxLength={128}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            {/* Password Confirmation Input */}
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-5 h-5" />
                </div>
                <input
                    type={showPasswordConfirmation ? "text" : "password"}
                    placeholder="Konfirmasi password baru"
                    value={passwordConfirmation}
                    onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                        setError(null);
                    }}
                    maxLength={128}
                    disabled={isLoading}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
                <button
                    type="button"
                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                >
                    {showPasswordConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                <p className="text-xs text-blue-800 font-urbanist">
                    Password harus minimal 8 karakter
                </p>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 btn-primary-gradient text-white text-base font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 font-urbanist flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Mereset Password...
                    </>
                ) : (
                    'Reset Password'
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
