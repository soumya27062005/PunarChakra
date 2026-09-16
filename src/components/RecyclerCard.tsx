import type { Recycler } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { MapPin, Star, Truck, CheckCircle2, AlertCircle } from 'lucide-react';

interface RecyclerCardProps {
  recycler: Recycler;
  onSell?: () => void;
  onViewDetails?: () => void;
}

export function RecyclerCard({
  recycler,
  onSell,
  onViewDetails,
}: RecyclerCardProps) {
  return (
    <Card padding="md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{recycler.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-500">
              {recycler.location} · {recycler.distance} km away
            </span>
          </div>
        </div>
        {recycler.authorized ? (
          <Badge variant="success" size="sm">
            <CheckCircle2 className="w-3 h-3" />
            Authorized
          </Badge>
        ) : (
          <Badge variant="warning" size="sm">
            <AlertCircle className="w-3 h-3" />
            Unverified
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {recycler.acceptedMaterials.map((mat) => (
          <span
            key={mat}
            className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-md border border-gray-100"
          >
            {mat}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-400">Buying Rate</p>
          <p className="text-lg font-bold text-emerald-600">
            ₹{recycler.buyingRate}
            <span className="text-sm text-gray-400 font-normal">
              /{recycler.rateUnit}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-700">
              {recycler.rating}
            </span>
          </div>
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
              recycler.pickupAvailable
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-gray-50 text-gray-400'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            {recycler.pickupAvailable ? 'Pickup' : 'Drop-off'}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {onViewDetails && (
          <Button variant="outline" size="sm" fullWidth onClick={onViewDetails}>
            View Details
          </Button>
        )}
        {onSell && (
          <Button variant="primary" size="sm" fullWidth onClick={onSell}>
            Sell Here
          </Button>
        )}
      </div>
    </Card>
  );
}
