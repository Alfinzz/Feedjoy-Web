// User Card Component - Display individual user in grid
import {
    Pencil,
    Trash2,
    Mail,
    Phone,
    Shield,
    User as UserIcon,
    Calendar
} from 'lucide-react';
import type { User } from '../../../domain/entities/User';
import { formatDate } from '../../hooks/admin/useUserList';

export interface UserCardProps {
    user: User;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
            {/* Header: Avatar + Name + Role */}
            <div className="flex items-start gap-4 mb-4">
                {/* Avatar with Role-based Gradient */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${user.role === 'admin'
                    ? 'bg-gradient-to-br from-purple-500 to-indigo-600 shadow-purple-500/30'
                    : 'bg-gradient-to-br from-primary to-teal-500 shadow-teal-500/30'
                    }`}>
                    <span className="text-white font-bold text-xl font-poppins">
                        {user.name.charAt(0).toUpperCase()}
                    </span>
                </div>

                {/* Name + Role + ID */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-800 font-poppins text-lg truncate mb-1">
                        {user.name}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                        {/* Role Badge */}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                            }`}>
                            {user.role === 'admin' ? <Shield className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                            {user.role === 'admin' ? 'Admin' : 'User'}
                        </span>
                        <span className="text-xs text-gray-400 font-mono bg-gray-50 px-2 py-0.5 rounded">
                            ID: {user.id}
                        </span>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="font-urbanist truncate">{user.email}</span>
                </div>
                {user.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-4 h-4 text-gray-400" />
                        </div>
                        <span className="font-urbanist">{user.phone}</span>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-gray-400" />
                    </div>
                    <span className="font-urbanist">Bergabung {formatDate(user.created_at)}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-xl font-semibold font-urbanist text-sm hover:bg-blue-100 transition-colors border border-blue-100"
                >
                    <Pencil className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(user)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold font-urbanist text-sm hover:bg-red-100 transition-colors border border-red-100"
                >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                </button>
            </div>
        </div>
    );
}
