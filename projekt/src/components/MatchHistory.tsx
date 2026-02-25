import { useState, useEffect } from 'react';
import { useGameState } from '../game/useGameState';
import type { MatchResult } from '../types';

export function MatchHistory() {
    const [matches, setMatches] = useState<MatchResult[]>([]);
    const playerName = useGameState(s => s.playerName);
    const setPhase = useGameState(s => s.setPhase);
    const matchHistory = useGameState(s => s.matchHistory);

    useEffect(() => {
        const sorted = [...matchHistory].sort((a, b) => b.date - a.date);
        setMatches(sorted);
    }, [matchHistory]);

    const exportMatches = () => {
        const data = JSON.stringify(matchHistory, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dba_matches_${playerName || 'player'}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const importMatches = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            const parsed: MatchResult[] = JSON.parse(text);
            const existing = JSON.parse(localStorage.getItem(`dba_matches_${playerName}`) || '[]');
            const merged = [...existing, ...parsed];
            localStorage.setItem(`dba_matches_${playerName}`, JSON.stringify(merged));
            setMatches([...merged].sort((a, b) => b.date - a.date));
            alert('✅ Matches imported successfully!');
        } catch (err) {
            alert('❌ Failed to import matches');
        }
    };

    const formatDate = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const stats = {
        total: matches.length,
        wins: matches.filter(m => m.result === 'win').length,
        losses: matches.filter(m => m.result === 'loss').length,
        totalPoints: matches.reduce((sum, m) => sum + m.pointsEarned, 0)
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '3.5rem',
                    margin: '0 0 0.5rem 0',
                    background: 'var(--gradient-secondary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                }}>
                    📊 MATCH HISTORY 📊
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
                    {playerName}'s battle record
                </p>
            </div>

            {/* Stats Cards */}
            {matches.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, transparent 100%)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                            {stats.total}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Matches</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(81, 207, 102, 0.2) 0%, transparent 100%)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-success)', marginBottom: '0.5rem' }}>
                            {stats.wins}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Victories</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, transparent 100%)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-danger)', marginBottom: '0.5rem' }}>
                            {stats.losses}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Defeats</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 217, 61, 0.2) 0%, transparent 100%)' }}>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--accent-warning)', marginBottom: '0.5rem' }}>
                            {stats.totalPoints.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Total Points</div>
                    </div>
                </div>
            )}

            {/* Import/Export Buttons */}
            {matches.length > 0 && (
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    flexWrap: 'wrap'
                }}>
                    <button
                        onClick={exportMatches}
                        className="btn btn-primary"
                        style={{ padding: '0.75rem 1.5rem', flex: 1, minWidth: '150px' }}
                    >
                        ⬇️ Export Matches
                    </button>
                    <label
                        className="btn btn-secondary"
                        style={{
                            padding: '0.75rem 1.5rem',
                            flex: 1,
                            minWidth: '150px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        ⬆️ Import Matches
                        <input
                            type="file"
                            accept="application/json"
                            onChange={importMatches}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            )}

            {/* Match List */}
            {matches.length === 0 ? (
                <div className="glass-panel" style={{
                    padding: '3rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem'
                }}>
                    🎮 No matches yet. Complete your first battle!
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {matches.map((match, idx) => (
                        <div
                            key={match.id}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: match.result === 'win'
                                    ? '2px solid var(--accent-success)'
                                    : '2px solid var(--accent-danger)',
                                background: match.result === 'win'
                                    ? 'linear-gradient(135deg, rgba(81, 207, 102, 0.1) 0%, transparent 100%)'
                                    : 'linear-gradient(135deg, rgba(255, 107, 107, 0.1) 0%, transparent 100%)'
                            }}
                        >
                            {/* Match Header */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '1rem',
                                paddingBottom: '1rem',
                                borderBottom: '1px solid var(--glass-border)'
                            }}>
                                <div style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-muted)'
                                }}>
                                    #{matches.length - idx}
                                </div>
                                <div
                                    style={{
                                        padding: '0.4rem 1rem',
                                        borderRadius: '6px',
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold',
                                        background: match.result === 'win' ? 'var(--accent-success)' : 'var(--accent-danger)',
                                        color: 'white'
                                    }}
                                >
                                    {match.result === 'win' ? '✅ VICTORY' : '❌ DEFEAT'}
                                </div>
                            </div>

                            {/* Match Details */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                        {formatDate(match.date)}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Points:</span>
                                    <span style={{ color: 'var(--accent-warning)', fontWeight: 'bold' }}>
                                        +{match.pointsEarned}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Turns:</span>
                                    <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                                        {match.turns}
                                    </span>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>HP Left:</span>
                                    <span style={{ color: 'var(--accent-success)', fontWeight: '500' }}>
                                        {match.playerHpRemaining} ♥
                                    </span>
                                </div>

                                <div style={{
                                    marginTop: '0.75rem',
                                    paddingTop: '0.75rem',
                                    borderTop: '1px solid var(--glass-border)',
                                    fontSize: '0.85rem'
                                }}>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                        👤 Your Team:
                                    </div>
                                    <div style={{ color: 'var(--text-primary)' }}>
                                        {match.playerTeam.join(', ')}
                                    </div>
                                </div>

                                <div style={{ fontSize: '0.85rem' }}>
                                    <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                        🤖 Opponent:
                                    </div>
                                    <div style={{ color: 'var(--text-primary)' }}>
                                        {match.opponentTeam.join(', ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Back Button */}
            <button
                onClick={() => setPhase('menu')}
                className="btn btn-primary"
                style={{
                    width: '100%',
                    marginTop: '2rem',
                    padding: '1rem'
                }}
            >
                ← BACK TO MENU
            </button>
        </div>
    );
}
