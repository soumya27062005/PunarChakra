import { Link } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { TransactionCard } from '@/components/TransactionCard';
import { Badge } from '@/components/ui/Badge';
import {
  PlusCircle,
  TrendingUp,
  Recycle,
  Wallet,
  Clock,
  Package,
  ArrowRight,
  Sparkles,
  WifiOff,
  Cloud,
} from 'lucide-react';
import { transactions } from '@/data/transactions';
import { earnings } from '@/data/earnings';
import { useApp } from '@/context/AppContext';

export function Home() {
  const { lots } = useApp();
  const activeLots = lots.filter(
    (l) => l.status !== 'Payment Received' && l.status !== 'Handed Over'
  ).length;
  const recentTxns = transactions.slice(0, 4);

  const quickActions = [
    {
      label: 'Add Scrap',
      icon: PlusCircle,
      to: '/add-scrap',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Check Prices',
      icon: TrendingUp,
      to: '/prices',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Find Recycler',
      icon: Recycle,
      to: '/recyclers',
      color: 'bg-teal-50 text-teal-600',
    },
    {
      label: 'View Earnings',
      icon: Wallet,
      to: '/earnings',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <AppLayout>
      {/* Greeting */}
      <div className="mb-5">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-sm text-gray-500">Namaste</span>
          <span className="text-sm">👋</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Welcome to PunarChakra</h2>
        <p className="text-sm text-gray-500 mt-1">
          Let's turn your e-waste into value.
        </p>
      </div>

      {/* Offline notice */}
      <div className="flex items-start gap-2.5 px-3 py-2.5 bg-amber-50 border border-amber-100 rounded-xl mb-5">
        <WifiOff className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-amber-800">Offline Mode</p>
          <p className="text-xs text-amber-600 mt-0.5">
            Data will sync automatically when internet is available.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <StatCard
          label="Today's Earnings"
          value="₹2,600"
          icon={<Wallet className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          label="Pending Payments"
          value="₹1,350"
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          label="Active Lots"
          value={String(activeLots)}
          icon={<Package className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          label="Total Earnings"
          value={`₹${earnings.total.toLocaleString('en-IN')}`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="teal"
        />
      </div>

      {/* Quick actions */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-2.5 mb-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.label} to={action.to}>
              <Card padding="sm" className="flex flex-col items-center gap-2 hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${action.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* AI placeholder */}
      <Card padding="md" className="mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-semibold text-emerald-700">AI Feature Preview</span>
        </div>
        <p className="text-sm font-bold text-gray-900">Smart Recycler Match</p>
        <p className="text-xs text-gray-500 mt-1">
          AI will automatically match your lots with the best recycler based on material, price, and distance.
        </p>
        <Link
          to="/recyclers"
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2"
        >
          Try it now <ArrowRight className="w-3 h-3" />
        </Link>
      </Card>

      {/* Active Lots preview */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Active Lots</h3>
        <Link
          to="/lots"
          className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 mb-6">
        {lots.slice(0, 2).map((lot) => (
          <Link key={lot.id} to={`/lots/${lot.id}`}>
            <Card padding="sm" className="flex items-center justify-between hover:shadow-md transition-shadow">
              <div>
                <p className="text-sm font-bold text-gray-900 font-mono">{lot.id}</p>
                <p className="text-xs text-gray-400 mt-0.5">{lot.material} · {lot.weight} kg</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-emerald-600">₹{lot.estimatedValue.toLocaleString('en-IN')}</span>
                <Badge variant={lot.status === 'Handed Over' || lot.status === 'Payment Received' ? 'success' : 'warning'} size="sm">
                  {lot.status}
                </Badge>
              </div>
            </Card>
          </Link>
        ))}
        {lots.length === 0 && (
          <Card padding="md" className="text-center">
            <p className="text-sm text-gray-400">No lots yet. Create one from Add Scrap!</p>
          </Card>
        )}
      </div>

      {/* Recent transactions */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Recent Transactions</h3>
        <Link
          to="/earnings"
          className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="flex flex-col gap-2.5">
        {recentTxns.map((txn) => (
          <TransactionCard key={txn.id} transaction={txn} />
        ))}
      </div>

      {/* Sync status */}
      <div className="flex items-center justify-center gap-1.5 mt-6 text-xs text-gray-400">
        <Cloud className="w-3.5 h-3.5" />
        <span>Local data · 47 records stored</span>
      </div>
    </AppLayout>
  );
}
