// Admin Profile Page - View and edit admin profile
import { User, Mail, Phone, MapPin, Save, Camera, Loader2 } from 'lucide-react';
import { useProfile } from '../../hooks/admin/useProfile';
import ConfirmationModal from '../../components/commons/ConfirmationModal';

export default function ProfilePage() {
    const {
        formData,
        errors,
        isEditing,
        showToast,
        showConfirmModal,
        isLoading,
        isSaving,
        handleSaveClick,
        handleConfirmSave,
        getUserInitials,
        updateFormField,
        startEditing,
        cancelEditing,
        closeConfirmModal
    } = useProfile();

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {showToast && (
                <div className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-slide-in">
                    <Save className="w-5 h-5" />
                    <span className="font-urbanist font-medium">Profile berhasil disimpan!</span>
                </div>
            )}

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={showConfirmModal}
                title="Simpan Perubahan?"
                message="Apakah Anda yakin ingin menyimpan perubahan pada profil Anda?"
                onConfirm={handleConfirmSave}
                onCancel={closeConfirmModal}
                type="info"
                isLoading={isLoading}
            />

            {/* Profile Card */}
            <div className="border border-gray-200 rounded-xl p-6">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-teal-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold font-poppins text-3xl">
                                {getUserInitials()}
                            </span>
                        </div>
                        <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold text-gray-800 font-poppins">{formData.name}</h3>
                        <p className="text-gray-500 font-urbanist">{formData.email}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                            Administrator
                        </span>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveClick} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Nama Lengkap
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.name ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className={`relative flex items-center ${!isEditing ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                                <User className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateFormField('name', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                                />
                            </div>
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Email
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.email ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className={`relative flex items-center ${!isEditing ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                                <Mail className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateFormField('email', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                                />
                            </div>
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Nomor Telepon
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className={`relative flex items-center ${!isEditing ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                                <Phone className="absolute left-4 w-5 h-5 text-gray-400" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => updateFormField('phone', e.target.value)}
                                    disabled={!isEditing}
                                    className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                                />
                            </div>
                        </div>
                        {errors.phone && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Alamat
                        </label>
                        <div className={`border rounded-xl overflow-hidden ${errors.address ? 'border-red-300' : 'border-gray-200'}`}>
                            <div className={`relative ${!isEditing ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                                <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                <textarea
                                    value={formData.address}
                                    onChange={(e) => updateFormField('address', e.target.value)}
                                    disabled={!isEditing}
                                    rows={3}
                                    className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist resize-none disabled:text-gray-500"
                                />
                            </div>
                        </div>
                        {errors.address && <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.address}</p>}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    onClick={cancelEditing}
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
                                            Simpan
                                        </>
                                    )}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={startEditing}
                                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
