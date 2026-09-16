import {
  CircuitBoard,
  Cable,
  Monitor,
  Battery,
  Cog,
  Recycle,
  Package,
  type LucideIcon,
} from 'lucide-react';
import type { Material } from '@/types';
import { Card } from './ui/Card';

const iconMap: Record<string, LucideIcon> = {
  CircuitBoard,
  Cable,
  Monitor,
  Battery,
  Cog,
  Recycle,
  Package,
};

interface MaterialCardProps {
  material: Material;
  selected?: boolean;
  onClick?: () => void;
}

export function MaterialCard({ material, selected, onClick }: MaterialCardProps) {
  const Icon = iconMap[material.icon] || Package;
  return (
    <Card
      onClick={onClick}
      padding="sm"
      className={`flex flex-col items-center gap-2 transition-all ${
        selected
          ? 'border-emerald-500 border-2 bg-emerald-50 ring-2 ring-emerald-100'
          : 'hover:border-emerald-200'
      }`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          selected ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-600'
        }`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-900">{material.name}</p>
        <p className="text-xs text-gray-400">
          ₹{material.priceLow}–₹{material.priceHigh}/{material.unit}
        </p>
      </div>
    </Card>
  );
}
