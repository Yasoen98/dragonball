import { create } from 'zustand';
import type { Character, PlayerEnergy, CombatLogEntry, ActionCost, EffectType, MatchResult } from '../types';
import { INITIAL_CHARACTERS } from '../data/characters';
import { selectAction } from './ai';
import { postMatchSync } from '../services/api';

export type GamePhase = 'login' | 'menu' | 'matchmaking' | 'draft' | 'battle' | 'gameOver' | 'leaderboard' | 'matchHistory';

export interface BattleCharacter extends Character {
    currentHp: number;
    cooldowns: Record<string, number>; // technique/dodge ID -> turns remaining
    statusEffects: { effect: EffectType; duration: number }[];
}

interface GameState {
    phase: GamePhase;
    matchmakingTimer: number;

    // Player Profile
    playerName: string;
    playerRank: string;
    playerScore: number;
    loginError: string | null;

    // Draft Phase
    playerRoster: BattleCharacter[];
    opponentRoster: BattleCharacter[];
    availableCharacters: Character[];
    draftTurn: 'player' | 'opponent';

    // Battle Phase
    playerActiveIndex: number;
    opponentActiveIndex: number;
    playerEnergy: PlayerEnergy;
    opponentEnergy: PlayerEnergy;
    aiDifficulty: import('../game/ai').AIDifficulty;
    turnNumber: number;
    isPlayerTurn: boolean;
    combatLogs: CombatLogEntry[];
    winner: 'player' | 'opponent' | null;
    showLogs: boolean;
    matchHistory: MatchResult[];

    // Actions
    login: (name: string, password?: string) => void;
    toggleLogs: () => void;
    register: (name: string, password?: string) => void;
    logout: () => void;
    addScore: (points: number) => void;
    calculateMatchPoints: (result: 'win' | 'loss', survivingCharacters: number, totalCharacters: number, playerHpRemaining: number, playerMaxHp: number, turnCount: number) => number;
    saveMatchResult: (result: 'win' | 'loss') => void;
    setAIDifficulty: (diff: import('../game/ai').AIDifficulty) => void;
    migrateLocalMatches: (username?: string) => Promise<void>;
    setPhase: (phase: GamePhase) => void;
    startMatchmaking: () => void;
    tickMatchmaking: () => void;
    startDraft: () => void;
    draftCharacter: (characterId: string) => void;
    botDraftPick: () => void;
    startBattle: () => void;

    // Battle Actions
    setPlayerActiveIndex: (index: number) => void;
    setOpponentActiveIndex: (index: number) => void;
    executePlayerAction: (actionType: 'technique' | 'dodge', actionId: string) => void;
    passTurn: () => void;
    executeOpponentTurn: () => void;
    endTurn: () => void;
}

const initialEnergy: PlayerEnergy = { ki: 0, physical: 0, special: 0 };

// Scoring weights configurable here. Can be later moved to JSON or remote config.
const MATCH_SCORING_WEIGHTS = {
    baseWin: 50,
    perSurvivor: 15,
    maxHpBonus: 20,
    maxTurnBonus: 15,
    lossSurvivor: 5,
};

// A/B variant can be toggled via localStorage key 'dba_ab_variant' (e.g., 'A' or 'B')
const AB_VARIANT = localStorage.getItem('dba_ab_variant') || 'A';

const accounts = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
const currentUser = localStorage.getItem('dba_current_user');
const savedData = currentUser ? accounts[currentUser] : null;
const matchHistory = currentUser ? JSON.parse(localStorage.getItem(`dba_matches_${currentUser}`) || '[]') : [];

