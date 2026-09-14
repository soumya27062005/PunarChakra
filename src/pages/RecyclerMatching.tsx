import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { RecyclerCard } from '@/components/RecyclerCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { recyclers } from '@/data/recyclers';
import type { MaterialCategory } from '@/types';
import { Filter, SlidersHorizontal, Sparkles } from 'lucide-react';

const materialOptions: (MaterialCategory | 'All')[] = [
  'All',
  'PCB',
  'Cables',
  'LCD/CRT',
  'Batteries',
  'Motors',
  'Mixed Plastic',
  'Other',
];

type SortBy = 'distance' | 'price' | 'rating';

export function RecyclerMatching() {
  const [materialFilter, setMaterialFilter] = useState<MaterialCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortBy>('distance');
  const [pickupOnly, setPickupOnly] = useState(false);

  let filtered = recyclers.filter((r) => {
    if (materialFilter !== 'All' && !r.acceptedMaterials.includes(materialFilter))
      return false;
    if (pickupOnly && !r.pickupAvailable) return false;
    return true;
  });

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'distance') return a.distance - b.distance;
    if (sortBy === 'price') return b.buyingRate - a.buyingRate;
    return b.rating - a.rating;
  });

  return (
    <AppLayout title="Find Recyclers">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Authorized Recyclers</h2>
        <p className="text-sm text-gray-500 mt-1">
          {filtered.length} recyclers found near you
        </p>
      </div>

      {/* AI placeholder */}
      <Card padding="md" className="mb-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">Smart Recycler Match</span>
          <Badge variant="success" size="sm">Demo</Badge>
        </div>
        <p className="text-xs text-gray-500">
          AI will suggest the best recycler based on your lot material, price, and distance.
        </p>
      </Card>

      {/* Material filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-3 -mx-4 px-4 scrollbar-hide">
        {materialOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setMaterialFilter(opt)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              materialFilter === opt
                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Sort & filter bar */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 flex items-center gap-1.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="text-xs font-medium text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="distance">Sort: Nearest</option>
            <option value="price">Sort: Best Price</option>
            <option value="rating">Sort: Top Rated</option>
          </select>
        </div>
        <button
          onClick={() => setPickupOnly(!pickupOnly)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
            pickupOnly
              ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
              : 'border-gray-200 text-gray-500'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          Pickup only
        </button>
      </div>

      {/* Recycler cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((r) => (
          <RecyclerCard key={r.id} recycler={r} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Card padding="lg" className="text-center">
          <p className="text-sm text-gray-500">No recyclers match your filters.</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => {
              setMaterialFilter('All');
              setPickupOnly(false);
            }}
          >
            Clear filters
          </Button>
        </Card>
      )}
    </AppLayout>
  );
}
