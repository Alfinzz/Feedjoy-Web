// User Layout - Horizontal navigation layout for all user pages
import { useState, useRef, useEffect, useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import {
    Package,
    ShoppingCart,
    History,
    LogOut,
    Sprout,
    ChevronRight,
    User,
    Key,
    Trash2,
    Menu,
    X
} from 'lucide-react';
import LogoutModal from '../../components/commons/LogoutModal';
import { useProducts } from '../../hooks/useProducts';

// Main menu items (horizontal navbar)
interface MenuItem {
    path: string;
    label: string;
    icon: typeof Package;
}

const mainMenuItems: MenuItem[] = [
    { path: '/dashboard/overview', label: 'Dashboard', icon: Package },
    { path: '/dashboard/products', label: 'Produk', icon: Package },
    { path: '/dashboard/orders', label: 'Pesanan', icon: ShoppingCart },
    { path: '/dashboard/history', label: 'Riwayat', icon: History },
];

// Breadcrumb configuration
interface BreadcrumbItem {
    label: string;
    path?: string;
}

const getBreadcrumbs = (pathname: string, productName?: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];

    if (pathname === '/dashboard/profile') {
        breadcrumbs.push({ label: 'Dashboard', path: '/dashboard/overview' });
        breadcrumbs.push({ label: 'Profile' });
    } else if (pathname === '/dashboard/change-password') {
        breadcrumbs.push({ label: 'Dashboard', path: '/dashboard/overview' });
        breadcrumbs.push({ label: 'Ganti Password' });
    } else if (pathname === '/dashboard/delete-account') {
        breadcrumbs.push({ label: 'Dashboard', path: '/dashboard/overview' });
        breadcrumbs.push({ label: 'Hapus Akun' });
    } else if (pathname.startsWith('/dashboard/products/')) {
        // Product detail page - show product name in breadcrumb
        breadcrumbs.push({ label: 'Produk', path: '/dashboard/products' });
        breadcrumbs.push({ label: productName || 'Detail Produk' });
    }

    return breadcrumbs;
};

// Get page title based on pathname
const getPageTitle = (pathname: string): string => {
    if (pathname === '/dashboard/products') return 'Produk';
    if (pathname.startsWith('/dashboard/products/')) return 'Detail Produk';
    if (pathname === '/dashboard/orders') return 'Pesanan Saya';
    if (pathname === '/dashboard/history') return 'Riwayat Pesanan';
    if (pathname === '/dashboard/profile') return 'Profile';
    if (pathname === '/dashboard/change-password') return 'Ganti Password';
    if (pathname === '/dashboard/delete-account') return 'Hapus Akun';
    return 'Dashboard';
};

