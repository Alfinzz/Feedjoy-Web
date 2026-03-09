// Repository Interface - Order
// Contract for order data access, implementation can be dummy or API

import type { Order, OrderStatus, CreateOrderRequest } from '../entities/Order';

export interface OrderRepository {
    /**
     * Get all orders
     */
    getAll(): Promise<Order[]>;

    /**
     * Get orders by user ID (for user-specific views)
     */
    getByUserId(userId: number): Promise<Order[]>;

    /**
     * Get order by ID
     */
    getById(id: number): Promise<Order | null>;

    /**
     * Get orders by status
     */
    getByStatus(status: OrderStatus): Promise<Order[]>;

    /**
     * Create new order
     */
    create(order: CreateOrderRequest): Promise<Order>;

    /**
     * Update order (partial update)
     */
    update(id: number, updates: Partial<Order>): Promise<Order | null>;

    /**
     * Update order status
     */
    updateStatus(id: number, status: OrderStatus): Promise<Order | null>;

    /**
     * Delete order (for history management)
     */
    delete(id: number): Promise<boolean>;
}
