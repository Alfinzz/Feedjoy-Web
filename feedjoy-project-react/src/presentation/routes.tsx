// Routes Configuration - Centralized route definitions

import { Navigate } from 'react-router-dom';
import Home from './pages/public/Home';
import AuthLayout from './components/layouts/AuthLayout';
import AdminLayout from './components/layouts/AdminLayout';
import UserLayout from './components/layouts/UserLayout';
import LoginPage from './pages/public/Login';
import RegisterPage from './pages/public/Register';
import ForgotPasswordPage from './pages/public/ForgotPassword';
import ResetPasswordPage from './pages/public/ResetPassword';
import ProtectedRoute from './components/commons/ProtectedRoute';
import AuthGuard from './components/commons/AuthGuard';

// User Pages
import UserOverview from './pages/client/Overview';
import ProductList from './pages/client/ProductList';
import ProductDetail from './pages/client/ProductDetail';
import OrderList from './pages/client/OrderList';
import OrderHistory from './pages/client/OrderHistory';
import UserProfilePage from './pages/client/ProfilePage';
import UserChangePasswordPage from './pages/client/ChangePasswordPage';
import UserDeleteAccountPage from './pages/client/DeleteAccountPage';

// Admin Pages
import AdminOverview from './pages/admin/Overview';
import AdminProductList from './pages/admin/ProductList';
import AddProductPage from './pages/admin/AddProductPage';
import AdminOrderList from './pages/admin/OrderList';
import AdminUserList from './pages/admin/UserList';
import AdminReviewList from './pages/admin/ReviewList';
import AdminConsultationList from './pages/admin/ConsultationList';
import ProfilePage from './pages/admin/ProfilePage';
import ChangePasswordPage from './pages/admin/ChangePasswordPage';
import DeleteAccountPage from './pages/admin/DeleteAccountPage';

// Payment Pages (Standalone - no layout)
import QrisPaymentPage from './pages/client/QrisPaymentPage';
import PaymentSuccessPage from './pages/client/PaymentSuccessPage';

export const routes = [
    // Public routes
    {
        path: '/',
        element: <Home />,
    },

    // Auth routes (nested under AuthLayout) - Protected by AuthGuard
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { index: true, element: <Navigate to="login" replace /> },
            {
                path: 'login',
                element: (
                    <AuthGuard>
                        <LoginPage />
                    </AuthGuard>
                )
            },
            {
                path: 'register',
                element: (
                    <AuthGuard>
                        <RegisterPage />
                    </AuthGuard>
                )
            },
            {
                path: 'forgot-password',
                element: (
                    <AuthGuard>
                        <ForgotPasswordPage />
                    </AuthGuard>
                )
            },
            {
                path: 'reset-password',
                element: (
                    <AuthGuard>
                        <ResetPasswordPage />
                    </AuthGuard>
                )
            },
        ],
    },

    // Payment Routes (protected - user role, standalone without layout)
    {
        path: '/payment/:orderId',
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <QrisPaymentPage />
            </ProtectedRoute>
        ),
    },
    {
        path: '/payment/success/:orderId',
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <PaymentSuccessPage />
            </ProtectedRoute>
        ),
    },

    // User Routes (protected - user role) - Route-based navigation
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute allowedRoles={['user']}>
                <UserLayout />
            </ProtectedRoute>
        ),
        children: [
            // Redirect /dashboard to /dashboard/overview
            { index: true, element: <Navigate to="overview" replace /> },

            // Overview (Dashboard Homepage)
            { path: 'overview', element: <UserOverview /> },

            // Products
            { path: 'products', element: <ProductList /> },
            { path: 'products/:productId', element: <ProductDetail /> },

            // Orders
            { path: 'orders', element: <OrderList /> },

            // History
            { path: 'history', element: <OrderHistory /> },

            // Profile & Settings
            { path: 'profile', element: <UserProfilePage /> },
            { path: 'change-password', element: <UserChangePasswordPage /> },
            { path: 'delete-account', element: <UserDeleteAccountPage /> },
        ],
    },

    // Admin Routes (protected - admin role only) - Route-based navigation
    {
        path: '/admin',
        element: (
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            // Redirect /admin to /admin/overview
            { index: true, element: <Navigate to="overview" replace /> },

            // Overview
            { path: 'overview', element: <AdminOverview /> },

            // Products
            { path: 'products', element: <AdminProductList /> },
            { path: 'products/add', element: <AddProductPage /> },

            // Orders
            { path: 'orders', element: <AdminOrderList /> },

            // Users
            { path: 'users', element: <AdminUserList /> },

            // Reviews
            { path: 'reviews', element: <AdminReviewList /> },

            // Consultations
            { path: 'consultations', element: <AdminConsultationList /> },

            // Profile & Settings
            { path: 'profile', element: <ProfilePage /> },
            { path: 'change-password', element: <ChangePasswordPage /> },
            { path: 'delete-account', element: <DeleteAccountPage /> },

            // Legacy redirect: /admin/dashboard -> /admin/overview
            { path: 'dashboard', element: <Navigate to="/admin/overview" replace /> },
        ],
    },
];
