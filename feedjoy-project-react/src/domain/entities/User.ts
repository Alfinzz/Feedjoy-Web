// Domain Entity - User
// Pure TypeScript interface, no framework dependencies

export type UserRole = 'user' | 'admin';

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: UserRole;
    password: string;
    created_at?: string;

}
