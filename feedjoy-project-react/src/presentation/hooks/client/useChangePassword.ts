// useChangePassword Hook - Business logic for Change Password page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useChangePassword() {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
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

    const handleConfirmSave = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setShowConfirmModal(false);
            setShowToast(true);
            setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => {
                setShowToast(false);
                navigate('/dashboard/overview');
            }, 2000);
        }, 1500);
    };

    const handleSaveClick = () => {
        if (validateForm()) {
            setIsSaving(true);
            setTimeout(() => {
                setIsSaving(false);
                setShowConfirmModal(true);
            }, 500);
        }
    };

    return {
        showToast,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isSaving,
        showCurrentPassword,
        setShowCurrentPassword,
        showNewPassword,
        setShowNewPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        formData,
        setFormData: (data: any) => setFormData(data),
        errors,
        handleConfirmSave,
        handleSaveClick,
        navigate
    };
}
