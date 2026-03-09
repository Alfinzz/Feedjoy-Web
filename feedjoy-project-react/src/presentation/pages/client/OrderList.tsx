// Order List - Clean design with expandable details and review management
import { useNavigate } from 'react-router-dom';
import {
    ShoppingBag,
    Search,
    RefreshCw,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    ArchiveX,
    Clock,
    CheckCircle,
    XCircle,
    Package
} from 'lucide-react';
import { useClientOrderList } from '../../hooks/client/useClientOrderList';
import ClientOrderCard from '../../components/client/ClientOrderCard';
import ClientDeleteModal from '../../components/client/ClientDeleteModal';

export default function OrderList() {
    const navigate = useNavigate();
    const {
        orders,
        expandedOrder,
        editingOrderId,
        formData,
        deleteReviewId,
        isEditMode,
        activeTab,
        searchQuery,
        isRefreshing,
        currentPage,
        showDeleteCompletedModal,
        ordersPerPage,
        activeOrders,
        completedOrders,
        cancelledOrders,
        currentOrders,
        totalPages,
        paginatedOrders,
        hasNoOrders,
        getOrderReview,
        toggleExpand,
        handleRefresh,
        handleDeleteCompletedOrders,
        handleStartEdit,
        handleSaveReview,
        handleDeleteReview,
        handleStartWriteReview,
        handleCancelReview,
        updateFormRating,
        updateFormComment,
        handleTabChange,
        handleSearchChange,
        goToPage,
        goToPreviousPage,
        goToNextPage,
        openDeleteCompletedModal,
        closeDeleteCompletedModal,
        openDeleteReviewModal,
        closeDeleteReviewModal
    } = useClientOrderList();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden p-6">
            {/* Header with Search & Actions */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Daftar Pesanan</h3>
                    <p className="text-sm text-gray-500 font-urbanist">{orders.length} pesanan tercatat</p>
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
                            placeholder="Cari pesanan..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                        />
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-primary transition-colors disabled:opacity-50"
                        title="Refresh pesanan"
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>

                    {/* Delete Completed Button */}
                    {completedOrders.length > 0 && (
                        <button
                            onClick={openDeleteCompletedModal}
                            className="flex items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl text-sm font-semibold font-urbanist transition-colors"
                            title="Hapus semua pesanan selesai"
                        >
                            <ArchiveX className="w-4 h-4" />
                            <span className="hidden sm:inline">Hapus Selesai</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Tabs */}
            {!hasNoOrders && (
                <div className="mb-6">
                    <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
                        <button
                            onClick={() => handleTabChange('active')}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-urbanist transition-all flex items-center justify-center gap-2 ${activeTab === 'active' ? 'bg-white text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <Clock className="w-4 h-4" />
                            Aktif
                            {activeOrders.length > 0 && (
                                <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                                    {activeOrders.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleTabChange('completed')}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-urbanist transition-all flex items-center justify-center gap-2 ${activeTab === 'completed' ? 'bg-white text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <CheckCircle className="w-4 h-4" />
                            Selesai
                            {completedOrders.length > 0 && (
                                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                                    {completedOrders.length}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleTabChange('cancelled')}
                            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium font-urbanist transition-all flex items-center justify-center gap-2 ${activeTab === 'cancelled' ? 'bg-white text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            <XCircle className="w-4 h-4" />
                            Dibatalkan
                            {cancelledOrders.length > 0 && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                                    {cancelledOrders.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Content */}
            <div>
                {hasNoOrders ? (
                    <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 font-poppins mb-2">Belum Ada Pesanan</h3>
                        <p className="text-gray-500 font-urbanist max-w-sm mx-auto mb-6">
                            Pesanan Anda akan muncul di sini setelah Anda melakukan pembelian produk.
                        </p>
                        <button
                            onClick={() => navigate('/dashboard/products')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Mulai Belanja
                        </button>
                    </div>
                ) : currentOrders.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            {searchQuery ? <Search className="w-8 h-8 text-gray-400" /> : <Package className="w-8 h-8 text-gray-400" />}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-1">
                            {searchQuery ? 'Tidak Ditemukan' : 'Tidak Ada Pesanan'}
                        </h3>
                        <p className="text-gray-500 font-urbanist text-sm">
                            {searchQuery
                                ? `Tidak ada pesanan dengan kata kunci "${searchQuery}"`
                                : activeTab === 'active' ? 'Tidak ada pesanan yang sedang diproses.'
                                    : activeTab === 'completed' ? 'Belum ada pesanan yang selesai.'
                                        : 'Tidak ada pesanan yang dibatalkan.'}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {activeTab === 'completed' && (
                                <p className="text-sm text-gray-500 font-urbanist">
                                    Klik pesanan untuk melihat detail dan menambahkan ulasan
                                </p>
                            )}
                            {paginatedOrders.map(order => (
                                <ClientOrderCard
                                    key={order.id}
                                    order={order}
                                    review={getOrderReview(order.id)}
                                    isExpanded={expandedOrder === order.id}
                                    isEditing={editingOrderId === order.id}
                                    isEditMode={isEditMode}
                                    formData={formData}
                                    onToggleExpand={toggleExpand}
                                    onStartEdit={handleStartEdit}
                                    onStartWriteReview={handleStartWriteReview}
                                    onCancelReview={handleCancelReview}
                                    onSaveReview={handleSaveReview}
                                    onDeleteReview={openDeleteReviewModal}
                                    onUpdateRating={updateFormRating}
                                    onUpdateComment={updateFormComment}
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
                            Menampilkan {((currentPage - 1) * ordersPerPage) + 1}-{Math.min(currentPage * ordersPerPage, currentOrders.length)} dari {currentOrders.length} pesanan
                        </p>
                    </>
                )}
            </div>

            {/* Delete Review Modal */}
            <ClientDeleteModal
                isOpen={deleteReviewId !== null}
                onClose={closeDeleteReviewModal}
                onConfirm={handleDeleteReview}
                title="Hapus Ulasan?"
                message="Ulasan yang dihapus tidak dapat dikembalikan. Yakin ingin melanjutkan?"
            />

            {/* Delete Completed Orders Modal */}
            <ClientDeleteModal
                isOpen={showDeleteCompletedModal}
                onClose={closeDeleteCompletedModal}
                onConfirm={handleDeleteCompletedOrders}
                title="Hapus Pesanan Selesai?"
                message={`Semua ${completedOrders.length} pesanan yang sudah selesai akan dihapus permanen. Tindakan ini tidak dapat dibatalkan.`}
                icon={<ArchiveX className="w-8 h-8 text-red-600" />}
            />
        </div>
    );
}
