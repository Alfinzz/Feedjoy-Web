// API Client - HTTP client for making API requests

const API_BASE_URL = 'http://localhost:8000/api';

// Token management
export function getToken(): string | null {
    return localStorage.getItem('auth_token');
}

export function setToken(token: string): void {
    localStorage.setItem('auth_token', token);
}

export function removeToken(): void {
    localStorage.removeItem('auth_token');
}

// API Error interface
export interface ApiError extends Error {
    statusCode: number;
    errors?: Record<string, string[]>;
}

export function createApiError(
    statusCode: number,
    message: string,
    errors?: Record<string, string[]>
): ApiError {
    const error = new Error(message) as ApiError;
    error.name = 'ApiError';
    error.statusCode = statusCode;
    error.errors = errors;
    return error;
}

// Request options
interface RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: unknown;
    requiresAuth?: boolean;
}

// Make API request
export async function apiRequest<T>(endpoint: string, options: RequestOptions): Promise<T> {
    const { method, body, requiresAuth = false } = options;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };

    if (requiresAuth) {
        const token = getToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    const config: RequestInit = { method, headers };
    if (body) config.body = JSON.stringify(body);

    let response: Response;

    try {
        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    } catch {
        throw createApiError(0, 'Tidak dapat terhubung ke server');
    }

    let data;
    try {
        data = await response.json();
    } catch {
        throw createApiError(response.status, 'Response tidak valid');
    }

    if (!response.ok) {
        throw createApiError(response.status, data.message || 'Terjadi kesalahan', data.errors);
    }

    return data as T;
}

// Convenience methods
export const api = {
    get: <T>(endpoint: string, requiresAuth = false) =>
        apiRequest<T>(endpoint, { method: 'GET', requiresAuth }),

    post: <T>(endpoint: string, body: unknown, requiresAuth = false) =>
        apiRequest<T>(endpoint, { method: 'POST', body, requiresAuth }),

    put: <T>(endpoint: string, body: unknown, requiresAuth = false) =>
        apiRequest<T>(endpoint, { method: 'PUT', body, requiresAuth }),

    delete: <T>(endpoint: string, requiresAuth = false) =>
        apiRequest<T>(endpoint, { method: 'DELETE', requiresAuth }),
};
