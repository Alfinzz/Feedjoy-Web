// useOrderList Hook - Business logic for Admin Order List
import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Clock, 
    Package, 
    Truck, 
    CheckCircle, 
    XCircle 
} from 'lucide-react';
import type { Order, OrderStatus } from '../../../domain/entities/Order';

// --- 1. EXPORT UTILITIES (Wajib di-export agar OrderCard tidak error) ---

export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

export function formatDate(dateString: string): string {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function getStatusInfo(status: OrderStatus) {
    const statusMap = {
        pending: { label: 'Menunggu', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
        processing: { label: 'Diproses', color: 'bg-blue-100 text-blue-700', icon: Package },
        shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: Truck },
        completed: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
        cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: XCircle },
    };
    return statusMap[status] || statusMap.pending;
}

export function getNextStatusOptions(currentStatus: OrderStatus) {
    const transitions: Record<string, { status: OrderStatus; label: string; needsTracking?: boolean }[]> = {
        pending: [
            { status: 'processing', label: 'Proses Pesanan' },
            { status: 'cancelled', label: 'Batalkan' }
        ],
        processing: [
            { status: 'shipped', label: 'Kirim (Input Resi)', needsTracking: true },
            { status: 'cancelled', label: 'Batalkan' }
        ],
        shipped: [
            { status: 'completed', label: 'Selesaikan Pesanan' }
        ],
        completed: [],
        cancelled: []
    };
    return transitions[currentStatus] || [];
}

// --- 2. LOGIKA UTAMA HOOK ---

export function useOrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, shipping: 0, completed: 0 });
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
    const [showTrackingModal, setShowTrackingModal] = useState(false);
    const [pendingStatusChange, setPendingStatusChange] = useState<{ orderId: number; status: OrderStatus } | null>(null);
    const itemsPerPage = 8;

    const token = localStorage.getItem('auth_token');

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/api/admin/orders`, {
                params: {
                    page: currentPage,
                    search: searchQuery,
                    per_page: itemsPerPage
                },
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Mapping data dari Laravel Paginate (data.data.data)
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
            console.error("Fetch orders failed", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [currentPage, searchQuery]);

    const handleStatusChange = async (orderId: number, newStatus: OrderStatus, trackingNumber?: string) => {
        try {
            await axios.put(`http://localhost:8000/api/admin/orders/${orderId}/status`, {
                status: newStatus,
                tracking_number: trackingNumber
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchOrders();
        } catch (error) {
            alert("Gagal memperbarui status");
        }
    };

    const handleStatusButtonClick = (orderId: number, newStatus: OrderStatus, needsTracking?: boolean) => {
        if (needsTracking) {
            setPendingStatusChange({ orderId, status: newStatus });
            setShowTrackingModal(true);
        } else {
            handleStatusChange(orderId, newStatus);
        }
    };

    const handleTrackingConfirm = (trackingNumber: string) => {
        if (pendingStatusChange) {
            handleStatusChange(pendingStatusChange.orderId, pendingStatusChange.status, trackingNumber);
        }
        setShowTrackingModal(false);
        setPendingStatusChange(null);
    };

    return {
        orders,
        stats,
        searchQuery,
        setSearchQuery,
        expandedOrder,
        showTrackingModal,
        currentPage,
        itemsPerPage,
        isLoading,
        totalPages,
        paginatedOrders: orders,
        filteredOrders: orders,
        toggleExpandedOrder: (id: number) => setExpandedOrder(prev => prev === id ? null : id),
        handleStatusButtonClick,
        handleTrackingConfirm,
        closeTrackingModal: () => setShowTrackingModal(false),
        goToPage: (p: number) => setCurrentPage(p),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
    };
}