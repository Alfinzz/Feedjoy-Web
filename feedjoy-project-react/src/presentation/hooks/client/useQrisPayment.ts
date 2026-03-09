// useQrisPayment Hook - Business logic for QRIS Payment page
import { useState, useEffect, useCallback } from "react";
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

export function useQrisPayment() {
    const navigate = useNavigate();
    const location = useLocation();
    const orderData = location.state as OrderData | null;

    const [qrisCountdown, setQrisCountdown] = useState(30);
    const [qrisCode, setQrisCode] = useState("");
    const [isPaymentVerifying, setIsPaymentVerifying] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const generateQrisCode = useCallback(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let code = "QRIS";
        for (let i = 0; i < 12; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }, []);

    useEffect(() => {
        setQrisCode(generateQrisCode());
    }, [generateQrisCode]);

    useEffect(() => {
        if (!orderData) return;

        if (qrisCountdown <= 0) {
            setQrisCode(generateQrisCode());
            setQrisCountdown(30);
            return;
        }

        const timer = setInterval(() => {
            setQrisCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [qrisCountdown, generateQrisCode, orderData]);

    const handleSimulatePayment = async () => {
        setIsPaymentVerifying(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsPaymentVerifying(false);

        navigate(`/payment/success/${orderData?.orderId || 0}`, {
            state: orderData,
            replace: true
        });
    };

    const confirmCancel = () => {
        setShowCancelModal(false);
        navigate('/dashboard/products', { replace: true });
    };

    return {
        orderData,
        qrisCountdown,
        qrisCode,
        isPaymentVerifying,
        showCancelModal,
        openCancelModal: () => setShowCancelModal(true),
        closeCancelModal: () => setShowCancelModal(false),
        handleSimulatePayment,
        confirmCancel,
        navigate
    };
}
