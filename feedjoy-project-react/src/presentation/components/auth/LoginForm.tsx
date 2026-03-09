// Login Form - Auth section component

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2, AlertCircle, Shield, type LucideIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getRedirectPath } from "../../utils/authHelpers";
import { mapErrorMessage } from "../../utils/errorMapper";
import {
    sanitizeEmail,
    validateEmail,
    checkRateLimit,
    resetRateLimit,
    isHoneypotTriggered,
    randomDelay
} from "../../utils";

interface InputFieldProps {
    icon: LucideIcon;
    type: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    showPasswordToggle?: boolean;
    error?: string;
    maxLength?: number;
}

function InputField({ icon: Icon, type, placeholder, value, onChange, showPasswordToggle, error, maxLength = 254 }: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-1">
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Icon className="w-5 h-5" />
                </div>
                <input
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    autoComplete={type === "email" ? "email" : type === "password" ? "current-password" : "off"}
                    className={`w-full pl-12 pr-12 py-4 bg-gray-50 border rounded-xl font-urbanist text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                        }`}
                />
                {showPasswordToggle && (
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500 font-urbanist pl-1">{error}</p>}
        </div>
    );
}

function HoneypotField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    return (
        <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
}

function ErrorAlert({ message }: { message: string }) {
    return (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-urbanist">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{message}</span>
        </div>
    );
}

function RateLimitWarning({ blockedFor }: { blockedFor: number }) {
    const minutes = Math.floor(blockedFor / 60);
    const seconds = blockedFor % 60;
    return (
        <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-xl text-orange-600 text-sm font-urbanist">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span>Terlalu banyak percobaan. Coba lagi dalam {minutes > 0 ? `${minutes} menit ` : ''}{seconds} detik.</span>
        </div>
    );
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [honeypot, setHoneypot] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
    const [blockedFor, setBlockedFor] = useState<number | null>(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (blockedFor && blockedFor > 0) {
            const timer = setInterval(() => setBlockedFor(prev => prev && prev > 1 ? prev - 1 : null), 1000);
            return () => clearInterval(timer);
        }
    }, [blockedFor]);

    const handleEmailChange = (value: string) => {
        setEmail(sanitizeEmail(value));
        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
    };

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
    };

    const validateFields = (): boolean => {
        const errors: { email?: string; password?: string } = {};
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) errors.email = emailValidation.message;
        if (!password) errors.password = 'Password wajib diisi';
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (isHoneypotTriggered(honeypot)) {
            await randomDelay(1000, 2000);
            setError("Terjadi kesalahan.");
            return;
        }

        const rateLimit = checkRateLimit('login', 5, 60000, 300000);
        if (!rateLimit.allowed) {
            setBlockedFor(rateLimit.blockedFor || 300);
            return;
        }

        if (!validateFields()) return;

        setIsLoading(true);
        try {
            await randomDelay();
            const user = await login(email, password);
            resetRateLimit('login');
            navigate(getRedirectPath(user.role));
        } catch (err) {
            // Capture and display error with professional message
            const rawError = err instanceof Error ? err.message : "Email atau password salah.";
            const errorMessage = mapErrorMessage(rawError);

            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = blockedFor !== null && blockedFor > 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <HoneypotField value={honeypot} onChange={setHoneypot} />
            {blockedFor && <RateLimitWarning blockedFor={blockedFor} />}
            {error && !blockedFor && <ErrorAlert message={error} />}

            <InputField icon={Mail} type="email" placeholder="Email address" value={email} onChange={handleEmailChange} error={fieldErrors.email} maxLength={254} />
            <InputField icon={Lock} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} showPasswordToggle error={fieldErrors.password} maxLength={128} />

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm text-gray-600 font-urbanist">Ingat saya</span>
                </label>
                <Link to="/auth/forgot-password" replace className="text-sm text-primary font-semibold hover:underline font-urbanist">Lupa password?</Link>
            </div>

            <button type="submit" disabled={isLoading || isDisabled} className="w-full py-4 btn-primary-gradient text-white text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-urbanist flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Memproses...</> : <>Masuk<ArrowRight className="w-5 h-5" /></>}
            </button>

            <p className="text-center text-gray-500 font-urbanist">
                Belum punya akun?{" "}
                <Link to="/auth/register" replace className="text-primary font-semibold hover:underline">Daftar sekarang</Link>
            </p>
        </form>
    );
}
