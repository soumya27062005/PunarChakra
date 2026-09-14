import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { safetyTips } from '@/data/safetyTips';
import {
  Battery,
  Monitor,
  Flame,
  CircuitBoard,
  HardHat,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Battery,
  Monitor,
  Flame,
  CircuitBoard,
  HardHat,
};

export function Safety() {
  return (
    <AppLayout title="Safety Tips">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">Stay Safe</h2>
        </div>
        <p className="text-sm text-gray-500">
          Important safety guidelines for handling e-waste
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {safetyTips.map((tip) => {
          const Icon = iconMap[tip.icon] || ShieldCheck;
          return (
            <Card key={tip.id} padding="md">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">{tip.title}</h3>
              </div>
              <ul className="space-y-2">
                {tip.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                    <span className="text-sm text-gray-600">{t}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      {/* Emergency note */}
      <div className="mt-5 px-3 py-3 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-xs font-semibold text-red-700 mb-1">Emergency</p>
        <p className="text-xs text-red-600">
          In case of accident or toxic exposure, call 108 immediately. Keep emergency numbers saved on your phone.
        </p>
      </div>
    </AppLayout>
  );
}
