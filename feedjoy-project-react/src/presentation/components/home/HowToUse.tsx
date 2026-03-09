import { useState } from "react";
import { Package, Droplets, Clock, CheckCircle, FileText, Play, ArrowRight, ChevronRight, Lightbulb } from "lucide-react";

interface Step {
    number: string;
    icon: typeof Package;
    title: string;
    description: string;
    tip: string;
}

const steps: Step[] = [
    {
        number: "01",
        icon: Package,
        title: "Siapkan FeedJoy",
        description: "Ambil takaran FeedJoy sesuai dosis yang dianjurkan. Untuk ternak besar gunakan 50-100 gram per ekor.",
        tip: "Simpan di tempat kering",
    },
    {
        number: "02",
        icon: Droplets,
        title: "Campurkan dengan Pakan",
        description: "Campurkan FeedJoy secara merata dengan pakan ternak. Pastikan tercampur homogen untuk hasil optimal.",
        tip: "Aduk selama 2-3 menit",
    },
    {
        number: "03",
        icon: Clock,
        title: "Berikan Secara Rutin",
        description: "Berikan campuran pakan ini secara rutin setiap hari. Konsistensi adalah kunci keberhasilan.",
        tip: "Pagi dan sore hari",
    },
    {
        number: "04",
        icon: CheckCircle,
        title: "Lihat Hasilnya",
        description: "Nikmati hasil ternak yang lebih sehat dan produktif dalam 2-4 minggu penggunaan rutin.",
        tip: "Hasil terlihat 14 hari",
    },
];

// Step Card - Smoother transitions with decorations
interface StepCardProps {
    step: Step;
    index: number;
    isActive: boolean;
    onHover: (index: number) => void;
}

function StepCard({ step, index, isActive, onHover }: StepCardProps) {
    const Icon = step.icon;
    const isEven = index % 2 === 0;

    return (
        <div
            className="group cursor-pointer"
            onMouseEnter={() => onHover(index)}
        >
            {/* Mobile/Tablet: Horizontal card */}
            <div className="lg:hidden">
                <div className={`relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm transition-all duration-500 ease-out overflow-hidden ${isActive ? 'shadow-lg shadow-primary/10' : 'hover:shadow-md'}`}>
                    {/* Geometric decoration - dots */}
                    <div className="absolute top-3 right-3 flex gap-1 opacity-30">
                        <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                        <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                        <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                    </div>

                    {/* Number badge */}
                    <div className={`absolute -top-3 -left-2 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold font-poppins text-xs sm:text-sm shadow-md transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-primary to-primary-dark text-white scale-110' : 'bg-white text-primary'}`}>
                        {step.number}
                    </div>

                    <div className="relative flex items-start gap-3 sm:gap-4 pt-2">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-primary/20' : 'bg-primary/10'}`}>
                            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-primary/70'}`} strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-bold text-gray-800 font-poppins mb-1">{step.title}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm font-urbanist leading-relaxed">{step.description}</p>
                            <div className={`mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-500 ${isActive ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-500'}`}>
                                <Lightbulb className="w-3 h-3" />
                                {step.tip}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop: Alternating layout */}
            <div className={`hidden lg:flex items-center gap-8 ${isEven ? '' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
                    <div className={`relative inline-block bg-white rounded-2xl p-5 lg:p-6 shadow-sm overflow-hidden transition-all duration-500 ease-out ${isActive ? 'shadow-lg shadow-primary/10' : 'hover:shadow-md'}`}>
                        {/* Geometric decoration - corner dots */}
                        <div className={`absolute ${isEven ? 'top-4 left-4' : 'top-4 right-4'} flex gap-1 opacity-40`}>
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isActive ? 'bg-primary' : 'bg-gray-300'}`} />
                        </div>

                        <div className="relative">
                            <h3 className="text-lg lg:text-xl font-bold text-gray-800 font-poppins mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-xs sm:text-sm font-urbanist leading-relaxed mb-3">{step.description}</p>
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-500 ${isActive ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-500'}`}>
                                <Lightbulb className="w-3.5 h-3.5" />
                                {step.tip}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Timeline */}
                <div className="flex flex-col items-center">
                    {/* Step circle */}
                    <div className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center transition-all duration-500 ease-out ${isActive ? 'bg-primary/20 scale-105' : 'bg-primary/10'}`}>
                        <Icon className={`w-6 h-6 lg:w-8 lg:h-8 transition-all duration-500 ${isActive ? 'text-primary' : 'text-primary/70'}`} strokeWidth={2} />
                        {/* Number badge */}
                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-lg flex items-center justify-center font-bold font-poppins text-sm shadow-md transition-all duration-500 ${isActive ? 'bg-secondary text-white scale-110' : 'bg-white text-gray-600'}`}>
                            {step.number}
                        </div>
                    </div>
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1" />
            </div>
        </div>
    );
}

