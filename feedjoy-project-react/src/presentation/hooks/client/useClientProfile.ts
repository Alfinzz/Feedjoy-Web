// useClientProfile Hook - Business logic for User Profile page
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export function useClientProfile() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: user?.name || 'User',
        email: user?.email || 'user@feedjoy.com',
        phone: '081234567890',
        address: 'Jl. Contoh No. 123, Jakarta'
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const validateForm = () => {
        const newErrors = { name: '', email: '', phone: '', address: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Nama wajib diisi';
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
            newErrors.phone = 'Nomor HP wajib diisi';
            isValid = false;
        } else if (!/^[\d\s\-+]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Format nomor HP tidak valid';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Alamat wajib diisi';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSave = () => {
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
            setIsEditing(false);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }, 1500);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            name: user?.name || 'User',
            email: user?.email || 'user@feedjoy.com',
            phone: '081234567890',
            address: 'Jl. Contoh No. 123, Jakarta'
        });
        setErrors({ name: '', email: '', phone: '', address: '' });
    };

    const getUserInitials = () => {
        if (!user?.name) return 'U';
        const names = user.name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    return {
        user,
        isEditing,
        setIsEditing,
        showToast,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isSaving,
        formData,
        setFormData: (data: any) => setFormData(data),
        errors,
        handleSave,
        handleConfirmSave,
        handleCancel,
        getUserInitials
    };
}
