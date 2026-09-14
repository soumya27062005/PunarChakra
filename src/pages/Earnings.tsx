import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { StatCard } from '@/components/ui/StatCard';
import { TransactionCard } from '@/components/TransactionCard';
import { MiniChart } from '@/components/ui/MiniChart';
import { Badge } from '@/components/ui/Badge';
import { earnings as earningsData } from '@/data/earnings';
import { transactions } from '@/data/transactions';
import {
  Wallet,
  TrendingUp,
  Clock,
  IndianRupee,
} from 'lucide-react';

export function Earnings() {
  const trendData = earningsData.monthlyTrend.map((d) => d.amount);
  const labels = earningsData.monthlyTrend.map((d) => d.month);
  const paidCount = transactions.filter((t) => t.status === 'Paid').length;
  const pendingCount = transactions.filter((t) => t.status === 'Pending').length;

  return (
    <AppLayout title="Earnings">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Your Earnings</h2>
        <p className="text-sm text-gray-500 mt-1">Track your e-waste income</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        <StatCard
          label="Total Earnings"
          value={`₹${earningsData.total.toLocaleString('en-IN')}`}
          icon={<Wallet className="w-5 h-5" />}
          color="emerald"
        />
        <StatCard
          label="This Month"
          value={`₹${earningsData.thisMonth.toLocaleString('en-IN')}`}
          icon={<TrendingUp className="w-5 h-5" />}
          color="blue"
        />
        <StatCard
          label="Pending Payments"
          value={`₹${earningsData.pending.toLocaleString('en-IN')}`}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
      </div>

      {/* Trend chart */}
      <Card padding="md" className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Earnings Trend</h3>
            <p className="text-xs text-gray-400">Last 6 months</p>
          </div>
          <Badge variant="success" size="sm">
            <TrendingUp className="w-3 h-3" /> +59%
          </Badge>
        </div>
        <MiniChart
          data={trendData}
          height={120}
          width={320}
          color="#059669"
          showAxis
          labels={labels}
        />
      </Card>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Paid</p>
            <p className="text-base font-bold text-gray-900">{paidCount} transactions</p>
          </div>
        </Card>
        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-base font-bold text-gray-900">{pendingCount} transactions</p>
          </div>
        </Card>
      </div>

      {/* Transaction history */}
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Transaction History</h3>
      <div className="flex flex-col gap-2.5">
        {transactions.map((txn) => (
          <TransactionCard key={txn.id} transaction={txn} />
        ))}
      </div>
    </AppLayout>
  );
}
