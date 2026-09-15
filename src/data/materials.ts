import type { Material } from '@/types';

export const materials: Material[] = [
  {
    id: 'pcb',
    name: 'PCB',
    icon: 'CircuitBoard',
    priceLow: 220,
    priceHigh: 280,
    unit: 'kg',
    lastUpdated: '2 hours ago',
    trend: [210, 215, 225, 220, 230, 240, 250],
  },
  {
    id: 'cables',
    name: 'Cables',
    icon: 'Cable',
    priceLow: 400,
    priceHigh: 520,
    unit: 'kg',
    lastUpdated: '1 hour ago',
    trend: [380, 390, 410, 430, 450, 460, 480],
  },
  {
    id: 'lcd-crt',
    name: 'LCD/CRT',
    icon: 'Monitor',
    priceLow: 60,
    priceHigh: 120,
    unit: 'kg',
    lastUpdated: '5 hours ago',
    trend: [50, 55, 60, 65, 70, 75, 80],
  },
  {
    id: 'batteries',
    name: 'Batteries',
    icon: 'Battery',
    priceLow: 80,
    priceHigh: 150,
    unit: 'kg',
    lastUpdated: '3 hours ago',
    trend: [70, 75, 80, 90, 100, 110, 120],
  },
  {
    id: 'motors',
    name: 'Motors',
    icon: 'Cog',
    priceLow: 90,
    priceHigh: 130,
    unit: 'kg',
    lastUpdated: '4 hours ago',
    trend: [85, 88, 92, 95, 100, 105, 110],
  },
  {
    id: 'mixed-plastic',
    name: 'Mixed Plastic',
    icon: 'Recycle',
    priceLow: 35,
    priceHigh: 55,
    unit: 'kg',
    lastUpdated: '6 hours ago',
    trend: [30, 32, 35, 38, 40, 42, 45],
  },
  {
    id: 'other',
    name: 'Other',
    icon: 'Package',
    priceLow: 20,
    priceHigh: 100,
    unit: 'kg',
    lastUpdated: '1 day ago',
    trend: [20, 25, 30, 35, 40, 45, 50],
  },
];

export const materialMap: Record<string, Material> = materials.reduce(
  (acc, m) => ({ ...acc, [m.name]: m }),
  {}
);
