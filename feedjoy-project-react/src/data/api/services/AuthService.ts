// Auth Service - Handles authentication API calls

import { api, setToken, removeToken } from '../client';
import type { ApiError } from '../client';
import type {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    ProfileResponse,
    UpdateProfileRequest,
    UpdateProfileResponse,
    DeleteAccountResponse,
    ChangePasswordRequest,
    ChangePasswordResponse,
} from '../responses/AuthResponse';

export type { ApiError };

// Login user
export async function login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    if (response.success && response.data.token) {
        setToken(response.data.token);
    }
    return response;
}

// Register user
export async function register(data: RegisterRequest): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/auth/register', data);
    if (response.success && response.data.token) {
        setToken(response.data.token);
    }
    return response;
}

// Logout user - Revoke token on server and clear local storage
export async function logout(): Promise<void> {
    try {
        // Call API to revoke token on server
        await api.post('/auth/logout', {}, true); // Empty body, requiresAuth = true
    } catch (error) {
        // Log error but continue with local cleanup
        console.error('Logout API error:', error);
    } finally {
        // Always remove token from client, even if API call fails
        removeToken();
    }
}

// Forgot Password - Request reset token
export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await api.post<ForgotPasswordResponse>(
        '/auth/forgot-password',
        { email },
        false // No auth required for forgot password
    );
    return response;
}

// Reset Password - Reset with token
export async function resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    const response = await api.post<ResetPasswordResponse>(
        '/auth/reset-password',
        data,
        false // No auth required for reset password
    );
    return response;
}

// Get Profile - Get current user's profile
export async function getProfile(): Promise<ProfileResponse> {
    return await api.get<ProfileResponse>('/auth/profile', true); // Auth required
}

// Update Profile - Update user profile
export async function updateProfile(data: UpdateProfileRequest): Promise<UpdateProfileResponse> {
    return await api.put<UpdateProfileResponse>('/auth/profile', data, true); // Auth required
}

// Delete Account - Delete user account
export async function deleteAccount(): Promise<DeleteAccountResponse> {
    return await api.delete<DeleteAccountResponse>('/auth/account', true); // Correct endpoint: /auth/account
}

// Change Password - Update user password
export async function changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return await api.put<ChangePasswordResponse>('/auth/profile', data, true); // Auth required - uses same endpoint as profile update
}

const AuthService = { login, register, logout, forgotPassword, resetPassword, getProfile, updateProfile, deleteAccount, changePassword };
export default AuthService;
