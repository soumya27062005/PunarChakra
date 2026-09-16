import { Link } from 'react-router-dom';
import { Recycle, WifiOff } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export function Header({ title, showBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          {showBack ? (
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-none">
                  {title || 'PunarChakra'}
                </h1>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  E-Waste Circular Economy
                </p>
              </div>
            </Link>
          ) : (
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 leading-none">
                  {title || 'PunarChakra'}
                </h1>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  E-Waste Circular Economy
                </p>
              </div>
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
            <WifiOff className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs font-medium text-gray-500">Offline</span>
          </div>
        </div>
      </div>
    </header>
  );
}
