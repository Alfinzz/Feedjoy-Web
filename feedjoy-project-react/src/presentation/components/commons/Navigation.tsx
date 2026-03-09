// Navigation - Simple responsive navigation component

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sprout, Menu, X } from "lucide-react";

// Navigation menu items - only essential links
const NAV_ITEMS = [
    { id: "home", label: "Home", link: "#home" },
    { id: "benefits", label: "Manfaat", link: "#benefits" },
    { id: "whychoose", label: "Mengapa Kami", link: "#whychoose" },
    { id: "howtouse", label: "Cara Pakai", link: "#howtouse" },
    { id: "cta", label: "Hubungi", link: "#cta" },
];

// Logo Component
function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-xl shadow-md">
                <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins">
                FeedJoy
            </span>
        </Link>
    );
}

// Scroll Progress Indicator
function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
            <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-150"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}

// Desktop Navigation
function DesktopNav({ activeSection }: { activeSection: string }) {
    const handleClick = (link: string) => {
        const element = document.querySelector(link);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleClick(item.link)}
                    className={`px-3 py-2 rounded-lg text-base font-medium font-urbanist transition-all ${activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-gray-600 hover:text-primary hover:bg-gray-50"
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

// Mobile Navigation
function MobileNav({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const navigate = useNavigate();

    const handleClick = (link: string) => {
        const element = document.querySelector(link);
        if (element) element.scrollIntoView({ behavior: "smooth" });
        onClose();
    };

    return (
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
            <div className="bg-white px-4 py-4 space-y-1 shadow-inner border-t border-gray-100">
                {NAV_ITEMS.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item.link)}
                        className="block w-full text-left text-base font-medium text-gray-700 py-3 px-2 rounded-lg hover:bg-gray-50"
                    >
                        {item.label}
                    </button>
                ))}

                <div className="pt-3 border-t border-gray-100 mt-3">
                    <button
                        onClick={() => { navigate("/auth/login"); onClose(); }}
                        className="w-full border-2 border-primary text-primary px-5 py-3 rounded-xl text-base font-semibold hover:bg-primary hover:text-white transition-colors"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

// Sign In Button
function SignInButton() {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate("/auth/login")}
            className="hidden md:block border-2 border-primary text-primary px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all font-urbanist"
        >
            Sign In
        </button>
    );
}

// Mobile Toggle Button
function MobileToggle({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
    return (
        <button
            onClick={toggle}
            className="md:hidden p-2 bg-gray-100 rounded-lg border border-gray-200"
        >
            {isOpen ? <X className="w-6 h-6 text-gray-500" /> : <Menu className="w-6 h-6 text-gray-500" />}
        </button>
    );
}

// Main Navigation Component
export default function Navigation() {
    const [activeSection, setActiveSection] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    // Update active section on scroll
    useEffect(() => {
        const sectionIds = NAV_ITEMS.map(item => item.id);

        const updateActive = () => {
            const scrollY = window.scrollY + 150;

            for (const id of sectionIds) {
                const section = document.getElementById(id);
                if (!section) continue;

                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;

                if (scrollY >= top && scrollY < bottom) {
                    setActiveSection(id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", updateActive);
        updateActive();
        return () => window.removeEventListener("scroll", updateActive);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-2xl shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
                <div className="flex justify-between items-center h-16 sm:h-18">
                    <Logo />
                    <DesktopNav activeSection={activeSection} />
                    <SignInButton />
                    <MobileToggle isOpen={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
                </div>
            </div>

            <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
            <ScrollProgress />
        </nav>
    );
}
