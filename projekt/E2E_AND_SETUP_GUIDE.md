# Dragon Ball Arena — Full Setup & E2E Testing Guide

## Quick Start

```bash
cd projekt
npm install
npm run dev
```

Server runs on `http://localhost:5173`.

---

## Features Implemented

### ✅ Difficulty Selector (Menu)
- **Location**: Main menu, under Power Level display
- **Options**: Easy, Normal, Hard (Easy/Normal/Hard)
- **Persistence**: Saved to `localStorage.dba_ai_difficulty`
- **Effect**: Changes opponent AI behavior (dodge%, technique selection, damage prioritization)

### ✅ AI Difficulty Levels
- **Easy**: Random techniques, conservative dodging (40% when low HP), prefers 3 highest-damage options
- **Normal**: Best damage technique, 60% dodge when low HP (~25%)
- **Hard**: Finisher detection, aggressive dodging (80% when low HP ~35%), prioritizes killing targets

### ✅ Match Summary Modal
- Shows result (Victory/Defeat)
- Points breakdown: Base + Survivor Bonus + HP Bonus + Turn Bonus
- Buttons: Back, Rematch, Share
- Keyboard support: Esc/Enter closes modal

### ✅ Match History Export/Import
- **Export**: Downloads `dba_matches_{username}.json`
- **Import**: Load previously exported JSON file
- Accessible from Match History → buttons above list

### ✅ API Synchronization
```javascript
// In browser console:
localStorage.setItem('dba_api_url', 'https://api.example.com');
```

Expected endpoints:
- `POST /sync/match` — Send match result
- `GET /leaderboard` — Fetch leaderboard
- `POST /match/{id}/confirm-delete` — Confirm safe deletion

### ✅ Migration with Safe Cleanup
- Automatically triggered after first match sync if API configured
- Only deletes matches confirmed as synced by server
- Retries on subsequent saves via lazy-load + migration flag

---

## Running Tests

### Unit Tests (Vitest)
```bash
npm run test
```

Tests scoring calculations and basic match flow state.

### E2E Tests (Playwright)
```bash
# Install Playwright first (one-time)
npm install @playwright/test

# Run e2e tests
npm run e2e

# Run with UI (interactive)
npm run e2e:ui
```

**E2E Test Coverage:**
1. **Difficulty selector** — Menu UI, selection persistence, visual feedback
2. **Match flow** — Menu → Find Match → Matchmaking → Draft/Battle → Modal → Rematch
3. **Export/Import** — Download and re-upload match history JSON

**Note**: E2E tests auto-start dev server on port 5173. Ensure no other process is listening.

---

## Architecture Overview

```
src/
├── game/
│   ├── ai.ts                    # AI difficulty logic (easy/normal/hard)
│   ├── useGameState.ts          # Zustand store + migration logic
│   ├── useGameState.test.ts     # Unit tests (vitest)
│   └── e2e.matchFlow.test.ts    # Legacy state test
├── components/
│   ├── MatchSummary.tsx         # Modal with breakdown & keyboard handler
│   ├── App.tsx                  # Menu with difficulty selector
│   ├── BattleArena.tsx          # Battle UI
│   ├── Leaderboard.tsx          # (search/pagination/export)
│   └── MatchHistory.tsx         # (export/import)
├── services/
│   └── api.ts                   # HTTP client (fetch) + migration helpers
└── types.ts                     # MatchResult, Character, etc.

e2e/
└── match-flow.spec.ts           # Playwright tests

playwright.config.ts             # Playwright configuration
```

---

## Configuration

### Set API URL (for sync)
```javascript
// Browser console:
localStorage.setItem('dba_api_url', 'https://your-api.com');
// Reload page
```

### Set AI Difficulty (UI or code)
```javascript
// Via menu: click Easy/Normal/Hard button
// Or via code:
localStorage.setItem('dba_ai_difficulty', 'hard');
```

### A/B Testing Variant
```javascript
localStorage.setItem('dba_ab_variant', 'B');
// Variant B: 25% more survivor bonus, -20% turn bonus
```

---

## API Contract (Server Expected)

### POST /sync/match
```json
Request: {
  "id": "match_123...",
  "date": 1708862400000,
  "result": "win|loss",
  "pointsEarned": 50,
  "opponentTeam": ["vegeta", "nappa"],
  "playerTeam": ["goku"],
  "turns": 5,
  "playerHpRemaining": 50
}

Response: {
  "ok": true,
  "matchId": "match_123...",
  "duplicateId": null
}
```

### POST /match/{id}/confirm-delete
```json
Response: { "ok": true }
```

### GET /leaderboard
```json
Response: [
  { "username": "goku", "score": 500, "rank": "Super Saiyan" },
  ...
]
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| E2E tests timeout | Ensure `npm run dev` is not already running; Playwright will start its own server |
| Difficulty not saving | Check `localStorage.dba_ai_difficulty` in browser console |
| Export button missing | Only shows in MatchHistory component; navigate to menu → 📋 Match History |
| API sync not triggered | Set `dba_api_url` before saving a match; check console for fetch errors |

---

## Next Steps (Future Enhancements)

- [ ] Backend API implementation (Node.js/Express sample provided)
- [ ] Multi-device sync (Google Cloud Storage / Firebase)
- [ ] Telemetry (anonymous match stats, AI win rates)
- [ ] Replay system (save & playback match moves)
- [ ] Tournaments (bracket-based multi-match series)
