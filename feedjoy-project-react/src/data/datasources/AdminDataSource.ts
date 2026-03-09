// Admin Data Source - Now redirects to SharedDataStore for Products, Orders, Reviews
// Users and Consultations remain local to Admin

import type { Product } from '../../domain/entities/Product';
import type { Order } from '../../domain/entities/Order';
import type { Review } from '../../domain/entities/Review';
import type { User } from '../../domain/entities/User';
import { sharedDataStore } from './SharedDataStore';

// ==================== CONSULTATION REQUESTS ====================

export interface ConsultationRequest {
    id: number;
    name: string;
    phone: string;
    animalType: string;
    message: string;
    status: 'new' | 'contacted' | 'completed';
    createdAt: string;
}

// ==================== ADMIN USERS (Local to Admin) ====================

const adminDummyUsers: User[] = [
    {
        id: 1,
        name: "Admin FeedJoy",
        email: "admin@feedjoy.id",
        phone: "081234567890",
        role: "admin",
        created_at: "2025-01-01T00:00:00"
    },
    {
        id: 2,
        name: "Agus Pratama",
        email: "agus.pratama@gmail.com",
        phone: "081234567890",
        role: "user",
        created_at: "2025-12-01T10:00:00"
    },
    {
        id: 3,
        name: "Maya Sari",
        email: "maya.sari@yahoo.com",
        phone: "082345678901",
        role: "user",
        created_at: "2025-12-05T14:30:00"
    },
    {
        id: 4,
        name: "Budi Gunawan",
        email: "budi.gunawan@outlook.com",
        phone: "083456789012",
        role: "user",
        created_at: "2025-12-10T09:15:00"
    },
    {
        id: 5,
        name: "Sri Wahyuni",
        email: "sri.wahyuni@gmail.com",
        phone: "084567890123",
        role: "user",
        created_at: "2025-12-12T16:45:00"
    },
    {
        id: 6,
        name: "Hendra Wijaya",
        email: "hendra.wijaya@live.com",
        phone: "085678901234",
        role: "user",
        created_at: "2025-12-13T11:20:00"
    },
    {
        id: 7,
        name: "Rina Susanti",
        email: "rina.susanti@gmail.com",
        phone: "086789012345",
        role: "user",
        created_at: "2025-12-14T08:00:00"
    },
];

// ==================== CONSULTATION REQUESTS (Local to Admin) ====================

const adminDummyConsultations: ConsultationRequest[] = [
    {
        id: 1,
        name: "Pak Suwarno",
        phone: "081122334455",
        animalType: "Sapi",
        message: "Saya punya 10 ekor sapi perah, ingin konsultasi mengenai produk probiotik yang cocok untuk meningkatkan produksi susu.",
        status: 'new',
        createdAt: "2025-12-17T09:00:00"
    },
    {
        id: 2,
        name: "Bu Siti",
        phone: "082233445566",
        animalType: "Ayam",
        message: "Saya peternak ayam petelur dengan 500 ekor. Tertarik untuk mencoba produk FeedJoy.",
        status: 'new',
        createdAt: "2025-12-17T08:30:00"
    },
    {
        id: 3,
        name: "Mas Joko",
        phone: "083344556677",
        animalType: "Kambing",
        message: "Mau tanya harga grosir untuk probiotik kambing, saya punya peternakan dengan 50 ekor kambing.",
        status: 'contacted',
        createdAt: "2025-12-16T14:00:00"
    },
    {
        id: 4,
        name: "Pak Hadi",
        phone: "084455667788",
        animalType: "Bebek",
        message: "Apakah ada promo untuk pembelian dalam jumlah besar?",
        status: 'completed',
        createdAt: "2025-12-15T10:00:00"
    },
];

// ==================== ADMIN DATA SOURCE CLASS ====================

export class AdminDataSource {
    private users: User[] = [...adminDummyUsers];
    private consultations: ConsultationRequest[] = [...adminDummyConsultations];

    // ========== PRODUCTS (Redirects to SharedDataStore) ==========
    getProducts(): Product[] {
        return sharedDataStore.getProducts();
    }

