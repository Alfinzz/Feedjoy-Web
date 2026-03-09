// Admin Consultation List - Manage consultation requests from public
import {
    MessageSquare,
    Search,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { useConsultationList, statusTabs, animalTypes } from '../../hooks/admin/useConsultationList';
import ConsultationCard from '../../components/admin/ConsultationCard';
import ConsultationDeleteModal from '../../components/admin/ConsultationDeleteModal';

export default function AdminConsultationList() {
    const {
        consultations,
        searchQuery,
        setSearchQuery,
        statusFilter,
        animalFilter,
        deleteConsultation,
        currentPage,
        itemsPerPage,
        newCount,
        filteredConsultations,
        totalPages,
        paginatedConsultations,
        getStatusCount,
        handleStatusFilterChange,
        handleAnimalFilterChange,
        handleStatusChange,
        handleDelete,
        openWhatsApp,
        openDeleteModal,
        closeDeleteModal,
        goToPage,
        goToPreviousPage,
        goToNextPage
    } = useConsultationList();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 font-poppins flex items-center gap-2">
                        Permintaan Konsultasi
                        {newCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded-full">
                                {newCount} baru
                            </span>
                        )}
                    </h3>
                    <p className="text-sm text-gray-500 font-urbanist">{consultations.length} total permintaan</p>
                </div>
                {/* Search + Filter Dropdown */}
                <div className="flex items-center gap-3">
                    {/* Animal Filter Dropdown */}
                    <select
                        value={animalFilter}
                        onChange={(e) => handleAnimalFilterChange(e.target.value)}
                        className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm bg-white text-gray-700 cursor-pointer"
                    >
                        {animalTypes.map(animal => (
                            <option key={animal} value={animal}>
                                {animal === 'Semua' ? 'Semua Hewan' : animal}
                            </option>
                        ))}
                    </select>
                    {/* Search */}
                    <div className="relative sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari nama, telepon..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Status Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {statusTabs.map(tab => (
                    <button
                        key={tab.value}
                        onClick={() => handleStatusFilterChange(tab.value)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold font-urbanist text-sm whitespace-nowrap transition-all ${statusFilter === tab.value
                            ? 'bg-primary text-white'
                            : 'bg-white border border-gray-200 text-gray-600 hover:border-primary/30'
                            }`}
                    >
                        {tab.label}
                        <span className={`px-2 py-0.5 rounded-full text-xs ${statusFilter === tab.value
                            ? 'bg-white/20 text-white'
                            : 'bg-gray-100 text-gray-500'
                            }`}>
                            {getStatusCount(tab.value)}
                        </span>
                    </button>
                ))}
            </div>

            {/* Consultations List */}
            {filteredConsultations.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 font-poppins mb-2">
                        {searchQuery || statusFilter !== 'all' ? 'Tidak ditemukan' : 'Belum ada permintaan'}
                    </h3>
                    <p className="text-gray-500 font-urbanist">
                        {searchQuery ? 'Coba gunakan kata kunci lain' : 'Permintaan konsultasi akan muncul di sini'}
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {paginatedConsultations.map(consultation => (
                            <ConsultationCard
                                key={consultation.id}
                                consultation={consultation}
                                onStatusChange={handleStatusChange}
                                onWhatsApp={openWhatsApp}
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
                        Menampilkan {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredConsultations.length)} dari {filteredConsultations.length} permintaan
                    </div>
                </>
            )}

            {/* Delete Modal */}
            <ConsultationDeleteModal
                isOpen={!!deleteConsultation}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
            />
        </div>
    );
}
