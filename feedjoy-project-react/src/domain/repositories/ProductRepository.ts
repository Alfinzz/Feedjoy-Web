// Repository Interface - Product
// Contract for product data access, implementation can be dummy or API

import type { Product } from '../entities/Product';

export interface ProductRepository {
    /**
     * Get all products
     */
    getAll(): Promise<Product[]>;

    /**
     * Get product by ID
     */
    getById(id: number): Promise<Product | null>;

    /**
     * Search products by name or category
     */
    search(query: string): Promise<Product[]>;

    /**
     * Get products by category
     */
    getByCategory(category: string): Promise<Product[]>;
}
