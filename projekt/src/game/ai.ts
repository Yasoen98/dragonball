import type { PlayerEnergy, Technique } from '../types';
import type { BattleCharacter } from './useGameState';

export type AIDifficulty = 'easy' | 'normal' | 'hard';

// AI helper with difficulty parameter
export function selectAction(botChar: BattleCharacter, playerChar: BattleCharacter, energy: PlayerEnergy, difficulty: AIDifficulty = 'normal'): { type: 'technique' | 'dodge' | 'pass'; action?: Technique } {
  const lowHp = botChar.currentHp < botChar.maxHp * (difficulty === 'hard' ? 0.35 : 0.25);
  if (lowHp && Math.random() < (difficulty === 'easy' ? 0.4 : difficulty === 'hard' ? 0.8 : 0.6)) {
    return { type: 'dodge' };
  }

  const usable = botChar.techniques.filter((t: Technique) => {
    if ((t.cost.ki || 0) > energy.ki) return false;
    if ((t.cost.physical || 0) > energy.physical) return false;
    if ((t.cost.special || 0) > energy.special) return false;
    const cd = botChar.cooldowns[t.id] || 0;
    if (cd > 0) return false;
    return true;
  });

  if (usable.length === 0) return { type: 'pass' };

  if (difficulty === 'hard') {
    for (const t of usable) {
      let dmg = t.damage;
      if (t.effect !== 'pierce') dmg = Math.floor(dmg * (botChar.stats.attack / playerChar.stats.defense));
      if (dmg >= playerChar.currentHp) return { type: 'technique', action: t };
    }
  }

  usable.sort((a: Technique, b: Technique) => b.damage - a.damage);
  if (difficulty === 'easy') {
    const slice = usable.slice(0, Math.max(1, Math.min(3, usable.length)));
    return { type: 'technique', action: slice[Math.floor(Math.random() * slice.length)] };
  }

  return { type: 'technique', action: usable[0] };
}
