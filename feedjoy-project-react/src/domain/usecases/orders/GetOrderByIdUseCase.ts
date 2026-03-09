// Get Order By ID Use Case - Simplified

import type { Order } from '../../entities/Order';
import type { OrderRepository } from '../../repositories/OrderRepository';

export interface GetOrderByIdInput {
    id: number;
}

// ✅ Simple class
export class GetOrderByIdUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async execute(input: GetOrderByIdInput): Promise<Order | null> {
        const { id } = input;

        if (!id || id <= 0) {
            throw new Error('ID pesanan tidak valid');
        }

        return await this.orderRepository.getById(id);
    }
}