export const useGameState = create<GameState>((set, get) => ({
    phase: savedData ? 'menu' : 'login',
    matchmakingTimer: 30,

    playerName: savedData?.name || '',
    playerRank: savedData?.rank || 'Saibaman',
    playerScore: savedData?.score || 0,
    loginError: null,

    playerRoster: [],
    opponentRoster: [],
    availableCharacters: [...INITIAL_CHARACTERS],
    draftTurn: 'player',

    playerActiveIndex: 0,
    opponentActiveIndex: 0,
    playerEnergy: { ...initialEnergy },
    opponentEnergy: { ...initialEnergy },
    aiDifficulty: (localStorage.getItem('dba_ai_difficulty') as any) || 'normal',
    turnNumber: 1,
    isPlayerTurn: true,
    combatLogs: [],
    winner: null,
    showLogs: false,
    matchHistory: matchHistory,

    toggleLogs: () => set(s => ({ showLogs: !s.showLogs })),

    setAIDifficulty: (diff) => {
        localStorage.setItem('dba_ai_difficulty', diff);
        set({ aiDifficulty: diff });
    },

    login: (name: string, password?: string) => {
        const accs = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
        const user = accs[name];

        if (!user) {
            set({ loginError: 'Account not found. Please register.' });
            return;
        }

        if (user.password !== password) {
            set({ loginError: 'Incorrect password.' });
            return;
        }

        localStorage.setItem('dba_current_user', name);
        set({
            playerName: user.name,
            playerRank: user.rank,
            playerScore: user.score,
            phase: 'menu',
            loginError: null
        });
    },

    register: (name: string, password?: string) => {
        const accs = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
        if (accs[name]) {
            set({ loginError: 'Username already exists.' });
            return;
        }

        const newUser = { name, password, rank: 'Saibaman', score: 0 };
        accs[name] = newUser;
        localStorage.setItem('dba_accounts', JSON.stringify(accs));
        localStorage.setItem('dba_current_user', name);

        set({
            playerName: name,
            playerRank: 'Saibaman',
            playerScore: 0,
            phase: 'menu',
            loginError: null
        });
    },

    logout: () => {
        localStorage.removeItem('dba_current_user');
        set({
            playerName: '',
            playerRank: '',
            playerScore: 0,
            phase: 'login',
            loginError: null
        });
    },

    addScore: (points: number) => {
        const s = get();
        const newScore = s.playerScore + points;
        let newRank = s.playerRank;

        if (newScore >= 500) newRank = 'Super Saiyan';
        else if (newScore >= 250) newRank = 'Elite';
        else if (newScore >= 100) newRank = 'Raditz';

        const accs = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
        if (accs[s.playerName]) {
            accs[s.playerName].rank = newRank;
            accs[s.playerName].score = newScore;
            localStorage.setItem('dba_accounts', JSON.stringify(accs));
        }

        set({ playerScore: newScore, playerRank: newRank });
    },

    calculateMatchPoints: (result: 'win' | 'loss', survivingCharacters: number, _totalCharacters: number, playerHpRemaining: number, playerMaxHp: number, turnCount: number): number => {
        if (result === 'loss') {
            // Loss: only consolation points based on survival and turns
            const survivalBonus = survivingCharacters * 5;
            const turnBonus = Math.max(0, Math.floor(turnCount / 2));
            return Math.max(0, survivalBonus + turnBonus);
        }

        // Win: base + bonuses using configurable weights
        let weights = { ...MATCH_SCORING_WEIGHTS } as any;
        if (AB_VARIANT === 'B') {
            // In variant B, reward survival slightly more and shorten turn bonus
            weights.perSurvivor = Math.floor(weights.perSurvivor * 1.25);
            weights.maxTurnBonus = Math.floor(weights.maxTurnBonus * 0.8);
        }

        let points = weights.baseWin;
        points += survivingCharacters * weights.perSurvivor;

        const hpPercent = Math.min(1, playerHpRemaining / playerMaxHp);
        points += Math.floor(hpPercent * weights.maxHpBonus);

        const turnBonus = turnCount <= 10 ? weights.maxTurnBonus : Math.max(0, weights.maxTurnBonus - Math.floor((turnCount - 10) / 2));
        points += turnBonus;

        return Math.floor(points);
    },

    saveMatchResult: (result: 'win' | 'loss') => {
        const s = get();
        const playerSurviving = s.playerRoster.filter(c => c.currentHp > 0).length;
        const playerMaxHp = s.playerRoster.reduce((sum, c) => sum + c.maxHp, 0);
        const playerCurrentHp = s.playerRoster.reduce((sum, c) => sum + c.currentHp, 0);

        const pointsEarned = get().calculateMatchPoints(
            result,
            playerSurviving,
            s.playerRoster.length,
            playerCurrentHp,
            playerMaxHp,
            s.turnNumber
        );

        const matchResult: MatchResult = {
            id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            date: Date.now(),
            result,
            pointsEarned,
            opponentTeam: s.opponentRoster.map(c => c.id),
            playerTeam: s.playerRoster.map(c => c.id),
            turns: s.turnNumber,
            playerHpRemaining: playerCurrentHp
        };

        // Save to localStorage for current user
        if (s.playerName) {
            const allMatches = JSON.parse(localStorage.getItem(`dba_matches_${s.playerName}`) || '[]');
            allMatches.push(matchResult);
            localStorage.setItem(`dba_matches_${s.playerName}`, JSON.stringify(allMatches));

            // Update match history in store
            set(st => ({ matchHistory: [...st.matchHistory, matchResult] }));
        }

        // Award points to player
        get().addScore(pointsEarned);
        // Try to sync to server (best-effort)
        try {
            postMatchSync(matchResult).catch(() => {});
        } catch (e) {
            // ignore
        }
        // Try migration once per user when API configured
        const apiUrl = localStorage.getItem('dba_api_url');
        if (apiUrl) {
            const migratedFlag = `dba_migrated_${s.playerName}`;
            if (!localStorage.getItem(migratedFlag)) {
                // best-effort background migration
                get().migrateLocalMatches(s.playerName).catch(() => {});
                localStorage.setItem(migratedFlag, '1');
            }
        }
    },

    migrateLocalMatches: async (username?: string) => {
        const user = username || get().playerName;
        if (!user) return;
        const apiUrl = localStorage.getItem('dba_api_url');
        if (!apiUrl) return;
        const existing = JSON.parse(localStorage.getItem(`dba_matches_${user}`) || '[]');
        const synced: string[] = [];
        for (const m of existing) {
            try {
                const res = await postMatchSync(m);
                if ((res as any).ok) synced.push(m.id);
            } catch (_) {
                // ignore individual errors
            }
        }
        // Safe cleanup: only remove matches confirmed by server
        if (synced.length > 0) {
            const remaining = existing.filter((m: any) => !synced.includes(m.id));
            localStorage.setItem(`dba_matches_${user}`, JSON.stringify(remaining));
            localStorage.setItem(`dba_migrated_last_${user}`, Date.now().toString());
        }
    },

    setPhase: (phase) => set({ phase }),

    startMatchmaking: () => {
        set({ phase: 'matchmaking', matchmakingTimer: 30 });
    },

    tickMatchmaking: () => {
        const { matchmakingTimer } = get();
        if (matchmakingTimer > 0) {
            // Active search simulation: chance to find a match increases over time
            const timeElapsed = 30 - matchmakingTimer;
            const baseChance = 0.04; // base 4% per second
            const ramp = Math.min(0.25, timeElapsed * 0.02); // ramp up to +25%
            const foundChance = baseChance + ramp;

            if (Math.random() < foundChance) {
                // Found an opponent -> proceed to draft
                get().startDraft();
                return;
            }

            set({ matchmakingTimer: matchmakingTimer - 1 });
        } else {
            get().startDraft();
        }
    },

    startDraft: () => {
        set({
            phase: 'draft',
            playerRoster: [],
            opponentRoster: [],
            availableCharacters: [...INITIAL_CHARACTERS],
            draftTurn: 'player',
            winner: null,
            combatLogs: []
        });
    },

    draftCharacter: (characterId) => {
        const { phase, draftTurn, availableCharacters, playerRoster, opponentRoster } = get();
        if (phase !== 'draft' || draftTurn !== 'player' || playerRoster.length >= 3) return;

        const charIndex = availableCharacters.findIndex(c => c.id === characterId);
        if (charIndex === -1) return;

        const char = availableCharacters[charIndex];
        const newAvailable = [...availableCharacters];
        newAvailable.splice(charIndex, 1);

        const newRoster = [...playerRoster, { ...char, currentHp: char.maxHp, cooldowns: {}, statusEffects: [] }];

        set({ playerRoster: newRoster, availableCharacters: newAvailable });

        if (newRoster.length === 3 && opponentRoster.length === 3) {
            get().startBattle();
        } else {
            set({ draftTurn: 'opponent' });
            setTimeout(() => get().botDraftPick(), 800); // Simulate bot thinking
        }
    },

    botDraftPick: () => {
        const { phase, availableCharacters, opponentRoster, playerRoster } = get();
        if (phase !== 'draft' || availableCharacters.length === 0 || opponentRoster.length >= 3) return;

        // Random pick
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        const char = availableCharacters[randomIndex];

        const newAvailable = [...availableCharacters];
        newAvailable.splice(randomIndex, 1);

        const newRoster = [...opponentRoster, { ...char, currentHp: char.maxHp, cooldowns: {}, statusEffects: [] }];

        set({ opponentRoster: newRoster, availableCharacters: newAvailable });

        if (newRoster.length === 3 && playerRoster.length === 3) {
            get().startBattle();
        } else {
            set({ draftTurn: 'player' });
        }
    },

    startBattle: () => {
        // Both players get 1 random energy at start of turn 1
        // Change: No free energy on turn 1 start, wait for end of turn 1 to generate energy based on alive characters.
        // Wait, normally they need energy on Turn 1 to do anything. Let's give them 1 per alive character on start.
        const pe = { ...initialEnergy };
        const oe = { ...initialEnergy };
        const types = ['ki', 'physical', 'special'] as const;

        for (let i = 0; i < 3; i++) {
            pe[types[Math.floor(Math.random() * 3)]]++;
            oe[types[Math.floor(Math.random() * 3)]]++;
        }

        set({
            phase: 'battle',
            playerActiveIndex: 0,
            opponentActiveIndex: 0,
            playerEnergy: pe,
            opponentEnergy: oe,
            turnNumber: 1,
            isPlayerTurn: true,
            combatLogs: [{
                id: Date.now(),
                turn: 1,
                playerName: 'System',
                characterName: '',
                action: 'Battle Start',
                details: 'The battle begins!',
                isOpponent: false
            }]
        });
    },

    setPlayerActiveIndex: (index: number) => {
        const state = get();
        if (state.phase === 'battle' && state.playerRoster[index] && state.playerRoster[index].currentHp > 0) {
            set({ playerActiveIndex: index });
        }
    },

    setOpponentActiveIndex: (index: number) => {
        const state = get();
        if (state.phase === 'battle' && state.opponentRoster[index] && state.opponentRoster[index].currentHp > 0) {
            set({ opponentActiveIndex: index });
        }
    },

    executePlayerAction: (actionType, actionId) => {
        const state = get();
        if (!state.isPlayerTurn || state.phase !== 'battle' || state.winner) return;

        const activeChar = state.playerRoster[state.playerActiveIndex];
        const oppChar = state.opponentRoster[state.opponentActiveIndex];

        let energyCost: ActionCost = {};
        let actionName = '';
        let cooldown = 0;

        // Find action
        if (actionType === 'technique') {
            const tech = activeChar.techniques.find(t => t.id === actionId);
            if (!tech) return;
            if (activeChar.cooldowns[tech.id] > 0) return; // Cooldown active

            energyCost = tech.cost;
            actionName = tech.name;
            cooldown = tech.cooldown;

        } else if (actionType === 'dodge') {
            if (activeChar.dodge.name !== actionId) return;
            if (activeChar.cooldowns['dodge'] > 0) return;

            energyCost = activeChar.dodge.cost;
            actionName = activeChar.dodge.name;
            cooldown = activeChar.dodge.cooldown;
            // Dodge effect handled below
        }

        // Check energy
        const pe = { ...state.playerEnergy };
        if ((energyCost.ki && pe.ki < energyCost.ki) ||
            (energyCost.physical && pe.physical < energyCost.physical) ||
            (energyCost.special && pe.special < energyCost.special)) {
            return; // Not enough energy
        }

        // Deduct energy
        if (energyCost.ki) pe.ki -= energyCost.ki;
        if (energyCost.physical) pe.physical -= energyCost.physical;
        if (energyCost.special) pe.special -= energyCost.special;

        // Apply cooldown
        const newPlayerRoster = [...state.playerRoster];
        newPlayerRoster[state.playerActiveIndex] = {
            ...activeChar,
            cooldowns: { ...activeChar.cooldowns, [actionId === activeChar.dodge.name ? 'dodge' : actionId]: cooldown }
        };

        const newOppRoster = [...state.opponentRoster];
        let newOppChar = { ...oppChar };

        let logDetail = `${activeChar.name} used ${actionName}.`;

        // Process damage
        if (actionType === 'technique') {
            const tech = activeChar.techniques.find(t => t.id === actionId)!;

            // Determine if technique hits ALL opponents (AoE) by name/description heuristics
            const isAoE = /\bAoE\b|\bALL\b/i.test(tech.name + ' ' + tech.description);

            const applyToTarget = (targetIndex: number) => {
                const target = { ...newOppRoster[targetIndex] };
                if (target.currentHp <= 0) return 0;

                let actualDamage = tech.damage * (activeChar.stats.attack / Math.max(1, target.stats.defense));
                if (tech.effect === 'pierce') actualDamage = tech.damage; // Ignore defense
                actualDamage = Math.floor(actualDamage);

                target.currentHp -= actualDamage;

                // Apply status effects
                if (tech.effect === 'weaken' || tech.effect === 'stun') {
                    target.statusEffects = [...target.statusEffects, { effect: tech.effect, duration: 1 }];
                }
                if (tech.effect === 'poison') {
                    // Poison: dot for next 3 turns
                    target.statusEffects = [...target.statusEffects, { effect: 'poison', duration: 3 }];
                }

                newOppRoster[targetIndex] = target;
                return actualDamage;
            };

            if (isAoE) {
                let total = 0;
                newOppRoster.forEach((_, idx) => {
                    const dmg = applyToTarget(idx);
                    if (dmg > 0) total += dmg;
                });
                logDetail += ` Deals ${total} total damage to all enemies!`;
            } else {
                const actualDamage = applyToTarget(state.opponentActiveIndex);
                logDetail += ` Deals ${actualDamage} damage!`;
            }
        } else {
            logDetail += ` Prepared to dodge!`;
            newPlayerRoster[state.playerActiveIndex].statusEffects.push({ effect: 'buff', duration: 1 }); // Simplish representation of dodge active
        }

        // Special: Deep Breath (recover 2 random energy immediately)
        if (actionType === 'technique' && actionId === 'deep_breath') {
            const typesArr = ['ki', 'physical', 'special'] as const;
            let added = 0;
            let totalNow = pe.ki + pe.physical + pe.special;
            while (added < 2 && totalNow < 10) {
                const chosen = typesArr[Math.floor(Math.random() * 3)];
                (pe as any)[chosen]++;
                added++;
                totalNow++;
            }
            logDetail += ` Recovers ${added} energy instantly.`;
        }

        if (newOppChar.currentHp < 0) newOppChar.currentHp = 0;
        newOppRoster[state.opponentActiveIndex] = newOppChar;

        const newLog: CombatLogEntry = {
            id: Date.now(),
            turn: state.turnNumber,
            playerName: 'Player',
            characterName: activeChar.name,
            action: actionName,
            details: logDetail,
            isOpponent: false
        };

        set({
            playerEnergy: pe,
            playerRoster: newPlayerRoster,
            opponentRoster: newOppRoster,
            combatLogs: [newLog, ...state.combatLogs],
        });

        // Check death
        if (newOppChar.currentHp <= 0) {
            // Find next alive
            const nextOppIndex = newOppRoster.findIndex(c => c.currentHp > 0);
            if (nextOppIndex === -1) {
                set({ winner: 'player', phase: 'gameOver' });
                get().saveMatchResult('win'); // Calculate points and save match result
                return;
            } else {
                set({ opponentActiveIndex: nextOppIndex });
                set((s) => ({
                    combatLogs: [{
                        id: Date.now() + 1, turn: s.turnNumber, playerName: 'System', characterName: '',
                        action: 'Fallen', details: `${newOppChar.name} was defeated! ${newOppRoster[nextOppIndex].name} enters the battle!`, isOpponent: true
                    }, ...s.combatLogs]
                }));
            }
        }

        get().endTurn();
    },

    passTurn: () => {
        const state = get();
        if (!state.isPlayerTurn || state.phase !== 'battle' || state.winner) return;

        const activeChar = state.playerRoster[state.playerActiveIndex];
        const newLog: CombatLogEntry = {
            id: Date.now(),
            turn: state.turnNumber,
            playerName: 'Player',
            characterName: activeChar.name,
            action: 'Passed Turn',
            details: `${activeChar.name} conserved energy and passed their turn.`,
            isOpponent: false
        };

        set({ combatLogs: [newLog, ...state.combatLogs] });
        get().endTurn();
    },

    executeOpponentTurn: () => {
        const state = get();
        if (state.winner || state.phase !== 'battle') return;

        const botChar = state.opponentRoster[state.opponentActiveIndex];
        let oe = { ...state.opponentEnergy };
        const newOppRoster = [...state.opponentRoster];
        const newPlayerRoster = [...state.playerRoster];
        let playerChar = { ...newPlayerRoster[state.playerActiveIndex] };

        // Use AI helper to decide action
        const difficulty = get().aiDifficulty || 'normal';
        const decision = selectAction(botChar as any, playerChar as any, oe as any, difficulty as any);

        let actionName = 'Passed';
        let logDetail = `${botChar.name} ended their turn.`;

        if (decision.type === 'technique' && decision.action) {
            const action = decision.action;
            // Deduct cost
            if (action.cost.ki) oe.ki -= action.cost.ki;
            if (action.cost.physical) oe.physical -= action.cost.physical;
            if (action.cost.special) oe.special -= action.cost.special;

            // Apply cooldown
            newOppRoster[state.opponentActiveIndex] = {
                ...botChar,
                cooldowns: { ...botChar.cooldowns, [action.id]: action.cooldown }
            };

            actionName = action.name;

            let actualDamage = action.damage * (botChar.stats.attack / playerChar.stats.defense);
            if (action.effect === 'pierce') actualDamage = action.damage;

            const playerIsDodging = playerChar.statusEffects.some(e => e.effect === 'buff');
            if (playerIsDodging && Math.random() < playerChar.dodge.successRate) {
                actualDamage = 0;
                logDetail = `${botChar.name} used ${actionName} but ${playerChar.name} dodged it!`;
            } else {
                actualDamage = Math.floor(actualDamage);
                playerChar.currentHp -= actualDamage;
                logDetail = `${botChar.name} used ${actionName}. Deals ${actualDamage} damage!`;
            }

        } else if (decision.type === 'dodge') {
            // Prepare dodge: set buff on opponent
            newOppRoster[state.opponentActiveIndex] = { ...botChar };
            newOppRoster[state.opponentActiveIndex].statusEffects = [...newOppRoster[state.opponentActiveIndex].statusEffects, { effect: 'buff', duration: 1 }];
            // Set dodge cooldown
            newOppRoster[state.opponentActiveIndex].cooldowns = { ...newOppRoster[state.opponentActiveIndex].cooldowns, ['dodge']: 1 };
            actionName = botChar.dodge.name || 'Dodge';
            logDetail = `${botChar.name} prepares to dodge.`;

        } else {
            // pass
            actionName = 'Passed';
            logDetail = `${botChar.name} ended their turn.`;
        }

        if (playerChar.currentHp < 0) playerChar.currentHp = 0;
        newPlayerRoster[state.playerActiveIndex] = playerChar;

        const newLog: CombatLogEntry = {
            id: Date.now(),
            turn: state.turnNumber,
            playerName: 'Opponent',
            characterName: botChar.name,
            action: actionName,
            details: logDetail,
            isOpponent: true
        };

        set({
            opponentEnergy: oe,
            opponentRoster: newOppRoster,
            playerRoster: newPlayerRoster,
            combatLogs: [newLog, ...state.combatLogs],
        });

        // Check death
        if (playerChar.currentHp <= 0) {
            const nextPlayerIndex = newPlayerRoster.findIndex(c => c.currentHp > 0);
            if (nextPlayerIndex === -1) {
                set({ winner: 'opponent', phase: 'gameOver' });
                get().saveMatchResult('loss'); // Save match result for loss
                return;
            } else {
                set({ playerActiveIndex: nextPlayerIndex });
                set((s) => ({
                    combatLogs: [{
                        id: Date.now() + 1, turn: s.turnNumber, playerName: 'System', characterName: '',
                        action: 'Fallen', details: `${playerChar.name} was defeated! ${newPlayerRoster[nextPlayerIndex].name} enters the battle!`, isOpponent: false
                    }, ...s.combatLogs]
                }));
            }
        }

        get().endTurn();
    },

    endTurn: () => {
        const s = get();
        if (s.winner) return;

        if (!s.isPlayerTurn) {
            // End of round (both players took a turn)
            // Decrease cooldowns & effects, grant energy
            const pRoster = [...s.playerRoster];
            const oRoster = [...s.opponentRoster];

            // Reduce cooldowns for active characters
            const pChar = pRoster[s.playerActiveIndex];
            const oChar = oRoster[s.opponentActiveIndex];

            Object.keys(pChar.cooldowns).forEach(k => { if (pChar.cooldowns[k] > 0) pChar.cooldowns[k]--; });
            Object.keys(oChar.cooldowns).forEach(k => { if (oChar.cooldowns[k] > 0) oChar.cooldowns[k]--; });

            // Clear dodge effects (buffs used to simulate dodge)
            pChar.statusEffects = pChar.statusEffects.filter(e => e.effect !== 'buff');
            oChar.statusEffects = oChar.statusEffects.filter(e => e.effect !== 'buff');

            // Grant random energy per alive character
            const pAlive = pRoster.filter(c => c.currentHp > 0).length;
            const oAlive = oRoster.filter(c => c.currentHp > 0).length;
            const types = ['ki', 'physical', 'special'] as const;

            const pe = { ...s.playerEnergy };
            const oe = { ...s.opponentEnergy };

            let pTotal = pe.ki + pe.physical + pe.special;
            let oTotal = oe.ki + oe.physical + oe.special;

            for (let i = 0; i < pAlive; i++) {
                if (pTotal >= 10) break;
                pe[types[Math.floor(Math.random() * 3)]]++;
                pTotal++;
            }

            for (let i = 0; i < oAlive; i++) {
                if (oTotal >= 10) break;
                oe[types[Math.floor(Math.random() * 3)]]++;
                oTotal++;
            }

            // Namekian Passive Recovery: Piccolo recovers +1 random energy per turn
            const pPiccolo = pRoster.find(c => c.id === 'piccolo' && c.currentHp > 0);
            const oPiccolo = oRoster.find(c => c.id === 'piccolo' && c.currentHp > 0);
            
            if (pPiccolo && pTotal < 10) {
                pe[types[Math.floor(Math.random() * 3)]]++;
                pTotal++;
            }
            
            if (oPiccolo && oTotal < 10) {
                oe[types[Math.floor(Math.random() * 3)]]++;
                oTotal++;
            }

            // Apply DOT/status effects (poison, weaken/stun durations) and create logs
            const logs: CombatLogEntry[] = [];

            const applyStatusTick = (roster: typeof pRoster, isOpponent: boolean) => {
                roster.forEach(ch => {
                    if (ch.currentHp <= 0) return;

                    // Process poison
                    const poisonEffects = ch.statusEffects.filter(e => e.effect === 'poison');
                    if (poisonEffects.length > 0) {
                        // Poison damage scales lightly with maxHp
                        const dot = Math.max(8, Math.floor(ch.maxHp * 0.03));
                        ch.currentHp -= dot;
                        logs.push({ id: Date.now() + Math.floor(Math.random() * 1000), turn: s.turnNumber, playerName: isOpponent ? 'Opponent' : 'Player', characterName: ch.name, action: 'Poison Tick', details: `${ch.name} takes ${dot} poison damage.`, isOpponent });
                    }

                    // Decrease durations and remove expired
                    ch.statusEffects = ch.statusEffects.map(se => ({ ...se, duration: se.duration - 1 })).filter(se => se.duration > 0);
                });
            };

            applyStatusTick(pRoster, false);
            applyStatusTick(oRoster, true);

            // Merge any generated logs to combat logs (most recent first)
            if (logs.length) {
                set(st => ({ combatLogs: [...logs, ...st.combatLogs] }));
            }

            // Clamp HP floor and check for deaths caused by DOT
            // (HP clamped and death checks handled below)

            const playerAliveAfter = pRoster.filter(c => c.currentHp > 0).length;
            const oppAliveAfter = oRoster.filter(c => c.currentHp > 0).length;

            // Check for victory by DOTs
            if (oppAliveAfter === 0) {
                set({ playerRoster: pRoster, opponentRoster: oRoster, playerEnergy: pe, opponentEnergy: oe, winner: 'player', phase: 'gameOver' });
                get().saveMatchResult('win');
                return;
            }

            if (playerAliveAfter === 0) {
                set({ playerRoster: pRoster, opponentRoster: oRoster, playerEnergy: pe, opponentEnergy: oe, winner: 'opponent', phase: 'gameOver' });
                get().saveMatchResult('loss');
                return;
            }

            set({
                playerRoster: pRoster,
                opponentRoster: oRoster,
                playerEnergy: pe,
                opponentEnergy: oe,
                turnNumber: s.turnNumber + 1,
                isPlayerTurn: true
            });
        } else {
            // End of player turn, now bot turn
            set({ isPlayerTurn: false });
            setTimeout(() => get().executeOpponentTurn(), 1000);
        }
    }
}));
