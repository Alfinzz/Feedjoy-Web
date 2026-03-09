
import { useState, useCallback } from 'react';
import axios from 'axios';
import type { Product } from '../../domain/entities/Product';

interface UseProductsState {
    products: Product[];
    selectedProduct: Product | null;
    isLoading: boolean;
    error: string | null;
}

interface UseProductsReturn extends UseProductsState {
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number | string) => Promise<void>;
    searchProducts: (query: string) => Promise<void>;
    selectProduct: (product: Product | null) => void;
    clearError: () => void;
}

export function useProducts(): UseProductsReturn {
    const [state, setState] = useState<UseProductsState>({
        products: [], // Mulai dengan array kosong
        selectedProduct: null,
        isLoading: false,
        error: null,
    });

    // 1. FETCH SEMUA PRODUK DARI LARAVEL
    const fetchProducts = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get("http://localhost:8000/api/products");
            
            const actualData = response.data.data.data || response.data.data || [];
            
            setState(prev => ({ 
                ...prev, 
                products: actualData, 
                isLoading: false 
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Gagal mengambil data produk dari server'
            }));
        }
    }, []);

    // 2. FETCH PRODUK BERDASARKAN ID
    const fetchProductById = useCallback(async (id: number | string) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${id}`);
            const product = response.data.data;
            
            setState(prev => ({
                ...prev,
                selectedProduct: product || null,
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: 'Produk tidak ditemukan'
            }));
        }
    }, []);

    // 3. SEARCH (Bisa client-side atau server-side)
    const searchProducts = useCallback(async (query: string) => {
        if (!query) {
            fetchProducts();
            return;
        }
        
        setState(prev => ({ ...prev, isLoading: true }));
        try {
            // Kita gunakan pencarian di sisi API agar lebih akurat
            const response = await axios.get(`http://localhost:8000/api/products?search=${query}`);
            const filtered = response.data.data.data || response.data.data || [];
            
            setState(prev => ({ ...prev, products: filtered, isLoading: false }));
        } catch (err) {
            setState(prev => ({ ...prev, isLoading: false }));
        }
    }, [fetchProducts]);

    const selectProduct = useCallback((product: Product | null) => {
        setState(prev => ({ ...prev, selectedProduct: product }));
    }, []);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    return {
        ...state,
        fetchProducts,
        fetchProductById,
        searchProducts,
        selectProduct,
        clearError,
    };
}