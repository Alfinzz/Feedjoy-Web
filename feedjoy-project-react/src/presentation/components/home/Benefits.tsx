import { Sparkles, TrendingUp, ShieldCheck, Coins } from "lucide-react";

interface Benefit {
    icon: typeof Sparkles;
    title: string;
    description: string;
    color: string;
    bgColor: string;
}

const benefits: Benefit[] = [
    {
        icon: Sparkles,
        title: "Meningkatkan Kualitas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Probiotik membantu meningkatkan kualitas daging.",
        color: "text-primary",
        bgColor: "bg-primary/10",
    },
    {
        icon: TrendingUp,
        title: "Pertumbuhan Optimal",
        description: "Sed do eiusmod tempor incididunt ut labore. Nutrisi lengkap untuk pertumbuhan yang lebih cepat.",
        color: "text-secondary",
        bgColor: "bg-secondary/10",
    },
    {
        icon: ShieldCheck,
        title: "Imunitas Kuat",
        description: "Ut enim ad minim veniam, quis nostrud. Memperkuat sistem kekebalan tubuh ternak dari penyakit.",
        color: "text-blue-500",
        bgColor: "bg-blue-100",
    },
    {
        icon: Coins,
        title: "Hemat Biaya Pakan",
        description: "Duis aute irure dolor in reprehenderit. Efisiensi pakan meningkat hingga 20% dengan probiotik.",
        color: "text-amber-500",
        bgColor: "bg-amber-100",
    },
];

// Section Header
function SectionHeader() {
    return (
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-badge-gradient border border-primary/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
                <span className="text-sm font-semibold text-primary font-urbanist">
                    Manfaat Produk
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight font-poppins mb-4">
                Kenapa Ternak Anda{" "}
                <span className="gradient-text">Butuh FeedJoy?</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-urbanist">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>
    );
}

// Benefit Card - Full improvement
interface BenefitCardProps {
    benefit: Benefit;
    index: number;
}

function BenefitCard({ benefit, index }: BenefitCardProps) {
    const Icon = benefit.icon;
    const gradients = [
        'from-primary to-primary-light',
        'from-secondary to-secondary-light',
        'from-blue-400 to-blue-500',
        'from-amber-400 to-amber-500'
    ];

    return (
        <div
            className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
        >
            {/* Gradient glow decoration (replaces dots) */}
            <div className={`absolute -top-6 -right-6 w-20 h-20 ${benefit.bgColor} rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-all duration-500`} />

            {/* Icon with subtle glow */}
            <div className="relative mb-4 sm:mb-6">
                <div className={`absolute inset-0 ${benefit.bgColor} rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500`} />
                <div className={`relative w-14 h-14 sm:w-16 sm:h-16 ${benefit.bgColor} rounded-2xl flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${benefit.color}`} strokeWidth={1.5} />
                </div>
            </div>

            {/* Content */}
            <div className="relative">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 font-poppins group-hover:text-gray-900 transition-colors">
                    {benefit.title}
                </h3>
                <p className="text-gray-500 leading-relaxed font-urbanist text-sm sm:text-base">
                    {benefit.description}
                </p>
            </div>

            {/* Bottom line accent - more subtle */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${gradients[index]} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
        </div>
    );
}

// Stats Bar - with separator and highlighted items
function StatsBar() {
    const stats = [
        { value: "10K+", label: "Peternak Puas", highlight: false },
        { value: "5+", label: "Tahun Pengalaman", highlight: false },
        { value: "100%", label: "Bahan Organik", highlight: true },
        { value: "20%", label: "Hemat Biaya", highlight: false },
    ];

    return (
        <div className="mt-8 relative overflow-hidden rounded-2xl sm:rounded-3xl">
            {/* Pattern Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark">
                {/* Dot Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '24px 24px'
                }} />
                {/* Decorative shapes */}
                <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-36 sm:w-48 h-36 sm:h-48 bg-white/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="relative p-6 sm:p-8 lg:p-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center relative">
                            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins mb-1 sm:mb-2">
                                {stat.value}
                            </p>
                            <p className="text-xs sm:text-sm lg:text-base text-white/80 font-urbanist">
                                {stat.label}
                            </p>
                            {/* Highlight accent for featured stat */}
                            {stat.highlight && (
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-secondary rounded-full" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Main Benefits Component
export default function Benefits() {
    return (
        <section id="benefits" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white">
            {/* Pattern Background */}
            <div className="absolute inset-0">
                {/* Subtle dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `radial-gradient(circle, #6AA84F 1px, transparent 1px)`,
                    backgroundSize: '32px 32px'
                }} />
            </div>

            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader />

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                    {benefits.map((benefit, index) => (
                        <BenefitCard key={index} benefit={benefit} index={index} />
                    ))}
                </div>

                {/* Stats Bar - with more separation */}
                <StatsBar />
            </div>
        </section>
    );
}