import type { LotStatus } from '@/types';
import { CheckCircle2, Circle } from 'lucide-react';

interface StatusTimelineProps {
  currentStatus: LotStatus;
}

const stages: LotStatus[] = [
  'Lot Created',
  'Price Quoted',
  'Pickup Scheduled',
  'Handed Over',
  'Payment Received',
];

export function StatusTimeline({ currentStatus }: StatusTimelineProps) {
  const currentIndex = stages.indexOf(currentStatus);

  return (
    <div className="flex flex-col gap-0">
      {stages.map((stage, i) => {
        const isComplete = i <= currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <div key={stage} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isComplete
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-300'
                } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
              >
                {isComplete ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </div>
              {i < stages.length - 1 && (
                <div
                  className={`w-0.5 h-8 ${i < currentIndex ? 'bg-emerald-500' : 'bg-gray-100'}`}
                />
              )}
            </div>
            <div className="pt-1 pb-2">
              <p
                className={`text-sm font-semibold ${
                  isComplete ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {stage}
              </p>
              {isCurrent && (
                <p className="text-xs text-emerald-600 mt-0.5">In progress</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
