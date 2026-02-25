import { describe, it, expect } from 'vitest';
import { useGameState } from './useGameState';

describe('calculateMatchPoints', () => {
  it('awards base for win and bonuses', () => {
    const fn = (useGameState as any).getState().calculateMatchPoints;
    const pts = fn('win', 3, 3, 240, 300, 8);
    expect(typeof pts).toBe('number');
    expect(pts).toBeGreaterThanOrEqual(50);
  });

  it('gives small points on loss', () => {
    const fn = (useGameState as any).getState().calculateMatchPoints;
    const pts = fn('loss', 1, 3, 50, 300, 12);
    expect(pts).toBeGreaterThanOrEqual(0);
  });
});
