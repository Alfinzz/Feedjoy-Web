// User Profile Page - View and edit user profile
import { User, Save, Loader2 } from 'lucide-react';
import { useClientProfile } from '../../hooks/client/useClientProfile';
import ConfirmationModal from '../../components/commons/ConfirmationModal';
import ProfileHeader from '../../components/client/ProfileHeader';
import ProfileForm from '../../components/client/ProfileForm';

export default function UserProfilePage() {
    const {
        isEditing,
        setIsEditing,
        showToast,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isSaving,
        formData,
        setFormData,
        errors,
        handleSave,
        handleConfirmSave,
        handleCancel,
        getUserInitials
    } = useClientProfile();

    return (
        <>
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in">
                    <User className="w-5 h-5" />
                    <span className="font-urbanist font-medium">Profil berhasil diperbarui!</span>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Simpan Perubahan?"
                message="Apakah Anda yakin ingin menyimpan perubahan profil?"
                onConfirm={handleConfirmSave}
                onCancel={() => setShowConfirmModal(false)}
                type="info"
                isLoading={isLoading}
            />

            <ProfileHeader
                name={formData.name}
                email={formData.email}
                initials={getUserInitials()}
                isEditing={isEditing}
            />

            <div className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Informasi Pribadi</h3>
                    {!isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-primary/90 transition-colors"
                        >
                            Edit Profil
                        </button>
                    )}
                </div>

                <ProfileForm
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    isEditing={isEditing}
                />

                {isEditing && (
                    <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
                        <button
                            onClick={handleCancel}
                            className="px-6 py-2.5 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="px-6 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Simpan
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
