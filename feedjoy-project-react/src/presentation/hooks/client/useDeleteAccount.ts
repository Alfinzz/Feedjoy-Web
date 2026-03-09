// useDeleteAccount Hook - Business logic for Delete Account page
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

    const handleBack = () => {
        if (step === 1) {
            navigate('/dashboard/overview');
        } else {
            setStep(1);
        }
    };

    return {
        step,
        password,
        setPassword,
        showPassword,
        setShowPassword,
        confirmText,
        setConfirmText,
        error,
        showConfirmModal,
        setShowConfirmModal,
        isLoading,
        isProcessing,
        handleContinue,
        handleConfirmDelete,
        handleBack
    };
}
