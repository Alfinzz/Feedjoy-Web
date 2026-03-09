import { Leaf, Recycle, FlaskRound, Award } from "lucide-react";

interface Feature {
    icon: typeof Leaf;
    title: string;
    tagline: string;
    description: string;
    stat: string;
    statLabel: string;
}

const features: Feature[] = [
    {
        icon: Leaf,
        title: "Bahan Alami Premium",
        tagline: "Kualitas tanpa kompromi",
        description: "Dipilih dari sumber terbaik, bahan kami 100% organik tanpa campuran kimia sintetis untuk menjaga kesehatan ternak Anda.",
        stat: "100%",
        statLabel: "Organik",
    },
    {
        icon: Recycle,
        title: "Ramah Lingkungan",
        tagline: "Peduli bumi, peduli masa depan",
        description: "Proses produksi kami mengutamakan keberlanjutan dengan zero waste dan kemasan yang dapat didaur ulang sepenuhnya.",
        stat: "0%",
        statLabel: "Polusi",
    },
    {
        icon: FlaskRound,
        title: "Teruji Laboratorium",
        tagline: "Standar kualitas tertinggi",
        description: "Setiap batch produksi melewati lebih dari 50 pengujian ketat untuk memastikan keamanan dan kualitas nutrisi.",
        stat: "50+",
        statLabel: "Pengujian",
    },
    {
        icon: Award,
        title: "Bersertifikasi Resmi",
        tagline: "Dipercaya lembaga nasional",
        description: "Mendapatkan 5 sertifikasi resmi termasuk Halal MUI, ISO 9001:2015, dan approval dari BPOM Indonesia.",
        stat: "5",
        statLabel: "Sertifikat",
    },
];

// Feature Card - Clean with floating badge
interface FeatureCardProps {
    feature: Feature;
    isRight: boolean;
}

function FeatureCard({ feature, isRight }: FeatureCardProps) {
    const Icon = feature.icon;

    return (
        <div className={`group relative ${isRight ? 'lg:text-left' : 'lg:text-right'}`}>
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden">
                {/* Corner decoration - curved lines */}
                <div className={`absolute ${isRight ? '-right-16' : '-left-16'} -top-16 w-32 h-32`}>
                    <div className={`absolute inset-0 border-[3px] border-primary/10 rounded-full`} />
                    <div className={`absolute inset-4 border-2 border-secondary/10 rounded-full`} />
                    <div className={`absolute inset-8 border border-primary/5 rounded-full`} />
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:via-primary/40 transition-colors duration-500" />

                <div className={`relative flex items-start gap-5 ${isRight ? '' : 'lg:flex-row-reverse'}`}>
                    {/* Floating Badge Icon */}
                    <div className="flex-shrink-0 relative">
                        {/* Outer ring */}
                        <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-sm" />

                        {/* Icon container */}
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary via-primary to-primary-dark rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" strokeWidth={1.8} />

                            {/* Badge overlay */}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg shadow-md flex items-center justify-center">
                                <div className="w-4 h-4 bg-gradient-to-br from-secondary to-amber-500 rounded-md flex items-center justify-center">
                                    <span className="text-[8px] font-bold text-white">✓</span>
                                </div>
                            </div>
                        </div>

                        {/* Stat below icon */}
                        <div className="text-center mt-2 sm:mt-3">
                            <p className="text-xl sm:text-2xl font-bold gradient-text font-poppins leading-none">{feature.stat}</p>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-urbanist uppercase tracking-wider mt-1">{feature.statLabel}</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 min-w-0">
                        {/* Title & Tagline */}
                        <div className="mb-3">
                            <h3 className="text-base sm:text-lg font-bold text-gray-800 font-poppins group-hover:text-primary transition-colors leading-tight">
                                {feature.title}
                            </h3>
                            <p className="text-xs text-primary/60 font-urbanist font-medium mt-1 italic">
                                {feature.tagline}
                            </p>
                        </div>

                        {/* Description */}
                        <p className="text-gray-500 text-xs sm:text-sm font-urbanist leading-relaxed">
                            {feature.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Section Header
function SectionHeader() {
    return (
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-badge-gradient border border-primary/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
                <span className="text-sm font-semibold text-primary font-urbanist">
                    Mengapa Memilih Kami
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight font-poppins mb-4">
                Kualitas <span className="gradient-text">Terpercaya</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-urbanist">
                Standar tertinggi dalam setiap produk kami untuk hasil peternakan yang optimal
            </p>
        </div>
    );
}

// Center Image with decorations
function CenterImage() {
    return (
        <div className="flex justify-center mb-8 sm:mb-10 lg:mb-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:z-10">
            <div className="relative">
                {/* Outer spinning ring */}
                <div
                    className="absolute -inset-6 border-2 border-dashed border-primary/30 rounded-full"
                    style={{ animation: 'spin 25s linear infinite' }}
                />
                {/* Inner spinning ring */}
                <div
                    className="absolute -inset-12 border border-dashed border-secondary/20 rounded-full"
                    style={{ animation: 'spin 35s linear infinite reverse' }}
                />
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />

                {/* Image container */}
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-primary/10">
                    <img
                        src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80"
                        alt="FeedJoy Product"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                </div>

                {/* Center badge */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-6 py-3 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                    <p className="text-2xl font-bold gradient-text font-poppins">10K+</p>
                    <p className="text-xs text-gray-500 font-urbanist text-center">Peternak Puas</p>
                </div>
            </div>
        </div>
    );
}

// Features Grid
function FeaturesGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 lg:gap-x-[420px] lg:gap-y-8">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    feature={feature}
                    isRight={index % 2 === 1}
                />
            ))}
        </div>
    );
}

// Main Why Choose Component - Radial Layout
export default function WhyChoose() {
    return (
        <section id="whychoose" className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader />

                {/* Main Layout */}
                <div className="relative">
                    <CenterImage />
                    <FeaturesGrid />
                </div>
            </div>
        </section>
    );
}
