import { NavLink } from 'react-router-dom';
import { Home, PlusCircle, TrendingUp, Recycle, Wallet } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/add-scrap', label: 'Add Scrap', icon: PlusCircle, end: false },
  { to: '/prices', label: 'Prices', icon: TrendingUp, end: false },
  { to: '/recyclers', label: 'Recycler', icon: Recycle, end: false },
  { to: '/earnings', label: 'Earnings', icon: Wallet, end: false },
];

export function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 md:hidden">
      <div className="flex items-stretch justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-0.5 py-2.5 px-2 flex-1 transition-colors ${
                  isActive
                    ? 'text-emerald-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                      isActive ? 'bg-emerald-50' : ''
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
