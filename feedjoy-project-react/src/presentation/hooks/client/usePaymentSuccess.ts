// usePaymentSuccess Hook - Business logic for Payment Success page
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export interface OrderData {
    orderId: number;
    product: {
        id: number;
        name: string;
        category: string;
        image: string;
    };
    variant: string;
    quantity: number;
    totalPrice: number;
    variantPrice: number;
    customerName: string;
    customerPhone: string;
    address: string;
}

export function usePaymentSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const [copied, setCopied] = useState(false);

    // Get order data from location state
    const orderData = location.state as OrderData | null;
    const orderNumber = orderData?.orderId?.toString().padStart(8, '0') || Date.now().toString().slice(-8);

    const handleCopyOrderNumber = () => {
        navigator.clipboard.writeText(orderNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleGoToOrders = () => {
        navigate('/dashboard/orders', { replace: true });
    };

    const handleShopAgain = () => {
        navigate('/dashboard/products', { replace: true });
    };

    return {
        orderData,
        orderNumber,
        copied,
        handleCopyOrderNumber,
        handleGoToOrders,
        handleShopAgain,
        navigate
    };
}