// Timeline connector - smoother decorative style
function TimelineConnector({ isActive }: { isActive: boolean }) {
    return (
        <div className="hidden lg:flex justify-center py-2">
            <div className="flex flex-col items-center gap-1">
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-primary' : 'bg-gray-200'}`} />
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'bg-primary/60' : 'bg-gray-200'}`} />
                <div className={`w-0.5 h-6 rounded-full transition-all duration-500 ${isActive ? 'bg-gradient-to-b from-primary/60 to-primary/20' : 'bg-gray-200'}`} />
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${isActive ? 'bg-primary/60' : 'bg-gray-200'}`} />
                <div className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-primary' : 'bg-gray-200'}`} />
            </div>
        </div>
    );
}

// CTA Cards
function CTASection() {
    return (
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
            {/* Download Card */}
            <div className="group relative bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full" />

                <div className="relative flex items-start gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2 font-poppins">
                            Download Panduan PDF
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm font-urbanist mb-3 sm:mb-4">
                            Panduan lengkap cara penggunaan FeedJoy dengan dosis yang tepat untuk berbagai jenis ternak.
                        </p>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark transition-colors font-urbanist group/btn">
                            Download Gratis
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Video Card */}
            <div className="group relative bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Decorative circles */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-secondary/10 rounded-full" />
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/10 rounded-full" />

                <div className="relative flex items-start gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-secondary to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <div className="flex-grow">
                        <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800 mb-1 sm:mb-2 font-poppins">
                            Tonton Video Tutorial
                        </h4>
                        <p className="text-gray-500 text-xs sm:text-sm font-urbanist mb-3 sm:mb-4">
                            Video tutorial step-by-step untuk memaksimalkan hasil penggunaan FeedJoy di peternakan Anda.
                        </p>
                        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-white font-semibold text-sm rounded-xl hover:bg-amber-600 transition-colors font-urbanist group/btn">
                            Tonton Sekarang
                            <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
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
                    Cara Penggunaan
                </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight font-poppins mb-4">
                Mudah Digunakan,{" "}
                <span className="gradient-text">Hasil Maksimal</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-urbanist">
                Ikuti 4 langkah sederhana berikut untuk mendapatkan hasil terbaik dari FeedJoy
            </p>
        </div>
    );
}

// Timeline Steps List
function TimelineSteps({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (index: number) => void }) {
    return (
        <div className="space-y-3 sm:space-y-4 lg:space-y-0">
            {steps.map((step, index) => (
                <div key={index}>
                    <StepCard
                        step={step}
                        index={index}
                        isActive={activeStep === index}
                        onHover={setActiveStep}
                    />
                    {index < steps.length - 1 && (
                        <TimelineConnector isActive={activeStep >= index + 1} />
                    )}
                </div>
            ))}
        </div>
    );
}

// Main How To Use Component
export default function HowToUse() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="howtouse" className="py-16 sm:py-20 lg:py-24 bg-light-green">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeader />
                <TimelineSteps activeStep={activeStep} setActiveStep={setActiveStep} />
                <CTASection />
            </div>
        </section>
    );
}
