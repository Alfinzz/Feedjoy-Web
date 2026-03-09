// Reset Password Use Case
// Handles password reset with token

export interface ResetPasswordInput {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

// Repository interface
export interface AuthRepository {
    resetPassword(data: ResetPasswordInput): Promise<void>;
}

export class ResetPasswordUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(input: ResetPasswordInput): Promise<void> {
        const { email, token, password, password_confirmation } = input;

        // Validate email
        if (!email || !email.includes('@')) {
            throw new Error('Email tidak valid');
        }

        // Validate token
        if (!token || token.trim().length === 0) {
            throw new Error('Token reset diperlukan');
        }

        // Validate password
        if (!password || password.length < 8) {
            throw new Error('Password minimal 8 karakter');
        }

        if (password.length > 128) {
            throw new Error('Password maksimal 128 karakter');
        }

        // Validate password confirmation
        if (password !== password_confirmation) {
            throw new Error('Konfirmasi password tidak cocok');
        }

        // Call repository
        await this.authRepository.resetPassword(input);
    }
}
