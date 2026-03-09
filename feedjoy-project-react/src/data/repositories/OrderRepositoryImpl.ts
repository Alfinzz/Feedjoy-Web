// Repository Implementation - Order
// Implements OrderRepository interface using DummyDataSource

import type { Order, OrderStatus, CreateOrderRequest } from '../../domain/entities/Order';
import type { OrderRepository } from '../../domain/repositories/OrderRepository';
import { dummyDataSource } from '../datasources/DummyDataSource';

export class OrderRepositoryImpl implements OrderRepository {
    async getAll(): Promise<Order[]> {
        return Promise.resolve(dummyDataSource.getOrders());
    }

    async getByUserId(_userId: number): Promise<Order[]> {
        // For dummy data, return all orders (no user filtering yet)
        return Promise.resolve(dummyDataSource.getOrders());
    }

    async getById(id: number): Promise<Order | null> {
        return Promise.resolve(dummyDataSource.getOrderById(id));
    }

    async getByStatus(status: OrderStatus): Promise<Order[]> {
        const orders = dummyDataSource.getOrders();
        return Promise.resolve(orders.filter(o => o.status === status));
    }

    async create(request: CreateOrderRequest): Promise<Order> {
        const orders = dummyDataSource.getOrders();
        const newId = Math.max(...orders.map(o => o.id), 1000) + 1;

        const now = new Date().toISOString();
        const newOrder: Order = {
            id: newId,
            productId: request.productId,
            productName: request.productName,
            productImage: request.productImage,
            variant: request.variant,
            quantity: request.quantity,
            totalPrice: request.totalPrice,
            status: 'pending',
            customerName: request.customerName,
            customerEmail: request.customerEmail,
            customerPhone: request.customerPhone,
            address: request.address,
            paymentMethod: request.paymentMethod,
            timeline: [
                { status: "created", label: "Pesanan Dibuat", date: now, completed: true },
                { status: "paid", label: "Pembayaran Dikonfirmasi", date: "", completed: false },
                { status: "processing", label: "Diproses", date: "", completed: false },
                { status: "shipped", label: "Dikirim", date: "", completed: false },
                { status: "delivered", label: "Diterima", date: "", completed: false },
                { status: "completed", label: "Selesai", date: "", completed: false },
            ],
            createdAt: now,
        };

        return Promise.resolve(dummyDataSource.addOrder(newOrder));
    }

    async update(id: number, updates: Partial<Order>): Promise<Order | null> {
        return Promise.resolve(dummyDataSource.updateOrder(id, updates));
    }

    async updateStatus(id: number, status: OrderStatus): Promise<Order | null> {
        const order = dummyDataSource.getOrderById(id);
        if (!order) return Promise.resolve(null);

        // Update timeline based on status
        const now = new Date().toISOString();
        const statusMap: Record<OrderStatus, number> = {
            'pending': 0,
            'confirmed': 2,
            'shipped': 3,
            'completed': 5,
            'cancelled': -1
        };

        const timeline = order.timeline.map((t, index) => {
            if (index <= statusMap[status]) {
                return { ...t, completed: true, date: t.date || now };
            }
            return t;
        });

        return Promise.resolve(dummyDataSource.updateOrder(id, { status, timeline }));
    }

    async delete(id: number): Promise<boolean> {
        return Promise.resolve(dummyDataSource.deleteOrder(id));
    }
}

// Singleton instance
export const orderRepository = new OrderRepositoryImpl();
