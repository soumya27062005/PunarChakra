import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import { profile } from '@/data/profile';
import {
  User,
  Phone,
  MapPin,
  Package,
  Star,
  Globe,
  Check,
  Shield,
  Recycle,
} from 'lucide-react';
import type { Language } from '@/types';

const languages: Language[] = ['English', 'हिन्दी', 'मराठी'];

export function Profile() {
  const { language, setLanguage } = useApp();

  const details = [
    { icon: Phone, label: 'Phone', value: profile.phone },
    { icon: MapPin, label: 'Area', value: profile.area },
    { icon: Package, label: 'Total Lots', value: String(profile.totalLots) },
    { icon: Star, label: 'Rating', value: `${profile.rating} / 5.0` },
  ];

  return (
    <AppLayout title="Profile">
      {/* Profile header */}
      <Card padding="lg" className="mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <Badge variant="success" size="sm">
                <Shield className="w-3 h-3" /> Verified Collector
              </Badge>
            </div>
          </div>
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

      {/* Language selector */}
      <Card padding="md" className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Preferred Language</h3>
        </div>
        <div className="flex flex-col gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl border transition-colors ${
                language === lang
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-sm font-medium ${language === lang ? 'text-emerald-700' : 'text-gray-700'}`}>
                {lang}
              </span>
              {language === lang && (
                <Check className="w-4 h-4 text-emerald-600" />
              )}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Language preference is saved locally. Full translations coming soon.
        </p>
      </Card>

      {/* About */}
      <Card padding="md" className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Recycle className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-semibold text-gray-900">About PunarChakra</h3>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          PunarChakra connects informal e-waste collectors with authorized recyclers, ensuring fair prices, transparent transactions, and safe handling practices.
        </p>
        <p className="text-xs text-gray-400 mt-2">Version 1.0.0 · SIH Prototype</p>
      </Card>

      <Button variant="outline" fullWidth>
        Logout (Demo)
      </Button>
    </AppLayout>
  );
}
