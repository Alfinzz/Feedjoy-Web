// Security Utilities - Input validation, sanitization, rate limiting

// ==================== Types ====================

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

export interface RateLimitResult {
    allowed: boolean;
    blockedFor?: number;
}

export interface PasswordStrength {
    score: number;
    label: string;
    color: string;
}

// ==================== Sanitization ====================

export function sanitizeEmail(email: string): string {
    return email.toLowerCase().trim().replace(/[<>]/g, '');
}

export function sanitizeName(name: string): string {
    return name.trim().replace(/[<>{}]/g, '').slice(0, 100);
}

export function sanitizePhone(phone: string): string {
    return phone.replace(/[^\d+\-\s]/g, '').slice(0, 20);
}

// ==================== Validation ====================

export function validateEmail(email: string): ValidationResult {
    if (!email) return { isValid: false, message: 'Email wajib diisi' };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return { isValid: false, message: 'Format email tidak valid' };
    if (email.length > 254) return { isValid: false, message: 'Email terlalu panjang' };
    return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
    if (!password) return { isValid: false, message: 'Password wajib diisi' };
    if (password.length < 8) return { isValid: false, message: 'Password minimal 8 karakter' };
    if (!/[A-Z]/.test(password)) return { isValid: false, message: 'Password harus mengandung huruf besar' };
    if (!/[a-z]/.test(password)) return { isValid: false, message: 'Password harus mengandung huruf kecil' };
    if (!/[0-9]/.test(password)) return { isValid: false, message: 'Password harus mengandung angka' };
    return { isValid: true };
}

export function validateName(name: string): ValidationResult {
    if (!name) return { isValid: false, message: 'Nama wajib diisi' };
    if (name.length < 2) return { isValid: false, message: 'Nama minimal 2 karakter' };
    if (name.length > 100) return { isValid: false, message: 'Nama maksimal 100 karakter' };
    return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
    if (!phone) return { isValid: false, message: 'Nomor telepon wajib diisi' };
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(phone.replace(/[\s\-]/g, ''))) {
        return { isValid: false, message: 'Format nomor telepon tidak valid' };
    }
    return { isValid: true };
}

// ==================== Rate Limiting ====================

const rateLimitStore: Record<string, { attempts: number; lastAttempt: number; blockedUntil?: number }> = {};

export function checkRateLimit(
    key: string,
    maxAttempts: number = 5,
    windowMs: number = 60000,
    blockDurationMs: number = 300000
): RateLimitResult {
    const now = Date.now();
    const record = rateLimitStore[key] || { attempts: 0, lastAttempt: 0 };

    if (record.blockedUntil && now < record.blockedUntil) {
        return { allowed: false, blockedFor: Math.ceil((record.blockedUntil - now) / 1000) };
    }

    if (now - record.lastAttempt > windowMs) {
        record.attempts = 0;
    }

    record.attempts++;
    record.lastAttempt = now;

    if (record.attempts > maxAttempts) {
        record.blockedUntil = now + blockDurationMs;
        rateLimitStore[key] = record;
        return { allowed: false, blockedFor: Math.ceil(blockDurationMs / 1000) };
    }

    rateLimitStore[key] = record;
    return { allowed: true };
}

export function resetRateLimit(key: string): void {
    delete rateLimitStore[key];
}

// ==================== Anti-Bot ====================

export function isHoneypotTriggered(value: string): boolean {
    return value.length > 0;
}

export async function randomDelay(min: number = 200, max: number = 500): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
}

// ==================== Password Strength ====================

export function calculatePasswordStrength(password: string): PasswordStrength {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    const levels: PasswordStrength[] = [
        { score: 0, label: 'Sangat Lemah', color: '#EF4444' },
        { score: 1, label: 'Lemah', color: '#F97316' },
        { score: 2, label: 'Cukup', color: '#EAB308' },
        { score: 3, label: 'Kuat', color: '#22C55E' },
        { score: 4, label: 'Sangat Kuat', color: '#16A34A' },
    ];

    return levels[Math.min(score, 4)];
}
