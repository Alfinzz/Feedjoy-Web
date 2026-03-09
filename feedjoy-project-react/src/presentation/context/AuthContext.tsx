// Auth Context - Simplified (Fixed Imports)

import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../../domain/entities/User';
import { LoginUseCase } from '../../domain/usecases/auth/LoginUseCase';
import { RegisterUseCase } from '../../domain/usecases/auth/RegisterUseCase';
import { LogoutUseCase } from '../../domain/usecases/auth/LogoutUseCase';
import { authRepository } from '../../data/repositories/AuthRepositoryImpl';
import { getProfile } from '../../data/api/services/AuthService';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isLoggingOut: boolean;
    login: (email: string, password: string) => Promise<User>;
    register: (data: any) => Promise<User>;
    logout: () => Promise<void>;
    resetLoggingOutState: () => void; // NEW: Reset isLoggingOut manually
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // NEW
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const validateToken = async () => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                try {
                    // Validate token with server
                    const response = await getProfile();
                    if (response.success && response.data) {
                        setUser(response.data);
                        // Update stored user data with fresh data from server
                        localStorage.setItem('auth_user', JSON.stringify(response.data));
                        // Reset logging out state in case page was refreshed during logout
                        setIsLoggingOut(false);
                    }
                } catch (error) {
                    // Token invalid or expired, clear storage
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('auth_user');
                    localStorage.removeItem('auth_token');
                    setUser(null);
                    // Also reset logging out state
                    setIsLoggingOut(false);
                }
            }
            setIsLoading(false);
        };

        validateToken();
    }, []);

    const login = async (email: string, password: string): Promise<User> => {
        setIsLoading(true);
        setError(null);
        try {
            const useCase = new LoginUseCase(authRepository);
            const result = await useCase.execute({ email, password });

            setUser(result.user);
            localStorage.setItem('auth_user', JSON.stringify(result.user));
            localStorage.setItem('auth_token', result.token);

            // Reset logging out state in case it was stuck from previous logout
            setIsLoggingOut(false);

            return result.user;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Login failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: any): Promise<User> => {
        setIsLoading(true);
        setError(null);
        try {
            const useCase = new RegisterUseCase(authRepository);
            const result = await useCase.execute(data);

            // Don't auto-login after registration
            // User must login manually after registering
            return result.user;
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Registration failed';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoggingOut(true);
        try {
            // Clear local state FIRST (optimistic update)
            // User is logged out immediately even if API fails
            setUser(null);
            localStorage.removeItem('auth_user');
            localStorage.removeItem('auth_token');

            // Then notify server to invalidate session
            const useCase = new LogoutUseCase(authRepository);
            await useCase.execute();
        } catch (error) {
            // Log error but don't restore user state
            // Local logout already happened, which is what user wants
            console.error('Logout API error:', error);
        }
        // NOTE: Don't reset isLoggingOut here - let the caller handle it
        // after navigation to prevent modal flash
    };

    const clearError = () => setError(null);

    const resetLoggingOutState = () => {
        setIsLoggingOut(false);
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        isLoggingOut,
        login,
        register,
        logout,
        resetLoggingOutState,
        error,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
