// Domain Entity - Review
// Pure TypeScript interface, no framework dependencies

export interface Review {
    id: number;
    orderId?: number; // Optional for non-order reviews
    productId: number;
    productName: string;
    productImage?: string;
    userId?: string;
    userName?: string;
    rating: number;
    comment: string;
    createdAt: string;
}

// Request type for creating/updating reviews
export interface CreateReviewRequest {
    orderId: number;
    productId: number;
    productName: string;
    productImage?: string;
    rating: number;
    comment: string;
}
