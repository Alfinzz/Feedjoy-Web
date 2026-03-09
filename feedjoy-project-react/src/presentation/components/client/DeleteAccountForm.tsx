// Client Delete Account Form Component
import { Trash2, AlertTriangle, Key, Eye, EyeOff } from "lucide-react";

interface DeleteAccountFormProps {
    step: number;
    password: string;
    setPassword: (v: string) => void;
    showPassword: boolean;
    setShowPassword: (v: boolean) => void;
    confirmText: string;
    setConfirmText: (v: string) => void;
    error: string;
}

export default function DeleteAccountForm({
    step,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    confirmText,
    setConfirmText,
    error
}: DeleteAccountFormProps) {
    if (step === 1) {
        return (
            <div className="space-y-5">
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Verifikasi Password</h3>
                    <p className="text-sm text-gray-500 font-urbanist mt-1">
                        Masukkan password Anda untuk melanjutkan
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                        Password
                    </label>
                    <div className={`border rounded-xl overflow-hidden ${error ? 'border-red-300' : 'border-gray-200'}`}>
                        <div className="relative flex items-center bg-gray-50/50">
                            <Key className="absolute left-4 w-5 h-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password Anda"
                                className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <p className="mt-1 text-sm text-red-500 font-urbanist">{error}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 font-poppins">Konfirmasi Penghapusan</h3>
                <p className="text-sm text-gray-500 font-urbanist mt-1">
                    Ketik <span className="font-bold text-red-600">HAPUS AKUN SAYA</span> untuk mengkonfirmasi
                </p>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                    Teks Konfirmasi
                </label>
                <div className={`border rounded-xl overflow-hidden ${error ? 'border-red-300' : 'border-gray-200'}`}>
                    <div className="relative flex items-center bg-gray-50/50">
                        <input
                            type="text"
                            value={confirmText}
                            onChange={(e) => setConfirmText(e.target.value)}
                            placeholder="Ketik: HAPUS AKUN SAYA"
                            className="w-full px-4 py-3 bg-transparent focus:outline-none font-urbanist"
                        />
                    </div>
                </div>
                {error && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{error}</p>
                )}
            </div>
        </div>
    );
}
