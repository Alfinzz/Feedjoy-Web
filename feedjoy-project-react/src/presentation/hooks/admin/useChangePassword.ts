// useChangePassword Hook - Business logic for Change Password Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface PasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface PasswordFormErrors {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export function useChangePassword() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState<PasswordFormData>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState<PasswordFormErrors>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        const newErrors = { currentPassword: '', newPassword: '', confirmPassword: '' };
        let isValid = true;

        if (!formData.currentPassword) {
            newErrors.currentPassword = 'Password saat ini wajib diisi';
            isValid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'Password baru wajib diisi';
            isValid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password minimal 8 karakter';
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
            isValid = false;
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password tidak cocok';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
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
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => {
                setShowToast(false);
                navigate('/admin/overview');
            }, 2000);
        }, 1500);
    };

    const updateFormField = (field: keyof PasswordFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
    const toggleNewPassword = () => setShowNewPassword(!showNewPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const navigateBack = () => navigate('/admin/overview');
    const closeConfirmModal = () => setShowConfirmModal(false);

    return {
        // State
        formData,
        errors,
        showToast,
        showConfirmModal,
        isLoading,
        isSaving,
        showCurrentPassword,
        showNewPassword,
        showConfirmPassword,
        // Handlers
        handleSubmit,
        handleConfirmSave,
        updateFormField,
        toggleCurrentPassword,
        toggleNewPassword,
        toggleConfirmPassword,
        navigateBack,
        closeConfirmModal
    };
}
