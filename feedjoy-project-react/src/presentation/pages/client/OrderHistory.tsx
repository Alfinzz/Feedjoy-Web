// Order History Page - Timeline split layout design
import {
    Trash2,
    History,
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";
import { useOrderHistory, sortOptions } from "../../hooks/client/useOrderHistory";
import HistoryTimelineItem from "../../components/client/HistoryTimelineItem";
import ClientDeleteModal from "../../components/client/ClientDeleteModal";

export default function OrderHistory() {
    const {
        completedOrders,
        filteredOrders,
        paginatedOrders,
        sortBy,
        showSortDropdown,
        deleteOrderId,
        showDeleteAllModal,
        searchQuery,
        currentPage,
        totalPages,
        ordersPerPage,
        currentSortLabel,
        handleDeleteOrder,
        handleDeleteAll,
        handleSortChange,
        handleSearchChange,
        goToPage,
        goToPreviousPage,
        goToNextPage,
        toggleSortDropdown,
        closeSortDropdown,
        openDeleteOrderModal,
        closeDeleteOrderModal,
        openDeleteAllModal,
        closeDeleteAllModal,
        fetchHistory
    } = useOrderHistory();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden p-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Riwayat Pesanan</h3>
                    <p className="text-sm text-gray-500 font-urbanist">{completedOrders.length} pesanan selesai</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Cari riwayat..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                        />
                    </div>

                    {/* Sort Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleSortDropdown}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-urbanist text-gray-700 hover:border-primary/50 transition-colors"
                        >
                            <ArrowUpDown className="w-4 h-4 text-gray-400" />
                            <span className="hidden sm:inline">{currentSortLabel}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {showSortDropdown && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={closeSortDropdown}
                                />
                                <div className="absolute top-full right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20">
                                    {sortOptions.map(option => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleSortChange(option.value)}
                                            className={`w-full px-4 py-2.5 text-left text-sm font-urbanist transition-colors ${sortBy === option.value
                                                ? 'bg-primary/10 text-primary font-semibold'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Delete All Button */}
                    {completedOrders.length > 0 && (
                        <button
                            onClick={openDeleteAllModal}
                            className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl text-sm font-semibold font-urbanist transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="hidden sm:inline">Hapus Semua</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Order List - Timeline Style */}
            {filteredOrders.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        {searchQuery ? <Search className="w-10 h-10 text-gray-400" /> : <History className="w-10 h-10 text-gray-400" />}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {completedOrders.length === 0 ? "Belum ada riwayat" : "Tidak ditemukan"}
                    </h3>
                    <p className="text-gray-500 font-urbanist">
                        {completedOrders.length === 0
                            ? "Riwayat pesanan yang sudah selesai akan muncul di sini"
                            : `Tidak ada riwayat dengan kata kunci "${searchQuery}"`}
                    </p>
                </div>
            ) : (
                <>
                    {/* Timeline Container */}
                    <div className="space-y-4">
                        {paginatedOrders.map((order, index) => (
                            <HistoryTimelineItem
                                key={order.id}
                                order={order}
                                isLast={index === paginatedOrders.length - 1}
                                onDelete={openDeleteOrderModal}
                                fetchHistory={fetchHistory}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-6 mt-6 border-t border-gray-100">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`w-10 h-10 rounded-xl font-semibold font-urbanist text-sm ${currentPage === page ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 font-urbanist mt-4">
                        Menampilkan {((currentPage - 1) * ordersPerPage) + 1}-{Math.min(currentPage * ordersPerPage, filteredOrders.length)} dari {filteredOrders.length} riwayat
                    </p>
                </>
            )}

            {/* Delete Single Order Modal */}
            <ClientDeleteModal
                isOpen={deleteOrderId !== null}
                onClose={closeDeleteOrderModal}
                onConfirm={handleDeleteOrder}
                title="Hapus Riwayat?"
                message="Riwayat pesanan ini akan dihapus permanen. Yakin ingin melanjutkan?"
            />

            {/* Delete All Modal */}
            <ClientDeleteModal
                isOpen={showDeleteAllModal}
                onClose={closeDeleteAllModal}
                onConfirm={handleDeleteAll}
                title="Hapus Semua Riwayat?"
                message={`Semua ${completedOrders.length} riwayat pesanan akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
            />
        </div>
    );
}
