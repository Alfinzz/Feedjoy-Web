// Admin Product List - Product listing with route-based navigation
import {
    Plus,
    Package,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useProductList } from '../../hooks/admin/useProductList';
import Toast from '../../components/commons/Toast';
import ProductCard from '../../components/admin/ProductCard';
import EditConfirmModal from '../../components/admin/EditConfirmModal';
import EditProductModal from '../../components/admin/EditProductModal';
import DeleteModal from '../../components/admin/DeleteModal';

export default function AdminProductList() {
    const {
        products,
        searchQuery,
        setSearchQuery,
        pendingEditProduct,
        editingProduct,
        showEditModal,
        deleteProduct,
        currentPage,
        toast,
        itemsPerPage,
        filteredProducts,
        totalPages,
        paginatedProducts,
        navigateToAddProduct,
        openEditConfirm,
        closeEditConfirm,
        handleConfirmEdit,
        closeEditModal,
        handleEditProduct,
        openDeleteConfirm,
        closeDeleteConfirm,
        handleDeleteProduct,
        goToPage,
        goToPreviousPage,
        goToNextPage
    } = useProductList();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Daftar Produk</h3>
                    <p className="text-sm text-gray-500 font-urbanist">{products.length} produk tersedia</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari produk..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                        />
                    </div>
                    <button
                        onClick={navigateToAddProduct}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Tambah Produk</span>
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {searchQuery ? 'Tidak ditemukan' : 'Belum ada produk'}
                    </h3>
                    <p className="text-gray-500 font-urbanist mb-4">
                        {searchQuery ? 'Coba gunakan kata kunci lain' : 'Mulai dengan menambahkan produk pertama'}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={navigateToAddProduct}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90"
                        >
                            <Plus className="w-5 h-5" />
                            Tambah Produk
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {paginatedProducts.map(product => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={openEditConfirm}
                                onDelete={openDeleteConfirm}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            <button onClick={goToPreviousPage} disabled={currentPage === 1} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button key={page} onClick={() => goToPage(page)} className={`w-10 h-10 rounded-xl font-semibold font-urbanist text-sm ${currentPage === page ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                                        {page}
                                    </button>
                                ))}
                            </div>
                            <button onClick={goToNextPage} disabled={currentPage === totalPages} className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className="text-center text-sm text-gray-400 font-urbanist">
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} dari {filteredProducts.length} produk
                    </div>
                </>
            )}

            {/* Modals */}
            <EditConfirmModal isOpen={!!pendingEditProduct} onClose={closeEditConfirm} onConfirm={handleConfirmEdit} productName={pendingEditProduct?.name || ''} />
            <EditProductModal isOpen={showEditModal} onClose={closeEditModal} product={editingProduct} onSave={handleEditProduct} />
            <DeleteModal isOpen={!!deleteProduct} onClose={closeDeleteConfirm} onConfirm={handleDeleteProduct} productName={deleteProduct?.name || ''} />
            <Toast message={toast.message} isVisible={toast.visible} variant={toast.type === 'success' ? 'success' : 'error'} />
        </div>
    );
}
