export interface SafetyTip {
  id: string;
  title: string;
  icon: string;
  tips: string[];
}

export const safetyTips: SafetyTip[] = [
  {
    id: 'battery',
    title: 'Battery Safety',
    icon: 'Battery',
    tips: [
      'Use gloves while handling batteries.',
      'Do not puncture or crush batteries.',
      'Keep batteries away from fire and water.',
      'Store in a dry, cool place.',
    ],
  },
  {
    id: 'crt',
    title: 'CRT Safety',
    icon: 'Monitor',
    tips: [
      'Do not break CRT screens.',
      'CRT tubes can implode — handle with care.',
      'Wear safety goggles when moving CRTs.',
      'Discharge static before touching internals.',
    ],
  },
  {
    id: 'cable',
    title: 'Cable Burning',
    icon: 'Flame',
    tips: [
      'Do not burn cables to extract copper.',
      'Burning releases toxic fumes — it is illegal.',
      'Strip insulation manually or with tools.',
      'Report open cable burning to authorities.',
    ],
  },
  {
    id: 'pcb',
    title: 'PCB Handling',
    icon: 'CircuitBoard',
    tips: [
      'Wear a dust mask when handling PCBs.',
      'Avoid touching exposed solder points.',
      'Store PCBs in anti-static bags.',
      'Keep away from children and food items.',
    ],
  },
  {
    id: 'ppe',
    title: 'Protective Equipment',
    icon: 'HardHat',
    tips: [
      'Always wear gloves and a mask.',
      'Use closed shoes, not sandals.',
      'Wash hands thoroughly after handling.',
      'Keep a first-aid kit nearby.',
    ],
  },
];
