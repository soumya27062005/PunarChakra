import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Lot, Language } from '@/types';
import { initialLots } from '@/data/lots';
import { profile as initialProfile } from '@/data/profile';

interface AppContextValue {
  lots: Lot[];
  addLot: (lot: Lot) => void;
  updateLotStatus: (id: string, status: Lot['status']) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  lotCounter: number;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lots, setLots] = useState<Lot[]>(initialLots);
  const [language, setLanguage] = useState<Language>(initialProfile.language);
  const [lotCounter, setLotCounter] = useState(125);

  const addLot = (lot: Lot) => {
    setLots((prev) => [lot, ...prev]);
    setLotCounter((c) => c + 1);
  };

  const updateLotStatus = (id: string, status: Lot['status']) => {
    setLots((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <AppContext.Provider
      value={{ lots, addLot, updateLotStatus, language, setLanguage, lotCounter }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