export default function UserLayout() {
    const { user, logout, isLoggingOut, resetLoggingOutState } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userPopoverOpen, setUserPopoverOpen] = useState(false);
    const userPopoverRef = useRef<HTMLDivElement>(null);

    // Check if current page is dashboard/overview
    const isDashboard = location.pathname === '/dashboard/overview' || location.pathname === '/dashboard';

    // Check if current page is profile-related (needs white container)
    const isProfilePage = ['/dashboard/profile', '/dashboard/change-password', '/dashboard/delete-account'].includes(location.pathname);

    // Get product name for breadcrumb on product detail page
    const { products } = useProducts();
    const productName = useMemo(() => {
        if (location.pathname.startsWith('/dashboard/products/')) {
            const productId = location.pathname.split('/').pop();
            const product = products.find(p => String(p.id) === productId);
            return product?.name;
        }
        return undefined;
    }, [location.pathname, products]);

    // Get breadcrumbs for current page
    const breadcrumbs = getBreadcrumbs(location.pathname, productName);
    const pageTitle = getPageTitle(location.pathname);

    // Close popovers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userPopoverRef.current && !userPopoverRef.current.contains(event.target as Node)) {
                setUserPopoverOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset isLoggingOut when navigating away
    useEffect(() => {
        if (isLoggingOut && !location.pathname.startsWith('/dashboard')) {
            resetLoggingOutState();
        }
    }, [location.pathname, isLoggingOut, resetLoggingOutState]);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
        setUserPopoverOpen(false);
    };

    const handleLogoutConfirm = async () => {
        try {
            await logout();
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout error:', error);
            resetLoggingOutState();
        } finally {
            setShowLogoutModal(false);
        }
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    const isActive = (path: string) => {
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    // Get user initials
    const getUserInitials = () => {
        if (!user?.name) return 'U';
        const names = user.name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5]">
            {/* Dashboard Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-18">
                        {/* Logo */}
                        <Link to="/dashboard/overview" className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-xl shadow-md">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins">
                                FeedJoy
                            </span>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1">
                            {mainMenuItems.map((item) => {
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`px-4 py-2 rounded-lg text-base font-medium font-urbanist transition-all ${active
                                            ? "text-primary bg-primary/10"
                                            : "text-gray-600 hover:text-primary hover:bg-gray-50"
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right Side - User Avatar with Popover */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>

                            {/* User Avatar with Popover */}
                            <div className="relative" ref={userPopoverRef}>
                                <button
                                    onClick={() => setUserPopoverOpen(!userPopoverOpen)}
                                    className="w-10 h-10 bg-gradient-to-br from-primary to-teal-500 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all hover:scale-105"
                                >
                                    <span className="text-white font-bold font-poppins text-sm">
                                        {getUserInitials()}
                                    </span>
                                </button>

                                {/* User Popover Dropdown */}
                                {userPopoverOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="font-semibold text-gray-800 font-poppins text-sm">{user?.name || 'User'}</p>
                                            <p className="text-xs text-gray-500 font-urbanist">{user?.email || 'user@feedjoy.com'}</p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/dashboard/profile');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/dashboard/change-password');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <Key className="w-4 h-4" />
                                                <span>Ganti Password</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/dashboard/delete-account');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Hapus Akun</span>
                                            </button>
                                        </div>

                                        {/* Logout */}
                                        <div className="border-t border-gray-100 pt-1">
                                            <button
                                                onClick={handleLogoutClick}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 font-urbanist transition-colors text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Keluar</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {mainMenuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl font-urbanist transition-all ${active
                                            ? "bg-primary text-white font-semibold"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-16">
                {/* Content Area - same structure as admin */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    {/* Conditional: Dashboard Hero OR Breadcrumb + Page Title */}
                    {isDashboard ? (
                        /* Hero Banner - Only on Dashboard */
                        <div className="bg-gradient-to-r from-primary via-primary to-emerald-600 rounded-2xl p-6 sm:p-8 mb-6 relative overflow-hidden">
                            {/* Dot Grid Pattern */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px',
                                }}
                            />
                            <div className="relative text-white">
                                <p className="text-white/70 font-urbanist mb-1">Selamat datang kembali,</p>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins mb-2">
                                    {user?.name} 👋
                                </h1>
                                <p className="text-white/80 font-urbanist max-w-lg">
                                    Semoga aktivitas belanja Anda menyenangkan.
                                </p>
                            </div>
                        </div>
                    ) : (
                        /* Breadcrumb + Page Title for other pages */
                        <div className="mb-6">
                            {/* Breadcrumb */}
                            {breadcrumbs.length > 0 && (
                                <nav className="flex items-center gap-2 text-sm font-urbanist mb-2">
                                    {breadcrumbs.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            {index > 0 && (
                                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                            )}
                                            {item.path ? (
                                                <Link
                                                    to={item.path}
                                                    className="text-primary hover:text-primary/80 hover:underline"
                                                >
                                                    {item.label}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-500">{item.label}</span>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            )}
                            {/* Page Title */}
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 font-poppins">
                                {pageTitle}
                            </h1>
                        </div>
                    )}

                    {/* Page Content */}
                    {isProfilePage ? (
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <Outlet />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </main>

            {/* Logout Modal */}
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
                isLoading={isLoggingOut}
            />
        </div>
    );
}
