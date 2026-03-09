// Create Order Use Case - Simplified with Authorization

import type { Order, CreateOrderRequest } from '../../entities/Order';
import type { OrderRepository } from '../../repositories/OrderRepository';
import type { User } from '../../entities/User';

export type CreateOrderInput = CreateOrderRequest;

// ✅ Simple class with authorization
export class CreateOrderUseCase {
    private orderRepository: OrderRepository;
    private currentUser: User;

    constructor(orderRepository: OrderRepository, currentUser: User) {
        this.orderRepository = orderRepository;
        this.currentUser = currentUser;
    }

    async execute(input: CreateOrderInput): Promise<Order> {
        // Validate input
        this.validateOrder(input);

        // ✅ Authorization: Auto-set customer info for regular users
        if (this.currentUser.role === 'user') {
            input.customerEmail = this.currentUser.email;
            input.customerName = this.currentUser.name;
        }

        // Create order
        return await this.orderRepository.create(input);
    }

    private validateOrder(order: CreateOrderInput): void {
        if (!order.productId || order.productId <= 0) {
            throw new Error('ID produk tidak valid');
        }

        if (!order.productName || order.productName.trim().length === 0) {
            throw new Error('Nama produk tidak boleh kosong');
        }

        if (!order.quantity || order.quantity <= 0) {
            throw new Error('Jumlah pesanan harus lebih dari 0');
        }

        if (!order.totalPrice || order.totalPrice <= 0) {
            throw new Error('Total harga tidak valid');
        }
    }
}
