// Formatters - Currency, date, and status label utilities

import type { OrderStatus } from '../../domain/entities/Order';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
export function getImageUrl(path?: string | null): string {
    const placeholder = 'https://via.placeholder.com/500x500?text=No+Image';
    if (!path) return placeholder;
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith('/')) return `${window.location.origin}${path}`;
    return `${window.location.origin}/${path}`;
}
export function formatDate(dateString: string | null | undefined): string {
    // Validasi jika data kosong atau tidak valid
    if (!dateString || dateString === "") {
        return "Tanggal tidak tersedia";
    }

    const date = new Date(dateString);

    // Cek apakah hasil konversi valid
    if (isNaN(date.getTime())) {
        return "Format tanggal salah";
    }

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function getStatusColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
        pending: 'bg-yellow-100 text-yellow-700',
        processing: 'bg-blue-100 text-blue-700',
        shipped: 'bg-purple-100 text-purple-700',
        completed: 'bg-emerald-100 text-emerald-700',
        cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
}

export function getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
        pending: 'Menunggu Konfirmasi',
        processing: 'Dikonfirmasi',
        shipped: 'Sedang Dikirim',
        completed: 'Selesai',
        cancelled: 'Dibatalkan',
    };
    return labels[status] || status;
}
