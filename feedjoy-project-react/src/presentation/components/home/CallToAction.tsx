import { useState } from "react";
import { ArrowRight, Phone, Mail, MapPin, X } from "lucide-react";

// Animal types with lighter colors matching SuitableAnimals section
const animalTypes = [
    { name: "Sapi", bgColor: "bg-emerald-100", textColor: "text-emerald-700" },
    { name: "Kambing", bgColor: "bg-amber-100", textColor: "text-amber-700" },
    { name: "Ayam", bgColor: "bg-rose-100", textColor: "text-rose-700" },
    { name: "Domba", bgColor: "bg-sky-100", textColor: "text-sky-700" },
    { name: "Bebek", bgColor: "bg-violet-100", textColor: "text-violet-700" },
    { name: "Kelinci", bgColor: "bg-pink-100", textColor: "text-pink-700" },
    { name: "Lainnya", bgColor: "bg-gray-100", textColor: "text-gray-700" },
];

// Animal Tags Input Component (Controlled)
interface AnimalTagsInputProps {
    value: string;
    onChange: (value: string) => void;
}

function AnimalTagsInput({ value, onChange }: AnimalTagsInputProps) {
    const selectedAnimal = animalTypes.find(a => a.name === value);

    return (
        <div className="space-y-2">
            {/* Input-like container showing selected tag */}
            <div className="w-full min-h-[42px] sm:min-h-[48px] px-3 py-2 sm:px-4 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl flex items-center gap-2 flex-wrap">
                {value ? (
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 ${selectedAnimal?.bgColor} ${selectedAnimal?.textColor} rounded-full text-xs sm:text-sm font-semibold font-urbanist`}>
                        {value}
                        <button
                            type="button"
                            onClick={() => onChange('')}
                            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ) : (
                    <span className="text-gray-400 text-sm font-urbanist">Pilih jenis ternak...</span>
                )}
            </div>

            {/* Tag options */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3">
                {animalTypes.filter(a => a.name !== value).map((animal) => (
                    <button
                        key={animal.name}
                        type="button"
                        onClick={() => onChange(animal.name)}
                        className={`px-2.5 py-1 sm:px-3 sm:py-1.5 ${animal.bgColor} ${animal.textColor} rounded-full text-xs sm:text-sm font-medium font-urbanist transition-all duration-300 hover:shadow-sm`}
                    >
                        {animal.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Section Header
function CTAHeader() {
    return (
        <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-badge-gradient border border-primary/20 rounded-full mb-4 sm:mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse-dot" />
                <span className="text-sm font-semibold text-primary font-urbanist">
                    Siap Meningkatkan Kualitas Ternak?
                </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 leading-tight font-poppins mb-4 sm:mb-6">
                Mulai Perjalanan{" "}
                <span className="gradient-text">Sukses Bersama</span>{" "}
                FeedJoy Sekarang!
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-urbanist mb-6 sm:mb-8 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran terbaik untuk kebutuhan ternak Anda.
            </p>
        </div>
    );
}

// CTA Buttons
function CTAButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 btn-primary-gradient text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-urbanist">
                Pesan Sekarang
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white text-primary border-2 border-primary text-sm sm:text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white font-urbanist">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                Hubungi Kami
            </button>
        </div>
    );
}

// Contact Info
function ContactInfo() {
    const contacts = [
        { icon: Phone, text: "+62 812-3456-7890" },
        { icon: Mail, text: "hello@feedjoy.id" },
        { icon: MapPin, text: "Jakarta, Indonesia" },
    ];

    return (
        <div className="space-y-2 sm:space-y-3">
            {contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3 text-gray-600 font-urbanist text-sm sm:text-base">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                        <contact.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span>{contact.text}</span>
                </div>
            ))}
        </div>
    );
}

// Contact Form Card
function ContactFormCard() {
    return (
        <div className="relative">
            {/* Decorative blurs */}
            <div className="absolute -top-6 -right-6 sm:-top-10 sm:-right-10 w-28 h-28 sm:w-40 sm:h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 bg-secondary/20 rounded-full blur-3xl" />

            {/* Form Card */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl sm:shadow-2xl border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 font-poppins mb-2">
                    Konsultasi Gratis
                </h3>
                <p className="text-sm sm:text-base text-gray-500 font-urbanist mb-4 sm:mb-6">
                    Isi form berikut dan tim kami akan menghubungi Anda.
                </p>

                <ContactForm />

                <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-3 sm:mt-4 font-urbanist">
                    Dengan mengirim form ini, Anda menyetujui <span className="text-primary">Kebijakan Privasi</span> kami.
                </p>
            </div>
        </div>
    );
}

// Contact Form
function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        animalType: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.animalType) {
            alert('Mohon lengkapi nama, nomor HP, dan jenis ternak');
            return;
        }

        setIsSubmitting(true);

        // Import SharedDataStore dynamically to avoid circular deps
        const { sharedDataStore } = await import('../../../data/datasources/SharedDataStore');

        sharedDataStore.addConsultation({
            name: formData.name,
            phone: formData.phone,
            animalType: formData.animalType,
            message: formData.message || 'Tidak ada pesan tambahan'
        });

        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', phone: '', animalType: '', message: '' });

        // Reset success after 3 seconds
        setTimeout(() => setIsSuccess(false), 3000);
    };

    if (isSuccess) {
        return (
            <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 font-poppins mb-2">Pesan Terkirim!</h4>
                <p className="text-sm text-gray-500 font-urbanist">
                    Tim kami akan segera menghubungi Anda.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 font-urbanist mb-1.5 sm:mb-2">
                    Nama Lengkap
                </label>
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Masukkan nama Anda"
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl font-urbanist text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>

            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 font-urbanist mb-1.5 sm:mb-2">
                    Nomor WhatsApp
                </label>
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+62 8xx-xxxx-xxxx"
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl font-urbanist text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
            </div>

            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 font-urbanist mb-1.5 sm:mb-2">
                    Jenis Ternak
                </label>
                <AnimalTagsInput
                    value={formData.animalType}
                    onChange={(value) => setFormData(prev => ({ ...prev, animalType: value }))}
                />
            </div>

            <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 font-urbanist mb-1.5 sm:mb-2">
                    Pesan (Opsional)
                </label>
                <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Ceritakan kebutuhan Anda..."
                    className="w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl font-urbanist text-sm sm:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 sm:py-4 btn-primary-gradient text-white text-sm sm:text-base font-semibold rounded-xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 font-urbanist disabled:opacity-50"
            >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
        </form>
    );
}

// Main CTA Component
export default function CallToAction() {
    return (
        <section id="cta" className="py-16 sm:py-20 lg:py-24 bg-gray-50">
            <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
                    {/* Left - CTA Content */}
                    <div>
                        <CTAHeader />
                        <CTAButtons />
                        <ContactInfo />
                    </div>

                    {/* Right - Contact Form Card */}
                    <ContactFormCard />
                </div>
            </div>
        </section>
    );
}
