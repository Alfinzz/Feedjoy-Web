// Auth Layout - Clean design with wave pattern

import { Outlet, Link } from "react-router-dom";
import { Sprout } from "lucide-react";

function Logo() {
    return (
        <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="relative bg-gradient-to-br from-primary to-primary-dark p-2.5 rounded-xl shadow-lg">
                    <Sprout className="w-7 h-7 text-white" />
                </div>
            </div>
            <span className="text-2xl font-bold text-gray-800 font-poppins">
                FeedJoy
            </span>
        </Link>
    );
}

function RightDecoration() {
    return (
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-primary to-primary-dark relative overflow-hidden">
            {/* Wave pattern SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1440 560">
                <path fill="white" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" />
                <path fill="white" fillOpacity="0.5" d="M0,320L48,304C96,288,192,256,288,261.3C384,267,480,309,576,320C672,331,768,309,864,282.7C960,256,1056,224,1152,224C1248,224,1344,256,1392,272L1440,288L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" />
                <path fill="white" fillOpacity="0.3" d="M0,416L48,405.3C96,395,192,373,288,384C384,395,480,437,576,442.7C672,448,768,416,864,389.3C960,363,1056,341,1152,352C1248,363,1344,405,1392,426.7L1440,448L1440,560L1392,560C1344,560,1248,560,1152,560C1056,560,960,560,864,560C768,560,672,560,576,560C480,560,384,560,288,560C192,560,96,560,48,560L0,560Z" />
            </svg>

            {/* Decorative blurs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col justify-center p-12 lg:p-16 text-white">
                <h2 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 leading-tight">
                    Tingkatkan<br />
                    Kualitas Ternak<br />
                    Bersama <span className="text-secondary">FeedJoy</span>
                </h2>
                <p className="text-white/80 font-urbanist text-lg mb-8 max-w-md">
                    Bergabunglah dengan 10.000+ peternak yang telah merasakan manfaat probiotik berkualitas.
                </p>

                {/* Stats */}
                <div className="flex gap-8">
                    <div className="text-center">
                        <p className="text-3xl font-bold font-poppins">10K+</p>
                        <p className="text-white/70 text-sm font-urbanist">Peternak</p>
                    </div>
                    <div className="text-center relative">
                        <p className="text-3xl font-bold font-poppins">100%</p>
                        <p className="text-white/70 text-sm font-urbanist">Organik</p>
                        {/* Accent underline */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-secondary rounded-full" />
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold font-poppins">5+</p>
                        <p className="text-white/70 text-sm font-urbanist">Tahun</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Form area */}
            <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative overflow-hidden bg-white">
                {/* Subtle pattern background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `radial-gradient(circle, #6AA84F 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} />

                {/* Decorative gradient blurs */}
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl" />

                <div className="relative w-full max-w-md mx-auto">
                    <div className="mb-10">
                        <Logo />
                    </div>
                    <Outlet />
                </div>
            </div>

            {/* Right side - Decoration */}
            <RightDecoration />
        </div>
    );
}
