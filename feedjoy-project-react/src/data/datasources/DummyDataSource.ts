// Dummy Data Source - Contains all mock data for development
// This file centralizes all dummy data, making it easy to replace with API calls later

import type { Product } from '../../domain/entities/Product';
import type { Order } from '../../domain/entities/Order';
import type { Review } from '../../domain/entities/Review';

// ==================== PRODUCTS ====================

export const dummyProducts: Product[] = [
    {
        id: 1,
        name: "FeedJoy Probiotik Ayam",
        shortDescription: "Meningkatkan kesehatan pencernaan dan produksi telur ayam.",
        fullDescription: "FeedJoy Probiotik Ayam adalah formula probiotik berkualitas tinggi yang dirancang khusus untuk unggas. Produk ini mengandung bakteri baik Lactobacillus dan Bifidobacterium yang membantu menjaga keseimbangan mikroflora usus, meningkatkan penyerapan nutrisi, dan memperkuat sistem imun ayam. Dengan penggunaan rutin, ayam Anda akan lebih sehat, produktif, dan tahan terhadap penyakit.",
        price: 150000,
        image: "https://placehold.co/400x300/22c55e/white?text=Probiotik+Ayam",
        additionalImages: [
            "https://placehold.co/400x300/16a34a/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/15803d/white?text=Cara+Pakai",
            "https://placehold.co/400x300/166534/white?text=Hasil+Ternak"
        ],
        stock: 50,
        category: "Ayam",
        variants: [
            { size: "500 gram", price: 85000, usage: "Campurkan 5 gram probiotik ke dalam 1 kg pakan. Berikan 2 kali sehari untuk 10 ekor ayam. Cocok untuk peternak skala kecil." },
            { size: "1 kg", price: 150000, usage: "Campurkan 10 gram probiotik ke dalam 2 kg pakan. Berikan 2 kali sehari untuk 20 ekor ayam. Ideal untuk peternak skala menengah." },
            { size: "5 kg", price: 650000, usage: "Campurkan 50 gram probiotik ke dalam 10 kg pakan. Berikan 2 kali sehari untuk 100 ekor ayam. Cocok untuk peternakan skala besar." }
        ]
    },
    {
        id: 2,
        name: "FeedJoy Probiotik Sapi",
        shortDescription: "Formula khusus untuk meningkatkan produksi susu sapi perah.",
        fullDescription: "FeedJoy Probiotik Sapi diformulasikan secara khusus untuk memenuhi kebutuhan probiotik ternak sapi, terutama sapi perah. Produk ini membantu meningkatkan fermentasi rumen, mengoptimalkan pencernaan serat, dan meningkatkan produksi susu hingga 15%. Bakteri probiotik di dalamnya juga membantu mencegah gangguan pencernaan seperti bloat dan acidosis.",
        price: 250000,
        image: "https://placehold.co/400x300/3b82f6/white?text=Probiotik+Sapi",
        additionalImages: [
            "https://placehold.co/400x300/2563eb/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/1d4ed8/white?text=Cara+Pakai",
            "https://placehold.co/400x300/1e40af/white?text=Hasil+Ternak"
        ],
        stock: 30,
        category: "Sapi",
        variants: [
            { size: "500 gram", price: 135000, usage: "Campurkan 25 gram probiotik ke dalam pakan harian 1 ekor sapi. Berikan setiap pagi sebelum makan utama." },
            { size: "1 kg", price: 250000, usage: "Campurkan 50 gram probiotik ke dalam pakan harian 2 ekor sapi. Berikan setiap pagi dan sore hari." },
            { size: "5 kg", price: 1100000, usage: "Campurkan 250 gram probiotik ke dalam pakan harian 10 ekor sapi. Ideal untuk peternakan sapi perah skala menengah." }
        ]
    },
    {
        id: 3,
        name: "FeedJoy Probiotik Kambing",
        shortDescription: "Probiotik organik untuk pertumbuhan dan daya tahan kambing.",
        fullDescription: "FeedJoy Probiotik Kambing adalah solusi probiotik organik yang dirancang untuk meningkatkan kesehatan dan performa kambing. Produk ini membantu mengoptimalkan pencernaan, meningkatkan konversi pakan menjadi daging, dan memperkuat sistem imun. Sangat cocok untuk kambing pedaging maupun kambing perah.",
        price: 180000,
        image: "https://placehold.co/400x300/f59e0b/white?text=Probiotik+Kambing",
        additionalImages: [
            "https://placehold.co/400x300/d97706/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/b45309/white?text=Cara+Pakai",
            "https://placehold.co/400x300/92400e/white?text=Hasil+Ternak"
        ],
        stock: 40,
        category: "Kambing",
        variants: [
            { size: "500 gram", price: 100000, usage: "Campurkan 10 gram probiotik ke dalam pakan harian 2 ekor kambing. Berikan sekali sehari di pagi hari." },
            { size: "1 kg", price: 180000, usage: "Campurkan 20 gram probiotik ke dalam pakan harian 4 ekor kambing. Berikan setiap pagi sebelum merumput." },
            { size: "5 kg", price: 800000, usage: "Campurkan 100 gram probiotik ke dalam pakan harian 20 ekor kambing. Cocok untuk peternakan skala menengah ke besar." }
        ]
    },
    {
        id: 4,
        name: "FeedJoy Probiotik Domba",
        shortDescription: "Meningkatkan kualitas wol dan kesehatan domba secara menyeluruh.",
        fullDescription: "FeedJoy Probiotik Domba dirancang khusus untuk memenuhi kebutuhan nutrisi dan kesehatan domba. Produk ini tidak hanya membantu pencernaan tetapi juga meningkatkan kualitas wol dan daging. Formulasi unik kami mengandung strain probiotik yang terbukti efektif untuk domba di berbagai kondisi iklim.",
        price: 175000,
        image: "https://placehold.co/400x300/8b5cf6/white?text=Probiotik+Domba",
        additionalImages: [
            "https://placehold.co/400x300/7c3aed/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/6d28d9/white?text=Cara+Pakai",
            "https://placehold.co/400x300/5b21b6/white?text=Hasil+Ternak"
        ],
        stock: 35,
        category: "Domba",
        variants: [
            { size: "500 gram", price: 95000, usage: "Campurkan 8 gram probiotik ke dalam pakan harian 2 ekor domba. Berikan sekali sehari." },
            { size: "1 kg", price: 175000, usage: "Campurkan 15 gram probiotik ke dalam pakan harian 4 ekor domba. Berikan di pagi hari bersama konsentrat." },
            { size: "5 kg", price: 775000, usage: "Campurkan 75 gram probiotik ke dalam pakan harian 20 ekor domba. Ideal untuk peternakan domba komersial." }
        ]
    },
    {
        id: 5,
        name: "FeedJoy Probiotik Bebek",
        shortDescription: "Meningkatkan produksi telur dan kualitas daging bebek.",
        fullDescription: "FeedJoy Probiotik Bebek adalah formula probiotik yang dikembangkan khusus untuk itik/bebek. Produk ini membantu meningkatkan efisiensi pakan, mempercepat pertumbuhan, dan meningkatkan produksi telur. Bakteri probiotik di dalamnya juga membantu mengurangi bau kandang dan meningkatkan kualitas kotoran sebagai pupuk.",
        price: 140000,
        image: "https://placehold.co/400x300/06b6d4/white?text=Probiotik+Bebek",
        additionalImages: [
            "https://placehold.co/400x300/0891b2/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/0e7490/white?text=Cara+Pakai",
            "https://placehold.co/400x300/155e75/white?text=Hasil+Ternak"
        ],
        stock: 55,
        category: "Bebek",
        variants: [
            { size: "500 gram", price: 80000, usage: "Campurkan 5 gram probiotik ke dalam 1 kg pakan. Berikan 2 kali sehari untuk 15 ekor bebek." },
            { size: "1 kg", price: 140000, usage: "Campurkan 10 gram probiotik ke dalam 2 kg pakan. Berikan 2 kali sehari untuk 30 ekor bebek." },
            { size: "5 kg", price: 600000, usage: "Campurkan 50 gram probiotik ke dalam 10 kg pakan. Cocok untuk peternakan bebek skala besar hingga 150 ekor." }
        ]
    },
    {
        id: 6,
        name: "FeedJoy Probiotik Kelinci",
        shortDescription: "Menjaga kesehatan pencernaan dan bulu kelinci.",
        fullDescription: "FeedJoy Probiotik Kelinci adalah probiotik premium yang diformulasikan untuk menjaga kesehatan pencernaan kelinci yang sensitif. Produk ini membantu mencegah gangguan pencernaan seperti diare dan kembung, sekaligus meningkatkan kualitas bulu. Sangat cocok untuk kelinci hias maupun kelinci pedaging.",
        price: 120000,
        image: "https://placehold.co/400x300/ec4899/white?text=Probiotik+Kelinci",
        additionalImages: [
            "https://placehold.co/400x300/db2777/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/be185d/white?text=Cara+Pakai",
            "https://placehold.co/400x300/9d174d/white?text=Hasil+Ternak"
        ],
        stock: 45,
        category: "Kelinci",
        variants: [
            { size: "500 gram", price: 70000, usage: "Campurkan 2 gram probiotik ke dalam pakan harian 5 ekor kelinci. Berikan sekali sehari di pagi hari." },
            { size: "1 kg", price: 120000, usage: "Campurkan 4 gram probiotik ke dalam pakan harian 10 ekor kelinci. Berikan setiap hari secara rutin." },
            { size: "5 kg", price: 525000, usage: "Campurkan 20 gram probiotik ke dalam pakan harian 50 ekor kelinci. Cocok untuk peternakan kelinci skala menengah." }
        ]
    },
];

