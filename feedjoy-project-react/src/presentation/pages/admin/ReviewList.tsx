// Admin Review List - View and manage reviews from users
import {
    Star,
    Search,
    MessageSquare,
    AlertCircle,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useReviewList } from '../../hooks/admin/useReviewList';
import ReviewCard from '../../components/admin/ReviewCard';
import ReviewDeleteModal from '../../components/admin/ReviewDeleteModal';
import TestimonialModal from '../../components/admin/TestimonialModal';

export default function AdminReviewList() {
    const {
        reviews,
        searchQuery,
        setSearchQuery,
        ratingFilter,
        deleteReview,
        testimonialReview,
        currentPage,
        itemsPerPage,
        stats,
        filteredReviews,
        totalPages,
        paginatedReviews,
        handleFilterChange,
        handleDeleteReview,
        handleAddToTestimonial,
        closeDeleteModal,
        openTestimonialModal,
        closeTestimonialModal,
        openDeleteModal,
        goToPage,
        goToPreviousPage,
        goToNextPage
    } = useReviewList();

    const distributionColors = {
        5: 'from-green-400 to-emerald-500',
        4: 'from-lime-400 to-green-500',
        3: 'from-yellow-400 to-orange-400',
        2: 'from-orange-400 to-red-400',
        1: 'from-red-400 to-rose-500'
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins">Ulasan Produk</h3>
                    <p className="text-sm text-gray-500 font-urbanist">{reviews.length} ulasan dari pelanggan</p>
                </div>
                {/* Search */}
                <div className="relative sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari ulasan..."
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                    />
                </div>
            </div>

            {/* Stats Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Average Rating Card */}
                    <div className="lg:col-span-4 flex items-center gap-5">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <Star className="w-10 h-10 text-white fill-white" />
                        </div>
                        <div>
                            <p className="text-5xl font-bold text-gray-800 font-poppins">{stats.average}</p>
                            <p className="text-gray-500 font-urbanist text-sm">Rating rata-rata</p>
                            <p className="text-xs text-gray-400 font-urbanist mt-1">dari {stats.total} ulasan</p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block lg:col-span-1 flex justify-center">
                        <div className="w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent"></div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="lg:col-span-7">
                        <h4 className="font-bold text-gray-800 font-poppins mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                            Distribusi Rating
                        </h4>
                        <div className="space-y-3">
                            {stats.distribution.map(item => (
                                <div key={item.rating} className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleFilterChange(ratingFilter === item.rating ? 'all' : item.rating)}
                                        className={`flex items-center gap-1.5 min-w-[50px] transition-all ${ratingFilter === item.rating
                                            ? 'opacity-100 scale-105'
                                            : 'opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <span className="font-bold text-gray-700 font-urbanist">{item.rating}</span>
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    </button>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-gradient-to-r ${distributionColors[item.rating as keyof typeof distributionColors]} rounded-full transition-all duration-500`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 font-urbanist min-w-[60px] text-right font-medium">
                                        {item.count} <span className="text-gray-400">({item.percentage}%)</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Info */}
            {ratingFilter !== 'all' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl">
                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-yellow-700 font-urbanist">
                        Menampilkan review dengan rating {ratingFilter} bintang
                    </span>
                    <button
                        onClick={() => handleFilterChange('all')}
                        className="ml-auto text-sm text-yellow-700 font-semibold hover:underline"
                    >
                        Reset filter
                    </button>
                </div>
            )}

            {/* Reviews List */}
            {filteredReviews.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {searchQuery || ratingFilter !== 'all' ? 'Tidak ditemukan' : 'Belum ada ulasan'}
                    </h3>
                    <p className="text-gray-500 font-urbanist">
                        {searchQuery ? 'Coba gunakan kata kunci lain' : 'Ulasan dari pelanggan akan muncul di sini'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {paginatedReviews.map(review => (
                            <ReviewCard
                                key={review.id}
                                review={review}
                                onAddToTestimonial={openTestimonialModal}
                                onDelete={openDeleteModal}
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
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredReviews.length)} dari {filteredReviews.length} ulasan
                    </div>
                </>
            )}

            {/* Modals */}
            <ReviewDeleteModal
                isOpen={!!deleteReview}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteReview}
            />

            <TestimonialModal
                isOpen={!!testimonialReview}
                onClose={closeTestimonialModal}
                onConfirm={handleAddToTestimonial}
                review={testimonialReview}
            />
        </div>
    );
}
