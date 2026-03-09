// presentation/pages/client/ProductList.tsx
import { useEffect } from "react"; // 1. TAMBAHKAN INI
import { Loader2, Package, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useClientProductList } from "../../hooks/client/useClientProductList";
import ClientProductCard from "../../components/client/ClientProductCard";

export default function ProductList() {
    const {
        fetchProducts, // 2. AMBIL FUNGSI INI DARI HOOK
        isLoadingProducts,
        searchQuery,
        handleSearch,
        currentPage,
        handlePageChange,
        totalPages,
        paginatedProducts,
        filteredCount,
        handleViewDetail,
        handleDirectOrder,
    } = useClientProductList();

    // 3. JALANKAN INI AGAR DATA DIAMBIL SAAT HALAMAN DIBUKA
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (isLoadingProducts) {
        return (
            <div className="flex items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-gray-500 font-urbanist animate-pulse">Memuat produk dari database...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-800 font-poppins">Katalog Produk</h3>
                    <p className="text-sm text-gray-500 font-urbanist">
                        {filteredCount > 0 ? `${filteredCount} produk tersedia untuk Anda` : 'Mencari produk...'}
                    </p>
                </div>
                
                <div className="relative flex-1 sm:max-w-xs">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Cari pakan ayam, sapi..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm transition-all"
                    />
                </div>
            </div>

            {/* Grid */}
            {filteredCount === 0 ? (
                <div className="text-center py-20">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package className="w-12 h-12 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Produk Tidak Ditemukan</h3>
                    <p className="text-gray-500 font-urbanist max-w-xs mx-auto">
                        Maaf, produk "{searchQuery}" tidak tersedia. Coba cari dengan kata kunci lain.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedProducts.map((product) => (
                            <ClientProductCard
                                key={product.id}
                                product={product}
                                onViewDetail={() => handleViewDetail(product.id)}
                                onOrder={() => handleDirectOrder(product.id)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-3 mt-10 pt-8 border-t border-gray-50">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            
                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`w-10 h-10 rounded-xl font-bold font-urbanist text-sm transition-all ${
                                            currentPage === i + 1 
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                            : 'text-gray-500 hover:bg-gray-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}