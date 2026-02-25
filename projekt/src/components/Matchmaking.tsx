import React, { useEffect } from 'react';
import { useGameState } from '../game/useGameState';
import { Loader2 } from 'lucide-react';

export const Matchmaking: React.FC = () => {
    const { matchmakingTimer, tickMatchmaking, phase } = useGameState();

    useEffect(() => {
        let interval: number;
        if (phase === 'matchmaking') {
            interval = setInterval(() => {
                tickMatchmaking();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [phase, tickMatchmaking]);

    return (
        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', margin: '10vh auto', textAlign: 'center' }}>
            <h2 style={{ color: 'var(--accent)', fontSize: '2rem', marginBottom: '1rem' }}>Searching for Opponent</h2>
            <Loader2 className="animate-spin" size={64} color="var(--ki-color)" style={{ margin: '0 auto 2rem' }} />
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                Estimated time: <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{matchmakingTimer}s</span>
            </p>
            {matchmakingTimer <= 10 && (
                <p style={{ color: 'var(--physical-color)', marginTop: '1rem', fontSize: '0.9rem' }}>
                    Taking too long... Preparing Bot Match.
                </p>
            )}
        </div>
    );
};
