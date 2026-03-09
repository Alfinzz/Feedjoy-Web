// useClientOverview Hook - Business logic for Client Overview page
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ShoppingCart,
    Clock,
    CheckCircle,
    Star,
    XCircle,
    Truck
} from 'lucide-react';
import { useOrders } from '../useOrders';
import { useReviews } from '../useReviews';

export interface UserActivity {
    id: number;
    type: 'order_created' | 'order_confirmed' | 'order_shipped' | 'order_completed' | 'order_cancelled' | 'review_added';
    message: string;
    time: string;
    icon: any;
    color: string;
    bg: string;
    orderId?: number;
}

export function useClientOverview() {
    const navigate = useNavigate();
    const { orders } = useOrders();
    const { reviews } = useReviews();
    const [currentPage, setCurrentPage] = useState(1);
    const activitiesPerPage = 3;

    // Calculate stats
    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === 'pending').length;
        const confirmed = orders.filter(o => o.status === 'confirmed').length;
        const shipped = orders.filter(o => o.status === 'shipped').length;
        const completed = orders.filter(o => o.status === 'completed').length;
        const cancelled = orders.filter(o => o.status === 'cancelled').length;
        const inProgress = pending + confirmed + shipped;

        return { total, pending, confirmed, shipped, completed, cancelled, inProgress };
    }, [orders]);

    // Generate activities
    const userActivities = useMemo((): UserActivity[] => {
        const activities: UserActivity[] = [];

        orders.forEach(order => {
            activities.push({
                id: order.id * 10 + 1,
                type: 'order_created',
                message: `Pesanan #${order.id.toString().padStart(5, '0')} berhasil dibuat`,
                time: order.createdAt,
                icon: ShoppingCart,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
                orderId: order.id
            });

            if (order.status === 'confirmed' || order.status === 'shipped' || order.status === 'completed') {
                activities.push({
                    id: order.id * 10 + 2,
                    type: 'order_confirmed',
                    message: `Pesanan #${order.id.toString().padStart(5, '0')} sedang diproses`,
                    time: order.timeline?.find(t => t.status === 'confirmed')?.date || order.createdAt,
                    icon: Clock,
                    color: 'text-purple-600',
                    bg: 'bg-purple-50',
                    orderId: order.id
                });
            }

            if (order.status === 'shipped' || order.status === 'completed') {
                activities.push({
                    id: order.id * 10 + 3,
                    type: 'order_shipped',
                    message: `Pesanan #${order.id.toString().padStart(5, '0')} dalam perjalanan`,
                    time: order.timeline?.find(t => t.status === 'shipped')?.date || order.createdAt,
                    icon: Truck,
                    color: 'text-cyan-600',
                    bg: 'bg-cyan-50',
                    orderId: order.id
                });
            }

            if (order.status === 'completed') {
                activities.push({
                    id: order.id * 10 + 4,
                    type: 'order_completed',
                    message: `Pesanan #${order.id.toString().padStart(5, '0')} telah selesai`,
                    time: order.timeline?.find(t => t.status === 'completed')?.date || order.createdAt,
                    icon: CheckCircle,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                    orderId: order.id
                });
            }

            if (order.status === 'cancelled') {
                activities.push({
                    id: order.id * 10 + 5,
                    type: 'order_cancelled',
                    message: `Pesanan #${order.id.toString().padStart(5, '0')} dibatalkan`,
                    time: order.timeline?.find(t => t.status === 'cancelled')?.date || order.createdAt,
                    icon: XCircle,
                    color: 'text-red-600',
                    bg: 'bg-red-50',
                    orderId: order.id
                });
            }
        });

        reviews.forEach(review => {
            activities.push({
                id: review.id * 100,
                type: 'review_added',
                message: `Ulasan untuk ${review.productName} berhasil ditambahkan`,
                time: review.createdAt,
                icon: Star,
                color: 'text-amber-500',
                bg: 'bg-amber-50'
            });
        });

        return activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    }, [orders, reviews]);

    const totalPages = Math.ceil(userActivities.length / activitiesPerPage);
    const paginatedActivities = userActivities.slice(
        (currentPage - 1) * activitiesPerPage,
        currentPage * activitiesPerPage
    );

    return {
        stats,
        userActivities,
        paginatedActivities,
        currentPage,
        totalPages,
        goToPage: (page: number) => setCurrentPage(page),
        goToPreviousPage: () => setCurrentPage(p => Math.max(1, p - 1)),
        goToNextPage: () => setCurrentPage(p => Math.min(totalPages, p + 1)),
        navigate
    };
}
