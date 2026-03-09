// Tracking Modal - Modal for entering tracking number when shipping order
import { useState } from 'react';

export interface TrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (trackingNumber: string) => void;
}

export default function TrackingModal({ isOpen, onClose, onConfirm }: TrackingModalProps) {
    const [trackingNumber, setTrackingNumber] = useState('');

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm(trackingNumber);
        setTrackingNumber('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <h3 className="text-xl font-bold text-gray-800 font-poppins mb-4">Masukkan Nomor Resi</h3>
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                    placeholder="Contoh: JNE1234567890"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-urbanist mb-4"
                />
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold font-urbanist hover:bg-gray-50"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={!trackingNumber.trim()}
                        className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold font-urbanist hover:bg-primary/90 disabled:opacity-50"
                    >
                        Kirim
                    </button>
                </div>
            </div>
        </div>
    );
}
