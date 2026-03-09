// Register Form - Auth section component

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Phone, Eye, EyeOff, Loader2, AlertCircle, Shield, CheckCircle, XCircle, type LucideIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import {
    sanitizeEmail,
    sanitizeName,
    sanitizePhone,
    validateEmail,
    validatePassword,
    validateName,
    validatePhone,
    checkRateLimit,
    resetRateLimit,
    isHoneypotTriggered,
    randomDelay,
    calculatePasswordStrength,
    type PasswordStrength
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
                    autoComplete={type === "email" ? "email" : type === "password" ? "new-password" : "off"}
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

function PasswordStrengthIndicator({ strength }: { strength: PasswordStrength }) {
    return (
        <div className="space-y-2">
            <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                    <div key={level} className="h-1 flex-1 rounded-full transition-all" style={{ backgroundColor: level <= strength.score ? strength.color : '#e5e7eb' }} />
                ))}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs font-urbanist" style={{ color: strength.color }}>{strength.label}</span>
            </div>
        </div>
    );
}

function PasswordRequirements({ password }: { password: string }) {
    const requirements = [
        { label: 'Minimal 8 karakter', met: password.length >= 8 },
        { label: 'Huruf besar (A-Z)', met: /[A-Z]/.test(password) },
        { label: 'Huruf kecil (a-z)', met: /[a-z]/.test(password) },
        { label: 'Angka (0-9)', met: /[0-9]/.test(password) },
        { label: 'Karakter spesial', met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    ];
    return (
        <div className="space-y-1 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs font-semibold text-gray-600 font-urbanist mb-2">Persyaratan Password:</p>
            {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                    {req.met ? <CheckCircle className="w-3 h-3 text-green-500" /> : <XCircle className="w-3 h-3 text-gray-300" />}
                    <span className={`text-xs font-urbanist ${req.met ? 'text-green-600' : 'text-gray-400'}`}>{req.label}</span>
                </div>
            ))}
        </div>
    );
}

interface FieldErrors {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
}

export default function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [blockedFor, setBlockedFor] = useState<number | null>(null);
    const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>(calculatePasswordStrength(''));
    const [showPasswordReqs, setShowPasswordReqs] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (blockedFor && blockedFor > 0) {
            const timer = setInterval(() => setBlockedFor(prev => prev && prev > 1 ? prev - 1 : null), 1000);
            return () => clearInterval(timer);
        }
    }, [blockedFor]);

    const handlePasswordChange = (value: string) => {
        setPassword(value);
        setPasswordStrength(calculatePasswordStrength(value));
        setShowPasswordReqs(true);
        if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
    };

    const validateFields = (): boolean => {
        const errors: FieldErrors = {};
        const nameVal = validateName(name); if (!nameVal.isValid) errors.name = nameVal.message;
        const emailVal = validateEmail(email); if (!emailVal.isValid) errors.email = emailVal.message;
        const phoneVal = validatePhone(phone); if (!phoneVal.isValid) errors.phone = phoneVal.message;
        const passVal = validatePassword(password); if (!passVal.isValid) errors.password = passVal.message;
        if (password !== confirmPassword) errors.confirmPassword = "Password tidak cocok";
        if (!termsAccepted) errors.terms = "Anda harus menyetujui syarat dan ketentuan";
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

        const rateLimit = checkRateLimit('register', 3, 60000, 600000);
        if (!rateLimit.allowed) {
            setBlockedFor(rateLimit.blockedFor || 600);
            return;
        }

        if (!validateFields()) return;

        setIsLoading(true);
        try {
            await randomDelay();
            await register({ name, email, password, password_confirmation: confirmPassword, phone });
            resetRateLimit('register');

            // Redirect to login page with success message
            navigate('/auth/login', {
                replace: true,
                state: {
                    message: 'Registrasi berhasil! Silakan login dengan akun Anda.',
                    email: email // Pre-fill email di login form
                }
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : "Registrasi gagal.");
        } finally {
            setIsLoading(false);
        }
    };

    const isDisabled = blockedFor !== null && blockedFor > 0;

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <HoneypotField value={honeypot} onChange={setHoneypot} />
            {blockedFor && <RateLimitWarning blockedFor={blockedFor} />}
            {error && !blockedFor && <ErrorAlert message={error} />}

            <InputField icon={User} type="text" placeholder="Nama lengkap" value={name} onChange={(v) => { setName(sanitizeName(v)); if (fieldErrors.name) setFieldErrors(p => ({ ...p, name: undefined })); }} error={fieldErrors.name} maxLength={100} />
            <InputField icon={Mail} type="email" placeholder="Email address" value={email} onChange={(v) => { setEmail(sanitizeEmail(v)); if (fieldErrors.email) setFieldErrors(p => ({ ...p, email: undefined })); }} error={fieldErrors.email} maxLength={254} />
            <InputField icon={Phone} type="tel" placeholder="Nomor telepon" value={phone} onChange={(v) => { setPhone(sanitizePhone(v)); if (fieldErrors.phone) setFieldErrors(p => ({ ...p, phone: undefined })); }} error={fieldErrors.phone} maxLength={20} />

            <div className="space-y-2">
                <InputField icon={Lock} type="password" placeholder="Password" value={password} onChange={handlePasswordChange} showPasswordToggle error={fieldErrors.password} maxLength={128} />
                {password && <PasswordStrengthIndicator strength={passwordStrength} />}
                {showPasswordReqs && password && <PasswordRequirements password={password} />}
            </div>

            <InputField icon={Lock} type="password" placeholder="Konfirmasi password" value={confirmPassword} onChange={(v) => { setConfirmPassword(v); if (fieldErrors.confirmPassword) setFieldErrors(p => ({ ...p, confirmPassword: undefined })); }} showPasswordToggle error={fieldErrors.confirmPassword} maxLength={128} />

            <div className="space-y-1">
                <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => { setTermsAccepted(e.target.checked); if (fieldErrors.terms) setFieldErrors(p => ({ ...p, terms: undefined })); }} className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary" />
                    <span className="text-sm text-gray-600 font-urbanist">Saya setuju dengan <a href="#" className="text-primary hover:underline">Syarat & Ketentuan</a></span>
                </label>
                {fieldErrors.terms && <p className="text-xs text-red-500 font-urbanist pl-6">{fieldErrors.terms}</p>}
            </div>

            <button type="submit" disabled={isLoading || isDisabled} className="w-full py-4 btn-primary-gradient text-white text-base font-semibold rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 font-urbanist flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isLoading ? <><Loader2 className="w-5 h-5 animate-spin" />Memproses...</> : <>Daftar<ArrowRight className="w-5 h-5" /></>}
            </button>

            <p className="text-center text-gray-500 font-urbanist">
                Sudah punya akun?{" "}
                <Link to="/auth/login" replace className="text-primary font-semibold hover:underline">Masuk</Link>
            </p>
        </form>
    );
}
