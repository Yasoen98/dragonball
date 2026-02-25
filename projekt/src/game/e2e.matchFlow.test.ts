import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useGameState } from './useGameState';
import { INITIAL_CHARACTERS } from '../data/characters';

function makeBattleChar(ch: any) {
  return {
    ...ch,
    currentHp: ch.maxHp || 100,
    cooldowns: {},
    statusEffects: []
  };
}

describe('match flow e2e (state-level)', () => {
  beforeEach(() => {
    localStorage.clear();
    // create account and set current user
    const accounts: any = { testuser: { name: 'testuser', password: '', rank: 'Saibaman', score: 0 } };
    localStorage.setItem('dba_accounts', JSON.stringify(accounts));
    localStorage.setItem('dba_current_user', 'testuser');

    // reset store minimal state
    useGameState.setState({
      playerName: 'testuser',
      playerRank: 'Saibaman',
      playerScore: 0,
      matchHistory: [],
      playerRoster: [makeBattleChar(INITIAL_CHARACTERS[0])],
      opponentRoster: [makeBattleChar(INITIAL_CHARACTERS[1])],
      playerActiveIndex: 0,
      opponentActiveIndex: 0,
      turnNumber: 3,
    } as any);
  });

  it('saves match, updates history and calls sync', async () => {
    // mock fetch for API sync
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) } as any)) as any;
    localStorage.setItem('dba_api_url', 'https://example.com');

    const s = useGameState.getState();
    // simulate a win
    s.saveMatchResult('win');

    const stored = JSON.parse(localStorage.getItem('dba_matches_testuser') || '[]');
    expect(stored.length).toBeGreaterThanOrEqual(1);

    // matchHistory in store updated
    expect(useGameState.getState().matchHistory.length).toBeGreaterThanOrEqual(1);

    // ensure fetch called for sync
    expect((globalThis.fetch as any).mock.calls.length).toBeGreaterThanOrEqual(1);
  });
});