// ==================== ORDERS ====================

export const dummyOrders: Order[] = [
    // PENDING - Menunggu Konfirmasi
    {
        id: 1001,
        productId: 1,
        productName: "FeedJoy Probiotik Ayam",
        productImage: "https://placehold.co/400x300/22c55e/white?text=Probiotik+Ayam",
        variant: "1 kg",
        quantity: 2,
        totalPrice: 300000,
        status: 'pending',
        customerName: "Budi Santoso",
        customerEmail: "budi.santoso@gmail.com",
        customerPhone: "081234567890",
        address: "Jl. Raya Bogor No. 45, RT 03/RW 05, Kelurahan Cibinong, Kecamatan Cibinong, Kabupaten Bogor, Jawa Barat 16914",
        paymentMethod: "QRIS",
        timeline: [
            { status: "created", label: "Pesanan Dibuat", date: "2025-12-16T08:30:00", completed: true },
            { status: "pending", label: "Menunggu Konfirmasi", date: "2025-12-16T08:30:00", completed: true },
            { status: "processing", label: "Diproses", date: "", completed: false },
            { status: "shipped", label: "Dikirim", date: "", completed: false },
            { status: "delivered", label: "Diterima", date: "", completed: false },
            { status: "completed", label: "Selesai", date: "", completed: false },
        ],
        createdAt: "2025-12-16T08:30:00"
    },

    // PROCESSING - Sedang Diproses
    {
        id: 1002,
        productId: 2,
        productName: "FeedJoy Probiotik Sapi",
        productImage: "https://placehold.co/400x300/3b82f6/white?text=Probiotik+Sapi",
        variant: "5 kg",
        quantity: 1,
        totalPrice: 1100000,
        status: 'confirmed',
        customerName: "Siti Nurhaliza",
        customerEmail: "siti.nurhaliza@yahoo.com",
        customerPhone: "082345678901",
        address: "Jl. Slamet Riyadi No. 128, RT 02/RW 08, Kelurahan Karangasem, Kecamatan Laweyan, Kota Surakarta, Jawa Tengah 57145",
        paymentMethod: "QRIS",
        timeline: [
            { status: "created", label: "Pesanan Dibuat", date: "2025-12-15T14:15:00", completed: true },
            { status: "pending", label: "Menunggu Konfirmasi", date: "2025-12-15T14:15:00", completed: true },
            { status: "processing", label: "Diproses", date: "2025-12-15T15:00:00", completed: true },
            { status: "shipped", label: "Dikirim", date: "", completed: false },
            { status: "delivered", label: "Diterima", date: "", completed: false },
            { status: "completed", label: "Selesai", date: "", completed: false },
        ],
        createdAt: "2025-12-15T14:15:00"
    },

    // SHIPPED - Dalam Pengiriman
    {
        id: 1003,
        productId: 3,
        productName: "FeedJoy Probiotik Kambing",
        productImage: "https://placehold.co/400x300/f59e0b/white?text=Probiotik+Kambing",
        variant: "500 gram",
        quantity: 4,
        totalPrice: 400000,
        status: 'shipped',
        customerName: "Ahmad Fauzi",
        customerEmail: "ahmad.fauzi@outlook.com",
        customerPhone: "083456789012",
        address: "Jl. Diponegoro No. 89, RT 01/RW 03, Kelurahan Citarum, Kecamatan Bandung Wetan, Kota Bandung, Jawa Barat 40115",
        paymentMethod: "QRIS",
        trackingNumber: "JNE8765432109",
        timeline: [
            { status: "created", label: "Pesanan Dibuat", date: "2025-12-14T09:45:00", completed: true },
            { status: "pending", label: "Menunggu Konfirmasi", date: "2025-12-14T09:45:00", completed: true },
            { status: "processing", label: "Diproses", date: "2025-12-14T11:00:00", completed: true },
            { status: "shipped", label: "Dikirim", date: "2025-12-15T08:30:00", completed: true },
            { status: "delivered", label: "Diterima", date: "", completed: false },
            { status: "completed", label: "Selesai", date: "", completed: false },
        ],
        createdAt: "2025-12-14T09:45:00"
    },

    // DELIVERED - Telah Diterima
    {
        id: 1004,
        productId: 4,
        productName: "FeedJoy Probiotik Domba",
        productImage: "https://placehold.co/400x300/8b5cf6/white?text=Probiotik+Domba",
        variant: "1 kg",
        quantity: 3,
        totalPrice: 525000,
        status: 'completed',
        customerName: "Dewi Lestari",
        customerEmail: "dewi.lestari@gmail.com",
        customerPhone: "084567890123",
        address: "Jl. Gajah Mada No. 234, RT 05/RW 12, Kelurahan Denpasar Barat, Kecamatan Denpasar Barat, Kota Denpasar, Bali 80119",
        paymentMethod: "QRIS",
        trackingNumber: "SICEPAT456789123",
        timeline: [
            { status: "created", label: "Pesanan Dibuat", date: "2025-12-13T10:20:00", completed: true },
            { status: "pending", label: "Menunggu Konfirmasi", date: "2025-12-13T10:20:00", completed: true },
            { status: "processing", label: "Diproses", date: "2025-12-13T13:00:00", completed: true },
            { status: "shipped", label: "Dikirim", date: "2025-12-14T07:00:00", completed: true },
            { status: "delivered", label: "Diterima", date: "2025-12-16T10:15:00", completed: true },
            { status: "completed", label: "Selesai", date: "", completed: false },
        ],
        createdAt: "2025-12-13T10:20:00"
    },

    // COMPLETED - Selesai
    {
        id: 1005,
        productId: 5,
        productName: "FeedJoy Probiotik Bebek",
        productImage: "https://placehold.co/400x300/06b6d4/white?text=Probiotik+Bebek",
        variant: "5 kg",
        quantity: 2,
        totalPrice: 1200000,
        status: 'completed',
        customerName: "Rudi Hartono",
        customerEmail: "rudi.hartono@live.com",
        customerPhone: "085678901234",
        address: "Jl. Veteran No. 67, RT 04/RW 09, Kelurahan Penjaringan, Kecamatan Penjaringan, Kota Jakarta Utara, DKI Jakarta 14450",
        paymentMethod: "QRIS",
        trackingNumber: "ANTERAJA789012345",
        timeline: [
            { status: "created", label: "Pesanan Dibuat", date: "2025-12-10T11:00:00", completed: true },
            { status: "pending", label: "Menunggu Konfirmasi", date: "2025-12-10T11:00:00", completed: true },
            { status: "processing", label: "Diproses", date: "2025-12-10T14:30:00", completed: true },
            { status: "shipped", label: "Dikirim", date: "2025-12-11T08:00:00", completed: true },
            { status: "delivered", label: "Diterima", date: "2025-12-13T15:45:00", completed: true },
            { status: "completed", label: "Selesai", date: "2025-12-13T16:00:00", completed: true },
        ],
        createdAt: "2025-12-10T11:00:00"
    },
];

