import { useState, useEffect } from 'react';
import { useGameState } from '../game/useGameState';

interface LeaderboardEntry {
    rank: number;
    username: string;
    score: number;
    rank_tier: string;
}

export function Leaderboard() {
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const pageSize = 6;
    const setPhase = useGameState(s => s.setPhase);

    useEffect(() => {
        const accs = JSON.parse(localStorage.getItem('dba_accounts') || '{}');
        const leaderboard: LeaderboardEntry[] = Object.entries(accs)
            .map(([username, data]: [string, any]) => ({
                username,
                score: data.score || 0,
                rank_tier: data.rank || 'Saibaman'
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 100)
            .map((entry, idx) => ({
                rank: idx + 1,
                username: entry.username,
                score: entry.score,
                rank_tier: entry.rank_tier
            }));

        setEntries(leaderboard);
    }, []);

    const filtered = entries.filter(e => e.username.toLowerCase().includes(query.toLowerCase()));
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

    const getMedalEmoji = (rank: number) => {
        switch (rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return `#${rank}`;
        }
    };

    const getRankColor = (tier: string) => {
        const colors: { [key: string]: string } = {
            'Saiyan': '#ffd700',
            'Super Saiyan': '#ffeb3b',
            'Super Saiyan 2': '#ffdc00',
            'Super Saiyan 3': '#ffc107',
            'Super Saiyan Blue': '#2196F3',
            'Ultra Instinct': '#e91e63',
            'Godly': '#9c27b0',
        };
        return colors[tier] || '#a3e635';
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
                    🏆 LEADERBOARD 🏆
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                    Top fighters across the Dragon Ball Arena
                </p>
            </div>

            {/* Search and Info */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
                    <input
                        aria-label="Search players"
                        placeholder="🔍 Search fighter..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                        style={{
                            width: '100%',
                            padding: '0.9rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--glass-border)',
                            background: 'var(--glass-light)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem',
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--accent-primary)';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'var(--glass-border)';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                </div>
                <div style={{
                    padding: '0.9rem 1.5rem',
                    background: 'var(--glass-light)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    color: 'var(--text-secondary)',
                    fontWeight: '600',
                    fontSize: '0.95rem'
                }}>
                    Page {page}/{totalPages}
                </div>
            </div>

            {/* Leaderboard Table */}
            {entries.length === 0 ? (
                <div className="glass-panel" style={{
                    padding: '3rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontSize: '1.1rem'
                }}>
                    No fighters yet. Be the first to take the crown!
                </div>
            ) : (
                <div className="glass-panel" style={{ overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                            <thead>
                                <tr style={{
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '0.95rem'
                                }}>
                                    <th style={{ padding: '1.25rem', textAlign: 'center', minWidth: '60px' }}>Rank</th>
                                    <th style={{ padding: '1.25rem', textAlign: 'left', minWidth: '150px' }}>Fighter</th>
                                    <th style={{ padding: '1.25rem', textAlign: 'center', minWidth: '120px' }}>Score</th>
                                    <th style={{ padding: '1.25rem', textAlign: 'center', minWidth: '140px' }}>Tier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageItems.map((entry) => (
                                    <tr
                                        key={entry.username}
                                        style={{
                                            borderBottom: '1px solid var(--glass-border)',
                                            background: entry.rank <= 3 ? `linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%)` : 'transparent',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            (e.currentTarget as HTMLElement).style.background = 'rgba(102, 126, 234, 0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget as HTMLElement).style.background = entry.rank <= 3 ? `linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%)` : 'transparent';
                                        }}
                                    >
                                        <td style={{
                                            padding: '1.25rem',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: entry.rank <= 3 ? '1.25rem' : '1rem',
                                            color: getMedalEmoji(entry.rank).includes('�') ? 'var(--accent-warning)' : 'var(--text-secondary)'
                                        }}>
                                            {getMedalEmoji(entry.rank)}
                                        </td>
                                        <td style={{ padding: '1.25rem', textAlign: 'left' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '40px',
                                                    height: '40px',
                                                    borderRadius: '50%',
                                                    background: 'var(--gradient-primary)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#fff',
                                                    fontWeight: '700',
                                                    fontSize: '0.9rem'
                                                }}>
                                                    {entry.username.slice(0, 2).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: '600' }}>{entry.username}</span>
                                            </div>
                                        </td>
                                        <td style={{
                                            padding: '1.25rem',
                                            textAlign: 'center',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            color: 'var(--accent-warning)'
                                        }}>
                                            {entry.score.toLocaleString()}
                                        </td>
                                        <td style={{
                                            padding: '1.25rem',
                                            textAlign: 'center',
                                            color: getRankColor(entry.rank_tier),
                                            fontWeight: 'bold'
                                        }}>
                                            ⭐ {entry.rank_tier}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination and Back Button */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '2rem',
                justifyContent: 'space-between',
                flexWrap: 'wrap'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="btn btn-secondary"
                        style={{ padding: '0.75rem 1.5rem', opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                    >
                        ← Prev
                    </button>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="btn btn-secondary"
                        style={{ padding: '0.75rem 1.5rem', opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                    >
                        Next →
                    </button>
                </div>
                <button
                    onClick={() => setPhase('menu')}
                    className="btn btn-primary"
                    style={{ padding: '0.75rem 1.5rem' }}
                >
                    ← Back to Menu
                </button>
            </div>
        </div>
    );
}
