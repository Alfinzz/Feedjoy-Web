// useConsultationList Hook - Business logic for Admin Consultation List
import { useState } from 'react';
import { adminDataSource, type ConsultationRequest } from '../../../data/datasources/AdminDataSource';
import {
    AlertCircle,
    Phone,
    CheckCircle
} from 'lucide-react';

// Format date helper
export function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Get status info
export function getStatusInfo(status: ConsultationRequest['status']) {
    const statusMap = {
        new: { label: 'Baru', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle },
        contacted: { label: 'Sudah Dihubungi', color: 'bg-blue-100 text-blue-700', icon: Phone },
        completed: { label: 'Selesai', color: 'bg-green-100 text-green-700', icon: CheckCircle },
    };
    return statusMap[status];
}

// Animal type tags colors
export function getAnimalColor(animal: string) {
    const colors: Record<string, string> = {
        'Sapi': 'bg-blue-100 text-blue-700',
        'Ayam': 'bg-green-100 text-green-700',
        'Kambing': 'bg-amber-100 text-amber-700',
        'Domba': 'bg-purple-100 text-purple-700',
        'Bebek': 'bg-cyan-100 text-cyan-700',
        'Kelinci': 'bg-pink-100 text-pink-700',
    };
    return colors[animal] || 'bg-gray-100 text-gray-700';
}

// Status filter tabs
export const statusTabs: { value: ConsultationRequest['status'] | 'all'; label: string }[] = [
    { value: 'all', label: 'Semua' },
    { value: 'new', label: 'Baru' },
    { value: 'contacted', label: 'Sudah Dihubungi' },
    { value: 'completed', label: 'Selesai' },
];

// Animal type filter
export const animalTypes = ['Semua', 'Sapi', 'Ayam', 'Kambing', 'Domba', 'Bebek', 'Kelinci'] as const;

export function useConsultationList() {
    const [consultations, setConsultations] = useState<ConsultationRequest[]>(adminDataSource.getConsultations());
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<ConsultationRequest['status'] | 'all'>('all');
    const [animalFilter, setAnimalFilter] = useState<string>('Semua');
    const [deleteConsultation, setDeleteConsultation] = useState<ConsultationRequest | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Count new consultations
    const newCount = consultations.filter(c => c.status === 'new').length;

    // Filtered consultations
    const filteredConsultations = consultations.filter(consultation => {
        const matchesSearch =
            consultation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            consultation.phone.includes(searchQuery) ||
            consultation.animalType.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
        const matchesAnimal = animalFilter === 'Semua' || consultation.animalType === animalFilter;
        return matchesSearch && matchesStatus && matchesAnimal;
    });

    // Pagination
    const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);
    const paginatedConsultations = filteredConsultations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Get count for status tab
    const getStatusCount = (status: ConsultationRequest['status'] | 'all') => {
        return status === 'all'
            ? consultations.length
            : consultations.filter(c => c.status === status).length;
    };

    // Reset page when filter changes
    const handleStatusFilterChange = (status: ConsultationRequest['status'] | 'all') => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    const handleAnimalFilterChange = (animal: string) => {
        setAnimalFilter(animal);
        setCurrentPage(1);
    };

    // Handle status change
    const handleStatusChange = (id: number, newStatus: ConsultationRequest['status']) => {
        adminDataSource.updateConsultationStatus(id, newStatus);
        setConsultations(adminDataSource.getConsultations());
    };

    // Handle delete
    const handleDelete = () => {
        if (deleteConsultation) {
            adminDataSource.deleteConsultation(deleteConsultation.id);
            setConsultations(adminDataSource.getConsultations());
            setDeleteConsultation(null);
        }
    };

    // Open WhatsApp
    const openWhatsApp = (phone: string, name: string) => {
        const formattedPhone = phone.startsWith('0') ? '62' + phone.slice(1) : phone;
        const message = encodeURIComponent(
            `Halo ${name}, terima kasih telah menghubungi FeedJoy! Saya ingin menindaklanjuti permintaan konsultasi Anda.`
        );
        window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
    };

    // Modal handlers
    const openDeleteModal = (consultation: ConsultationRequest) => {
        setDeleteConsultation(consultation);
    };

    const closeDeleteModal = () => {
        setDeleteConsultation(null);
    };

    // Pagination
    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        setCurrentPage(p => Math.max(1, p - 1));
    };

    const goToNextPage = () => {
        setCurrentPage(p => Math.min(totalPages, p + 1));
    };

    return {
        // State
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
        // Handlers
        getStatusCount,
        handleStatusFilterChange,
        handleAnimalFilterChange,
        handleStatusChange,
        handleDelete,
        openWhatsApp,
        openDeleteModal,
        closeDeleteModal,
        // Pagination
        goToPage,
        goToPreviousPage,
        goToNextPage
    };
}
