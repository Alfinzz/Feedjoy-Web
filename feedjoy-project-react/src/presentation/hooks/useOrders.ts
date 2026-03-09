// Custom Hook - useOrders (SharedDataStore Version)
// Uses SharedDataStore for synchronization between Admin and User

import { useState, useEffect, useCallback } from 'react';
import type { Order, OrderStatus, CreateOrderRequest } from '../../domain/entities/Order';
import { sharedDataStore } from '../../data/datasources/SharedDataStore';
import { useAuth } from '../context/AuthContext';

interface UseOrdersState {
    orders: Order[];
    selectedOrder: Order | null;
    isLoading: boolean;
    error: string | null;
}

interface UseOrdersReturn extends UseOrdersState {
    fetchOrders: () => Promise<void>;
    fetchOrderById: (id: number) => Promise<void>;
    createOrder: (request: CreateOrderRequest) => Promise<Order | null>;
    updateOrderStatus: (id: number, status: OrderStatus) => Promise<void>;
    deleteOrder: (id: number) => Promise<boolean>;
    clearAllOrders: () => Promise<void>;
    deleteCompletedOrders: () => Promise<void>;
    selectOrder: (order: Order | null) => void;
    clearError: () => void;
    getOrdersByStatus: (status: OrderStatus | 'all') => Order[];
}

export function useOrders(): UseOrdersReturn {
    const { user } = useAuth();

    const [state, setState] = useState<UseOrdersState>({
        orders: [],
        selectedOrder: null,
        isLoading: false,
        error: null,
    });

    // Get user's orders from SharedDataStore
    const getUserOrders = useCallback(() => {
        if (!user) return [];
        // For admin, show all orders. For user, show only their orders
        if (user.role === 'admin') {
            return sharedDataStore.getOrders();
        }
        return sharedDataStore.getOrdersByUserId(user.id?.toString() || user.email);
    }, [user]);

    // Subscribe to SharedDataStore changes
    useEffect(() => {
        const unsubscribe = sharedDataStore.subscribe(() => {
            setState(prev => ({
                ...prev,
                orders: getUserOrders()
            }));
        });

        // Initial load
        setState(prev => ({
            ...prev,
            orders: getUserOrders()
        }));

        return unsubscribe;
    }, [getUserOrders]);

    const fetchOrders = useCallback(async () => {
        if (!user) return;

        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const orders = getUserOrders();
            setState(prev => ({ ...prev, orders, isLoading: false }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch orders'
            }));
        }
    }, [user, getUserOrders]);

    const fetchOrderById = useCallback(async (id: number) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const order = sharedDataStore.getOrderById(id);
            setState(prev => ({ ...prev, selectedOrder: order || null, isLoading: false }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch order'
            }));
        }
    }, []);

    const createOrder = useCallback(async (request: CreateOrderRequest): Promise<Order | null> => {
        if (!user) return null;

        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const now = new Date().toISOString();
            const newOrder = sharedDataStore.addOrder({
                ...request,
                userId: user.id?.toString() || user.email,
                status: 'pending',
                timeline: [
                    { status: 'created', label: 'Pesanan Dibuat', date: now, completed: true },
                    { status: 'pending', label: 'Menunggu Konfirmasi', date: now, completed: true },
                ],
                createdAt: now
            });

            setState(prev => ({
                ...prev,
                orders: getUserOrders(),
                isLoading: false
            }));
            return newOrder;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to create order'
            }));
            return null;
        }
    }, [user, getUserOrders]);

    const updateOrderStatus = useCallback(async (id: number, status: OrderStatus) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            sharedDataStore.updateOrderStatus(id, status);
            setState(prev => ({
                ...prev,
                orders: getUserOrders(),
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to update order'
            }));
        }
    }, [getUserOrders]);

    const deleteOrder = useCallback(async (id: number): Promise<boolean> => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            await new Promise(resolve => setTimeout(resolve, 200));
            const success = sharedDataStore.deleteOrder(id);
            if (success) {
                setState(prev => ({
                    ...prev,
                    orders: getUserOrders(),
                    isLoading: false
                }));
            }
            return success;
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to delete order'
            }));
            return false;
        }
    }, [getUserOrders]);

    const clearAllOrders = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            // Delete all user's orders
            for (const order of state.orders) {
                sharedDataStore.deleteOrder(order.id);
            }
            setState(prev => ({
                ...prev,
                orders: [],
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to clear orders'
            }));
        }
    }, [state.orders]);

    const selectOrder = useCallback((order: Order | null) => {
        setState(prev => ({ ...prev, selectedOrder: order }));
    }, []);

    const clearError = useCallback(() => {
        setState(prev => ({ ...prev, error: null }));
    }, []);

    const getOrdersByStatus = useCallback((status: OrderStatus | 'all'): Order[] => {
        if (status === 'all') return state.orders;
        return state.orders.filter(o => o.status === status);
    }, [state.orders]);

    const deleteCompletedOrders = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            // Delete only completed orders
            const completedOrders = state.orders.filter(o => o.status === 'completed');
            for (const order of completedOrders) {
                sharedDataStore.deleteOrder(order.id);
            }
            setState(prev => ({
                ...prev,
                orders: getUserOrders(),
                isLoading: false
            }));
        } catch (err) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to delete completed orders'
            }));
        }
    }, [state.orders, getUserOrders]);

    return {
        ...state,
        fetchOrders,
        fetchOrderById,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        deleteCompletedOrders,
        selectOrder,
        clearError,
        getOrdersByStatus,
    };
}
