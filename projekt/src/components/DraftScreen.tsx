import { useGameState } from '../game/useGameState';

export const DraftScreen = () => {
    const { availableCharacters, draftCharacter, playerRoster, opponentRoster, draftTurn } = useGameState();

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{
                    fontSize: '3rem',
                    margin: '0 0 0.5rem 0',
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 900
                }}>
                    DRAFT PHASE
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {draftTurn === 'player' ? '🎯 Choose your fighters wisely!' : '⏳ Your opponent is picking...'}
                </p>
            </div>

            {/* Teams Display */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2rem',
                marginBottom: '3rem'
            }}>
                {/* Player Team */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        marginBottom: '1.5rem',
                        color: draftTurn === 'player' ? 'var(--accent-primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        👤 YOUR TEAM ({playerRoster.length}/3)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {playerRoster.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem'
                            }}>
                                No fighters selected yet...
                            </div>
                        ) : (
                            playerRoster.map(c => (
                                <div key={c.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'var(--glass-light)',
                                    borderRadius: '10px',
                                    border: `2px solid ${c.imageColor}`
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: c.imageColor,
                                        backgroundImage: c.portraitUrl ? `url(${c.portraitUrl})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        border: `2px solid ${c.imageColor}`,
                                        boxShadow: `0 0 10px ${c.imageColor}`
                                    }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold', color: c.imageColor }}>{c.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>HP: {c.maxHp}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Opponent Team */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{
                        fontSize: '1.25rem',
                        marginBottom: '1.5rem',
                        color: draftTurn === 'opponent' ? 'var(--accent-danger)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        🤖 OPPONENT ({opponentRoster.length}/3)
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {opponentRoster.length === 0 ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '2rem',
                                color: 'var(--text-muted)',
                                fontSize: '0.95rem'
                            }}>
                                Waiting for opponent...
                            </div>
                        ) : (
                            opponentRoster.map(c => (
                                <div key={c.id} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: 'var(--glass-light)',
                                    borderRadius: '10px',
                                    border: `2px solid ${c.imageColor}`
                                }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        backgroundColor: c.imageColor,
                                        backgroundImage: c.portraitUrl ? `url(${c.portraitUrl})` : 'none',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        border: `2px solid ${c.imageColor}`,
                                        boxShadow: `0 0 10px ${c.imageColor}`
                                    }} />
                                    <div>
                                        <div style={{ fontWeight: 'bold', color: c.imageColor }}>{c.name}</div>
                                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>HP: {c.maxHp}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Available Characters */}
            <div>
                <h3 style={{
                    fontSize: '1.25rem',
                    marginBottom: '1.5rem',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    ✨ AVAILABLE FIGHTERS
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {availableCharacters.map(char => (
                        <button
                            key={char.id}
                            onClick={() => draftCharacter(char.id)}
                            disabled={draftTurn !== 'player'}
                            className="glass-panel"
                            style={{
                                padding: '1.5rem',
                                border: `2px solid ${char.imageColor}`,
                                cursor: draftTurn === 'player' ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s ease',
                                transform: draftTurn === 'player' ? 'translateY(0)' : 'translateY(0)',
                                opacity: draftTurn === 'player' ? 1 : 0.5,
                                background: draftTurn === 'player' ? 'linear-gradient(135deg, var(--glass-light) 0%, rgba(102, 126, 234, 0.1) 100%)' : 'var(--glass-light)'
                            }}
                            onMouseEnter={(e) => {
                                if (draftTurn === 'player') {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 30px ${char.imageColor}40`;
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (draftTurn === 'player') {
                                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                                }
                            }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '12px',
                                backgroundColor: char.imageColor,
                                backgroundImage: char.portraitUrl ? `url(${char.portraitUrl})` : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                marginBottom: '1rem',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                border: `2px solid ${char.imageColor}`,
                                boxShadow: `0 0 15px ${char.imageColor}80`
                            }} />
                            <div style={{ fontWeight: 'bold', color: char.imageColor, marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                                {char.name}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                ♥ {char.maxHp} HP
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Status Message */}
            {draftTurn === 'player' && playerRoster.length < 3 && (
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '10px',
                    textAlign: 'center',
                    color: 'var(--text-secondary)'
                }}>
                    🎯 Select {3 - playerRoster.length} more fighter{3 - playerRoster.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};
