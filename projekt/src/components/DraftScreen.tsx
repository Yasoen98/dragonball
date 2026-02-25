import React from 'react';
import { useGameState } from '../game/useGameState';

export const DraftScreen: React.FC = () => {
    const { availableCharacters, draftCharacter, playerRoster, opponentRoster, draftTurn } = useGameState();

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '800px', margin: '5vh auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--accent)' }}>Draft Phase</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                <div style={{ flex: 1, textAlign: 'left' }}>
                    <h3 style={{ color: draftTurn === 'player' ? 'var(--ki-color)' : 'var(--text-muted)' }}>
                        Your Team ({playerRoster.length}/3)
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        {playerRoster.map(c => (
                            <div key={c.id} style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                backgroundColor: c.imageColor, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontWeight: 'bold', fontSize: '10px', textAlign: 'center',
                                backgroundImage: c.portraitUrl ? `url(${c.portraitUrl})` : 'none',
                                backgroundSize: 'cover', backgroundPosition: 'center',
                                border: '2px solid rgba(255,255,255,0.2)'
                            }}>
                                {!c.portraitUrl && c.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1, textAlign: 'right' }}>
                    <h3 style={{ color: draftTurn === 'opponent' ? 'var(--physical-color)' : 'var(--text-muted)' }}>
                        Opponent ({opponentRoster.length}/3)
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                        {opponentRoster.map(c => (
                            <div key={c.id} style={{
                                width: '60px', height: '60px', borderRadius: '50%', border: '2px solid red',
                                backgroundColor: c.imageColor, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', fontWeight: 'bold', fontSize: '10px', textAlign: 'center',
                                backgroundImage: c.portraitUrl ? `url(${c.portraitUrl})` : 'none',
                                backgroundSize: 'cover', backgroundPosition: 'center'
                            }}>
                                {!c.portraitUrl && c.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
                {draftTurn === 'player' ? 'Your turn to pick!' : 'Opponent is picking...'}
            </div>

            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem',
                maxHeight: '40vh', overflowY: 'auto', padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)'
            }}>
                {availableCharacters.map(char => (
                    <button
                        key={char.id}
                        onClick={() => draftCharacter(char.id)}
                        disabled={draftTurn !== 'player'}
                        className="btn glass-panel"
                        style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)', border: `2px solid ${char.imageColor}`
                        }}
                    >
                        <div style={{
                            width: '50px', height: '50px', borderRadius: '50%', backgroundColor: char.imageColor, marginBottom: '0.8rem',
                            backgroundImage: char.portraitUrl ? `url(${char.portraitUrl})` : 'none',
                            backgroundSize: 'cover', backgroundPosition: 'center',
                            border: `2px solid ${char.imageColor}`
                        }} />
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: char.imageColor }}>{char.name}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>HP: {char.maxHp}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
