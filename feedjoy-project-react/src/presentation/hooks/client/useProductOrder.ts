// hooks/client/useProductOrder.ts
import { useState } from 'react';
import axios from 'axios';

export function useProductOrder() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const createOrder = async (orderData: any) => {
        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('auth_token');
            const response = await axios.post('http://localhost:8000/api/orders', orderData, {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return { success: true, data: response.data };
        } catch (error: any) {
            return { 
                success: false, 
                message: error.response?.data?.message || 'Gagal membuat pesanan' 
            };
        } finally {
            setIsSubmitting(false);
        }
    };

    return { createOrder, isSubmitting };
}