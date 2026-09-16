import type { Material } from '@/types';
import { Card } from './ui/Card';
import { MiniChart } from './ui/MiniChart';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceCardProps {
  material: Material;
}

export function PriceCard({ material }: PriceCardProps) {
  const trendUp = material.trend[material.trend.length - 1] >= material.trend[0];
  const changePct = (
    ((material.trend[material.trend.length - 1] - material.trend[0]) /
      material.trend[0]) *
    100
  ).toFixed(1);

  return (
    <Card padding="md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900">{material.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">Updated {material.lastUpdated}</p>
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            trendUp
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-red-50 text-red-500'
          }`}
        >
          {trendUp ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {trendUp ? '+' : ''}
          {changePct}%
        </div>
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-2xl font-bold text-gray-900">
          ₹{material.priceLow}
        </span>
        <span className="text-sm text-gray-400">– ₹{material.priceHigh}</span>
        <span className="text-sm text-gray-400">/{material.unit}</span>
      </div>
      <MiniChart data={material.trend} height={50} />
    </Card>
  );
}
