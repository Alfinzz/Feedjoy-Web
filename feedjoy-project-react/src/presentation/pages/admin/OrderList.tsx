// Admin Order List - Order management with status updates and stats
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Package,
    Clock,
    Truck,
    TrendingUp,
    ShoppingBag
} from 'lucide-react';
import { useOrderList } from '../../hooks/admin/useOrderList';
import StatsCard from '../../components/admin/StatsCard';
import OrderCard from '../../components/admin/OrderCard';
import TrackingModal from '../../components/admin/TrackingModal';

export default function AdminOrderList() {
    const {
        searchQuery,
        setSearchQuery,
        expandedOrder,
        showTrackingModal,
        currentPage,
        itemsPerPage,
        stats,
        filteredOrders,
        totalPages,
        paginatedOrders,
        toggleExpandedOrder,
        handleStatusButtonClick,
        handleTrackingConfirm,
        closeTrackingModal,
        goToPage,
        goToPreviousPage,
        goToNextPage
    } = useOrderList();

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard icon={ShoppingBag} label="Total Pesanan" value={stats.total} color="bg-blue-50 text-blue-600" />
                <StatsCard icon={Clock} label="Menunggu Konfirmasi" value={stats.pending} color="bg-yellow-50 text-yellow-600" />
                <StatsCard icon={Truck} label="Dalam Pengiriman" value={stats.shipping} color="bg-purple-50 text-purple-600" />
                <StatsCard icon={TrendingUp} label="Selesai" value={stats.completed} color="bg-green-50 text-green-600" />
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Daftar Pesanan</h3>
                    <p className="text-sm text-gray-500 font-urbanist">{filteredOrders.length} pesanan</p>
                </div>
                {/* Search */}
                <div className="relative sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari ID, nama, produk..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                    />
                </div>
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {searchQuery ? 'Tidak ditemukan' : 'Belum ada pesanan'}
                    </h3>
                    <p className="text-gray-500 font-urbanist">
                        {searchQuery ? 'Coba gunakan kata kunci lain' : 'Pesanan baru akan muncul di sini'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-3">
                        {paginatedOrders.map(order => (
                            <OrderCard
                                key={order.id}
                                order={order}
                                isExpanded={expandedOrder === order.id}
                                onToggleExpand={toggleExpandedOrder}
                                onStatusChange={handleStatusButtonClick}
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
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredOrders.length)} dari {filteredOrders.length} pesanan
                    </div>
                </>
            )}

            {/* Tracking Number Modal */}
            <TrackingModal
                isOpen={showTrackingModal}
                onClose={closeTrackingModal}
                onConfirm={handleTrackingConfirm}
            />
        </div>
    );
}
