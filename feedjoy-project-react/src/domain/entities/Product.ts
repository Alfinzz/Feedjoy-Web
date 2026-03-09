// Domain Entity - Product
// Pure TypeScript interface, no framework dependencies

export interface ProductVariant {
    size: string;
    price: number;
    usage: string;
}

export interface Product {
    reviews: any;
    is_active: any;
    id: number;
    name: string;
    short_description: string;
    description: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    image: string;
    additionalImages: string[];
    stock: number;
    category: string;
    variants: ProductVariant[];
}
