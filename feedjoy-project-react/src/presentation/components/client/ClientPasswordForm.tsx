// Client Password Form Component
import { Key, Eye, EyeOff } from "lucide-react";

interface ClientPasswordFormProps {
    formData: any;
    setFormData: (data: any) => void;
    errors: any;
    showStates: {
        current: boolean;
        new: boolean;
        confirm: boolean;
    };
    onToggleShow: (field: string) => void;
}

export default function ClientPasswordForm({
    formData,
    setFormData,
    errors,
    showStates,
    onToggleShow
}: ClientPasswordFormProps) {
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="space-y-5">
            {/* Current Password */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                    Password Saat Ini
                </label>
                <div className={`border rounded-xl overflow-hidden ${errors.currentPassword ? 'border-red-300' : 'border-gray-200'}`}>
                    <div className="relative flex items-center bg-gray-50/50">
                        <Key className="absolute left-4 w-5 h-5 text-gray-400" />
                        <input
                            type={showStates.current ? 'text' : 'password'}
                            value={formData.currentPassword}
                            onChange={(e) => handleChange('currentPassword', e.target.value)}
                            placeholder="Masukkan password saat ini"
                            className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShow('current')}
                            className="absolute right-4 text-gray-400 hover:text-gray-600"
                        >
                            {showStates.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.currentPassword}</p>
                )}
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
                            type={showStates.new ? 'text' : 'password'}
                            value={formData.newPassword}
                            onChange={(e) => handleChange('newPassword', e.target.value)}
                            placeholder="Masukkan password baru"
                            className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShow('new')}
                            className="absolute right-4 text-gray-400 hover:text-gray-600"
                        >
                            {showStates.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.newPassword}</p>
                )}
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
                            type={showStates.confirm ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            placeholder="Konfirmasi password baru"
                            className="w-full pl-12 pr-12 py-3 bg-transparent focus:outline-none font-urbanist"
                        />
                        <button
                            type="button"
                            onClick={() => onToggleShow('confirm')}
                            className="absolute right-4 text-gray-400 hover:text-gray-600"
                        >
                            {showStates.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
                {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.confirmPassword}</p>
                )}
            </div>
        </div>
    );
}
