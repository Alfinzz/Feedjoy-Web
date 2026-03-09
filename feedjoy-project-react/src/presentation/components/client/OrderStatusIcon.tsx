// Order Status Icon Component
import { Clock, Package, CheckCircle, XCircle } from 'lucide-react';

export function getStatusIcon(status: string) {
    switch (status) {
        case 'pending':
            return <Clock className="w-4 h-4" />;
        case 'confirmed':
        case 'shipped':
            return <Package className="w-4 h-4" />;
        case 'completed':
            return <CheckCircle className="w-4 h-4" />;
        case 'cancelled':
            return <XCircle className="w-4 h-4" />;
        default:
            return <Package className="w-4 h-4" />;
    }
}
