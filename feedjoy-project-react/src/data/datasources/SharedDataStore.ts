// SharedDataStore - Unified data store for Admin and User dashboards
// MVP Testing only - data stored in memory, will be lost on refresh

import type { Product } from '../../domain/entities/Product';
import type { Order, OrderStatus } from '../../domain/entities/Order';
import type { Review } from '../../domain/entities/Review';

// Consultation interface
export interface Consultation {
    id: number;
    name: string;
    phone: string;
    animalType: string;
    message: string;
    status: 'new' | 'contacted' | 'completed';
    createdAt: string;
}

// Helper: Generate placeholder image based on category
function generateProductImage(name: string, category: string): string {
    const categoryColors: Record<string, string> = {
        'Ayam': '22c55e',
        'Sapi': '3b82f6',
        'Kambing': 'f59e0b',
        'Domba': '8b5cf6',
        'Bebek': '06b6d4',
        'Kelinci': 'ec4899',
    };
    const color = categoryColors[category] || '64748b';
    const text = encodeURIComponent(name.substring(0, 20));
    return `https://placehold.co/400x300/${color}/white?text=${text}`;
}

// ==================== INITIAL DATA ====================

const initialProducts: Product[] = [
    {
        id: 1,
        name: "FeedJoy Probiotik Ayam",
        shortDescription: "Meningkatkan kesehatan pencernaan dan produksi telur ayam.",
        fullDescription: "FeedJoy Probiotik Ayam adalah formula probiotik berkualitas tinggi yang dirancang khusus untuk unggas. Produk ini mengandung bakteri baik Lactobacillus dan Bifidobacterium yang membantu menjaga keseimbangan mikroflora usus, meningkatkan penyerapan nutrisi, dan memperkuat sistem imun ayam.",
        price: 150000,
        image: "https://placehold.co/400x300/22c55e/white?text=Probiotik+Ayam",
        additionalImages: [
            "https://placehold.co/400x300/16a34a/white?text=Kemasan+1kg",
            "https://placehold.co/400x300/15803d/white?text=Cara+Pakai",
        ],
        stock: 50,
        category: "Ayam",
        variants: [
            { size: "500 gram", price: 85000, usage: "Campurkan 5 gram probiotik ke dalam 1 kg pakan." },
            { size: "1 kg", price: 150000, usage: "Campurkan 10 gram probiotik ke dalam 2 kg pakan." },
            { size: "5 kg", price: 650000, usage: "Campurkan 50 gram probiotik ke dalam 10 kg pakan." }
        ]
    },
    {
        id: 2,
        name: "FeedJoy Probiotik Sapi",
        shortDescription: "Formula khusus untuk meningkatkan produksi susu sapi perah.",
        fullDescription: "FeedJoy Probiotik Sapi diformulasikan secara khusus untuk memenuhi kebutuhan probiotik ternak sapi, terutama sapi perah.",
        price: 250000,
        image: "https://placehold.co/400x300/3b82f6/white?text=Probiotik+Sapi",
        additionalImages: [
            "https://placehold.co/400x300/2563eb/white?text=Kemasan+1kg",
        ],
        stock: 30,
        category: "Sapi",
        variants: [
            { size: "500 gram", price: 135000, usage: "Campurkan 25 gram probiotik ke dalam pakan harian 1 ekor sapi." },
            { size: "1 kg", price: 250000, usage: "Campurkan 50 gram probiotik ke dalam pakan harian 2 ekor sapi." },
            { size: "5 kg", price: 1100000, usage: "Campurkan 250 gram probiotik ke dalam pakan harian 10 ekor sapi." }
        ]
    },
    {
        id: 3,
        name: "FeedJoy Probiotik Kambing",
        shortDescription: "Probiotik organik untuk pertumbuhan dan daya tahan kambing.",
        fullDescription: "FeedJoy Probiotik Kambing adalah solusi probiotik organik yang dirancang untuk meningkatkan kesehatan dan performa kambing.",
        price: 180000,
        image: "https://placehold.co/400x300/f59e0b/white?text=Probiotik+Kambing",
        additionalImages: [],
        stock: 40,
        category: "Kambing",
        variants: [
            { size: "500 gram", price: 100000, usage: "Campurkan 10 gram probiotik ke dalam pakan harian 2 ekor kambing." },
            { size: "1 kg", price: 180000, usage: "Campurkan 20 gram probiotik ke dalam pakan harian 4 ekor kambing." },
        ]
    },
];

