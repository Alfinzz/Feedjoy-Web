// Admin Overview - Dashboard statistics and recent activity
import {
    Users,
    ShoppingCart,
    Package,
    DollarSign,
    Clock,
    Star,
    MessageSquare
} from 'lucide-react';
import { useOverview, formatCurrency, formatRelativeTime } from '../../hooks/admin/useOverview';
import OverviewStatsCard from '../../components/admin/OverviewStatsCard';
import SalesChart from '../../components/admin/SalesChart';
import CategoryDonut from '../../components/admin/CategoryDonut';
import QuickAction from '../../components/admin/QuickAction';
import ActivityItem from '../../components/admin/ActivityItem';
import OrderStatusChart from '../../components/admin/OrderStatusChart';
import RatingSummary from '../../components/admin/RatingSummary';

export default function AdminOverview() {
    const {
        stats,
        products,
        orders,
        recentActivities,
        categories,
        orderStatuses,
        ratingDistribution,
        navigateToOrders,
        navigateToConsultations,
        navigateToAddProduct,
        navigateToReviews
    } = useOverview();

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <OverviewStatsCard
                    title="Total Pengguna"
                    value={stats.totalUsers.toString()}
                    change="+12%"
                    icon={Users}
                    trend="up"
                    gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <OverviewStatsCard
                    title="Total Pesanan"
                    value={stats.totalOrders.toString()}
                    change="+8%"
                    icon={ShoppingCart}
                    trend="up"
                    gradient="bg-gradient-to-br from-green-500 to-emerald-600"
                />
                <OverviewStatsCard
                    title="Total Produk"
                    value={stats.totalProducts.toString()}
                    icon={Package}
                    gradient="bg-gradient-to-br from-orange-500 to-amber-600"
                />
                <OverviewStatsCard
                    title="Pendapatan"
                    value={formatCurrency(stats.totalRevenue)}
                    change="+23%"
                    icon={DollarSign}
                    trend="up"
                    gradient="bg-gradient-to-br from-purple-500 to-violet-600"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart />
                <CategoryDonut categories={categories} totalProducts={products.length} />
            </div>

            {/* Three Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 font-poppins">Aktivitas Terbaru</h3>
                        <span className="text-xs text-gray-400 font-urbanist px-2 py-1 bg-gray-100 rounded-full">Hari ini</span>
                    </div>
                    <div className="p-3">
                        {recentActivities.length > 0 ? (
                            <div className="space-y-1">
                                {recentActivities.map((activity, index) => (
                                    <ActivityItem
                                        key={index}
                                        type={activity.type}
                                        title={activity.title}
                                        description={activity.description}
                                        time={formatRelativeTime(activity.time)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500 font-urbanist py-8">
                                Belum ada aktivitas
                            </p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-bold text-gray-800 font-poppins">Aksi Cepat</h3>
                    </div>
                    <div className="p-4 space-y-3">
                        <QuickAction
                            title="Pesanan Pending"
                            description={`${stats.pendingOrders} pesanan menunggu`}
                            icon={Clock}
                            onClick={navigateToOrders}
                            color="bg-gradient-to-br from-yellow-400 to-orange-500"
                            badge={stats.pendingOrders}
                        />
                        <QuickAction
                            title="Konsultasi Baru"
                            description={`${stats.newConsultations} permintaan baru`}
                            icon={MessageSquare}
                            onClick={navigateToConsultations}
                            color="bg-gradient-to-br from-purple-500 to-violet-600"
                            badge={stats.newConsultations}
                        />
                        <QuickAction
                            title="Tambah Produk"
                            description="Buat produk baru"
                            icon={Package}
                            onClick={navigateToAddProduct}
                            color="bg-gradient-to-br from-primary to-teal-500"
                        />
                        <QuickAction
                            title="Lihat Ulasan"
                            description={`${stats.totalReviews} ulasan produk`}
                            icon={Star}
                            onClick={navigateToReviews}
                            color="bg-gradient-to-br from-amber-400 to-yellow-500"
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <OrderStatusChart statuses={orderStatuses} total={orders.length} />
                <RatingSummary
                    averageRating={stats.averageRating}
                    totalReviews={stats.totalReviews}
                    distribution={ratingDistribution}
                />
            </div>
        </div>
    );
}
