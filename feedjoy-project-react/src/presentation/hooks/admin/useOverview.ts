// useOverview Hook - Business logic for Admin Overview/Dashboard
import { useNavigate } from 'react-router-dom';
import { adminDataSource } from '../../../data/datasources/AdminDataSource';

// Format currency helper
export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}

export type ActivityType = 'order' | 'user' | 'review' | 'consultation';

export interface Activity {
    type: ActivityType;
    title: string;
    description?: string;
    time: string;
}

export function useOverview() {
    const navigate = useNavigate();
    const stats = adminDataSource.getStats();
    const orders = adminDataSource.getOrders();
    const products = adminDataSource.getProducts();
    const consultations = adminDataSource.getConsultations();
    const reviews = adminDataSource.getReviews();

    // Get recent activities (combine and sort by date)
    const recentActivities: Activity[] = [
        ...orders.slice(0, 3).map(o => ({
            type: 'order' as const,
            title: `Pesanan baru #${o.id}`,
            description: `${o.customerName} - ${formatCurrency(o.totalPrice)}`,
            time: o.createdAt
        })),
        ...consultations.filter(c => c.status === 'new').slice(0, 2).map(c => ({
            type: 'consultation' as const,
            title: `Konsultasi dari ${c.name}`,
            description: c.animalType,
            time: c.createdAt
        })),
        ...reviews.slice(0, 2).map(r => ({
            type: 'review' as const,
            title: `Review baru - ${r.rating}⭐`,
            description: r.productName,
            time: r.createdAt
        }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);

    // Calculate category distribution for donut chart
    const categoryCount: Record<string, number> = {};
    products.forEach(p => {
        categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
    });

    const categories = Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
        percentage: (count / products.length) * 100
    }));

    // Order status distribution
    const orderStatuses = [
        { key: 'pending', label: 'Menunggu', color: 'bg-yellow-400', count: orders.filter(o => o.status === 'pending').length },
        { key: 'confirmed', label: 'Diproses', color: 'bg-blue-400', count: orders.filter(o => o.status === 'confirmed').length },
        { key: 'shipped', label: 'Dikirim', color: 'bg-purple-400', count: orders.filter(o => o.status === 'shipped').length },
        { key: 'completed', label: 'Selesai', color: 'bg-green-400', count: orders.filter(o => o.status === 'completed').length },
        { key: 'cancelled', label: 'Batal', color: 'bg-red-400', count: orders.filter(o => o.status === 'cancelled').length },
    ];

    // Rating distribution
    const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
    }));

    // Quick actions navigation
    const navigateToOrders = () => navigate('/admin/orders');
    const navigateToConsultations = () => navigate('/admin/consultations');
    const navigateToAddProduct = () => navigate('/admin/products/add');
    const navigateToReviews = () => navigate('/admin/reviews');

    return {
        // Stats
        stats,
        // Data
        orders,
        products,
        reviews,
        recentActivities,
        categories,
        orderStatuses,
        ratingDistribution,
        // Navigation
        navigateToOrders,
        navigateToConsultations,
        navigateToAddProduct,
        navigateToReviews
    };
}
