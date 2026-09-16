import { NavLink } from 'react-router-dom';
import {
  Home,
  PlusCircle,
  TrendingUp,
  Recycle,
  Wallet,
  Shield,
  User,
  Package,
  Recycle as RecycleLogo,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/add-scrap', label: 'Add Scrap', icon: PlusCircle, end: false },
  { to: '/prices', label: 'Price Board', icon: TrendingUp, end: false },
  { to: '/recyclers', label: 'Recyclers', icon: Recycle, end: false },
  { to: '/lots', label: 'My Lots', icon: Package, end: false },
  { to: '/earnings', label: 'Earnings', icon: Wallet, end: false },
  { to: '/safety', label: 'Safety Tips', icon: Shield, end: false },
  { to: '/profile', label: 'Profile', icon: User, end: false },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 fixed left-0 top-0 bottom-0 bg-white border-r border-gray-100 p-4">
      <div className="flex items-center gap-2.5 mb-8 px-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
          <RecycleLogo className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900 leading-none">
            PunarChakra
          </h1>
          <p className="text-[10px] text-gray-400 mt-0.5">E-Waste Circular Economy</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
