import React from 'react';
import { useGameState } from '../game/useGameState';

export const GameOverSummary: React.FC = () => {
    const { winner, playerRoster, opponentRoster, turnNumber, setPhase } = useGameState();

    const playerSurvivors = playerRoster.filter(c => c.currentHp > 0).length;
    const opponentSurvivors = opponentRoster.filter(c => c.currentHp > 0).length;

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div className="glass-panel" style={{ padding: '3rem', maxWidth: '720px', width: '100%' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{winner === 'player' ? 'Victory!' : 'Defeat'}</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Turns: {turnNumber}</p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Your survivors: {playerSurvivors} • Opponent survivors: {opponentSurvivors}</p>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                    <button className="btn btn-primary" onClick={() => setPhase('menu')}>Return to Menu</button>
                    <button className="btn btn-secondary" onClick={() => setPhase('matchHistory')}>View Match History</button>
                </div>
            </div>
        </div>
    );
};

export default GameOverSummary;
