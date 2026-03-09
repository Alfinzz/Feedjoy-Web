// Change Password Page - Admin password change
import { Key, Eye, EyeOff, Save, Shield, Loader2 } from 'lucide-react';
import { useChangePassword } from '../../hooks/admin/useChangePassword';
import ConfirmationModal from '../../components/commons/ConfirmationModal';

export default function ChangePasswordPage() {
    const {
        formData,
        errors,
        showToast,
        showConfirmModal,
        isLoading,
        isSaving,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        handleSubmit,
        handleConfirmSave,
        updateFormField,
        toggleCurrentPassword,
        toggleNewPassword,
        toggleConfirmPassword,
        navigateBack,
        closeConfirmModal
    } = useChangePassword();

    return (
        <div className="space-y-6">
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
                onCancel={closeConfirmModal}
                type="warning"
                isLoading={isLoading}
            />

            {/* Form Card */}
            <div className="border border-gray-200 rounded-xl p-6">
                {/* Security Icon */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Shield className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 font-poppins">Keamanan Akun</h3>
                        <p className="text-sm text-gray-500 font-urbanist">Pastikan password baru Anda kuat dan mudah diingat</p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Password Saat Ini
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.currentPassword ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className="relative flex items-center bg-gray-50/50">
                                <Key className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    value={formData.currentPassword}
                                    onChange={(e) => updateFormField('currentPassword', e.target.value)}
                                    placeholder="Masukkan password saat ini"
                                    className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                                />
                                <button
                                    type="button"
                                    onClick={toggleCurrentPassword}
                                    className="absolute right-4 text-gray-400 hover:text-gray-600"
                                >
                                    {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.currentPassword && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.currentPassword}</p>}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Password Baru
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.newPassword ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className="relative flex items-center bg-gray-50/50">
                                <Key className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={formData.newPassword}
                                    onChange={(e) => updateFormField('newPassword', e.target.value)}
                                    placeholder="Masukkan password baru"
                                    className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                                />
                                <button
                                    type="button"
                                    onClick={toggleNewPassword}
                                    className="absolute right-4 text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.newPassword && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.newPassword}</p>}
                        <p className="mt-1 text-xs text-gray-400 font-urbanist">Minimal 8 karakter</p>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Konfirmasi Password Baru
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.confirmPassword ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className="relative flex items-center bg-gray-50/50">
                                <Key className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateFormField('confirmPassword', e.target.value)}
                                    placeholder="Konfirmasi password baru"
                                    className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPassword}
                                    className="absolute right-4 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.confirmPassword}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={navigateBack}
                            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
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
                </form>
            </div>
        </div>
    );
}
