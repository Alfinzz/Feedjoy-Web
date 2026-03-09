// Delete Order Use Case - Simplified

import type { OrderRepository } from '../../repositories/OrderRepository';

export interface DeleteOrderInput {
    id: number;
}

// ✅ Simple class
export class DeleteOrderUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(input: DeleteOrderInput): Promise<boolean> {
        const { id } = input;

        if (!id || id <= 0) {
            throw new Error('ID pesanan tidak valid');
        }

        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new Error('Pesanan tidak ditemukan');
        }

        // Business rule: Only pending orders can be deleted
        if (order.status !== 'pending') {
            throw new Error('Hanya pesanan pending yang dapat dibatalkan');
        }

        return await this.orderRepository.delete(id);
    }
}