// ==================== REVIEWS ====================

// Start with empty reviews for testing
export const dummyReviews: Review[] = [];

// ==================== DATA SOURCE CLASS ====================

/**
 * DummyDataSource provides in-memory data storage for development
 * This class simulates API behavior with async operations
 */
export class DummyDataSource {
    private products: Product[] = [...dummyProducts];
    private orders: Order[] = [...dummyOrders];
    private reviews: Review[] = [...dummyReviews];

    // Products
    getProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product | null {
        return this.products.find(p => p.id === id) || null;
    }

    // Orders
    getOrders(): Order[] {
        return this.orders;
    }

    getOrderById(id: number): Order | null {
        return this.orders.find(o => o.id === id) || null;
    }

    addOrder(order: Order): Order {
        this.orders.push(order);
        return order;
    }

    updateOrder(id: number, updates: Partial<Order>): Order | null {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) return null;
        this.orders[index] = { ...this.orders[index], ...updates };
        return this.orders[index];
    }

    deleteOrder(id: number): boolean {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) return false;
        this.orders.splice(index, 1);
        return true;
    }

    // Reviews
    getReviews(): Review[] {
        return this.reviews;
    }

    getReviewByOrderId(orderId: number): Review | null {
        return this.reviews.find(r => r.orderId === orderId) || null;
    }

    addReview(review: Review): Review {
        this.reviews.push(review);
        return review;
    }

    updateReview(id: number, updates: Partial<Review>): Review | null {
        const index = this.reviews.findIndex(r => r.id === id);
        if (index === -1) return null;
        this.reviews[index] = { ...this.reviews[index], ...updates };
        return this.reviews[index];
    }

    deleteReview(id: number): boolean {
        const index = this.reviews.findIndex(r => r.id === id);
        if (index === -1) return false;
        this.reviews.splice(index, 1);
        return true;
    }
}

// Singleton instance for consistent state across the app
export const dummyDataSource = new DummyDataSource();
