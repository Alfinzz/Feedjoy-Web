// src/presentation/hooks/client/useOrderHistory.ts
import { useState, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import type { Order } from "../../../domain/entities/Order";

export type SortOption = 'newest' | 'oldest' | 'price_high' | 'price_low';

export const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'price_high', label: 'Harga Tertinggi' },
    { value: 'price_low', label: 'Harga Terendah' },
];

export function useOrderHistory() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [deleteOrderId, setDeleteOrderId] = useState<number | null>(null);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 5;

    const token = localStorage.getItem('auth_token');

    // 1. FUNGSI AMBIL DATA DARI LARAVEL
    const fetchHistory = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/orders/history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const mappedOrders: Order[] = (response.data.data.data || []).map((raw: any) => ({
                id: raw.id,
                productId: raw.product_id,
                productName: raw.product?.name || "Produk",
                productImage: raw.product?.image || "",
                variant: raw.variant || "-",
                quantity: raw.quantity,
                phone: raw.phone,
                address: raw.address,
                notes: raw.notes,
                totalPrice: Number(raw.total_price),
                status: raw.status,
                customerName: raw.full_name,
                createdAt: raw.created_at, // Map created_at ke createdAt
                review: raw.review ? {
                    id: raw.review.id,
                    rating: raw.review.rating,
                    comment: raw.review.comment,
                    createdAt: raw.review.created_at
                } : null,
            }));

            setOrders(mappedOrders);
        } catch (error) {
            console.error("Gagal mengambil riwayat:", error);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    // 2. LOGIKA FILTER & SEARCH (Hanya pesanan completed)
    const completedOrders = useMemo(() => {
        return orders.filter(order => order.status === 'completed');
    }, [orders]);

    const filteredOrders = useMemo(() => {
        let result = completedOrders.filter((order) => {
            const q = searchQuery.toLowerCase();
            return (
                order.productName.toLowerCase().includes(q) ||
                order.id.toString().includes(q)
            );
        });

        // 3. LOGIKA SORTING
        switch (sortBy) {
            case 'newest':
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case 'oldest':
                result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'price_high':
                result.sort((a, b) => b.totalPrice - a.totalPrice);
                break;
            case 'price_low':
                result.sort((a, b) => a.totalPrice - b.totalPrice);
                break;
        }
        return result;
    }, [completedOrders, searchQuery, sortBy]);

    // 4. PAGINATION
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const paginatedOrders = filteredOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

    // 5. API HANDLERS (DELETE)
    const handleDeleteOrder = async () => {
        if (!deleteOrderId) return;
        try {
            await axios.delete(`http://localhost:8000/api/orders/${deleteOrderId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders(prev => prev.filter(o => o.id !== deleteOrderId));
            setDeleteOrderId(null);
        } catch (error) {
            alert("Gagal menghapus riwayat");
        }
    };

    const handleDeleteAll = async () => {
        try {
            // Memanggil endpoint clear history yang kita buat di Laravel sebelumnya
            await axios.delete(`http://localhost:8000/api/orders/history/clear`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setOrders([]);
            setShowDeleteAllModal(false);
        } catch (error) {
            alert("Gagal mengosongkan riwayat");
        }
    };

    return {
        completedOrders, filteredOrders, paginatedOrders,
        sortBy, showSortDropdown, deleteOrderId, showDeleteAllModal,
        searchQuery, currentPage, totalPages, ordersPerPage, isLoading,
        currentSortLabel: sortOptions.find(o => o.value === sortBy)?.label || 'Terbaru',
        handleDeleteOrder, handleDeleteAll, fetchHistory,
        handleSortChange: (opt: SortOption) => { setSortBy(opt); setShowSortDropdown(false); setCurrentPage(1); },
        handleSearchChange: (q: string) => { setSearchQuery(q); setCurrentPage(1); },
        goToPage: (p: number) => setCurrentPage(p),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
        toggleSortDropdown: () => setShowSortDropdown(prev => !prev),
        closeSortDropdown: () => setShowSortDropdown(false),
        openDeleteOrderModal: (id: number) => setDeleteOrderId(id),
        closeDeleteOrderModal: () => setDeleteOrderId(null),
        openDeleteAllModal: () => setShowDeleteAllModal(true),
        closeDeleteAllModal: () => setShowDeleteAllModal(false)
    };
}