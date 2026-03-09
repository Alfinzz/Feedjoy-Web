// Update Profile Use Case
// Updates user profile information with validation

import type { User } from '../../entities/User';

export interface UpdateProfileInput {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
}

// Repository interface
export interface AuthRepository {
    updateProfile(data: UpdateProfileInput): Promise<User>;
}

export class UpdateProfileUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(input: UpdateProfileInput): Promise<User> {
        const { name, email, phone: _phone, password, password_confirmation } = input;

        // Validate email if provided
        if (email && !email.includes('@')) {
            throw new Error('Email tidak valid');
        }

        if (email && email.length > 254) {
            throw new Error('Email terlalu panjang');
        }

        // Validate name if provided
        if (name !== undefined && name.trim().length < 2) {
            throw new Error('Nama minimal 2 karakter');
        }

        if (name && name.length > 100) {
            throw new Error('Nama maksimal 100 karakter');
        }

        // Validate password if provided
        if (password) {
            if (password.length < 8) {
                throw new Error('Password minimal 8 karakter');
            }

            if (password.length > 128) {
                throw new Error('Password maksimal 128 karakter');
            }

            if (password !== password_confirmation) {
                throw new Error('Konfirmasi password tidak cocok');
            }
        }

        // Call repository
        return await this.authRepository.updateProfile(input);
    }
}
