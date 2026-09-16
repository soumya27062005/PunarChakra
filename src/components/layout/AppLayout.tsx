import type { ReactNode } from 'react';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';
import { Sidebar } from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
}

export function AppLayout({ children, title }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64">
        <Header title={title} />
        <main className="px-4 py-4 pb-24 md:pb-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
      <BottomNavigation />
    </div>
  );
}
