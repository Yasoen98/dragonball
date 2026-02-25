import { useGameState } from './game/useGameState';
import { Matchmaking } from './components/Matchmaking';
import { DraftScreen } from './components/DraftScreen';
import { BattleArena } from './components/BattleArena';
import { GameOverModal } from './components/GameOverModal';
import { LoginScreen } from './components/LoginScreen';
import { Leaderboard } from './components/Leaderboard';
import { MatchHistory } from './components/MatchHistory';
import './App.css';

function App() {
  const { phase, startMatchmaking, playerName, playerRank, playerScore, logout, aiDifficulty, setAIDifficulty } = useGameState();
  const setPhase = useGameState(s => s.setPhase);

  return (
    <div className="app-container">
      {phase === 'login' && <LoginScreen />}

      {phase === 'menu' && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
          <div className="glass-panel" style={{ maxWidth: '700px', width: '100%', padding: '3rem' }}>
            {/* Header with Sign Out */}
            <div style={{ position: 'relative', marginBottom: '3rem' }}>
              <button
                onClick={logout}
                className="btn btn-danger"
                style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                Sign Out
              </button>
            </div>

            {/* Player Info Card */}
            <div style={{
              background: 'var(--gradient-primary)',
              backgroundAttachment: 'fixed',
              padding: '2rem',
              borderRadius: '16px',
              marginBottom: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30%, -30%)'
              }} />
              <h2 style={{ margin: '0 0 1rem 0', fontSize: '2.5rem', color: '#fff', position: 'relative', zIndex: 1 }}>
                {playerName}
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.3rem' }}>Rank</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{playerRank}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.3rem' }}>Power Level</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>{playerScore.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: '3.5rem',
              margin: '0 0 0.5rem 0',
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 900,
              letterSpacing: '-2px'
            }}>
              DRAGON BALL
            </h1>
            <h1 style={{
              fontSize: '3.5rem',
              margin: '0 0 1.5rem 0',
              background: 'var(--gradient-secondary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 900,
              letterSpacing: '-2px'
            }}>
              ARENA
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: '1.6'
            }}>
              Master the art of turn-based battle. Draft your team, manage your Energy, and become the ultimate champion!
            </p>

            {/* Difficulty Selector */}
            <div style={{
              marginBottom: '2.5rem',
              padding: '1.5rem',
              background: 'var(--glass-light)',
              border: '1px solid var(--glass-border)',
              borderRadius: '12px'
            }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '1rem' }}>
                ⚔️ SELECT DIFFICULTY
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {(['easy', 'normal', 'hard'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setAIDifficulty(d)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '10px',
                      border: aiDifficulty === d ? '2px solid var(--accent-primary)' : '2px solid transparent',
                      background: aiDifficulty === d ? 'var(--gradient-primary)' : 'var(--glass-light)',
                      color: aiDifficulty === d ? '#fff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: aiDifficulty === d ? 'bold' : '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      boxShadow: aiDifficulty === d ? '0 4px 15px rgba(102, 126, 234, 0.4)' : 'none',
                      transform: aiDifficulty === d ? 'translateY(-2px)' : 'translateY(0)'
                    }}
                  >
                    {d === 'easy' && '🟢'} {d === 'normal' && '🟡'} {d === 'hard' && '🔴'} {d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button
                className="btn btn-primary"
                style={{ fontSize: '1.2rem', padding: '1.25rem', width: '100%' }}
                onClick={startMatchmaking}
              >
                🎮 FIND MATCH
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.95rem 1.5rem' }}
                  onClick={() => setPhase('leaderboard')}
                >
                  🏆 Leaderboard
                </button>
                <button
                  className="btn btn-secondary"
                  style={{ padding: '0.95rem 1.5rem' }}
                  onClick={() => setPhase('matchHistory')}
                >
                  📊 History
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 'matchmaking' && <Matchmaking />}
      {phase === 'draft' && <DraftScreen />}
      {phase === 'battle' && <BattleArena />}
      {phase === 'gameOver' && <GameOverModal />}
      {phase === 'leaderboard' && <Leaderboard />}
      {phase === 'matchHistory' && <MatchHistory />}
    </div>
  );
}

export default App;
