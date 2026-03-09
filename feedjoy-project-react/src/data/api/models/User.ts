// User Model - Represents user data from API

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'user' | 'admin';
    created_at?: string;
}
