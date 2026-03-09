// Get Products By Category Use Case - Simplified

import type { Product } from '../../entities/Product';
import type { ProductRepository } from '../../repositories/ProductRepository';

export interface GetProductsByCategoryInput {
    category: string;
}

// ✅ Simple class
export class GetProductsByCategoryUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: GetProductsByCategoryInput): Promise<Product[]> {
        const { category } = input;

        // Validate input
        if (!category || category.trim().length === 0) {
            throw new Error('Kategori tidak boleh kosong');
        }

        return await this.productRepository.getByCategory(category.trim());
    }
}
