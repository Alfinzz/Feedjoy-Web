// User Delete Account Page - Account deletion with logic separated into custom hook
import { Trash2, AlertTriangle, Loader2 } from 'lucide-react';
import { useDeleteAccount } from '../../hooks/client/useDeleteAccount';
import ConfirmationModal from '../../components/commons/ConfirmationModal';
import DeleteAccountForm from '../../components/client/DeleteAccountForm';

export default function UserDeleteAccountPage() {
    const {
        step,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        confirmText,
        setConfirmText,
        error,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isProcessing,
        handleContinue,
        handleConfirmDelete,
        handleBack
    } = useDeleteAccount();

    return (
        <>
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Hapus Akun Permanen?"
                message="Akun Anda akan dihapus secara permanen beserta semua datanya. Tindakan ini tidak dapat dibatalkan. Apakah Anda yakin?"
                onConfirm={handleConfirmDelete}
                onCancel={() => setShowConfirmModal(false)}
                type="danger"
                confirmLabel="Ya, Hapus Akun"
                cancelLabel="Batal"
                isLoading={isLoading}
            />

            {/* Warning Card */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-red-800 font-poppins mb-2">Peringatan!</h3>
                        <p className="text-sm text-red-700 font-urbanist leading-relaxed">
                            Menghapus akun adalah tindakan permanen dan tidak dapat dibatalkan.
                            Semua data Anda termasuk pesanan dan riwayat akan dihapus secara permanen.
                        </p>
                    </div>
                </div>
            </div>

            {/* Form Container */}
            <div className="border border-gray-200 rounded-xl p-6">
                {/* Step Indicator */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                        1
                    </div>
                    <div className="flex-1 h-1 bg-gray-200 rounded-full">
                        <div className={`h-full bg-red-500 rounded-full transition-all ${step >= 2 ? 'w-full' : 'w-0'}`} />
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
                        }`}>
                        2
                    </div>
                </div>

                <DeleteAccountForm
                    step={step}
                    password={password}
                    setPassword={setPassword}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    confirmText={confirmText}
                    setConfirmText={setConfirmText}
                    error={error}
                />

                {/* Buttons */}
                <div className="flex gap-3 pt-6 mt-6 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                    >
                        {step === 1 ? 'Batal' : 'Kembali'}
                    </button>
                    <button
                        type="button"
                        onClick={handleContinue}
                        disabled={isProcessing}
                        className="px-6 py-2.5 bg-red-500 text-white rounded-xl font-semibold font-urbanist hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
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
        </>
    );
}
