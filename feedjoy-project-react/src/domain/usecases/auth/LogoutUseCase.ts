// Logout Use Case - Simplified
// Handles user logout

// Repository interface
export interface AuthRepository {
    logout(): Promise<void>;
}

export class LogoutUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<void> {
        // Clear session and tokens
        await this.authRepository.logout();
    }
}
