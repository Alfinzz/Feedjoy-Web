// Error Message Mapper - Convert API errors to user-friendly messages
// Maps technical error messages to professional, user-friendly Indonesian messages

export function mapErrorMessage(errorMessage: string): string {
    // Normalize the error message to lowercase for easier matching
    const msg = errorMessage.toLowerCase();

    // Authentication errors
    if (msg.includes('credentials') || msg.includes('incorrect') || msg.includes('invalid credentials')) {
        return 'Email atau password yang Anda masukkan salah';
    }

    if (msg.includes('unauthorized') || msg.includes('unauthenticated')) {
        return 'Sesi Anda telah berakhir. Silakan login kembali';
    }

    if (msg.includes('token') && msg.includes('invalid')) {
        return 'Sesi tidak valid. Silakan login kembali';
    }

    if (msg.includes('token') && msg.includes('expired')) {
        return 'Sesi Anda telah berakhir. Silakan login kembali';
    }

    // Validation errors
    if (msg.includes('email') && (msg.includes('required') || msg.includes('wajib'))) {
        return 'Email harus diisi';
    }

    if (msg.includes('email') && (msg.includes('invalid') || msg.includes('format'))) {
        return 'Format email tidak valid';
    }

    if (msg.includes('email') && msg.includes('already') || msg.includes('taken')) {
        return 'Email sudah terdaftar. Silakan gunakan email lain';
    }

    if (msg.includes('password') && (msg.includes('required') || msg.includes('wajib'))) {
        return 'Password harus diisi';
    }

    if (msg.includes('password') && msg.includes('confirmation')) {
        return 'Konfirmasi password tidak cocok';
    }

    if (msg.includes('password') && msg.includes('min')) {
        return 'Password minimal 8 karakter';
    }

    if (msg.includes('password') && msg.includes('current')) {
        return 'Password lama tidak sesuai';
    }

    // User not found
    if (msg.includes('user') && (msg.includes('not found') || msg.includes('tidak ditemukan'))) {
        return 'Akun tidak ditemukan';
    }

    // Network errors
    if (msg.includes('network') || msg.includes('fetch') || msg.includes('terhubung')) {
        return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda';
    }

    if (msg.includes('timeout')) {
        return 'Koneksi timeout. Silakan coba lagi';
    }

    // Server errors
    if (msg.includes('server error') || msg.includes('500')) {
        return 'Terjadi kesalahan pada server. Silakan coba beberapa saat lagi';
    }

    if (msg.includes('service unavailable') || msg.includes('503')) {
        return 'Layanan sedang tidak tersedia. Silakan coba beberapa saat lagi';
    }

    // Rate limiting
    if (msg.includes('too many') || msg.includes('rate limit')) {
        return 'Terlalu banyak percobaan. Silakan tunggu beberapa saat';
    }

    // Forbidden / Permission errors
    if (msg.includes('forbidden') || msg.includes('403')) {
        return 'Anda tidak memiliki akses untuk melakukan tindakan ini';
    }

    // Not found
    if (msg.includes('not found') || msg.includes('404')) {
        return 'Data tidak ditemukan';
    }

    // Default: return sanitized message or fallback
    // Remove technical jargon but keep the message if it's already user-friendly
    if (errorMessage && errorMessage.length < 100 && !msg.includes('error') && !msg.includes('failed')) {
        return errorMessage;
    }

    return 'Terjadi kesalahan. Silakan coba lagi';
}
