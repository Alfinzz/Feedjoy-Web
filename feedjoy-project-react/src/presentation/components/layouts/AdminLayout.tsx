// Admin Layout - Horizontal navigation layout for all admin pages
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Star,
    MessageSquare,
    Users,
    LogOut,
    Menu,
    X,
    ChevronDown,
    ChevronRight,
    Sprout,
    User,
    Key,
    Trash2
} from 'lucide-react';
import LogoutModal from '../../components/commons/LogoutModal';

// Main menu items (horizontal navbar)
interface MenuItem {
    path: string;
    label: string;
    icon: typeof LayoutDashboard;
}

const mainMenuItems: MenuItem[] = [
    { path: '/admin/overview', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Produk', icon: Package },
    { path: '/admin/orders', label: 'Pesanan', icon: ShoppingCart },
];

// Popover menu items (inside "Lainnya" dropdown)
const popoverMenuItems: MenuItem[] = [
    { path: '/admin/consultations', label: 'Konsultasi', icon: MessageSquare },
    { path: '/admin/reviews', label: 'Ulasan', icon: Star },
    { path: '/admin/users', label: 'Manajemen User', icon: Users },
];

// Breadcrumb configuration - only for detail pages (add/edit)
interface BreadcrumbItem {
    label: string;
    path?: string;
}

const getBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [];

    // Only show breadcrumbs for add/edit pages (detail pages)
    if (pathname === '/admin/products/add') {
        breadcrumbs.push({ label: 'Produk', path: '/admin/products' });
        breadcrumbs.push({ label: 'Tambah Produk' });
    } else if (pathname.includes('/admin/products/') && pathname.includes('/edit')) {
        breadcrumbs.push({ label: 'Produk', path: '/admin/products' });
        breadcrumbs.push({ label: 'Edit Produk' });
    } else if (pathname === '/admin/profile') {
        breadcrumbs.push({ label: 'Dashboard', path: '/admin/overview' });
        breadcrumbs.push({ label: 'Profile' });
    } else if (pathname === '/admin/change-password') {
        breadcrumbs.push({ label: 'Dashboard', path: '/admin/overview' });
        breadcrumbs.push({ label: 'Ganti Password' });
    } else if (pathname === '/admin/delete-account') {
        breadcrumbs.push({ label: 'Dashboard', path: '/admin/overview' });
        breadcrumbs.push({ label: 'Hapus Akun' });
    }
    // No breadcrumbs for list pages

    return breadcrumbs;
};


// Get page title based on pathname
const getPageTitle = (pathname: string): string => {
    if (pathname === '/admin/products/add') return 'Tambah Produk';
    if (pathname.includes('/admin/products/') && pathname.includes('/edit')) return 'Edit Produk';
    if (pathname === '/admin/products' || pathname.startsWith('/admin/products')) return 'Produk';
    if (pathname === '/admin/orders' || pathname.startsWith('/admin/orders')) return 'Pesanan';
    if (pathname === '/admin/consultations' || pathname.startsWith('/admin/consultations')) return 'Konsultasi';
    if (pathname === '/admin/reviews' || pathname.startsWith('/admin/reviews')) return 'Ulasan';
    if (pathname === '/admin/users' || pathname.startsWith('/admin/users')) return 'Manajemen User';
    if (pathname === '/admin/profile') return 'Profile';
    if (pathname === '/admin/change-password') return 'Ganti Password';
    if (pathname === '/admin/delete-account') return 'Hapus Akun';
    return 'Dashboard';
};