const initialOrders: Order[] = [
    {
        id: 3001,
        userId: 'user-1',
        productId: 1,
        productName: 'FeedJoy Probiotik Ayam',
        productImage: 'https://placehold.co/400x300/22c55e/white?text=Probiotik+Ayam',
        variant: '1 kg',
        quantity: 2,
        totalPrice: 300000,
        status: 'pending',
        customerName: 'Pak Budi',
        customerEmail: 'budi@example.com',
        customerPhone: '081234567890',
        address: 'Jl. Peternakan No. 123, Desa Sukamaju, Kecamatan Cikarang, Kabupaten Bekasi, Jawa Barat 17530',
        paymentMethod: 'Transfer Bank BCA',
        timeline: [{ status: 'pending', label: 'Menunggu Konfirmasi', date: '2025-12-17T08:00:00', completed: true }],
        createdAt: '2025-12-17T08:00:00'
    },
    {
        id: 3002,
        userId: 'user-2',
        productId: 2,
        productName: 'FeedJoy Probiotik Sapi',
        productImage: 'https://placehold.co/400x300/3b82f6/white?text=Probiotik+Sapi',
        variant: '500 gram',
        quantity: 3,
        totalPrice: 405000,
        status: 'confirmed',
        customerName: 'Bu Siti',
        customerEmail: 'siti@example.com',
        customerPhone: '081298765432',
        address: 'Jl. Kandang Sapi No. 45, Desa Makmur, Kecamatan Bojong, Kabupaten Bogor, Jawa Barat 16320',
        paymentMethod: 'Transfer Bank Mandiri',
        timeline: [
            { status: 'pending', label: 'Menunggu Konfirmasi', date: '2025-12-16T10:00:00', completed: true },
            { status: 'confirmed', label: 'Pesanan Diproses', date: '2025-12-16T14:30:00', completed: true }
        ],
        createdAt: '2025-12-16T10:00:00'
    },
    {
        id: 3003,
        userId: 'user-3',
        productId: 3,
        productName: 'FeedJoy Probiotik Kambing',
        productImage: 'https://placehold.co/400x300/f59e0b/white?text=Probiotik+Kambing',
        variant: '1 kg',
        quantity: 1,
        totalPrice: 180000,
        status: 'shipped',
        customerName: 'Pak Joko',
        customerEmail: 'joko@example.com',
        customerPhone: '081356789012',
        address: 'Jl. Peternakan Kambing No. 78, Desa Sejahtera, Kecamatan Sumedang, Kabupaten Sumedang, Jawa Barat 45350',
        paymentMethod: 'COD',
        trackingNumber: 'JNE123456789',
        timeline: [
            { status: 'pending', label: 'Menunggu Konfirmasi', date: '2025-12-15T09:00:00', completed: true },
            { status: 'confirmed', label: 'Pesanan Diproses', date: '2025-12-15T11:00:00', completed: true },
            { status: 'shipped', label: 'Pesanan Dikirim', date: '2025-12-16T08:00:00', completed: true }
        ],
        createdAt: '2025-12-15T09:00:00'
    },
    {
        id: 3004,
        userId: 'user-1',
        productId: 1,
        productName: 'FeedJoy Probiotik Ayam',
        productImage: 'https://placehold.co/400x300/22c55e/white?text=Probiotik+Ayam',
        variant: '5 kg',
        quantity: 1,
        totalPrice: 650000,
        status: 'completed',
        customerName: 'Pak Budi',
        customerEmail: 'budi@example.com',
        customerPhone: '081234567890',
        address: 'Jl. Peternakan No. 123, Desa Sukamaju, Kecamatan Cikarang, Kabupaten Bekasi, Jawa Barat 17530',
        paymentMethod: 'Transfer Bank BCA',
        trackingNumber: 'SICEPAT987654321',
        timeline: [
            { status: 'pending', label: 'Menunggu Konfirmasi', date: '2025-12-10T09:00:00', completed: true },
            { status: 'confirmed', label: 'Pesanan Diproses', date: '2025-12-10T14:00:00', completed: true },
            { status: 'shipped', label: 'Pesanan Dikirim', date: '2025-12-11T08:00:00', completed: true },
            { status: 'completed', label: 'Pesanan Selesai', date: '2025-12-14T15:00:00', completed: true }
        ],
        createdAt: '2025-12-10T09:00:00'
    }
];

const initialReviews: Review[] = [
    {
        id: 1,
        productId: 1,
        productName: "FeedJoy Probiotik Ayam",
        userId: "user-1",
        userName: "Pak Budi",
        rating: 5,
        comment: "Produk sangat bagus, ayam saya jadi lebih sehat dan produksi telur meningkat!",
        createdAt: "2025-12-15T10:30:00"
    },
    {
        id: 2,
        productId: 2,
        productName: "FeedJoy Probiotik Sapi",
        userId: "user-2",
        userName: "Bu Siti",
        rating: 4,
        comment: "Kualitas susu sapi meningkat setelah pakai probiotik ini.",
        createdAt: "2025-12-14T14:20:00"
    }
];

// ==================== SHARED DATA STORE CLASS ====================

type Listener = () => void;

class SharedDataStore {
    private products: Product[] = [...initialProducts];
    private orders: Order[] = [...initialOrders];
    private reviews: Review[] = [...initialReviews];
    private consultations: Consultation[] = [];
    private listeners: Set<Listener> = new Set();
    private nextProductId = 4;
    private nextOrderId = 4001;
    private nextReviewId = 3;
    private nextConsultationId = 1;

    // ==================== SUBSCRIPTION ====================

