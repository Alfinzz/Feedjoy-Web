// Consultation Card Component - Display individual consultation request
import {
    Phone,
    Clock,
    CheckCircle,
    XCircle,
    ExternalLink
} from 'lucide-react';
import { type ConsultationRequest } from '../../../data/datasources/AdminDataSource';
import { formatDate, getStatusInfo, getAnimalColor } from '../../hooks/admin/useConsultationList';

export interface ConsultationCardProps {
    consultation: ConsultationRequest;
    onStatusChange: (id: number, status: ConsultationRequest['status']) => void;
    onWhatsApp: (phone: string, name: string) => void;
    onDelete: (consultation: ConsultationRequest) => void;
}

export default function ConsultationCard({ consultation, onStatusChange, onWhatsApp, onDelete }: ConsultationCardProps) {
    const statusInfo = getStatusInfo(consultation.status);
    const StatusIcon = statusInfo.icon;

    return (
        <div className={`bg-white rounded-xl border overflow-hidden hover:shadow-md transition-all ${consultation.status === 'new' ? 'border-yellow-300' : 'border-gray-100'}`}>
            {/* Header */}
            <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold font-poppins">
                                {consultation.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 font-poppins">{consultation.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500 font-urbanist">
                                <Phone className="w-3.5 h-3.5" />
                                {consultation.phone}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getAnimalColor(consultation.animalType)}`}>
                            {consultation.animalType}
                        </span>
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {statusInfo.label}
                        </span>
                    </div>
                </div>

                {/* Message */}
                {consultation.message && (
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                        <p className="text-gray-600 font-urbanist text-sm leading-relaxed">
                            "{consultation.message}"
                        </p>
                    </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-gray-400 font-urbanist">
                        <Clock className="w-4 h-4" />
                        {formatDate(consultation.createdAt)}
                    </div>

                    <div className="flex gap-2">
                        {/* WhatsApp Button */}
                        <button
                            onClick={() => onWhatsApp(consultation.phone, consultation.name)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-green-600 transition-colors"
                        >
                            <ExternalLink className="w-4 h-4" />
                            WhatsApp
                        </button>

                        {/* Status Change Buttons */}
                        {consultation.status === 'new' && (
                            <button
                                onClick={() => onStatusChange(consultation.id, 'contacted')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-blue-600 transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                Tandai Dihubungi
                            </button>
                        )}

                        {consultation.status === 'contacted' && (
                            <button
                                onClick={() => onStatusChange(consultation.id, 'completed')}
                                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg font-semibold font-urbanist text-sm hover:bg-primary/90 transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" />
                                Selesai
                            </button>
                        )}

                        {/* Delete Button */}
                        <button
                            onClick={() => onDelete(consultation)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
