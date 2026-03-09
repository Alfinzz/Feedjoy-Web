// Get All Products Use Case - Simplified
// Retrieves all products (role-aware)

import type { Product } from '../../entities/Product';
import type { ProductRepository } from '../../repositories/ProductRepository';
import type { UserRole } from '../../entities/User';

// ✅ Simple class with role support
export class GetAllProductsUseCase {
    private productRepository: ProductRepository;
    private userRole: UserRole;

    constructor(productRepository: ProductRepository, userRole: UserRole = 'user') {
        this.productRepository = productRepository;
        this.userRole = userRole;
    }

    async execute(): Promise<Product[]> {
        const products = await this.productRepository.getAll();

        // ✅ Role-based filtering
        if (this.userRole === 'admin') {
            // Admin sees all products
            return products;
        }

        // Users only see in-stock products
        return products.filter(p => p.stock > 0);
    }
}
