// useProductList Hook - Business logic for Admin Product List
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Product } from '../../../domain/entities/Product';

// --- 1. EXPORTS UTILITIES (Wajib ada supaya Komponen lain tidak error) ---
export const categories = ['Ayam', 'Sapi', 'Kambing', 'Domba', 'Bebek', 'Kelinci', 'Lainnya'];

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function parsePrice(value: string): number {
    const cleaned = value.replace(/[^\d]/g, '');
    return parseInt(cleaned) || 0;
}

export function formatPriceInput(value: number): string {
    if (value === 0) return '';
    return new Intl.NumberFormat('id-ID').format(value);
}

// Fungsi ini yang tadi bikin error karena belum di-export
export function generateDummyImages(category: string): { main: string; additional: string[] } {
    const categoryImages: Record<string, { main: string; additional: string[] }> = {
        'Ayam': {
            main: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop',
            additional: ['https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=400&fit=crop']
        },
        'Lainnya': {
            main: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=400&fit=crop',
            additional: ['https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop']
        }
    };
    return categoryImages[category] || categoryImages['Lainnya'];
}

export interface ToastState {
    message: string;
    type: 'success' | 'error';
    visible: boolean;
}

// --- 2. LOGIKA UTAMA HOOK ---
export function useProductList() {
    const navigate = useNavigate();
    
    // State Data
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [toast, setToast] = useState<ToastState>({ message: '', type: 'success', visible: false });
    const itemsPerPage = 8;

    // State Modal Edit
    const [pendingEditProduct, setPendingEditProduct] = useState<Product | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    // State Modal Delete
    const [deleteProduct, setDeleteProduct] = useState<Product | null>(null);

    // Fetch Data
    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.get('http://localhost:8000/api/products', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Mapping pagination Laravel
            const actualData = response.data.data.data || [];
            setProducts(actualData);
        } catch (error) {
            console.error("Fetch Error:", error);
            showToast('Gagal memuat produk dari server', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // --- HANDLERS EDIT ---
    const openEditConfirm = (product: Product) => {
        setPendingEditProduct(product);
    };

    const closeEditConfirm = () => {
        setPendingEditProduct(null);
    };

    const handleConfirmEdit = () => {
        if (pendingEditProduct) {
            setEditingProduct(pendingEditProduct);
            setShowEditModal(true);
            setPendingEditProduct(null);
        }
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditingProduct(null);
    };

    const handleEditProduct = async (productData: any) => {
        if (!editingProduct) return;
        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            await axios.put(`http://localhost:8000/api/admin/products/${editingProduct.id}`, productData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            showToast('Produk berhasil diperbarui!', 'success');
            fetchProducts();
            closeEditModal();
        } catch (error) {
            showToast('Gagal memperbarui produk', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // --- HANDLERS DELETE ---
    const openDeleteConfirm = (product: Product) => {
        setDeleteProduct(product);
    };

    const closeDeleteConfirm = () => {
        setDeleteProduct(null);
    };

    const handleDeleteProduct = async () => {
        if (!deleteProduct) return;
        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            await axios.delete(`http://localhost:8000/api/admin/products/${deleteProduct.id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            showToast('Produk berhasil dihapus!', 'success');
            fetchProducts();
            setDeleteProduct(null);
        } catch (error) {
            showToast('Gagal menghapus produk', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    // --- LOGIKA FILTER & PAGINATION ---
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };

    return {
        products, isLoading, searchQuery, setSearchQuery,
        currentPage, toast, itemsPerPage, filteredProducts,
        totalPages, paginatedProducts,
        navigateToAddProduct: () => navigate('/admin/products/add'),
        openEditConfirm,
        closeEditConfirm,
        handleConfirmEdit,
        closeEditModal,
        handleEditProduct,
        openDeleteConfirm,
        closeDeleteConfirm,
        handleDeleteProduct,
        pendingEditProduct,
        editingProduct,
        showEditModal,
        deleteProduct,
        goToPage: (page: number) => setCurrentPage(page),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
    };
}