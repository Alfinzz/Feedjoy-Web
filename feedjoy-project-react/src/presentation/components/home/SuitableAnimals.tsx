import { useState } from "react";
import { Check, TrendingUp, Sparkles } from "lucide-react";

interface Animal {
    name: string;
    image: string;
    tagline: string;
    description: string;
    benefits: string[];
    color: string;
    stat: string;
    statLabel: string;
}

const animals: Animal[] = [
    {
        name: "Sapi",
        image: "https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=800&q=80",
        tagline: "Produksi susu & daging premium",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. FeedJoy membantu meningkatkan kualitas dan kuantitas produksi susu serta daging sapi Anda.",
        benefits: ["Produksi susu meningkat 30%", "Kualitas daging premium", "Pencernaan lebih sehat", "Nafsu makan meningkat"],
        color: "bg-emerald-500",
        stat: "+30%",
        statLabel: "Produksi Susu",
    },
    {
        name: "Kambing",
        image: "https://images.unsplash.com/photo-1524024973431-2ad916746881?w=800&q=80",
        tagline: "Pertumbuhan cepat & sehat",
        description: "Sed do eiusmod tempor incididunt ut labore. Kambing Anda akan tumbuh lebih cepat dan sehat dengan nutrisi lengkap dari FeedJoy.",
        benefits: ["Pertumbuhan 25% lebih cepat", "Bulu lebih sehat mengkilap", "Daya tahan tubuh kuat", "Reproduksi optimal"],
        color: "bg-amber-500",
        stat: "+25%",
        statLabel: "Pertumbuhan",
    },
    {
        name: "Ayam",
        image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80",
        tagline: "Telur lebih & daging lezat",
        description: "Ut enim ad minim veniam, quis nostrud exercitation. Tingkatkan produktivitas ayam petelur dan pedaging Anda.",
        benefits: ["Produksi telur meningkat", "Kualitas daging lebih baik", "Bulu mengkilap sehat", "Tahan terhadap penyakit"],
        color: "bg-rose-500",
        stat: "+40%",
        statLabel: "Produksi Telur",
    },
    {
        name: "Domba",
        image: "https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=800&q=80",
        tagline: "Wool berkualitas tinggi",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Domba Anda akan menghasilkan wool berkualitas tinggi.",
        benefits: ["Kualitas wool premium", "Pertumbuhan optimal", "Sistem imun kuat", "Wool lebih tebal"],
        color: "bg-sky-500",
        stat: "2x",
        statLabel: "Kualitas Wool",
    },
    {
        name: "Bebek",
        image: "https://images.unsplash.com/photo-1459682687441-7761439a709d?w=800&q=80",
        tagline: "Produktivitas maksimal",
        description: "Excepteur sint occaecat cupidatat non proident. Bebek Anda akan lebih produktif baik untuk telur maupun daging.",
        benefits: ["Telur lebih banyak", "Daging lebih sehat", "Bulu berkualitas", "Pertumbuhan cepat"],
        color: "bg-violet-500",
        stat: "+35%",
        statLabel: "Produktivitas",
    },
    {
        name: "Kelinci",
        image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=800&q=80",
        tagline: "Bulu lebat & reproduksi optimal",
        description: "Sunt in culpa qui officia deserunt mollit anim. Kelinci Anda akan memiliki bulu lebat dan reproduksi yang optimal.",
        benefits: ["Bulu lebat & halus", "Pertumbuhan cepat", "Reproduksi meningkat", "Kesehatan terjaga"],
        color: "bg-pink-500",
        stat: "+50%",
        statLabel: "Reproduksi",
    },
];

// Section Header
function SectionHeader() {
    return (
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-badge-gradient border border-primary/20 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
                <span className="text-sm font-semibold text-primary font-urbanist">
                    Cocok untuk Berbagai Ternak
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight font-poppins mb-4">
                FeedJoy untuk{" "}
                <span className="gradient-text">Semua Ternak</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-urbanist">
                Pilih jenis hewan untuk melihat manfaat FeedJoy secara spesifik.
            </p>
        </div>
    );
}

// Tab Button - Clean without emoji
interface TabButtonProps {
    animal: Animal;
    isActive: boolean;
    onClick: () => void;
}

function TabButton({ animal, isActive, onClick }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`relative px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 rounded-lg sm:rounded-xl font-urbanist font-semibold text-xs sm:text-sm transition-all duration-300 ${isActive
                ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg"
                : "text-gray-600 hover:text-primary hover:bg-primary/5"
                }`}
        >
            {animal.name}
        </button>
    );
}

// Floating Stats Badge
interface FloatingBadgeProps {
    animal: Animal;
}

function FloatingBadge({ animal }: FloatingBadgeProps) {
    return (
        <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 animate-float">
            {/* Glow effect */}
            <div className={`absolute inset-0 ${animal.color} rounded-xl sm:rounded-2xl blur-xl opacity-30`} />

            {/* Badge content */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${animal.color} rounded-lg sm:rounded-xl flex items-center justify-center`}>
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-lg sm:text-xl font-bold text-gray-800 font-poppins">{animal.stat}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-urbanist">{animal.statLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Animal Detail Content
interface AnimalDetailProps {
    animal: Animal;
}

function AnimalDetail({ animal }: AnimalDetailProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Image */}
            <div className="relative">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                    <img
                        src={animal.image}
                        alt={animal.name}
                        className="w-full h-[250px] sm:h-[300px] lg:h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Floating Stats Badge */}
                <FloatingBadge animal={animal} />
            </div>

            {/* Content */}
            <div>
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className={`inline-block px-2.5 py-1 sm:px-3 ${animal.color} text-white text-[10px] sm:text-xs font-semibold rounded-full font-urbanist`}>
                        {animal.tagline}
                    </span>
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-secondary" />
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 font-poppins mb-3 sm:mb-4">
                    FeedJoy untuk {animal.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-500 font-urbanist mb-4 sm:mb-6 leading-relaxed">
                    {animal.description}
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {animal.benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg sm:rounded-xl hover:bg-primary/5 transition-colors"
                        >
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 ${animal.color} rounded-md sm:rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" strokeWidth={3} />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-700 font-urbanist">{benefit}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Main Suitable Animals Component
export default function SuitableAnimals() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="animals" className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader />

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-8 sm:mb-10">
                    <div className="inline-flex bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-1.5 sm:p-2 gap-1 flex-wrap justify-center shadow-lg border border-gray-100">
                        {animals.map((animal, index) => (
                            <TabButton
                                key={index}
                                animal={animal}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Active Animal Detail */}
                <AnimalDetail animal={animals[activeIndex]} />

                {/* Bottom Note */}
                <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
                    <p className="text-gray-500 font-urbanist text-xs sm:text-sm">
                        Dan masih banyak lagi hewan ternak lainnya. <span className="text-primary font-semibold cursor-pointer hover:underline">Hubungi kami</span> untuk konsultasi.
                    </p>
                </div>
            </div>
        </section>
    );
}
