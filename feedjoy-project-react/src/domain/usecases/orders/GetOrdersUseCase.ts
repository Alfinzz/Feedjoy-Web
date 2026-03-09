// Get Orders Use Case - Simplified with Role Support

import type { Order } from '../../entities/Order';
import type { OrderRepository } from '../../repositories/OrderRepository';
import type { User } from '../../entities/User';

// ✅ Simple class with user context
export class GetOrdersUseCase {
    private orderRepository: OrderRepository;
    private currentUser: User;

    constructor(orderRepository: OrderRepository, currentUser: User) {
        this.orderRepository = orderRepository;
        this.currentUser = currentUser;
    }

    async execute(): Promise<Order[]> {
        const allOrders = await this.orderRepository.getAll();

        // ✅ Role-based filtering
        if (this.currentUser.role === 'admin') {
            return allOrders; // Admin sees all orders
        }

        // 🔧 TEMPORARY: Show all orders for testing dummy data
        // Users only see their own orders
        // return allOrders.filter(o => o.customerEmail === this.currentUser.email);

        // For now, show all orders so dummy data is visible
        return allOrders;
    }
}