    subscribe(listener: Listener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notifyListeners(): void {
        this.listeners.forEach(listener => listener());
    }

    // ==================== PRODUCTS ====================

    getProducts(): Product[] {
        return [...this.products];
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }

    addProduct(product: Omit<Product, 'id'>): Product {
        // Auto-generate image if empty or '-'
        let image = product.image;
        if (!image || image === '-' || image.trim() === '') {
            image = generateProductImage(product.name, product.category);
        }

        const newProduct: Product = {
            ...product,
            id: this.nextProductId++,
            image
        };
        this.products.push(newProduct);
        this.notifyListeners();
        return newProduct;
    }

    updateProduct(id: number, updates: Partial<Product>): Product | null {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return null;

        this.products[index] = { ...this.products[index], ...updates };
        this.notifyListeners();
        return this.products[index];
    }

    deleteProduct(id: number): boolean {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) return false;

        this.products.splice(index, 1);
        this.notifyListeners();
        return true;
    }

    // ==================== ORDERS ====================

    getOrders(): Order[] {
        return [...this.orders];
    }

    getOrderById(id: number): Order | undefined {
        return this.orders.find(o => o.id === id);
    }

    getOrdersByUserId(userId: string): Order[] {
        return this.orders.filter(o => o.userId === userId);
    }

    addOrder(order: Omit<Order, 'id'>): Order {
        // Reduce product stock
        const productIndex = this.products.findIndex(p => p.id === order.productId);
        if (productIndex !== -1) {
            const currentStock = this.products[productIndex].stock || 0;
            this.products[productIndex] = {
                ...this.products[productIndex],
                stock: Math.max(0, currentStock - order.quantity)
            };
        }

        const newOrder: Order = {
            ...order,
            id: this.nextOrderId++
        };
        this.orders.push(newOrder);
        this.notifyListeners();
        return newOrder;
    }

    updateOrderStatus(id: number, status: OrderStatus, trackingNumber?: string): Order | null {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) return null;

        const order = this.orders[index];
        const now = new Date().toISOString();

        // Update timeline
        const newTimeline = [...(order.timeline || [])];
        const statusLabels: Record<OrderStatus, string> = {
            pending: 'Menunggu Konfirmasi',
            confirmed: 'Pesanan Diproses',
            shipped: 'Pesanan Dikirim',
            completed: 'Pesanan Selesai',
            cancelled: 'Pesanan Dibatalkan'
        };

        newTimeline.push({
            status,
            label: statusLabels[status],
            date: now,
            completed: true
        });

        this.orders[index] = {
            ...order,
            status,
            timeline: newTimeline,
            ...(trackingNumber ? { trackingNumber } : {})
        };

        this.notifyListeners();
        return this.orders[index];
    }

    deleteOrder(id: number): boolean {
        const index = this.orders.findIndex(o => o.id === id);
        if (index === -1) return false;

        this.orders.splice(index, 1);
        this.notifyListeners();
        return true;
    }

    // ==================== REVIEWS ====================

    getReviews(): Review[] {
        return [...this.reviews];
    }

    getReviewsByProductId(productId: number): Review[] {
        return this.reviews.filter(r => r.productId === productId);
    }

    addReview(review: Omit<Review, 'id'>): Review {
        const newReview: Review = {
            ...review,
            id: this.nextReviewId++
        };
        this.reviews.push(newReview);
        this.notifyListeners();
        return newReview;
    }

    deleteReview(id: number): boolean {
        const index = this.reviews.findIndex(r => r.id === id);
        if (index === -1) return false;

        this.reviews.splice(index, 1);
        this.notifyListeners();
        return true;
    }

    // ==================== CONSULTATIONS ====================

    getConsultations(): Consultation[] {
        return [...this.consultations];
    }

    addConsultation(consultation: Omit<Consultation, 'id' | 'status' | 'createdAt'>): Consultation {
        const newConsultation: Consultation = {
            ...consultation,
            id: this.nextConsultationId++,
            status: 'new',
            createdAt: new Date().toISOString()
        };
        this.consultations.push(newConsultation);
        this.notifyListeners();
        return newConsultation;
    }

    updateConsultationStatus(id: number, status: Consultation['status']): Consultation | null {
        const index = this.consultations.findIndex(c => c.id === id);
        if (index === -1) return null;

        this.consultations[index] = { ...this.consultations[index], status };
        this.notifyListeners();
        return this.consultations[index];
    }

    deleteConsultation(id: number): boolean {
        const index = this.consultations.findIndex(c => c.id === id);
        if (index === -1) return false;

        this.consultations.splice(index, 1);
        this.notifyListeners();
        return true;
    }

    // ==================== STATS (for Admin Dashboard) ====================

    getStats() {
        const completedOrders = this.orders.filter(o => o.status === 'completed');
        const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
        const avgRating = this.reviews.length > 0
            ? this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length
            : 0;

        return {
            totalProducts: this.products.length,
            totalOrders: this.orders.length,
            totalReviews: this.reviews.length,
            totalRevenue,
            pendingOrders: this.orders.filter(o => o.status === 'pending').length,
            newConsultations: this.consultations.filter(c => c.status === 'new').length,
            averageRating: avgRating
        };
    }
}

// Export singleton instance
export const sharedDataStore = new SharedDataStore();
