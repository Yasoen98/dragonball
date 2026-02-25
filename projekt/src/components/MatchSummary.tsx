import { useEffect } from 'react';
import { useGameState } from '../game/useGameState';
import type { MatchResult } from '../types';

export function MatchSummary() {
  const matchHistory = useGameState(s => s.matchHistory);
  const setPhase = useGameState(s => s.setPhase);

  const lastMatch: MatchResult | null = matchHistory.length ? matchHistory[matchHistory.length - 1] : null;

  if (!lastMatch) return null;

  const share = async () => {
    const text = `I ${lastMatch.result === 'win' ? 'won 🏆' : 'lost 💔'} a Dragon Ball Arena match! (+${lastMatch.pointsEarned} pts) #DragonBallArena`;
    if (navigator.share) {
      try { await navigator.share({ title: 'Match result', text }); return; } catch(e) { /* ignore */ }
    }
    try {
      await navigator.clipboard.writeText(text);
      alert('✅ Result copied to clipboard!');
    } catch (e) {
      alert(text);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPhase('menu');
      if (e.key === 'Enter') setPhase('draft');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setPhase]);

  // Breakdown of points
  const weights = {
    base: localStorage.getItem('dba_ab_variant') === 'B' ? 62 : 50,
    perSurvivor: localStorage.getItem('dba_ab_variant') === 'B' ? 19 : 15,
    hpMax: 20,
    turnBonus: localStorage.getItem('dba_ab_variant') === 'B' ? 12 : 15,
  };

  const survivors = lastMatch.playerTeam.filter(id => !!id).length;
  const survivorsBonus = lastMatch.result === 'win' ? survivors * (weights.perSurvivor as number) : 0;
  const turnBonus = lastMatch.result === 'win' 
    ? (lastMatch.turns <= 10 
      ? (weights.turnBonus as number)
      : Math.max(0, (weights.turnBonus as number) - Math.floor((lastMatch.turns - 10) / 2)))
    : 0;
  const hpBonus = lastMatch.result === 'win' 
    ? Math.floor((lastMatch.playerHpRemaining / Math.max(1, survivors)) / (lastMatch.playerTeam.length ? lastMatch.playerTeam.length : 1) * (weights.hpMax as number)) 
    : 0;

  const isVictory = lastMatch.result === 'win';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      padding: '2rem'
    }} role="dialog" aria-modal="true" aria-label="Match Summary">
      <div style={{
        background: isVictory 
          ? 'linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, rgba(51, 65, 85, 0.6) 100%)'
          : 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, rgba(51, 65, 85, 0.6) 100%)',
        border: `2px solid ${isVictory ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
        borderRadius: '20px',
        padding: '2.5rem',
        maxWidth: '600px',
        width: '100%',
        color: 'var(--text-primary)',
        boxShadow: `0 20px 60px ${isVictory ? 'rgba(81, 207, 102, 0.3)' : 'rgba(255, 107, 107, 0.3)'}`
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            animation: 'float 3s ease-in-out infinite'
          }}>
            {isVictory ? '🏆' : '💔'}
          </div>
          <h1 style={{
            fontSize: '3rem',
            margin: '0 0 0.5rem 0',
            background: isVictory ? 'var(--gradient-accent)' : 'var(--gradient-secondary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900
          }}>
            {isVictory ? 'VICTORY!' : 'DEFEAT'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: '0.5rem 0 0 0' }}>
            {new Date(lastMatch.date).toLocaleDateString()} - {new Date(lastMatch.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        {/* Main Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--glass-light)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.5rem' }}>⭐ POINTS EARNED</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-warning)' }}>
              +{lastMatch.pointsEarned}
            </div>
          </div>

          <div style={{
            background: 'var(--glass-light)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.5rem' }}>⏱️ TURNS</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
              {lastMatch.turns}
            </div>
          </div>

          <div style={{
            background: 'var(--glass-light)',
            border: '1px solid var(--glass-border)',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            gridColumn: '1 / -1'
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.5rem' }}>💉 HP REMAINING</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-success)' }}>
              {lastMatch.playerHpRemaining} ♥ / {lastMatch.playerTeam.length ? lastMatch.playerTeam.length * 100 : '?'} HP
            </div>
          </div>
        </div>

        {/* Points Breakdown */}
        <div style={{
          background: 'rgba(102, 126, 234, 0.1)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--accent-primary)', fontSize: '1rem', fontWeight: '600' }}>
            📊 POINTS BREAKDOWN
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.75rem',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Base:</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>+{weights.base}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Survivors:</span>
              <span style={{ color: 'var(--accent-success)', fontWeight: '600' }}>+{survivorsBonus}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>HP Bonus:</span>
              <span style={{ color: 'var(--accent-success)', fontWeight: '600' }}>+{hpBonus}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Turn Speed:</span>
              <span style={{ color: 'var(--accent-success)', fontWeight: '600' }}>+{turnBonus}</span>
            </div>
          </div>
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.95rem',
            fontWeight: 'bold'
          }}>
            <span>Total:</span>
            <span style={{ color: 'var(--accent-warning)' }}>+{lastMatch.pointsEarned}</span>
          </div>
        </div>

        {/* Teams Info */}
        <div style={{
          background: 'var(--glass-light)',
          border: '1px solid var(--glass-border)',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '2rem',
          fontSize: '0.9rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.3rem' }}>👤 Your Team:</div>
            <div style={{ color: 'var(--text-primary)' }}>{lastMatch.playerTeam.join(', ')}</div>
          </div>
          <div>
            <div style={{ color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.3rem' }}>🤖 Opponent:</div>
            <div style={{ color: 'var(--text-primary)' }}>{lastMatch.opponentTeam.join(', ')}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          <button
            onClick={() => setPhase('draft')}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', fontWeight: 'bold' }}
          >
            🔄 REMATCH
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <button
              onClick={() => setPhase('menu')}
              className="btn btn-secondary"
              style={{ padding: '0.85rem' }}
            >
              ← Back to Menu
            </button>
            <button
              onClick={share}
              className="btn btn-secondary"
              style={{ padding: '0.85rem' }}
            >
              📤 Share
            </button>
          </div>
        </div>

        {/* Keyboard Hint */}
        <div style={{
          marginTop: '1.5rem',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          💡 Press <kbd style={{ background: 'var(--glass-light)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Enter</kbd> for rematch or <kbd style={{ background: 'var(--glass-light)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>Esc</kbd> for menu
        </div>
      </div>
    </div>
  );
}
