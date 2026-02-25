import React from 'react';
import { useGameState } from '../game/useGameState';

export const GameOverModal: React.FC = () => {
    const { winner, playerRoster, opponentRoster, turnNumber, combatLogs, setPhase } = useGameState();

    const totalDamageDealt = combatLogs.reduce((acc, l) => {
        const m = l.details.match(/Deals (\d+)/);
        if (m) acc += Number(m[1]);
        return acc;
    }, 0);

    const playerSurvivors = playerRoster.filter(c => c.currentHp > 0).length;
    const opponentSurvivors = opponentRoster.filter(c => c.currentHp > 0).length;

    return (
        <div style={overlayStyle} onClick={() => setPhase('menu')}>
            <div style={modalStyle} onClick={e => e.stopPropagation()}>
                <div style={headerStyle(winner === 'player')}>{winner === 'player' ? 'VICTORY' : 'DEFEAT'}</div>
                <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>Turns</div>
                        <div style={{ fontWeight: 700 }}>{turnNumber}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>Your survivors</div>
                        <div style={{ fontWeight: 700 }}>{playerSurvivors}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>Opponent survivors</div>
                        <div style={{ fontWeight: 700 }}>{opponentSurvivors}</div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ color: 'var(--text-secondary)' }}>Total damage shown</div>
                        <div style={{ fontWeight: 700 }}>{totalDamageDealt}</div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <button className="btn btn-secondary" onClick={() => setPhase('matchHistory')}>Match History</button>
                        <button className="btn btn-primary" onClick={() => { setPhase('menu'); }}>Return</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999
};

const modalStyle: React.CSSProperties = {
    width: 'min(720px, 92%)', borderRadius: 14, background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))', boxShadow: '0 20px 60px rgba(0,0,0,0.6)', overflow: 'hidden', animation: 'gameover-pop 420ms cubic-bezier(.2,.9,.3,1)'
};

const headerStyle = (isWin: boolean): React.CSSProperties => ({
    padding: '1.25rem 1rem', textAlign: 'center', fontSize: '1.75rem', fontWeight: 900, background: isWin ? 'linear-gradient(90deg,#22c55e,#10b981)' : 'linear-gradient(90deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
});

export default GameOverModal;
