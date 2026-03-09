// User Change Password Page - Password change with logic separated into custom hook
import { Save, Shield, Loader2 } from 'lucide-react';
import { useChangePassword } from '../../hooks/client/useChangePassword';
import ConfirmationModal from '../../components/commons/ConfirmationModal';
import ClientPasswordForm from '../../components/client/ClientPasswordForm';

export default function UserChangePasswordPage() {
    const {
        showToast,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isSaving,
        showCurrentPassword,
        setShowCurrentPassword,
        showNewPassword,
        setShowNewPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        formData,
        setFormData,
        errors,
        handleConfirmSave,
        handleSaveClick,
        navigate
    } = useChangePassword();

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in">
                    <Shield className="w-5 h-5" />
                    <span className="font-urbanist font-medium">Password berhasil diubah!</span>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Ganti Password?"
                message="Pastikan Anda mengingat password baru Anda. Apakah Anda yakin ingin mengganti password?"
                onConfirm={handleConfirmSave}
                onCancel={() => setShowConfirmModal(false)}
                type="warning"
                isLoading={isLoading}
            />

            {/* Form Container */}
            <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 font-poppins">Keamanan Akun</h3>
                        <p className="text-sm text-gray-500 font-urbanist">Pastikan password baru Anda kuat dan mudah diingat</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <ClientPasswordForm
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                        showStates={{
                            current: showCurrentPassword,
                            new: showNewPassword,
                            confirm: showConfirmPassword
                        }}
                        onToggleShow={(field) => {
                            if (field === 'current') setShowCurrentPassword(!showCurrentPassword);
                            if (field === 'new') setShowNewPassword(!showNewPassword);
                            if (field === 'confirm') setShowConfirmPassword(!showConfirmPassword);
                        }}
                    />

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard/overview')}
                            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveClick}
                            disabled={isSaving}
                            className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Simpan Password
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
