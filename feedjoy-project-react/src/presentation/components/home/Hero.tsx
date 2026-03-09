import { ArrowRight, Leaf, FlaskRound, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Background Decoration - Organic Shapes
function BackgroundDecoration() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Top right blob */}
            <div className="absolute top-[5%] right-[10%] w-72 h-72 blob-green rounded-full blur-[50px] animate-float" />
            {/* Bottom left blob */}
            <div className="absolute bottom-[10%] left-[5%] w-80 h-80 blob-orange rounded-full blur-[50px] animate-float-reverse" />
        </div>
    );
}

// Badge Component
function HeroBadge() {
    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-badge-gradient border border-primary/20 rounded-full">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
            <span className="text-sm font-semibold text-primary font-urbanist">
                Suplemen Probiotik Terpercaya
            </span>
        </div>
    );
}

// Main Headline
function HeroTitle() {
    return (
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight tracking-tight font-poppins">
            Nutrisi Modern untuk{" "}
            <span className="gradient-text">Ternak Sehat</span>{" "}
            & Produktif
        </h1>
    );
}

// Subtitle/Description
function HeroSubtitle() {
    return (
        <p className="text-base sm:text-lg text-gray-500 leading-relaxed font-urbanist">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suplemen pakan
            probiotik hasil fermentasi yang kaya nutrisi, enzim, dan mikroba baik
            untuk kesehatan optimal ternak Anda.
        </p>
    );
}

// CTA Buttons
function HeroCTA() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
                onClick={() => navigate("/auth")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 btn-primary-gradient text-white text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 font-urbanist"
            >
                Pesan Sekarang
                <ArrowRight size={18} />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent text-primary border-2 border-primary text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:scale-[1.02] hover:-translate-y-0.5 font-urbanist">
                Pelajari Lebih Lanjut
            </button>
        </div>
    );
}

// Feature Pills
function FeaturePills() {
    const features = [
        { icon: Leaf, label: "100% Organik" },
        { icon: FlaskRound, label: "Teruji Laboratorium" },
        { icon: Users, label: "5000+ Peternak" },
    ];

    return (
        <div className="flex flex-wrap gap-3">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm font-medium text-gray-600 transition-all duration-150 hover:border-primary hover:text-primary hover:scale-105 hover:-translate-y-0.5 font-urbanist cursor-pointer"
                >
                    <feature.icon size={16} className="text-primary" />
                    <span>{feature.label}</span>
                </div>
            ))}
        </div>
    );
}

// Image/Illustration
function HeroImage() {
    return (
        <div className="relative w-full aspect-square max-w-md lg:max-w-lg ml-auto">
            {/* Main image container */}
            <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80"
                    alt="Ternak Sehat"
                    className="w-full h-full object-cover rounded-3xl"
                />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-secondary/20 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-xl" />

            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 sm:bottom-8 sm:-left-8 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800 font-poppins">100% Organik</p>
                    <p className="text-xs text-gray-500 font-urbanist">Tanpa Bahan Kimia</p>
                </div>
            </div>
        </div>
    );
}

// Main Hero Component - Split Layout
export default function Hero() {
    return (
        <section id="home" className="relative min-h-screen flex items-center bg-cream-gradient pt-24 pb-16 sm:pt-28 overflow-hidden">
            <BackgroundDecoration />

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col items-start text-left gap-5 order-2 lg:order-1">
                        <HeroBadge />
                        <HeroTitle />
                        <HeroSubtitle />
                        <HeroCTA />
                        <FeaturePills />
                    </div>

                    {/* Right Image */}
                    <div className="order-1 lg:order-2 flex justify-end">
                        <HeroImage />
                    </div>
                </div>
            </div>
        </section>
    );
}