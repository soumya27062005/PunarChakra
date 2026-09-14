import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatusTimeline } from '@/components/StatusTimeline';
import { useApp } from '@/context/AppContext';
import type { LotStatus } from '@/types';
import {
  Package,
  Scale,
  IndianRupee,
  Recycle,
  Calendar,
  ArrowLeft,
  FileText,
} from 'lucide-react';

const statusBadgeVariant: Record<LotStatus, 'success' | 'warning' | 'info' | 'neutral'> = {
  'Lot Created': 'info',
  'Price Quoted': 'info',
  'Pickup Scheduled': 'warning',
  'Handed Over': 'success',
  'Payment Received': 'success',
};

export function LotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lots, updateLotStatus } = useApp();
  const lot = lots.find((l) => l.id === id);

  if (!lot) {
    return (
      <AppLayout title="Lot Not Found">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Package className="w-12 h-12 text-gray-300 mb-3" />
          <p className="text-sm text-gray-500 mb-4">This lot could not be found.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </AppLayout>
    );
  }

  const stages: LotStatus[] = [
    'Lot Created',
    'Price Quoted',
    'Pickup Scheduled',
    'Handed Over',
    'Payment Received',
  ];
  const currentIndex = stages.indexOf(lot.status);
  const nextStatus = stages[currentIndex + 1];

  const details = [
    { icon: Package, label: 'Material', value: lot.material },
    { icon: Scale, label: 'Weight', value: `${lot.weight} kg` },
    { icon: IndianRupee, label: 'Estimated Value', value: `₹${lot.estimatedValue.toLocaleString('en-IN')}` },
    { icon: IndianRupee, label: 'Quoted Price', value: `₹${lot.quotedPrice.toLocaleString('en-IN')}` },
    { icon: Recycle, label: 'Recycler', value: lot.recycler },
    { icon: Calendar, label: 'Created Date', value: lot.createdDate },
  ];

  return (
    <AppLayout title="Lot Details">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      {/* Lot ID header */}
      <Card padding="lg" className="mb-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Lot ID</p>
            <p className="text-xl font-bold text-gray-900 font-mono">{lot.id}</p>
          </div>
          <Badge variant={statusBadgeVariant[lot.status]}>{lot.status}</Badge>
        </div>
      </Card>

      {/* Details */}
      <Card padding="md" className="mb-4">
        <div className="space-y-3">
          {details.map((d) => {
            const Icon = d.icon;
            return (
              <div key={d.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-500" />
                  </div>
                  <span className="text-sm text-gray-500">{d.label}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{d.value}</span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Timeline */}
      <Card padding="md" className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Status Timeline</h3>
        <StatusTimeline currentStatus={lot.status} />
      </Card>

      {/* Actions */}
      <div className="flex gap-2">
        {nextStatus && (
          <Button
            variant="primary"
            fullWidth
            onClick={() => updateLotStatus(lot.id, nextStatus)}
          >
            Advance to: {nextStatus}
          </Button>
        )}
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate(`/handover/${lot.id}`)}
        >
          <FileText className="w-4 h-4" /> Handover Record
        </Button>
      </div>
    </AppLayout>
  );
}
