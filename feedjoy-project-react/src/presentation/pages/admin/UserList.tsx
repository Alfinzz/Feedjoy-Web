// Admin User List - CRUD for users
import {
    Users,
    Plus,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useUserList } from '../../hooks/admin/useUserList';
import UserCard from '../../components/admin/UserCard';
import UserFormModal from '../../components/admin/UserFormModal';
import UserDeleteModal from '../../components/admin/UserDeleteModal';
import type { UserRole } from '../../../domain/entities/User';

export default function AdminUserList() {
    const {
        searchQuery,
        setSearchQuery,
        roleFilter,
        setRoleFilter,
        showFormModal,
        editingUser,
        deleteUser,
        currentPage,
        itemsPerPage,
        filteredUsers,
        totalPages,
        paginatedUsers,
        userCount,
        adminCount,
        handleAddUser,
        handleEditUser,
        handleDeleteUser,
        openAddModal,
        openEditModal,
        closeFormModal,
        openDeleteModal,
        closeDeleteModal,
        goToPage,
        goToPreviousPage,
        goToNextPage
    } = useUserList();

    const roleFilters: { value: UserRole | 'all'; label: string }[] = [
        { value: 'all', label: 'Semua' },
        { value: 'user', label: 'Users' },
        { value: 'admin', label: 'Admins' }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Manajemen User</h3>
                    <p className="text-sm text-gray-500 font-urbanist">
                        {userCount} users • {adminCount} admins
                    </p>
                </div>
                <div className="flex gap-3">
                    {/* Search */}
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari user..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                        />
                    </div>
                    {/* Add Button */}
                    <button
                        onClick={openAddModal}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Tambah User</span>
                    </button>
                </div>
            </div>

            {/* Role Filter */}
            <div className="flex gap-2">
                {roleFilters.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => setRoleFilter(tab.value)}
                        className={`px-4 py-2 rounded-xl font-semibold font-urbanist text-sm transition-all ${roleFilter === tab.value
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/30'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* User List */}
            {filteredUsers.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {searchQuery ? 'Tidak ditemukan' : 'Belum ada user'}
                    </h3>
                    <p className="text-gray-500 font-urbanist mb-4">
                        {searchQuery ? 'Coba gunakan kata kunci lain' : 'Mulai dengan menambahkan user'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={openAddModal}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah User
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {paginatedUsers.map(user => (
                            <UserCard
                                key={user.id}
                                user={user}
                                onEdit={openEditModal}
                                onDelete={openDeleteModal}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`w-10 h-10 rounded-xl font-semibold font-urbanist text-sm transition-all ${currentPage === page
                                            ? 'bg-primary text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Showing info */}
                    <div className="text-center text-sm text-gray-400 font-urbanist">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredUsers.length)} dari {filteredUsers.length} user
                    </div>
                </>
            )}

            {/* Modals */}
            <UserFormModal
                isOpen={showFormModal}
                onClose={closeFormModal}
                user={editingUser}
                onSave={editingUser ? handleEditUser : handleAddUser}
            />

            <UserDeleteModal
                isOpen={!!deleteUser}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteUser}
                userName={deleteUser?.name || ''}
            />
        </div>
    );
}
