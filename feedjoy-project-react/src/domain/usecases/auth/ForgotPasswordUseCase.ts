// Forgot Password Use Case
// Handles requesting password reset token

export interface ForgotPasswordInput {
    email: string;
}

export interface ForgotPasswordOutput {
    message: string;
    resetToken?: string; // Only in development
}

// Repository interface
export interface AuthRepository {
    forgotPassword(email: string): Promise<ForgotPasswordOutput>;
}

export class ForgotPasswordUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(input: ForgotPasswordInput): Promise<ForgotPasswordOutput> {
        const { email } = input;

        // Validate email
        if (!email || !email.includes('@')) {
            throw new Error('Email tidak valid');
        }

        if (email.length > 254) {
            throw new Error('Email terlalu panjang');
        }

        // Call repository
        return await this.authRepository.forgotPassword(email);
    }
}
