// Delete Account Page - Admin account deletion with confirmation
import { Trash2, AlertTriangle, Key, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useDeleteAccount } from '../../hooks/admin/useDeleteAccount';
import ConfirmationModal from '../../components/commons/ConfirmationModal';

export default function DeleteAccountPage() {
    const {
        step,
        password,
        setPassword,
        showPassword,
        confirmText,
        setConfirmText,
        error,
        showConfirmModal,
        isLoading,
        isProcessing,
        handleContinue,
        handleConfirmDelete,
        toggleShowPassword,
        handleBack,
        closeConfirmModal
    } = useDeleteAccount();

    return (
        <div className="space-y-6">
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Hapus Akun Permanen?"
                message="Akun Anda akan dihapus secara permanen beserta semua datanya. Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin?"
                onConfirm={handleConfirmDelete}
                onCancel={closeConfirmModal}
                type="danger"
                confirmLabel="Ya, Hapus Akun"
                cancelLabel="Batal"
                isLoading={isLoading}
            />

            {/* Warning Card */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-red-800 font-poppins mb-2">Peringatan!</h3>
                        <p className="text-sm text-red-700 font-urbanist leading-relaxed">
                            Menghapus akun adalah tindakan permanen dan tidak dapat dibatalkan.
                            Semua data Anda termasuk produk, pesanan, dan pengaturan akan dihapus secara permanen.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Card */}
            <div className="border border-gray-200 rounded-xl p-6">
                {/* Step Indicator */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        1
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className={`h-full bg-red-500 rounded-full transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                        2
                    </div>
                </div>

                {step === 1 ? (
                    /* Step 1: Password Verification */
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
                                        onClick={toggleShowPassword}
                                        className="absolute right-4 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                            {error && <p className="mt-1 text-sm text-red-500 font-urbanist">{error}</p>}
                        </div>
                    </div>
                ) : (
                    /* Step 2: Confirmation */
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
                            {error && <p className="mt-1 text-sm text-red-500 font-urbanist">{error}</p>}
                        </div>
                    </div>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                    >
                        {step === 1 ? 'Batal' : 'Kembali'}
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isProcessing}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold font-urbanist hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-5 h-5" />
                                {step === 1 ? 'Lanjutkan' : 'Hapus Akun'}
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
