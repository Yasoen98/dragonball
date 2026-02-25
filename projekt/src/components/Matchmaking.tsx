import { useEffect } from 'react';
import { useGameState } from '../game/useGameState';

export const Matchmaking = () => {
    const { matchmakingTimer, tickMatchmaking, phase } = useGameState();

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (phase === 'matchmaking') {
            interval = setInterval(() => {
                tickMatchmaking();
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [phase, tickMatchmaking]);

    const isSearching = matchmakingTimer <= 10;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{
                padding: '4rem',
                maxWidth: '500px',
                width: '100%',
                textAlign: 'center'
            }}>
                {/* Animated Icon */}
                <div style={{
                    fontSize: '5rem',
                    marginBottom: '2rem',
                    animation: 'pulse-glow 2s ease-in-out infinite'
                }}>
                    🔥
                </div>

                {/* Title */}
                <h2 style={{
                    fontSize: '2rem',
                    margin: '0 0 1.5rem 0',
                    background: 'var(--gradient-accent)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                }}>
                    SEARCHING FOR OPPONENT
                </h2>

                {/* Timer */}
                <div style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bold',
                    color: isSearching ? 'var(--accent-danger)' : 'var(--accent-primary)',
                    marginBottom: '2rem',
                    fontFamily: 'monospace',
                    transition: 'all 0.3s ease',
                    animation: isSearching ? 'pulse-glow 1s ease-in-out infinite' : 'none'
                }}>
                    {matchmakingTimer}s
                </div>

                {/* Status Text */}
                <p style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1.5rem',
                    lineHeight: '1.6'
                }}>
                    {isSearching
                        ? '⏳ Taking longer than expected...'
                        : '🎮 Finding your perfect match...'}
                </p>

                {/* Loading Dots */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem'
                }}>
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                background: 'var(--gradient-primary)',
                                animation: `float 1.5s ease-in-out ${i * 0.2}s infinite`,
                                boxShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                            }}
                        />
                    ))}
                </div>

                {/* Bot Fight Notice */}
                {isSearching && (
                    <div style={{
                        padding: '1rem',
                        background: 'var(--glass-light)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginTop: '2rem'
                    }}>
                        🤖 Don't worry! If no opponent found, you'll battle our AI champion instead!
                    </div>
                )}
            </div>
        </div>
    );
};
