// Repository Implementation - Product
// Implements ProductRepository interface using DummyDataSource

import type { Product } from '../../domain/entities/Product';
import type { ProductRepository } from '../../domain/repositories/ProductRepository';
import { dummyDataSource } from '../datasources/DummyDataSource';

export class ProductRepositoryImpl implements ProductRepository {
    async getAll(): Promise<Product[]> {
        // Simulate async API call
        return Promise.resolve(dummyDataSource.getProducts());
    }

    async getById(id: number): Promise<Product | null> {
        return Promise.resolve(dummyDataSource.getProductById(id));
    }

    async search(query: string): Promise<Product[]> {
        const products = dummyDataSource.getProducts();
        const lowerQuery = query.toLowerCase();
        return Promise.resolve(
            products.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.shortDescription.toLowerCase().includes(lowerQuery) ||
                p.category.toLowerCase().includes(lowerQuery)
            )
        );
    }

    async getByCategory(category: string): Promise<Product[]> {
        const products = dummyDataSource.getProducts();
        return Promise.resolve(
            products.filter(p => p.category.toLowerCase() === category.toLowerCase())
        );
    }
}

// Singleton instance
export const productRepository = new ProductRepositoryImpl();
