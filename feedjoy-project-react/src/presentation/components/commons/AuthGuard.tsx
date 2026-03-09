// Auth Guard - Redirects authenticated users away from auth pages
// Prevents logged-in users from accessing login, register, forgot-password pages

import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getRedirectPath } from '../../utils/authHelpers';

interface AuthGuardProps {
    children: ReactNode;
}

/**
 * AuthGuard Component
 * Redirects authenticated users to their appropriate dashboard
 * Allows unauthenticated users to access auth pages (login, register, etc.)
 * 
 * NOTE: Removed fullscreen loading to prevent interference with login form error display
 */
export default function AuthGuard({ children }: AuthGuardProps) {
    const { isAuthenticated, user } = useAuth();

    // If user is authenticated, redirect to their dashboard
    if (isAuthenticated && user) {
        const redirectPath = getRedirectPath(user.role);
        return <Navigate to={redirectPath} replace />;
    }

    // User is not authenticated, allow access to auth pages
    // No loading overlay - let the form handle its own loading state
    return <>{children}</>;
}
