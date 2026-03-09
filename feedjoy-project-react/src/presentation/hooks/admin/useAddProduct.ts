// useAddProduct Hook - Business logic for Add Product Page
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminDataSource } from '../../../data/datasources/AdminDataSource';
import type { ProductVariant } from '../../../domain/entities/Product';

// Parse price string (removes "Rp" and "." separators)
function parsePrice(value: string): number {
    const cleaned = value.replace(/[^\d]/g, '');
    return parseInt(cleaned) || 0;
}

// Generate dummy images based on category (1 main + 4 additional)
function generateDummyImages(category: string): { main: string; additional: string[] } {
    const categoryImages: Record<string, { main: string; additional: string[] }> = {
        'Ayam': {
            main: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1569288063643-5d29ad64df09?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1591197172062-c718f82aba20?w=400&h=400&fit=crop'
            ]
        },
        'Sapi': {
            main: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1546445317-29f4545e9d53?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1527153907251-22d8c7ec6cd2?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1568702846914-96b305d2uj44?w=400&h=400&fit=crop'
            ]
        },
        'Kambing': {
            main: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1598343672991-4ed42b1a6c8c?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop'
            ]
        },
        'Domba': {
            main: 'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&h=400&fit=crop'
            ]
        },
        'Bebek': {
            main: 'https://images.unsplash.com/photo-1459682687441-7761439a709d?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1555852305-06e0a3af6b1f?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1567377295830-9eb4a0e5fe53?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop'
            ]
        },
        'Kelinci': {
            main: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1452857297128-d9c29adba80b?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1535241749838-299277b6305f?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1518796745738-41048802f99a?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1591871937573-74dbba515c4c?w=400&h=400&fit=crop'
            ]
        },
        'Lainnya': {
            main: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400&h=400&fit=crop',
            additional: [
                'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1445527815219-ecbfec67492e?w=400&h=400&fit=crop',
                'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=400&fit=crop'
            ]
        }
    };
    return categoryImages[category] || categoryImages['Lainnya'];
}

// Get initial images for default category
const initialImages = generateDummyImages('Ayam');

// Default variant template
const defaultVariants: ProductVariant[] = [
    { size: '500 gram', price: 85000, usage: 'Campurkan 1 sendok makan dengan pakan ternak setiap hari' },
    { size: '1 Kg', price: 150000, usage: 'Campurkan 1 sendok makan dengan pakan ternak setiap hari' },
    { size: '3 Kg', price: 400000, usage: 'Campurkan 1 sendok makan dengan pakan ternak setiap hari' }
];

// Default price inputs formatted
const defaultPriceInputs = ['85.000', '150.000', '400.000'];

// Categories list
export const categories = ['Ayam', 'Sapi', 'Kambing', 'Domba', 'Bebek', 'Kelinci', 'Lainnya'];

export interface AddProductFormData {
    name: string;
    shortDescription: string;
    fullDescription: string;
    price: number;
    image: string;
    additionalImages: string[];
    stock: number;
    category: string;
    variants: ProductVariant[];
}

export function useAddProduct() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AddProductFormData>({
        name: '',
        shortDescription: '',
        fullDescription: '',
        price: 0,
        image: initialImages.main,
        additionalImages: initialImages.additional,
        stock: 0,
        category: 'Ayam',
        variants: [...defaultVariants]
    });
    const [priceInputs, setPriceInputs] = useState<string[]>([...defaultPriceInputs]);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    // Update form field
    const updateFormField = <K extends keyof AddProductFormData>(field: K, value: AddProductFormData[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Initialize images when category changes
    const handleCategoryChange = (category: string) => {
        const images = generateDummyImages(category);
        setFormData(prev => ({
            ...prev,
            category,
            image: images.main,
            additionalImages: images.additional
        }));
    };

    // Variant handlers
    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string | number) => {
        const newVariants = [...formData.variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setFormData(prev => ({ ...prev, variants: newVariants }));
    };

    const handlePriceInputChange = (index: number, value: string) => {
        const newPriceInputs = [...priceInputs];
        newPriceInputs[index] = value;
        setPriceInputs(newPriceInputs);
        handleVariantChange(index, 'price', parsePrice(value));
    };

    const addVariant = () => {
        setFormData(prev => ({
            ...prev,
            variants: [...prev.variants, { size: '', price: 0, usage: '' }]
        }));
        setPriceInputs(prev => [...prev, '']);
    };

    const removeVariant = (index: number) => {
        if (formData.variants.length > 1) {
            setFormData(prev => ({
                ...prev,
                variants: prev.variants.filter((_, i) => i !== index)
            }));
            setPriceInputs(prev => prev.filter((_, i) => i !== index));
        }
    };

    // Submit form
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        // 1. Ambil token dari localStorage (Pastikan kamu sudah login di webnya)
        const token = localStorage.getItem('auth_token'); 

        // 2. Kirim data ke endpoint Laravel sesuai routes/api.php kamu
        // Gunakan URL lengkap (misal: http://localhost:8000)
        const response = await axios.post('http://localhost:8000/api/admin/products', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        // 3. Jika berhasil (status 201)
        if (response.data.success) {
            setShowToast(true);
            setTimeout(() => {
                navigate('/admin/products');
            }, 1500);
        }
    } catch (error: any) {
        // Cek error di console jika gagal
        console.error("Error Detail:", error.response?.data);
        alert(error.response?.data?.message || "Gagal konek ke server. Cek koneksi atau CORS.");
    } finally {
        setIsLoading(false);
    }
};

    // Cancel action
    const handleCancel = () => {
        navigate('/admin/products');
    };

    return {
        // State
        formData,
        priceInputs,
        isLoading,
        showToast,
        // Handlers
        updateFormField,
        handleCategoryChange,
        handleVariantChange,
        handlePriceInputChange,
        addVariant,
        removeVariant,
        handleSubmit,
        handleCancel
    };
}
