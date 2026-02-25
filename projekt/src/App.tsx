import React from 'react';
import { useGameState } from './game/useGameState';
import { Matchmaking } from './components/Matchmaking';
import { DraftScreen } from './components/DraftScreen';
import { BattleArena } from './components/BattleArena';
import { LoginScreen } from './components/LoginScreen';
import './index.css';

function App() {
  const { phase, startMatchmaking, playerName, playerRank, playerScore, logout } = useGameState();

  return (
    <div className="app-container">
      {phase === 'login' && <LoginScreen />}

      {phase === 'menu' && (
        <div className="glass-panel" style={{ padding: '4rem', maxWidth: '600px', margin: '10vh auto', textAlign: 'center' }}>

          <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center', position: 'relative' }}>
            <button
              onClick={logout}
              style={{ position: 'absolute', top: -20, right: -20, background: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--physical-color)', color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              Sign Out
            </button>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '1rem 2rem', borderRadius: '16px', display: 'inline-block' }}>
              <h2 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.5rem' }}>{playerName}</h2>
              <div style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Rank: {playerRank}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Power Level: {playerScore}</div>
            </div>
          </div>

          <h1 style={{ fontSize: '3rem', color: 'var(--ki-color)', marginBottom: '1rem', textShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }}>
            DRAGON BALL ARENA
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            A turn-based strategy battle. Draft your team, manage your Energy, and conquer the opponent!
          </p>
          <button className="btn" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }} onClick={startMatchmaking}>
            Find Match
          </button>
        </div>
      )}

      {phase === 'matchmaking' && <Matchmaking />}

      {phase === 'draft' && <DraftScreen />}

      {phase === 'battle' && <BattleArena />}

      {phase === 'gameOver' && <BattleArena />}
    </div>
  );
}

export default App;
