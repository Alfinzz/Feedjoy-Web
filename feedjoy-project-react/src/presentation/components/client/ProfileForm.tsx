// Client Profile Form Component
import { User, Mail, Phone, MapPin } from "lucide-react";

interface ProfileFormProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    setFormData: (data: any) => void;
    errors: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    isEditing: boolean;
}

export default function ProfileForm({ formData, setFormData, errors, isEditing }: ProfileFormProps) {
    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <div className="space-y-5">
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
                            onChange={(e) => handleChange('name', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                        />
                    </div>
                </div>
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.name}</p>
                )}
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
                            onChange={(e) => handleChange('email', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                        />
                    </div>
                </div>
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.email}</p>
                )}
            </div>

            {/* Phone */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                    Nomor HP
                </label>
                <div className={`border rounded-xl overflow-hidden ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}>
                    <div className={`relative flex items-center ${!isEditing ? 'bg-gray-50' : 'bg-gray-50/50'}`}>
                        <Phone className="absolute left-4 w-5 h-5 text-gray-400" />
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            disabled={!isEditing}
                            className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist disabled:text-gray-500"
                        />
                    </div>
                </div>
                {errors.phone && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.phone}</p>
                )}
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
                            onChange={(e) => handleChange('address', e.target.value)}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full pl-12 pr-4 py-3 bg-transparent focus:outline-none font-urbanist resize-none disabled:text-gray-500"
                        />
                    </div>
                </div>
                {errors.address && (
                    <p className="mt-1 text-sm text-red-500 font-urbanist">{errors.address}</p>
                )}
            </div>
        </div>
    );
}
