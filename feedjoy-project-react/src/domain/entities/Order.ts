// Domain Entity - Order
import { Phone } from 'lucide-react';
// Pure TypeScript interface, no framework dependencies

// Simplified order status flow:
// pending → processing → shipped → completed (or cancelled at any point)
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';

export interface OrderTimeline {
    status: string;
    label: string;
    date: string;
    completed: boolean;
}
export interface Review {
    id: number;
    rating: number;
    comment: string;
    createdAt: string;
}
export interface Order {
    id: number;
    userId?: string; // User ID for filtering orders by user
    productId: number;
    productName: string;
    productImage: string;
    phone: string;
    variant: string;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    trackingNumber?: string;
    timeline: OrderTimeline[];
    createdAt: string;
    review?: Review | null;
}

// Request type for creating new orders
export interface CreateOrderRequest {
    productId: number;
    productName: string;
    productImage: string;
    variant: string;
    quantity: number;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    address: string;
    paymentMethod: string;
    notes?: string;
    
}
