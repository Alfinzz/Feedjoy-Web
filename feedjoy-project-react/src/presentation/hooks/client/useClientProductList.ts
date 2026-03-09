// hooks/client/useClientProductList.ts
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../useProducts"; 

export function useClientProductList() {
    const navigate = useNavigate();
    // useProducts ini harus sudah menggunakan axios fetch ke 'api/products'
const { products, isLoading: isLoadingProducts, fetchProducts } = useProducts();

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleViewDetail = (productId: number | string) => {
        navigate(`/dashboard/products/${productId}`);
    };

    const handleDirectOrder = (productId: number | string) => {
        // Navigasi ke detail dengan state atau query param untuk langsung buka form order
        navigate(`/dashboard/products/${productId}?action=checkout`);
    };

    // FILTER SINKRON DENGAN LARAVEL (short_description)
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const name = product.name?.toLowerCase() || "";
            const desc = (product.short_description || product.description || "").toLowerCase();
            const cat = product.category?.toLowerCase() || "";
            const query = searchQuery.toLowerCase();

            return name.includes(query) || desc.includes(query) || cat.includes(query);
        });
    }, [products, searchQuery]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        return filteredProducts.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        );
    }, [filteredProducts, currentPage, itemsPerPage]);

    return {
        fetchProducts,
        products,
        isLoadingProducts,
        searchQuery,
        handleSearch: (query: string) => { setSearchQuery(query); setCurrentPage(1); },
        currentPage,
        handlePageChange: (page: number) => setCurrentPage(page),
        totalPages,
        paginatedProducts,
        filteredCount: filteredProducts.length,
        handleViewDetail,
        handleDirectOrder,
        itemsPerPage
    };
}