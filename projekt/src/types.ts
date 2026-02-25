export type EnergyType = 'ki' | 'physical' | 'special';

export type EffectType = 'stun' | 'weaken' | 'buff' | 'pierce' | 'none';

export interface ActionCost {
  ki?: number;
  physical?: number;
  special?: number;
  any?: number;
}

export interface Technique {
  id: string;
  name: string;
  cost: ActionCost;
  damage: number;
  cooldown: number;
  effect: EffectType;
  description: string;
  iconUrl?: string;
}

export interface Dodge {
  name: string;
  successRate: number; // 0 to 1
  cost: ActionCost;
  cooldown: number;
  description: string;
  iconUrl?: string;
}

export interface CharacterStats {
  attack: number;
  defense: number;
  speed: number;
}

export interface Character {
  id: string;
  name: string;
  maxHp: number;
  stats: CharacterStats;
  techniques: [Technique, Technique, Technique];
  dodge: Dodge;
  imageColor: string; // Placeholder for image hue/theme
  portraitUrl: string;
}

export interface PlayerEnergy {
  ki: number;
  physical: number;
  special: number;
}

export interface CombatLogEntry {
  id: number;
  turn: number;
  playerName: string;
  characterName: string;
  action: string;
  details: string;
  isOpponent: boolean;
}
