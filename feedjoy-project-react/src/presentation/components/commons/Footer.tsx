import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
    produk: [
        { name: "FeedJoy Original", href: "#" },
        { name: "FeedJoy Premium", href: "#" },
        { name: "FeedJoy Pro", href: "#" },
        { name: "Harga & Paket", href: "#" },
    ],
    layanan: [
        { name: "Konsultasi Gratis", href: "#" },
        { name: "Pengiriman", href: "#" },
        { name: "Garansi Produk", href: "#" },
        { name: "Mitra Reseller", href: "#" },
    ],
    perusahaan: [
        { name: "Tentang Kami", href: "/about" },
        { name: "Tim Kami", href: "/about#team" },
        { name: "Karir", href: "#" },
        { name: "Blog", href: "#" },
    ],
    bantuan: [
        { name: "FAQ", href: "#" },
        { name: "Panduan Penggunaan", href: "#" },
        { name: "Syarat & Ketentuan", href: "#" },
        { name: "Kebijakan Privasi", href: "#" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
];

// Footer Main Component
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">F</span>
                            </div>
                            <span className="text-2xl font-bold font-poppins">
                                Feed<span className="text-primary">Joy</span>
                            </span>
                        </div>
                        <p className="text-gray-400 font-urbanist mb-6 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Solusi nutrisi terbaik untuk ternak Anda.
                        </p>

                        {/* Newsletter */}
                        <div className="mb-6">
                            <p className="text-sm font-semibold mb-3 font-urbanist">Berlangganan Newsletter</p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Email Anda"
                                    className="flex-grow px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 font-urbanist text-sm focus:outline-none focus:border-primary"
                                />
                                <button className="px-4 py-3 bg-gradient-to-r from-primary to-primary-dark rounded-xl hover:opacity-90 transition-opacity">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-xl flex items-center justify-center transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h4 className="text-white font-semibold font-poppins mb-4">Produk</h4>
                        <ul className="space-y-3">
                            {footerLinks.produk.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-400 hover:text-primary font-urbanist text-sm transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold font-poppins mb-4">Layanan</h4>
                        <ul className="space-y-3">
                            {footerLinks.layanan.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-400 hover:text-primary font-urbanist text-sm transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold font-poppins mb-4">Perusahaan</h4>
                        <ul className="space-y-3">
                            {footerLinks.perusahaan.map((link, index) => (
                                <li key={index}>
                                    <a href={link.href} className="text-gray-400 hover:text-primary font-urbanist text-sm transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold font-poppins mb-4">Kontak</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-gray-400 font-urbanist text-sm">
                                    Jl. Contoh No. 123, Jakarta Selatan, Indonesia
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-gray-400 font-urbanist text-sm">
                                    +62 812-3456-7890
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                                <span className="text-gray-400 font-urbanist text-sm">
                                    hello@feedjoy.id
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-500 font-urbanist text-sm text-center md:text-left">
                            © 2024 FeedJoy. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-500 hover:text-primary font-urbanist text-sm transition-colors">
                                Syarat & Ketentuan
                            </a>
                            <a href="#" className="text-gray-500 hover:text-primary font-urbanist text-sm transition-colors">
                                Kebijakan Privasi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
