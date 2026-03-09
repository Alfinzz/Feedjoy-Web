// Get Product By ID Use Case - Simplified

import type { Product } from '../../entities/Product';
import type { ProductRepository } from '../../repositories/ProductRepository';

export interface GetProductByIdInput {
    id: number;
}

// ✅ Simple class
export class GetProductByIdUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: GetProductByIdInput): Promise<Product | null> {
        const { id } = input;

        // Validate input
        if (!id || id <= 0) {
            throw new Error('ID produk tidak valid');
        }

        return await this.productRepository.getById(id);
    }
}
