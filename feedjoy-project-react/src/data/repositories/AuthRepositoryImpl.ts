// Auth Repository Implementation - Simplified
// Connects auth use cases with API services (NO mappers)

import type { User } from '../../domain/entities/User';
import type { LoginOutput } from '../../domain/usecases/auth/LoginUseCase';
import type { RegisterInput, RegisterOutput } from '../../domain/usecases/auth/RegisterUseCase';
import type { AuthRepository } from '../../domain/usecases/auth/LoginUseCase';
import AuthService from '../api/services/AuthService';

export class AuthRepositoryImpl implements AuthRepository {
    async login(email: string, password: string): Promise<LoginOutput> {
        const response = await AuthService.login({ email, password });

        if (!response.success) {
            throw new Error(response.message || 'Login failed');
        }

        // ✅ Directly return user (NO mapper needed)
        return {
            user: response.data.user,
            token: response.data.token,
        };
    }

    async register(data: RegisterInput): Promise<RegisterOutput> {
        const registerRequest = {
            name: data.name,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            phone: data.phone || '',
        };

        const response = await AuthService.register(registerRequest);

        if (!response.success) {
            throw new Error(response.message || 'Registration failed');
        }

        // ✅ Directly return user (NO mapper needed)
        return {
            user: response.data.user,
            token: response.data.token,
        };
    }

    async logout(): Promise<void> {
        await AuthService.logout();
    }

    async forgotPassword(email: string): Promise<{ message: string; resetToken?: string }> {
        const response = await AuthService.forgotPassword(email);

        if (!response.success) {
            throw new Error(response.message || 'Forgot password failed');
        }

        return {
            message: response.message,
            resetToken: response.data.reset_token,
        };
    }

    async resetPassword(data: { email: string; token: string; password: string; password_confirmation: string }): Promise<void> {
        const response = await AuthService.resetPassword(data);

        if (!response.success) {
            throw new Error(response.message || 'Reset password failed');
        }
    }

    async getProfile(): Promise<User> {
        const response = await AuthService.getProfile();

        if (!response.success) {
            throw new Error(response.message || 'Get profile failed');
        }

        return response.data;
    }

    async updateProfile(data: { name?: string; email?: string; phone?: string; password?: string; password_confirmation?: string }): Promise<User> {
        const response = await AuthService.updateProfile(data);

        if (!response.success) {
            throw new Error(response.message || 'Update profile failed');
        }

        return response.data;
    }

    async deleteAccount(): Promise<void> {
        const response = await AuthService.deleteAccount();

        if (!response.success) {
            throw new Error(response.message || 'Delete account failed');
        }
    }

    async changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void> {
        const response = await AuthService.changePassword({
            current_password: currentPassword,
            password: newPassword,  // Laravel expects 'password', not 'new_password'
            password_confirmation: newPasswordConfirmation,  // Laravel expects 'password_confirmation'
        });

        if (!response.success) {
            throw new Error(response.message || 'Change password failed');
        }
    }
}

// Singleton instance
export const authRepository = new AuthRepositoryImpl();