    getProductById(id: number): Product | null {
        return sharedDataStore.getProductById(id) || null;
    }

    addProduct(product: Omit<Product, 'id'>): Product {
        return sharedDataStore.addProduct(product);
    }

    updateProduct(id: number, updates: Partial<Product>): Product | null {
        return sharedDataStore.updateProduct(id, updates);
    }

    deleteProduct(id: number): boolean {
        return sharedDataStore.deleteProduct(id);
    }

    // ========== ORDERS (Redirects to SharedDataStore) ==========
    getOrders(): Order[] {
        return sharedDataStore.getOrders();
    }

    getOrderById(id: number): Order | null {
        return sharedDataStore.getOrderById(id) || null;
    }

    updateOrderStatus(id: number, status: Order['status'], trackingNumber?: string): Order | null {
        return sharedDataStore.updateOrderStatus(id, status, trackingNumber);
    }

    // ========== USERS (Local to Admin) ==========
    getUsers(): User[] {
        return this.users;
    }

    getUserById(id: number): User | null {
        return this.users.find(u => u.id === id) || null;
    }

    addUser(user: Omit<User, 'id' | 'created_at'>): User {
        const newUser = {
            ...user,
            id: Date.now(),
            created_at: new Date().toISOString()
        };
        this.users.push(newUser);
        return newUser;
    }

    updateUser(id: number, updates: Partial<User>): User | null {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return null;
        this.users[index] = { ...this.users[index], ...updates };
        return this.users[index];
    }

    deleteUser(id: number): boolean {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) return false;
        this.users.splice(index, 1);
        return true;
    }

    // ========== REVIEWS (Redirects to SharedDataStore) ==========
    getReviews(): Review[] {
        return sharedDataStore.getReviews();
    }

    deleteReview(id: number): boolean {
        return sharedDataStore.deleteReview(id);
    }

    // ========== CONSULTATIONS (Redirects to SharedDataStore) ==========
    getConsultations() {
        // Merge local dummy consultations with SharedDataStore consultations
        const sharedConsultations = sharedDataStore.getConsultations();
        return [...this.consultations, ...sharedConsultations];
    }

    addConsultation(consultation: Omit<ConsultationRequest, 'id' | 'status' | 'createdAt'>): ConsultationRequest {
        return sharedDataStore.addConsultation(consultation) as ConsultationRequest;
    }

    updateConsultationStatus(id: number, status: ConsultationRequest['status']): ConsultationRequest | null {
        // Try local first
        const localIndex = this.consultations.findIndex(c => c.id === id);
        if (localIndex !== -1) {
            this.consultations[localIndex] = { ...this.consultations[localIndex], status };
            return this.consultations[localIndex];
        }
        // Try shared store
        return sharedDataStore.updateConsultationStatus(id, status) as ConsultationRequest | null;
    }

    deleteConsultation(id: number): boolean {
        // Try local first
        const localIndex = this.consultations.findIndex(c => c.id === id);
        if (localIndex !== -1) {
            this.consultations.splice(localIndex, 1);
            return true;
        }
        // Try shared store
        return sharedDataStore.deleteConsultation(id);
    }

    // ========== STATISTICS ==========
    getStats() {
        const orders = sharedDataStore.getOrders();
        const products = sharedDataStore.getProducts();
        const reviews = sharedDataStore.getReviews();

        const totalUsers = this.users.filter(u => u.role === 'user').length;
        const totalOrders = orders.length;
        const totalProducts = products.length;
        const totalRevenue = orders
            .filter(o => o.status === 'completed')
            .reduce((sum, o) => sum + o.totalPrice, 0);

        const pendingOrders = orders.filter(o => o.status === 'pending').length;
        const confirmedOrders = orders.filter(o => o.status === 'confirmed').length;
        const newConsultations = this.consultations.filter(c => c.status === 'new').length;

        return {
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
            pendingOrders,
            confirmedOrders,
            newConsultations,
            totalReviews: reviews.length,
            averageRating: reviews.length > 0
                ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
                : 0
        };
    }
}

// Singleton instance
export const adminDataSource = new AdminDataSource();
