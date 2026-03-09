// Login Use Case - Simplified
// Handles user login with validation

import type { User } from '../../entities/User';

export interface LoginInput {
    email: string;
    password: string;
}

export interface LoginOutput {
    user: User;
    token: string;
}

// Repository interface
export interface AuthRepository {
    login(email: string, password: string): Promise<LoginOutput>;
}

// ✅ Simple class - no complex interface
export class LoginUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(input: LoginInput): Promise<LoginOutput> {
        const { email, password } = input;

        // Validate input
        if (!email || !email.includes('@')) {
            throw new Error('Email tidak valid');
        }

        if (!password || password.length < 6) {
            throw new Error('Password minimal 6 karakter');
        }

        // Call repository
        return await this.authRepository.login(email, password);
    }
}
