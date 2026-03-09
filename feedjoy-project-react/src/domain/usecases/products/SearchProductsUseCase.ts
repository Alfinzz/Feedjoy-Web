// Search Products Use Case - Simplified

import type { Product } from '../../entities/Product';
import type { ProductRepository } from '../../repositories/ProductRepository';

export interface SearchProductsInput {
    query: string;
}

// ✅ Simple class
export class SearchProductsUseCase {
    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    async execute(input: SearchProductsInput): Promise<Product[]> {
        const { query } = input;

        // Validate input
        if (!query || query.trim().length === 0) {
            // Return all products if query is empty
            return await this.productRepository.getAll();
        }

        // Sanitize query
        const sanitizedQuery = query.trim();

        return await this.productRepository.search(sanitizedQuery);
    }
}
