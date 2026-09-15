import type { Transaction } from '@/types';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';
import { CheckCircle2, Clock, Loader } from 'lucide-react';

interface TransactionCardProps {
  transaction: Transaction;
}

const statusConfig = {
  Paid: { variant: 'success' as const, icon: CheckCircle2 },
  Pending: { variant: 'warning' as const, icon: Clock },
  Processing: { variant: 'info' as const, icon: Loader },
};

export function TransactionCard({ transaction }: TransactionCardProps) {
  const config = statusConfig[transaction.status];
  const Icon = config.icon;

  return (
    <Card padding="sm" className="flex items-center gap-3">
      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
        <Icon className={`w-5 h-5 ${transaction.status === 'Paid' ? 'text-emerald-600' : transaction.status === 'Pending' ? 'text-amber-500' : 'text-blue-500'}`} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-900">{transaction.material}</p>
          <p className="text-sm font-bold text-gray-900">
            ₹{transaction.amount.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className="text-xs text-gray-400 truncate">{transaction.recycler}</p>
          <Badge variant={config.variant} size="sm">
            {transaction.status}
          </Badge>
        </div>
        <p className="text-xs text-gray-400 mt-0.5">{transaction.date}</p>
      </div>
    </Card>
  );
}
