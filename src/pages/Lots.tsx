import { useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import type { LotStatus } from '@/types';
import { Package, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusVariant: Record<LotStatus, 'success' | 'warning' | 'info' | 'neutral'> = {
  'Lot Created': 'info',
  'Price Quoted': 'info',
  'Pickup Scheduled': 'warning',
  'Handed Over': 'success',
  'Payment Received': 'success',
};

export function Lots() {
  const { lots } = useApp();
  const navigate = useNavigate();

  return (
    <AppLayout title="My Lots">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Digital Lots</h2>
        <p className="text-sm text-gray-500 mt-1">{lots.length} lots registered</p>
      </div>

      {lots.length === 0 ? (
        <Card padding="lg" className="text-center">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500 mb-4">No lots created yet.</p>
          <Link
            to="/add-scrap"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600"
          >
            <Plus className="w-4 h-4" /> Create your first lot
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {lots.map((lot) => (
            <Card
              key={lot.id}
              padding="md"
              onClick={() => navigate(`/lots/${lot.id}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-gray-900 font-mono">{lot.id}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{lot.createdDate}</p>
                </div>
                <Badge variant={statusVariant[lot.status]} size="sm">
                  {lot.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-700">{lot.material}</span>
                  <span className="text-xs text-gray-400">{lot.weight} kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-emerald-600">
                    ₹{lot.estimatedValue.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </AppLayout>
  );
}
