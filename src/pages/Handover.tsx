import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import {
  Recycle,
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Fingerprint,
} from 'lucide-react';

export function Handover() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lots, updateLotStatus } = useApp();
  const lot = lots.find((l) => l.id === id);
  const [confirmed, setConfirmed] = useState(false);

  const referenceNumber = lot
    ? `PCR-${lot.id.replace(/[^0-9]/g, '')}-${Date.now().toString().slice(-6)}`
    : '';

  if (!lot) {
    return (
      <AppLayout title="Not Found">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <p className="text-sm text-gray-500 mb-4">Lot not found.</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </AppLayout>
    );
  }

  if (confirmed) {
    return (
      <AppLayout title="Handover Recorded">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Handover Recorded</h2>
          <p className="text-sm text-gray-500 mb-4">
            The digital handover certificate has been generated.
          </p>

          <Card padding="lg" className="w-full max-w-sm mb-4">
            <div className="flex items-center justify-center mb-3">
              <Fingerprint className="w-8 h-8 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-400 mb-1">Reference Number</p>
            <p className="text-lg font-bold text-gray-900 font-mono break-all">
              {referenceNumber}
            </p>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-600">
                Verified & Tamper-proof
              </span>
            </div>
          </Card>

          <Button variant="primary" fullWidth className="max-w-sm" onClick={() => navigate(`/lots/${lot.id}`)}>
            Back to Lot
          </Button>
        </div>
      </AppLayout>
    );
  }

  const rows = [
    { label: 'Lot ID', value: lot.id },
    { label: 'Material', value: lot.material },
    { label: 'Weight', value: `${lot.weight} kg` },
    { label: 'Collector', value: 'Ramesh Kumar' },
    { label: 'Recycler', value: lot.recycler },
    { label: 'Location', value: 'Hinjewadi, Pune' },
    { label: 'Date & Time', value: new Date().toLocaleString('en-IN') },
    { label: 'Final Price', value: `₹${lot.quotedPrice.toLocaleString('en-IN')}` },
  ];

  return (
    <AppLayout title="Digital Handover">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs font-medium text-gray-500 mb-4"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      {/* Certificate header */}
      <Card padding="lg" className="mb-4 border-2 border-emerald-100">
        <div className="text-center mb-4">
          <div className="inline-flex w-12 h-12 rounded-xl bg-emerald-600 items-center justify-center mb-2">
            <Recycle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-gray-900">PunarChakra</h2>
          <p className="text-xs text-gray-500">Digital Handover Record</p>
        </div>

        {/* Reference number */}
        <div className="bg-emerald-50 rounded-xl p-3 text-center mb-4">
          <p className="text-xs text-emerald-600 mb-1">Reference Number</p>
          <p className="text-base font-bold text-gray-900 font-mono break-all">
            {referenceNumber}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-2.5">
          {rows.map((r) => (
            <div
              key={r.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-500">{r.label}</span>
              <span className="font-semibold text-gray-900 text-right">{r.value}</span>
            </div>
          ))}
        </div>

        {/* Transaction status */}
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <span className="text-sm text-gray-500">Transaction Status</span>
          <Badge variant="warning">Pending Confirmation</Badge>
        </div>
      </Card>

      {/* Confirm */}
      <div className="flex items-start gap-2.5 mb-4 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
        <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600">
          By confirming, you agree that the e-waste has been handed over to the recycler. This record is tamper-proof and cannot be modified.
        </p>
      </div>

      <Button
        fullWidth
        size="lg"
        onClick={() => {
          setConfirmed(true);
          updateLotStatus(lot.id, 'Handed Over');
        }}
      >
        <CheckCircle2 className="w-5 h-5" /> Confirm Handover
      </Button>
    </AppLayout>
  );
}
