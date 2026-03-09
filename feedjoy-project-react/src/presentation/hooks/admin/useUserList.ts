import { useState, useEffect } from 'react';
import axios from 'axios';
import type { User, UserRole } from '../../../domain/entities/User';

export function formatDate(dateString?: string): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
}

export function useUserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
    const [showFormModal, setShowFormModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [deleteUser, setDeleteUser] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const token = localStorage.getItem('auth_token');

    // --- FETCH DATA ---
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Sesuaikan dengan struktur pagination Laravel (data.data.data)
            setUsers(response.data.data.data || []);
        } catch (error) {
            console.error("Gagal ambil user:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- CRUD HANDLERS ---
    const handleAddUser = async (userData: any) => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem('auth_token');
        await axios.post('http://localhost:8000/api/admin/users', userData, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        fetchUsers(); // Refresh data biar user baru muncul
        closeFormModal();
    } catch (error: any) {
        console.error("Error Detail:", error.response?.data);
        alert("Gagal tambah user: " + (error.response?.data?.message || error.message));
    } finally {
        setIsLoading(false);
    }
};

    const handleEditUser = async (userData: any) => {
        if (!editingUser) return;
        try {
            await axios.put(`http://localhost:8000/api/admin/users/${editingUser.id}`, userData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchUsers();
            closeFormModal();
        } catch (error) {
            alert("Gagal update user");
        }
    };

    const handleDeleteUser = async () => {
        if (!deleteUser) return;
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${deleteUser.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchUsers();
            setDeleteUser(null);
        } catch (error) {
            alert("Gagal hapus user");
        }
    };

    // --- LOGIKA FILTER & PAGINATION ---
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const userCount = users.filter(u => u.role === 'user').length;
    const adminCount = users.filter(u => u.role === 'admin').length;

    // --- MODAL HELPERS ---
    const openAddModal = () => { setEditingUser(null); setShowFormModal(true); };
    const openEditModal = (user: User) => { setEditingUser(user); setShowFormModal(true); };
    const closeFormModal = () => { setShowFormModal(false); setEditingUser(null); };
    const openDeleteModal = (user: User) => setDeleteUser(user);
    const closeDeleteModal = () => setDeleteUser(null);

    return {
        users, searchQuery, setSearchQuery, roleFilter, setRoleFilter,
        showFormModal, editingUser, deleteUser, currentPage, itemsPerPage,
        filteredUsers, totalPages, paginatedUsers, userCount, adminCount,
        isLoading, handleAddUser, handleEditUser, handleDeleteUser,
        openAddModal, openEditModal, closeFormModal, openDeleteModal, closeDeleteModal,
        goToPage: (p: number) => setCurrentPage(p),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1))
    };
}