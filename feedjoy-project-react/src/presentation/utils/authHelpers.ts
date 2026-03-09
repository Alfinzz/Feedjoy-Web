// Authentication Helper Utilities
// Centralized functions for role-based authentication logic

import type { UserRole } from '../../domain/entities/User';

/**
 * Get the redirect path based on user role
 * @param role - User's role (admin or user)
 * @returns The appropriate dashboard path
 */
export function getRedirectPath(role: UserRole): string {
    switch (role) {
        case 'admin':
            return '/admin/dashboard';
        case 'user':
            return '/dashboard';
        default:
            return '/dashboard';
    }
}

/**
 * Check if user has the required role to access a route
 * @param userRole - Current user's role
 * @param allowedRoles - Array of roles that are allowed to access the route (undefined = all authenticated users)
 * @returns true if user has required role, false otherwise
 */
export function hasRequiredRole(
    userRole: UserRole,
    allowedRoles?: UserRole[]
): boolean {
    // If no specific roles required, any authenticated user can access
    if (!allowedRoles || allowedRoles.length === 0) {
        return true;
    }

    // Check if user's role is in the allowed roles
    return allowedRoles.includes(userRole);
}

/**
 * Get user-friendly error message for unauthorized access
 * @param allowedRoles - Roles that are allowed
 * @returns Error message
 */
export function getUnauthorizedMessage(
    allowedRoles?: UserRole[]
): string {
    if (!allowedRoles || allowedRoles.length === 0) {
        return 'Anda tidak memiliki akses ke halaman ini.';
    }

    if (allowedRoles.includes('admin')) {
        return 'Halaman ini hanya dapat diakses oleh Administrator.';
    }

    return `Halaman ini hanya dapat diakses oleh: ${allowedRoles.join(', ')}.`;
}
