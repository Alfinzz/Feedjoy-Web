// Register Use Case - Simplified
// Handles user registration with validation

import type { User } from '../../entities/User';

export interface RegisterInput {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone?: string;
}

export interface RegisterOutput {
    user: User;
    token: string;
}

// Repository interface
export interface AuthRepository {
    register(data: RegisterInput): Promise<RegisterOutput>;
}

// ✅ Simple class
export class RegisterUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(input: RegisterInput): Promise<RegisterOutput> {
        const { name, email, password, password_confirmation } = input;

        // Validate input
        if (!name || name.length < 2) {
            throw new Error('Nama minimal 2 karakter');
        }

        if (!email || !email.includes('@')) {
            throw new Error('Email tidak valid');
        }

        if (!password || password.length < 6) {
            throw new Error('Password minimal 6 karakter');
        }

        if (password !== password_confirmation) {
            throw new Error('Password tidak cocok');
        }

        // Call repository
        return await this.authRepository.register(input);
    }
}
