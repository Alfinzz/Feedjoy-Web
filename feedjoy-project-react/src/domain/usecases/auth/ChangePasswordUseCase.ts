// Change Password Use Case
// Allows users to update their password with validation

export interface AuthRepository {
    changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void>;
}

export class ChangePasswordUseCase {
    private authRepository: AuthRepository;

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository;
    }

    async execute(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void> {
        // Validation
        if (!currentPassword || currentPassword.trim() === '') {
            throw new Error('Password saat ini harus diisi');
        }

        if (!newPassword || newPassword.trim() === '') {
            throw new Error('Password baru harus diisi');
        }

        if (newPassword.length < 8) {
            throw new Error('Password baru minimal 8 karakter');
        }

        if (newPassword !== newPasswordConfirmation) {
            throw new Error('Konfirmasi password tidak cocok');
        }

        if (currentPassword === newPassword) {
            throw new Error('Password baru harus berbeda dari password saat ini');
        }

        // Call repository
        await this.authRepository.changePassword(currentPassword, newPassword, newPasswordConfirmation);
    }
}
