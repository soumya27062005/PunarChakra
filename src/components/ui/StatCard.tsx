import type { ReactNode } from 'react';
import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  color?: string;
  subtitle?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color = 'emerald',
  subtitle,
}: StatCardProps) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
    red: { bg: 'bg-red-50', text: 'text-red-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-600' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-600' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600' },
  lime: { bg: 'bg-lime-50', text: 'text-lime-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-600' },
    fuchsia: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-600' },
    violet: { bg: 'bg-violet-50', text: 'text-violet-600' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-600' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-600' },
    stone: { bg: 'bg-stone-50', text: 'text-stone-600' },
  neutral: { bg: 'bg-neutral-50', text: 'text-neutral-600' },
  zinc: { bg: 'bg-zinc-50', text: 'text-zinc-600' },
  'emerald-dark': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'blue-dark': { bg: 'bg-blue-100', text: 'text-blue-700' },
    'amber-dark': { bg: 'bg-amber-100', text: 'text-amber-700' },
    'red-dark': { bg: 'bg-red-100', text: 'text-red-700' },
  };

  const colors = colorMap[color] || colorMap.emerald;

  return (
    <Card padding="sm" className="flex items-center gap-3">
      <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${colors.bg} ${colors.text}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-500 font-medium truncate">{label}</p>
        <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 truncate">{subtitle}</p>}
      </div>
    </Card>
  );
}
