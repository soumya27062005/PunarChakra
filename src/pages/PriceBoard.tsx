import { AppLayout } from '@/components/layout/AppLayout';
import { PriceCard } from '@/components/PriceCard';
import { Card } from '@/components/ui/Card';
import { MiniChart } from '@/components/ui/MiniChart';
import { materials } from '@/data/materials';
import { TrendingUp, Info } from 'lucide-react';

export function PriceBoard() {
  const avgTrend = materials[0].trend.map((_, i) => {
    const sum = materials.reduce((acc, m) => acc + m.trend[i], 0);
    return Math.round(sum / materials.length);
  });

  return (
    <AppLayout title="Price Board">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Current Fair Prices</h2>
        <p className="text-sm text-gray-500 mt-1">
          Fair market rates for e-waste materials
        </p>
      </div>

      {/* Overall trend */}
      <Card padding="md" className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Market Trend (7 days)</p>
              <p className="text-xs text-gray-400">Average across all materials</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-emerald-600">+4.2%</p>
            <p className="text-xs text-gray-400">this week</p>
          </div>
        </div>
        <MiniChart data={avgTrend} height={60} color="#059669" />
      </Card>

      {/* Price cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {materials.map((m) => (
          <PriceCard key={m.id} material={m} />
        ))}
      </div>

      {/* Info */}
      <div className="flex items-start gap-2.5 mt-5 px-3 py-2.5 bg-blue-50 border border-blue-100 rounded-xl">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600">
          Prices are indicative and updated regularly. Final price depends on recycler quote, material condition, and actual weight.
        </p>
      </div>
    </AppLayout>
  );
}
