import type { Lot } from '@/types';

export const initialLots: Lot[] = [
  {
    id: 'PC-2026-00122',
    material: 'PCB',
    weight: 8,
    condition: 'Used',
    estimatedValue: 2000,
    quotedPrice: 2080,
    recycler: 'GreenCycle Recycling',
    createdDate: '10 Sep 2026',
    status: 'Handed Over',
  },
  {
    id: 'PC-2026-00123',
    material: 'Cables',
    weight: 5,
    condition: 'Good',
    estimatedValue: 2300,
    quotedPrice: 2100,
    recycler: 'ReNew E-Waste Hub',
    createdDate: '11 Sep 2026',
    status: 'Pickup Scheduled',
  },
];
