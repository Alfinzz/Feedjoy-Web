// Auth Response Types

import type { User } from '../models/User';

// Generic API Response
export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

// Auth Data
export interface AuthData {
    user: User;
    token: string;
}

// Response types
export type LoginResponse = ApiResponse<AuthData>;
export type RegisterResponse = ApiResponse<AuthData>;

// Request types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
}

// Forgot Password
export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordData {
    reset_token?: string;
    note?: string;
}

export type ForgotPasswordResponse = ApiResponse<ForgotPasswordData>;

// Reset Password
export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}

export interface ResetPasswordData {
    message?: string;
}

export type ResetPasswordResponse = ApiResponse<ResetPasswordData>;

// Get Profile
export type ProfileResponse = ApiResponse<User>;

// Update Profile
export interface UpdateProfileRequest {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
    password_confirmation?: string;
}

export type UpdateProfileResponse = ApiResponse<User>;

// Delete Account
export interface DeleteAccountData {
    message?: string;
}

export type DeleteAccountResponse = ApiResponse<DeleteAccountData>;

// Change Password
export interface ChangePasswordRequest {
    current_password: string;
    password: string;  // Laravel expects 'password' for new password
    password_confirmation: string;
}

export interface ChangePasswordData {
    message?: string;
}

export type ChangePasswordResponse = ApiResponse<ChangePasswordData>;
