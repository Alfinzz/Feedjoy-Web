// src/presentation/hooks/client/useClientOrderList.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import type { Order } from '../../../domain/entities/Order';

export interface ReviewFormData {
    rating: number;
    comment: string;
}

export function useClientOrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // State UI
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [formData, setFormData] = useState<ReviewFormData>({ rating: 0, comment: '' });
    const [deleteReviewId, setDeleteReviewId] = useState<number | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [showDeleteCompletedModal, setShowDeleteCompletedModal] = useState(false);
    const ordersPerPage = 5;

    const token = localStorage.getItem('auth_token');

    // 1. FUNGSI FETCH DATA DARI LARAVEL
    const fetchOrders = useCallback(async (isSilent = false) => {
        if (!isSilent) setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8000/api/orders', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // Laravel Paginate: data ada di response.data.data.data
            const rawData = response.data.data.data || [];
        
        const mappedOrders: Order[] = rawData.map((raw: any) => ({
            id: raw.id,
            productId: raw.product_id,
            productName: raw.product?.name || "Produk dihapus",
            productImage: raw.product?.image || "",
            variant: raw.variant || "-",
            quantity: raw.quantity,
            totalPrice: Number(raw.total_price),
            status: raw.status,
            customerName: raw.full_name, // Map full_name ke customerName
            customerEmail: raw.email,
            customerPhone: raw.phone,
            address: raw.address,
            paymentMethod: "Transfer/QRIS", // Sesuaikan jika ada di DB
            trackingNumber: raw.tracking_number,
            createdAt: raw.created_at, // Map created_at ke createdAt
        }));

        setOrders(mappedOrders);
        } catch (error) {
            console.error("Gagal mengambil pesanan:", error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, [token]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // 2. LOGIKA FILTER & TAB (Mapping data Laravel snake_case)
    const activeOrders = orders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status));
    const completedOrders = orders.filter(o => o.status === 'completed');
    const cancelledOrders = orders.filter(o => o.status === 'cancelled');

    const currentOrders = useMemo(() => {
        let base = activeTab === 'active' ? activeOrders : 
                   activeTab === 'completed' ? completedOrders : cancelledOrders;
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            return base.filter(order =>
                // Gunakan optional chaining karena product bisa null
                (order as any).product?.name.toLowerCase().includes(query) ||
                order.id.toString().includes(query)
            );
        }
        return base;
    }, [activeTab, orders, searchQuery]);

    const totalPages = Math.ceil(currentOrders.length / ordersPerPage);
    const paginatedOrders = currentOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

    // 3. HANDLERS (Terhubung ke API)
    
    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchOrders(true);
    };

    const handleDeleteCompletedOrders = async () => {
        try {
            // Contoh menghapus riwayat satu per satu atau via endpoint khusus
            await Promise.all(completedOrders.map(o => 
                axios.delete(`http://localhost:8000/api/orders/${o.id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ));
            fetchOrders();
            setShowDeleteCompletedModal(false);
        } catch (error) {
            alert("Gagal menghapus riwayat");
        }
    };

    // Logika Review (Asumsi endpoint: /api/reviews)
    const handleSaveReview = async (order: Order) => {
        if (!formData.comment.trim() || formData.rating === 0) return;

        try {
            const payload = {
                order_id: order.id,
                product_id: (order as any).product_id,
                rating: formData.rating,
                comment: formData.comment
            };

            if (isEditMode && (order as any).review?.id) {
                await axios.put(`http://localhost:8000/api/reviews/${(order as any).review.id}`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            } else {
                await axios.post(`http://localhost:8000/api/reviews`, payload, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
            fetchOrders();
            handleCancelReview();
        } catch (error) {
            alert("Gagal menyimpan ulasan");
        }
    };

    const handleDeleteReview = async () => {
        if (!deleteReviewId) return;
        try {
            await axios.delete(`http://localhost:8000/api/reviews/${deleteReviewId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchOrders();
            setDeleteReviewId(null);
        } catch (error) {
            alert("Gagal menghapus ulasan");
        }
    };

    // Helper UI
    const toggleExpand = (orderId: number) => setExpandedOrder(expandedOrder === orderId ? null : orderId);
    const handleTabChange = (tab: any) => { setActiveTab(tab); setCurrentPage(1); };
    const handleCancelReview = () => { setEditingOrderId(null); setFormData({ rating: 0, comment: '' }); setIsEditMode(false); };

    return {
        orders, expandedOrder, editingOrderId, formData, deleteReviewId, isEditMode,
        activeTab, searchQuery, isRefreshing, isLoading, currentPage,
        showDeleteCompletedModal, ordersPerPage, activeOrders, completedOrders,
        cancelledOrders, currentOrders, totalPages, paginatedOrders,
        hasNoOrders: orders.length === 0,
        getOrderReview: (orderId: number) => (orders.find(o => o.id === orderId) as any)?.review,
        toggleExpand, handleRefresh, handleDeleteCompletedOrders,
        handleSaveReview, handleDeleteReview, handleCancelReview,
        updateFormRating: (rating: number) => setFormData(prev => ({ ...prev, rating })),
        updateFormComment: (comment: string) => setFormData(prev => ({ ...prev, comment })),
        handleTabChange, 
        handleSearchChange: (q: string) => { setSearchQuery(q); setCurrentPage(1); },
        goToPage: (p: number) => setCurrentPage(p),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
        openDeleteCompletedModal: () => setShowDeleteCompletedModal(true),
        closeDeleteCompletedModal: () => setShowDeleteCompletedModal(false),
        openDeleteReviewModal: (id: number) => setDeleteReviewId(id),
        closeDeleteReviewModal: () => setDeleteReviewId(null),
        handleStartEdit: (orderId: number) => {
            const order = orders.find(o => o.id === orderId) as any;
            if (order?.review) {
                setFormData({ rating: order.review.rating, comment: order.review.comment });
                setIsEditMode(true);
            }
            setEditingOrderId(orderId);
        },
        handleStartWriteReview: (orderId: number) => setEditingOrderId(orderId),
    };
}