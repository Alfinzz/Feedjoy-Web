// Delete Account Use Case
// Permanently deletes user account

export interface AuthRepository {
    deleteAccount(): Promise<void>;
}

export class DeleteAccountUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(): Promise<void> {
        // Delete account through repository
        await this.authRepository.deleteAccount();

        // Note: Token cleanup and logout will be handled in the presentation layer
        // after successful deletion
    }
}
