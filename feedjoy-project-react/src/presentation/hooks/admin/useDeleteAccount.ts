// useDeleteAccount Hook - Business logic for Delete Account Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function useDeleteAccount() {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmText, setConfirmText] = useState('');
    const [error, setError] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleContinue = () => {
        if (step === 1) {
            if (!password) {
                setError('Password wajib diisi untuk melanjutkan');
                return;
            }
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setError('');
                setStep(2);
            }, 500);
        } else if (step === 2) {
            if (confirmText !== 'HAPUS AKUN SAYA') {
                setError('Ketik teks konfirmasi dengan benar');
                return;
            }
            setShowConfirmModal(true);
        }
    };

    const handleConfirmDelete = () => {
        setIsLoading(true);
        setTimeout(() => {
            logout();
            navigate('/');
        }, 1500);
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleBack = () => {
        if (step === 1) {
            navigate('/admin/overview');
        } else {
            setStep(1);
        }
    };

    const closeConfirmModal = () => setShowConfirmModal(false);

    return {
        // State
        step,
        password,
        setPassword,
        showPassword,
        confirmText,
        setConfirmText,
        error,
        showConfirmModal,
        isLoading,
        isProcessing,
        // Handlers
        handleContinue,
        handleConfirmDelete,
        toggleShowPassword,
        handleBack,
        closeConfirmModal
    };
}
