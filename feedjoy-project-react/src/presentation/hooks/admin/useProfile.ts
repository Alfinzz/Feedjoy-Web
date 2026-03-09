// useProfile Hook - Business logic for Admin Profile Page
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export interface ProfileFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export interface ProfileFormErrors {
    name: string;
    email: string;
    phone: string;
    address: string;
}

export function useProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState<ProfileFormData>({
        name: user?.name || 'Admin FeedJoy',
        email: user?.email || 'admin@feedjoy.com',
        phone: '081234567890',
        address: 'Jl. Peternakan No. 123, Jakarta Selatan'
    });

    const [errors, setErrors] = useState<ProfileFormErrors>({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const validateForm = () => {
        const newErrors = { name: '', email: '', phone: '', address: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Nama lengkap wajib diisi';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email wajib diisi';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Format email tidak valid';
            isValid = false;
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Nomor telepon wajib diisi';
            isValid = false;
        } else if (!/^[0-9+]{10,15}$/.test(formData.phone.replace(/[- ]/g, ''))) {
            newErrors.phone = 'Nomor telepon tidak valid';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Alamat wajib diisi';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSaveClick = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            setTimeout(() => {
                setIsSaving(false);
                setShowConfirmModal(true);
            }, 500);
        }
    };

    const handleConfirmSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowConfirmModal(false);
            setShowToast(true);
            setIsEditing(false);
            setTimeout(() => setShowToast(false), 3000);
        }, 1500);
    };

    const getUserInitials = () => {
        if (!formData.name) return 'A';
        const names = formData.name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    const updateFormField = (field: keyof ProfileFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const startEditing = () => {
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setIsEditing(false);
        setErrors({ name: '', email: '', phone: '', address: '' });
    };

    const closeConfirmModal = () => {
        setShowConfirmModal(false);
    };

    return {
        // State
        formData,
        errors,
        isEditing,
        showToast,
        showConfirmModal,
        isLoading,
        isSaving,
        // Handlers
        handleSaveClick,
        handleConfirmSave,
        getUserInitials,
        updateFormField,
        startEditing,
        cancelEditing,
        closeConfirmModal
    };
}
