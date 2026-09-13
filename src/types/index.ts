export type MaterialCategory =
  | 'PCB'
  | 'Cables'
  | 'LCD/CRT'
  | 'Batteries'
  | 'Motors'
  | 'Mixed Plastic'
  | 'Other';

export type Condition = 'Good' | 'Used' | 'Damaged';

export type LotStatus =
  | 'Lot Created'
  | 'Price Quoted'
  | 'Pickup Scheduled'
  | 'Handed Over'
  | 'Payment Received';

export type TransactionStatus = 'Paid' | 'Pending' | 'Processing';

export type Language = 'English' | 'हिन्दी' | 'मराठी';

export interface Material {
  id: string;
  name: MaterialCategory;
  icon: string;
  priceLow: number;
  priceHigh: number;
  unit: string;
  lastUpdated: string;
  trend: number[];
}

export interface Recycler {
  id: string;
  name: string;
  location: string;
  acceptedMaterials: MaterialCategory[];
  buyingRate: number;
  rateUnit: string;
  pickupAvailable: boolean;
  authorized: boolean;
  distance: number;
  rating: number;
}

export interface Lot {
  id: string;
  material: MaterialCategory;
  weight: number;
  condition: Condition;
  estimatedValue: number;
  quotedPrice: number;
  recycler: string;
  createdDate: string;
  status: LotStatus;
}

export interface Transaction {
  id: string;
  date: string;
  material: MaterialCategory;
  recycler: string;
  amount: number;
  status: TransactionStatus;
}

export interface Earnings {
  total: number;
  thisMonth: number;
  pending: number;
  monthlyTrend: { month: string; amount: number }[];
}

export interface CollectorProfile {
  name: string;
  phone: string;
  area: string;
  totalLots: number;
  rating: number;
  language: Language;
}
