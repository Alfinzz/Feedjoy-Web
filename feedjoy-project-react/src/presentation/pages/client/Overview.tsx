// User Overview - Dashboard homepage with stats and status
import {
    Package,
    ShoppingCart,
    Clock,
    CheckCircle,
    Activity,
    ChevronRight,
    ChevronLeft,
    XCircle,
    FileText
} from 'lucide-react';
import { useClientOverview } from '../../hooks/client/useClientOverview';
import ActivityItem from '../../components/client/ActivityItem';
import QuickActionCard from '../../components/client/QuickActionCard';

export default function UserOverview() {
    const {
        stats,
        userActivities,
        paginatedActivities,
        currentPage,
        totalPages,
        goToPage,
        goToPreviousPage,
        goToNextPage,
        navigate
    } = useClientOverview();

    return (
        <div className="space-y-6">
            {/* Status Pesanan Card */}
            {stats.inProgress > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-gray-800 font-semibold font-poppins mb-4">Status Pesanan</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg p-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-amber-600" />
                            </div>
                            <p className="text-gray-600 font-urbanist text-sm sm:text-base">
                                Anda memiliki <span className="font-semibold text-amber-600">{stats.inProgress} pesanan</span> yang sedang diproses.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/dashboard/orders')}
                            className="px-4 py-2 bg-primary text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-primary/90 transition-colors whitespace-nowrap self-end sm:self-center"
                        >
                            Lihat Status
                        </button>
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Total Pesanan */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                            <ShoppingCart className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-urbanist">Total Pesanan</p>
                            <p className="text-2xl font-bold text-gray-800 font-poppins">{stats.total}</p>
                        </div>
                    </div>
                </div>

                {/* Dalam Proses */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                            <Clock className="w-7 h-7 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-urbanist">Dalam Proses</p>
                            <p className="text-2xl font-bold text-amber-600 font-poppins">{stats.inProgress}</p>
                        </div>
                    </div>
                </div>

                {/* Selesai */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle className="w-7 h-7 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-urbanist">Selesai</p>
                            <p className="text-2xl font-bold text-green-600 font-poppins">{stats.completed}</p>
                        </div>
                    </div>
                </div>

                {/* Dibatalkan */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                            <XCircle className="w-7 h-7 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-urbanist">Dibatalkan</p>
                            <p className="text-2xl font-bold text-red-600 font-poppins">{stats.cancelled}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* General Info Card (Always show for non-empty or even empty for UX) */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-gray-800 font-semibold font-poppins mb-3">Status Pesanan</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg p-4 gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="text-gray-600 font-urbanist text-sm sm:text-base">
                            Anda memiliki pesanan yang sedang diproses. Pantau status pesanan Anda untuk informasi terbaru.
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard/orders')}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-primary/90 transition-colors whitespace-nowrap self-end sm:self-center"
                    >
                        Lihat Status
                    </button>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Aktivitas Terakhir */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Activity className="w-6 h-6 text-primary" />
                            <h3 className="text-lg font-bold text-gray-800 font-poppins">Aktivitas Terakhir</h3>
                        </div>
                        {userActivities.length > 0 && (
                            <span className="text-xs text-gray-400 font-urbanist">{userActivities.length} aktivitas</span>
                        )}
                    </div>

                    {/* Activity List */}
                    {userActivities.length === 0 ? (
                        <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-urbanist">Belum ada aktivitas</p>
                            <button
                                onClick={() => navigate('/dashboard/products')}
                                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-primary/90 transition-colors"
                            >
                                Mulai Belanja
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-3 flex-1 min-h-[240px]">
                                {paginatedActivities.map((activity) => (
                                    <ActivityItem
                                        key={activity.id}
                                        activity={activity}
                                        onClick={(orderId) => orderId && navigate('/dashboard/orders')}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex items-center gap-1">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`w-8 h-8 rounded-lg font-semibold font-urbanist text-sm ${currentPage === page ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-100'}`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Package className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-bold text-gray-800 font-poppins">Aksi Cepat</h3>
                    </div>

                    <div className="space-y-3">
                        <QuickActionCard
                            title="Lihat Produk"
                            description="Jelajahi produk terbaru"
                            icon={Package}
                            iconBg="bg-primary/10"
                            iconColor="text-primary"
                            onClick={() => navigate('/dashboard/products')}
                        />

                        <QuickActionCard
                            title="Pesanan Saya"
                            description="Pantau status pesanan"
                            icon={ShoppingCart}
                            iconBg="bg-amber-100"
                            iconColor="text-amber-600"
                            onClick={() => navigate('/dashboard/orders')}
                        />

                        <QuickActionCard
                            title="Riwayat Pesanan"
                            description="Lihat pesanan sebelumnya"
                            icon={CheckCircle}
                            iconBg="bg-green-100"
                            iconColor="text-green-600"
                            onClick={() => navigate('/dashboard/history')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
