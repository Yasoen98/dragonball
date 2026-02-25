import React, { useEffect, useRef } from 'react';
import { useGameState } from '../game/useGameState';
import type { BattleCharacter } from '../game/useGameState';
import type { PlayerEnergy, ActionCost } from '../types';

const EnergyDisplay: React.FC<{ energy: PlayerEnergy, label: string }> = ({ energy, label }) => (
    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{label}</span>
        {Array.from({ length: energy.ki }).map((_, i) => <span key={`ki-${i}`} className="energy-pill energy-ki">K</span>)}
        {Array.from({ length: energy.physical }).map((_, i) => <span key={`phys-${i}`} className="energy-pill energy-physical">P</span>)}
        {Array.from({ length: energy.special }).map((_, i) => <span key={`spec-${i}`} className="energy-pill energy-special">S</span>)}
        {energy.ki + energy.physical + energy.special === 0 && <span style={{ fontSize: '0.8rem', color: '#555' }}>Empty</span>}
    </div>
);

const CharacterPortrait: React.FC<{
    char: BattleCharacter,
    isSelected?: boolean,
    isActiveTurn?: boolean,
    onClick?: () => void
}> = ({ char, isSelected, isActiveTurn, onClick }) => {
    const hpPercent = Math.max(0, (char.currentHp / char.maxHp) * 100);
    const hpColor = hpPercent > 50 ? '#22c55e' : hpPercent > 20 ? '#eab308' : '#ef4444';
    const isDead = char.currentHp <= 0;

    return (
        <div
            onClick={!isDead && onClick ? onClick : undefined}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                opacity: isDead ? 0.3 : 1,
                transform: isSelected ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: !isDead && onClick ? 'pointer' : 'default',
                width: '100px'
            }}
        >
            <div style={{
                position: 'relative',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: char.imageColor,
                border: isSelected ? `4px solid ${char.imageColor}` : '2px solid rgba(255,255,255,0.1)',
                boxShadow: isSelected ? `0 0 20px ${char.imageColor}` : '0 4px 10px rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', fontSize: '12px', textAlign: 'center',
                zIndex: isSelected ? 10 : 1,
                backgroundImage: char.portraitUrl ? `url(${char.portraitUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}>
                {!char.portraitUrl && char.name}
                {isActiveTurn && <div style={{ position: 'absolute', top: -10, right: -10, width: 20, height: 20, background: 'var(--accent)', borderRadius: '50%', border: '2px solid #fff' }} />}
            </div>
            {char.portraitUrl && (
                <div style={{ marginTop: '0.4rem', fontWeight: 'bold', fontSize: '0.8rem', color: isSelected ? char.imageColor : '#fff', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                    {char.name}
                </div>
            )}

            <div style={{ width: '100%', height: '8px', background: '#333', marginTop: '0.8rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid #111' }}>
                <div style={{ width: `${hpPercent}%`, height: '100%', background: hpColor, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.8rem', marginTop: '0.2rem', fontWeight: 'bold' }}>{Math.floor(char.currentHp)}/{char.maxHp}</span>

            <div style={{ display: 'flex', gap: '2px', flexWrap: 'wrap', justifyContent: 'center', height: '24px', marginTop: '4px' }}>
                {char.statusEffects.map((e, i) => (
                    <span key={i} style={{ fontSize: '0.65rem', color: 'var(--accent)', background: 'rgba(0,0,0,0.6)', padding: '2px 4px', borderRadius: '4px' }}>
                        {e.effect.toUpperCase()}
                    </span>
                ))}
            </div>
        </div>
    );
};

const CostDisplay: React.FC<{ cost: ActionCost }> = ({ cost }) => (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
        {Array.from({ length: cost.ki || 0 }).map((_, i) => <span key={`c-ki-${i}`} className="energy-pill energy-ki" style={{ width: 16, height: 16, fontSize: '0.6rem' }}>K</span>)}
        {Array.from({ length: cost.physical || 0 }).map((_, i) => <span key={`c-ph-${i}`} className="energy-pill energy-physical" style={{ width: 16, height: 16, fontSize: '0.6rem' }}>P</span>)}
        {Array.from({ length: cost.special || 0 }).map((_, i) => <span key={`c-sp-${i}`} className="energy-pill energy-special" style={{ width: 16, height: 16, fontSize: '0.6rem' }}>S</span>)}
    </div>
);

export const BattleArena: React.FC = () => {
    const {
        playerRoster, opponentRoster, playerActiveIndex, opponentActiveIndex,
        playerEnergy, opponentEnergy, turnNumber, isPlayerTurn,
        combatLogs, executePlayerAction, passTurn, setPlayerActiveIndex, winner,
        playerName
    } = useGameState();

    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [combatLogs]);

    const pActive = playerRoster[playerActiveIndex];

    if (winner) {
        return (
            <div className="glass-panel" style={{ padding: '4rem', maxWidth: '600px', margin: '15vh auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', color: winner === 'player' ? 'var(--ki-color)' : 'var(--physical-color)', marginBottom: '1rem' }}>
                    {winner === 'player' ? 'VICTORY!' : 'DEFEAT'}
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>The match has concluded.</p>
                <button className="btn" style={{ marginTop: '2rem' }} onClick={() => window.location.reload()}>Return to Menu</button>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr auto', height: '100vh', gap: '0.5rem', maxWidth: '1000px', margin: '0 auto', padding: '1rem' }}>

            {/* Top: Opponent Characters Row */}
            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(239, 68, 68, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--physical-color)' }}>Bot Opponent</h3>
                    <EnergyDisplay energy={opponentEnergy} label="Opponent Energy" />
                </div>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%' }}>
                    {opponentRoster.map((c, i) => (
                        <CharacterPortrait
                            key={c.id}
                            char={c}
                            isSelected={i === opponentActiveIndex}
                            isActiveTurn={!isPlayerTurn && i === opponentActiveIndex}
                        />
                    ))}
                </div>
            </div>

            {/* Middle: Turn Info & Combat Log */}
            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--accent)' }}>Round {turnNumber}</h3>
                    <h3 style={{ margin: 0, color: isPlayerTurn ? 'var(--ki-color)' : 'var(--physical-color)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {isPlayerTurn ? 'Your Turn' : "Opponent's Turn"}
                    </h3>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem', display: 'flex', flexDirection: 'column-reverse' }}>
                    <div ref={logsEndRef} />
                    {combatLogs.map(log => (
                        <div key={log.id} style={{
                            padding: '0.5rem', marginBottom: '0.5rem', borderRadius: '4px',
                            borderLeft: log.playerName === 'System' ? '3px solid var(--accent)' : log.isOpponent ? '3px solid var(--physical-color)' : '3px solid var(--ki-color)',
                            background: 'rgba(255,255,255,0.02)'
                        }}>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                Round {log.turn} • <strong>{log.playerName}</strong> {log.characterName ? `(${log.characterName})` : ''}
                            </div>
                            <div style={{ fontSize: '0.95rem', margin: '0.2rem 0' }}>{log.details}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom: Player Characters Row */}
            <div className="glass-panel" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(56, 189, 248, 0.05)' }}>
                <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', width: '100%', marginBottom: '1rem' }}>
                    {playerRoster.map((c, i) => (
                        <CharacterPortrait
                            key={c.id}
                            char={c}
                            isSelected={i === playerActiveIndex}
                            isActiveTurn={isPlayerTurn && i === playerActiveIndex}
                            onClick={() => isPlayerTurn && setPlayerActiveIndex(i)}
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--ki-color)' }}>{playerName || 'You'}</h3>
                    <EnergyDisplay energy={playerEnergy} label="Team Energy" />
                </div>
            </div>

            {/* Bottom: Action Bar for Selected Character */}
            <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.9)' }}>
                <div style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Actions for <strong style={{ color: pActive.imageColor }}>{pActive.name}</strong>
                </div>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem',
                    opacity: isPlayerTurn ? 1 : 0.5, pointerEvents: isPlayerTurn ? 'auto' : 'none'
                }}>
                    {pActive.techniques.map(tech => {
                        const cd = pActive.cooldowns[tech.id] || 0;
                        const canAfford =
                            (playerEnergy.ki >= (tech.cost.ki || 0)) &&
                            (playerEnergy.physical >= (tech.cost.physical || 0)) &&
                            (playerEnergy.special >= (tech.cost.special || 0));

                        return (
                            <button
                                key={tech.id}
                                disabled={cd > 0 || !canAfford || !isPlayerTurn}
                                onClick={() => executePlayerAction('technique', tech.id)}
                                className="btn glass-panel"
                                style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255,255,255,0.05)' }}
                            >
                                {tech.iconUrl && <div style={{
                                    width: '48px', height: '48px', marginBottom: '0.5rem', borderRadius: '12px',
                                    backgroundImage: `url(${tech.iconUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                    border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                                }} />}
                                <div style={{ fontWeight: 'bold' }}>{tech.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minHeight: '1.2rem', margin: '4px 0' }}>
                                    {cd > 0 ? `Cooldown: ${cd}` : `Damage: ${tech.damage}`}
                                </div>
                                <CostDisplay cost={tech.cost} />
                            </button>
                        );
                    })}

                    <button
                        disabled={(pActive.cooldowns['dodge'] || 0) > 0 || !isPlayerTurn ||
                            (playerEnergy.special < (pActive.dodge.cost.special || 0)) ||
                            (playerEnergy.ki < (pActive.dodge.cost.ki || 0)) ||
                            (playerEnergy.physical < (pActive.dodge.cost.physical || 0))
                        }
                        onClick={() => executePlayerAction('dodge', pActive.dodge.name)}
                        className="btn glass-panel"
                        style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(168, 85, 247, 0.1)' }}
                    >
                        {pActive.dodge.iconUrl && <div style={{
                            width: '48px', height: '48px', marginBottom: '0.5rem', borderRadius: '12px',
                            backgroundImage: `url(${pActive.dodge.iconUrl})`, backgroundSize: 'cover', backgroundPosition: 'center',
                            border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                        }} />}
                        <div style={{ fontWeight: 'bold' }}>{pActive.dodge.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minHeight: '1.2rem', margin: '4px 0' }}>
                            {pActive.cooldowns['dodge'] > 0 ? `Cooldown: ${pActive.cooldowns['dodge']}` : `Rate: ${pActive.dodge.successRate * 100}%`}
                        </div>
                        <CostDisplay cost={pActive.dodge.cost} />
                    </button>

                    <button
                        disabled={!isPlayerTurn}
                        onClick={() => passTurn()}
                        className="btn glass-panel"
                        style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(255, 255, 255, 0.1)' }}
                    >
                        <div style={{ fontWeight: 'bold' }}>Pass Turn</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minHeight: '1.2rem', margin: '4px 0' }}>
                            Conserve energy
                        </div>
                    </button>
                </div>
            </div>

        </div>
    );
};
