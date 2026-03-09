// User Form Modal - Add/Edit user form
import { useState, useEffect } from 'react';
import {
    X,
    Loader2,
    Mail,
    Phone,
    Shield,
    User as UserIcon
} from 'lucide-react';
import type { User, UserRole } from '../../../domain/entities/User';

export interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    user?: User | null;
    onSave: (user: Omit<User, 'id' | 'created_at'>) => void;
}

export default function UserFormModal({ isOpen, onClose, user, onSave }: UserFormModalProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: 'user' as UserRole,
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Reset form when user changes
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                role: user.role,
                password: ''
            });
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                role: 'user',
                password: ''
            });
        }
    }, [user, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        onSave({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || undefined,
            role: formData.role,
            password: formData.password || undefined
        });
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 font-poppins">
                        {user ? 'Edit User' : 'Tambah User Baru'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            No. Telepon
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist"
                                placeholder="081234567890"
                            />
                        </div>
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                            Role <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'user' })}
                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.role === 'user'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                <UserIcon className="w-5 h-5" />
                                <span className="font-semibold font-urbanist">User</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${formData.role === 'admin'
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                                    }`}
                            >
                                <Shield className="w-5 h-5" />
                                <span className="font-semibold font-urbanist">Admin</span>
                            </button>
                        </div>
                    </div>

                    {/* Password (only for new users) */}
                    {!user && (
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 font-urbanist mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                required={!user}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50 transition-colors"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Menyimpan...
                                </>
                            ) : (
                                user ? 'Simpan Perubahan' : 'Tambah User'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