export default function AdminLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [userPopoverOpen, setUserPopoverOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const userPopoverRef = useRef<HTMLDivElement>(null);

    // Check if current page is dashboard/overview
    const isDashboard = location.pathname === '/admin/overview' || location.pathname === '/admin';

    // Get breadcrumbs for current page
    const breadcrumbs = getBreadcrumbs(location.pathname);
    const pageTitle = getPageTitle(location.pathname);

    // Close popovers when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setPopoverOpen(false);
            }
            if (userPopoverRef.current && !userPopoverRef.current.contains(event.target as Node)) {
                setUserPopoverOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = async () => {
        try {
            await logout();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
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

    const isPopoverActive = () => {
        return popoverMenuItems.some(item => isActive(item.path));
    };

    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };
        return new Date().toLocaleDateString('id-ID', options);
    };

    // Get user initials
    const getUserInitials = () => {
        if (!user?.name) return 'A';
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
                        <Link to="/admin/overview" className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-xl shadow-md">
                                <Sprout className="w-6 h-6 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins">
                                    FeedJoy
                                </span>
                                <p className="text-xs text-gray-400 font-urbanist -mt-1">Admin Panel</p>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1">
                            {/* Main Menu Items */}
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

                            {/* Popover Menu - "Lainnya" */}
                            <div className="relative" ref={popoverRef}>
                                <button
                                    onClick={() => setPopoverOpen(!popoverOpen)}
                                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-base font-medium font-urbanist transition-all ${isPopoverActive()
                                        ? "text-primary bg-primary/10"
                                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                                        }`}
                                >
                                    Lainnya
                                    <ChevronDown className={`w-4 h-4 transition-transform ${popoverOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Popover Dropdown */}
                                {popoverOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                                        {popoverMenuItems.map((item) => {
                                            const Icon = item.icon;
                                            const active = isActive(item.path);
                                            return (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    onClick={() => setPopoverOpen(false)}
                                                    className={`flex items-center gap-3 px-4 py-3 font-urbanist transition-colors ${active
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-gray-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <Icon className="w-5 h-5" />
                                                    <span className="font-medium">{item.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side - User Avatar with Popover */}
                        <div className="flex items-center gap-2 sm:gap-3">
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
                                            <p className="font-semibold text-gray-800 font-poppins text-sm">{user?.name || 'Admin'}</p>
                                            <p className="text-xs text-gray-500 font-urbanist">{user?.email || 'admin@feedjoy.com'}</p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/admin/profile');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <User className="w-4 h-4" />
                                                <span>Profile</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/admin/change-password');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <Key className="w-4 h-4" />
                                                <span>Ganti Password</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setUserPopoverOpen(false);
                                                    navigate('/admin/delete-account');
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-urbanist transition-colors text-left"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Hapus Akun</span>
                                            </button>
                                        </div>

                                        {/* Divider */}
                                        <div className="border-t border-gray-100 my-1"></div>

                                        {/* Logout */}
                                        <button
                                            onClick={() => {
                                                setUserPopoverOpen(false);
                                                handleLogoutClick();
                                            }}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 font-urbanist transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Keluar</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                            >
                                {mobileMenuOpen ? (
                                    <X className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <Menu className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {/* Main Menu */}
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

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-2"></div>
                            <p className="px-4 py-2 text-xs text-gray-400 font-urbanist uppercase tracking-wider">Lainnya</p>

                            {/* Popover Menu Items */}
                            {popoverMenuItems.map((item) => {
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

                            {/* Divider */}
                            <div className="border-t border-gray-100 my-2"></div>

                            {/* Mobile Logout */}
                            <button
                                onClick={handleLogoutClick}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-urbanist transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                Keluar
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <div className="pt-16 sm:pt-18">
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
                                <p className="text-white/70 font-urbanist mb-1">{getCurrentDate()}</p>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-poppins mb-2">
                                    Selamat Datang, Admin! 👋
                                </h1>
                                <p className="text-white/80 font-urbanist max-w-lg">
                                    Berikut ringkasan aktivitas toko Anda hari ini.
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

                    {/* Content Container - White Box */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            <LogoutModal
                isOpen={showLogoutModal}
                onConfirm={handleLogoutConfirm}
                onCancel={handleLogoutCancel}
            />
        </div>
    );
}
