import { useEffect, useRef } from 'react';
import { useGameState } from '../game/useGameState';
import type { BattleCharacter } from '../game/useGameState';
import type { PlayerEnergy, ActionCost } from '../types';

const EnergyDisplay: React.FC<{ energy: PlayerEnergy, label: string }> = ({ energy, label }) => {
  const totalEnergy = energy.ki + energy.physical + energy.special;
  return (
    <div style={{
      background: 'var(--glass-light)',
      border: '1px solid var(--glass-border)',
      padding: '0.75rem 1rem',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      minWidth: '250px'
    }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{label}</span>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>
        {Array.from({ length: energy.ki }).map((_, i) => <span key={`ki-${i}`} className="energy-pill energy-ki" style={{ width: '20px', height: '20px', fontSize: '0.65rem' }}>K</span>)}
        {Array.from({ length: energy.physical }).map((_, i) => <span key={`phys-${i}`} className="energy-pill energy-physical" style={{ width: '20px', height: '20px', fontSize: '0.65rem' }}>P</span>)}
        {Array.from({ length: energy.special }).map((_, i) => <span key={`spec-${i}`} className="energy-pill energy-special" style={{ width: '20px', height: '20px', fontSize: '0.65rem' }}>S</span>)}
        {totalEnergy === 0 && <span style={{ fontSize: '0.8rem', color: 'var(--accent-danger)', fontWeight: '600' }}>⊘ Empty</span>}
      </div>
      <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>{totalEnergy}</span>
    </div>
  );
};

const CharacterPortrait: React.FC<{
  char: BattleCharacter,
  isSelected?: boolean,
  isActiveTurn?: boolean,
  onClick?: () => void
}> = ({ char, isSelected, isActiveTurn, onClick }) => {
  const hpPercent = Math.max(0, (char.currentHp / char.maxHp) * 100);
  const hpColor = hpPercent > 50 ? 'var(--accent-success)' : hpPercent > 20 ? 'var(--accent-warning)' : 'var(--accent-danger)';
  const isDead = char.currentHp <= 0;

  return (
    <div
      onClick={!isDead && onClick ? onClick : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        opacity: isDead ? 0.4 : 1,
        transform: isSelected ? 'scale(1.12) translateY(-12px)' : 'scale(1)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: !isDead && onClick ? 'pointer' : 'default',
        width: '110px',
        filter: isActiveTurn ? 'drop-shadow(0 0 15px currentColor)' : 'none',
        color: isActiveTurn ? char.imageColor : 'inherit'
      }}
    >
      {/* Portrait Circle */}
      <div style={{
        position: 'relative',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        backgroundColor: char.imageColor,
        border: isSelected ? `4px solid ${char.imageColor}` : '2px solid rgba(255,255,255,0.2)',
        boxShadow: isSelected 
          ? `0 0 30px ${char.imageColor}, 0 8px 20px ${char.imageColor}80` 
          : '0 4px 15px rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        textAlign: 'center',
        zIndex: isSelected ? 10 : 1,
        backgroundImage: char.portraitUrl ? `url(${char.portraitUrl})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden'
      }}>
        {!char.portraitUrl && <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff' }}>{char.name.substring(0, 2)}</span>}
        {char.portraitUrl && <img src={char.portraitUrl} alt={char.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
        
        {/* Active Turn Indicator */}
        {isActiveTurn && (
          <div style={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: '28px',
            height: '28px',
            background: 'var(--gradient-accent)',
            borderRadius: '50%',
            border: '3px solid white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 0 15px rgba(79, 172, 254, 0.8)',
            animation: 'pulse-glow 1.5s ease-in-out infinite'
          }}>
            ⚡
          </div>
        )}
        
        {/* Dead Overlay */}
        {isDead && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            fontSize: '32px'
          }}>
            ☠️
          </div>
        )}
      </div>

      {/* Character Name */}
      {char.portraitUrl && (
        <div style={{
          marginTop: '0.5rem',
          fontWeight: '700',
          fontSize: '0.85rem',
          color: isSelected ? char.imageColor : 'var(--text-primary)',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          textAlign: 'center',
          maxWidth: '100%'
        }}>
          {char.name}
        </div>
      )}

      {/* HP Bar */}
      <div style={{
        width: '100%',
        height: '10px',
        background: 'rgba(0, 0, 0, 0.4)',
        marginTop: '0.6rem',
        borderRadius: '5px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: `${hpPercent}%`,
          height: '100%',
          background: hpColor,
          transition: 'width 0.3s ease',
          boxShadow: `0 0 10px ${hpColor}`,
          borderRadius: '5px'
        }} />
      </div>

      {/* HP Text */}
      <span style={{
        fontSize: '0.8rem',
        marginTop: '0.3rem',
        fontWeight: 'bold',
        color: hpColor
      }}>
        {Math.floor(char.currentHp)}/{char.maxHp} ♥
      </span>

      {/* Status Effects */}
      {char.statusEffects.length > 0 && (
        <div style={{
          display: 'flex',
          gap: '3px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          height: '28px',
          marginTop: '4px',
          width: '100%'
        }}>
          {char.statusEffects.map((e, i) => (
            <span key={i} style={{
              fontSize: '0.7rem',
              color: 'white',
              background: 'linear-gradient(135deg, var(--accent-warning), var(--accent-danger))',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
            }}>
              {e.effect.substring(0, 4).toUpperCase()}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const CostDisplay: React.FC<{ cost: ActionCost }> = ({ cost }) => (
  <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '0.5rem' }}>
    {Array.from({ length: cost.ki || 0 }).map((_, i) => <span key={`c-ki-${i}`} className="energy-pill energy-ki" style={{ width: '18px', height: '18px', fontSize: '0.6rem' }}>K</span>)}
    {Array.from({ length: cost.physical || 0 }).map((_, i) => <span key={`c-ph-${i}`} className="energy-pill energy-physical" style={{ width: '18px', height: '18px', fontSize: '0.6rem' }}>P</span>)}
    {Array.from({ length: cost.special || 0 }).map((_, i) => <span key={`c-sp-${i}`} className="energy-pill energy-special" style={{ width: '18px', height: '18px', fontSize: '0.6rem' }}>S</span>)}
    {(cost.ki || 0) + (cost.physical || 0) + (cost.special || 0) === 0 && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>—</span>}
  </div>
);

export const BattleArena: React.FC = () => {
  const {
    playerRoster, opponentRoster, playerActiveIndex, opponentActiveIndex,
    playerEnergy, opponentEnergy, turnNumber, isPlayerTurn,
    combatLogs, executePlayerAction, passTurn, setPlayerActiveIndex,
    setOpponentActiveIndex,
    playerName, showLogs, toggleLogs
  } = useGameState();

  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current && showLogs) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [combatLogs, showLogs]);

  const pActive = playerRoster[playerActiveIndex];

  return (
    <div style={{
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto auto',
      height: '100vh',
      gap: '1rem',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '1rem',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(79, 172, 254, 0.05) 100%)'
    }}>

      {/* OPPONENT SECTION */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(51, 65, 85, 0.5) 100%)',
        borderLeft: '4px solid var(--accent-danger)',
        borderRadius: '16px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid var(--accent-danger)',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            margin: 0,
            color: 'var(--accent-danger)',
            fontSize: '1.3rem',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            🤖 OPPONENT
          </h2>
          
          {/* Opponent Selection */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {opponentRoster.map((char, idx) => (
              <button
                key={char.id}
                onClick={() => setOpponentActiveIndex(idx)}
                className="glass-panel"
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  border: idx === opponentActiveIndex ? `2px solid ${char.imageColor}` : '1px solid var(--glass-border)',
                  background: idx === opponentActiveIndex ? `linear-gradient(135deg, ${char.imageColor}33, ${char.imageColor}11)` : 'var(--glass-light)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: idx === opponentActiveIndex ? `0 0 12px ${char.imageColor}66` : 'none'
                }}
                title={`Select ${char.name} to attack`}
              >
                ⚔️ {char.name.split(' ')[0]}
              </button>
            ))}
          </div>
          
          <EnergyDisplay energy={opponentEnergy} label="Energy" />
        </div>
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          justifyContent: 'center',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {opponentRoster.map((c, i) => (
            <CharacterPortrait
              key={c.id}
              char={c}
              isSelected={i === opponentActiveIndex}
              isActiveTurn={!isPlayerTurn && i === opponentActiveIndex}
              onClick={() => c.currentHp > 0 && setOpponentActiveIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* CENTER: ROUND INFO & COMBAT LOG */}
      <div className="glass-panel" style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(51, 65, 85, 0.5) 100%)',
        borderRadius: '16px',
        borderTop: '2px solid var(--accent-primary)'
      }}>
        
        {/* Round Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          paddingBottom: '1rem',
          borderBottom: '2px solid var(--accent-primary)'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              background: 'var(--gradient-accent)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '2rem',
              fontWeight: '900',
              letterSpacing: '2px'
            }}>
              ROUND {turnNumber}
            </h2>
            <p style={{
              margin: '0.3rem 0 0 0',
              fontSize: '0.9rem',
              color: 'var(--text-muted)'
            }}>
              Turn Phase
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: '700',
                color: isPlayerTurn ? 'var(--accent-success)' : 'var(--accent-danger)',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {isPlayerTurn ? '⚡ YOUR TURN' : '👊 OPPONENT TURN'}
              </div>
            </div>

            <button
              onClick={toggleLogs}
              className="btn"
              style={{
                background: showLogs ? 'var(--gradient-accent)' : 'var(--glass-light)',
                border: showLogs ? 'none' : '1px solid var(--glass-border)',
                color: showLogs ? 'white' : 'var(--text-primary)',
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              {showLogs ? '📋 Hide Logs' : '📋 Show Logs'}
            </button>
          </div>
        </div>

        {/* Combat Logs */}
        {showLogs && (
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column-reverse',
            background: 'var(--glass-light)',
            borderRadius: '12px',
            maxHeight: '200px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <div ref={logsEndRef} />
            {combatLogs.map(log => (
              <div key={log.id} style={{
                padding: '0.7rem',
                marginBottom: '0.4rem',
                borderRadius: '6px',
                borderLeft: log.playerName === 'System' ? '3px solid var(--accent-primary)' : log.isOpponent ? '3px solid var(--accent-danger)' : '3px solid var(--accent-success)',
                background: 'rgba(255,255,255,0.03)',
                fontSize: '0.85rem'
              }}>
                <div style={{
                  color: 'var(--text-muted)',
                  marginBottom: '0.3rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  R{log.turn} • <strong style={{ color: 'var(--text-primary)' }}>{log.playerName}</strong> {log.characterName ? `(${log.characterName})` : ''}
                </div>
                <div style={{ color: 'var(--text-primary)' }}>{log.details}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PLAYER SECTION */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(51, 65, 85, 0.5) 100%)',
        borderLeft: '4px solid var(--accent-primary)',
        borderRadius: '16px'
      }}>
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '1.5rem',
          flexWrap: 'wrap'
        }}>
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
        <div style={{
          display: 'flex',
          gap: '2rem',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
          paddingTop: '1rem',
          borderTop: '2px solid var(--accent-primary)'
        }}>
          <h2 style={{
            margin: 0,
            color: 'var(--accent-primary)',
            fontSize: '1.3rem',
            fontWeight: '700',
            letterSpacing: '0.5px'
          }}>
            👤 {playerName || 'YOU'}
          </h2>
          <EnergyDisplay energy={playerEnergy} label="Team Energy" />
        </div>
      </div>

      {/* ACTIONS BAR */}
      <div className="glass-panel" style={{
        padding: '1.5rem',
        background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, rgba(51, 65, 85, 0.5) 100%)',
        borderTop: '2px solid var(--accent-primary)',
        borderRadius: '16px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '1rem',
          color: 'var(--text-muted)',
          fontSize: '0.95rem',
          fontWeight: '600'
        }}>
          <span style={{ color: pActive.imageColor, fontWeight: '700' }}>⚔️ {pActive.name}</span> Actions
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.8rem',
          opacity: isPlayerTurn ? 1 : 0.5,
          pointerEvents: isPlayerTurn ? 'auto' : 'none'
        }}>
          {/* Techniques */}
          {pActive.techniques.map(tech => {
            const cd = pActive.cooldowns[tech.id] || 0;
            const canAfford =
              (playerEnergy.ki >= (tech.cost.ki || 0)) &&
              (playerEnergy.physical >= (tech.cost.physical || 0)) &&
              (playerEnergy.special >= (tech.cost.special || 0));
            const isDisabled = cd > 0 || !canAfford || !isPlayerTurn;

            return (
              <button
                key={tech.id}
                disabled={isDisabled}
                onClick={() => executePlayerAction('technique', tech.id)}
                className="glass-panel"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: isDisabled ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(79, 172, 254, 0.1))',
                  border: `2px solid ${canAfford ? 'var(--accent-primary)' : 'var(--accent-muted)'}`,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  opacity: isDisabled ? 0.6 : 1,
                  boxShadow: canAfford && !isDisabled ? '0 0 15px rgba(102, 126, 234, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                {tech.iconUrl && <div style={{
                  width: '56px',
                  height: '56px',
                  marginBottom: '0.7rem',
                  borderRadius: '12px',
                  backgroundImage: `url(${tech.iconUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }} />}
                <div style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'center' }}>{tech.name}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: cd > 0 ? 'var(--accent-danger)' : 'var(--accent-success)',
                  minHeight: '1.2rem',
                  margin: '0.4rem 0',
                  fontWeight: '600'
                }}>
                  {cd > 0 ? `⏱️ ${cd}` : `⚡ ${tech.damage}`}
                </div>
                <CostDisplay cost={tech.cost} />
              </button>
            );
          })}

          {/* Dodge */}
          {(() => {
            const dodgeCd = pActive.cooldowns['dodge'] || 0;
            const canDodge =
              (playerEnergy.special >= (pActive.dodge.cost.special || 0)) &&
              (playerEnergy.ki >= (pActive.dodge.cost.ki || 0)) &&
              (playerEnergy.physical >= (pActive.dodge.cost.physical || 0));
            const isDisabled = dodgeCd > 0 || !canDodge || !isPlayerTurn;

            return (
              <button
                disabled={isDisabled}
                onClick={() => executePlayerAction('dodge', pActive.dodge.name)}
                className="glass-panel"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: isDisabled ? 'rgba(255,255,255,0.03)' : 'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(168, 85, 247, 0.05))',
                  border: `2px solid ${canDodge ? 'var(--accent-primary)' : 'var(--accent-muted)'}`,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  opacity: isDisabled ? 0.6 : 1,
                  boxShadow: canDodge && !isDisabled ? '0 0 15px rgba(168, 85, 247, 0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isDisabled) (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                }}
              >
                {pActive.dodge.iconUrl && <div style={{
                  width: '56px',
                  height: '56px',
                  marginBottom: '0.7rem',
                  borderRadius: '12px',
                  backgroundImage: `url(${pActive.dodge.iconUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '2px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }} />}
                <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{pActive.dodge.name}</div>
                <div style={{
                  fontSize: '0.75rem',
                  color: dodgeCd > 0 ? 'var(--accent-danger)' : 'var(--accent-success)',
                  minHeight: '1.2rem',
                  margin: '0.4rem 0',
                  fontWeight: '600'
                }}>
                  {dodgeCd > 0 ? `⏱️ ${dodgeCd}` : `🛡️ ${Math.floor(pActive.dodge.successRate * 100)}%`}
                </div>
                <CostDisplay cost={pActive.dodge.cost} />
              </button>
            );
          })()}

          {/* Pass Turn */}
          <button
            disabled={!isPlayerTurn}
            onClick={() => passTurn()}
            className="glass-panel"
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: isPlayerTurn ? 'linear-gradient(135deg, rgba(200, 200, 200, 0.1), rgba(100, 100, 100, 0.05))' : 'rgba(255,255,255,0.03)',
              border: `2px solid ${isPlayerTurn ? 'var(--text-muted)' : 'rgba(255,255,255,0.1)'}`,
              borderRadius: '12px',
              cursor: isPlayerTurn ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              opacity: !isPlayerTurn ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (isPlayerTurn) (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = 'none';
            }}
          >
            <div style={{ fontSize: '28px', marginBottom: '0.4rem' }}>⏭️</div>
            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Pass Turn</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Rest & Recover</div>
          </button>
        </div>
      </div>

    </div>
  );
};
