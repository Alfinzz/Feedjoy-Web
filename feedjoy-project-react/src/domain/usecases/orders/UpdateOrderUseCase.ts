// Update Order Use Case - Simplified

import type { Order } from '../../entities/Order';
import type { OrderRepository } from '../../repositories/OrderRepository';

export interface UpdateOrderInput {
    id: number;
    updates: Partial<Order>;
}

// ✅ Simple class
export class UpdateOrderUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(input: UpdateOrderInput): Promise<Order | null> {
        const { id, updates } = input;

        if (!id || id <= 0) {
            throw new Error('ID pesanan tidak valid');
        }

        if (!updates || Object.keys(updates).length === 0) {
            throw new Error('Tidak ada data yang diupdate');
        }

        return await this.orderRepository.update(id, updates);
    }
}
