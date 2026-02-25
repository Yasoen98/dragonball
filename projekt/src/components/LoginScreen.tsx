import { useState } from 'react';
import { useGameState } from '../game/useGameState';

export const LoginScreen = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const { login, register, loginError } = useGameState();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim().length >= 3 && password.trim().length >= 3) {
            if (isRegistering) {
                register(name.trim(), password.trim());
            } else {
                login(name.trim(), password.trim());
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{
                padding: '3rem',
                maxWidth: '450px',
                width: '100%'
            }}>
                {/* Logo/Title */}
                <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '1rem',
                        animation: 'float 3s ease-in-out infinite'
                    }}>
                        ⚔️
                    </div>
                    <h1 style={{
                        fontSize: '2.5rem',
                        margin: '0 0 0.5rem 0',
                        background: 'var(--gradient-accent)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 900
                    }}>
                        {isRegistering ? 'POWER UP' : 'WELCOME'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', margin: '0.5rem 0 0 0' }}>
                        {isRegistering
                            ? 'Create your fighter profile and begin your legend'
                            : 'Enter the Dragon Ball Arena and test your strength'}
                    </p>
                </div>

                {/* Error Message */}
                {loginError && (
                    <div style={{
                        color: 'var(--accent-danger)',
                        marginBottom: '1.5rem',
                        background: 'rgba(255, 107, 107, 0.1)',
                        border: '1px solid rgba(255, 107, 107, 0.3)',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        ⚠️ {loginError}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ position: 'relative' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Warrior Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name..."
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
                            autoFocus
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '0.85rem',
                            fontWeight: '600',
                            color: 'var(--text-secondary)',
                            marginBottom: '0.5rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Battle Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min 3 characters..."
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

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={name.trim().length < 3 || password.trim().length < 3}
                        style={{
                            padding: '1.1rem',
                            fontSize: '1.1rem',
                            marginTop: '0.5rem',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            width: '100%'
                        }}
                    >
                        {isRegistering ? '🚀 CREATE PROFILE' : '🎮 ENTER ARENA'}
                    </button>
                </form>

                {/* Toggle Registration */}
                <div style={{
                    marginTop: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--glass-border)',
                    textAlign: 'center',
                    fontSize: '0.95rem',
                    color: 'var(--text-secondary)'
                }}>
                    {isRegistering ? "Already have an account? " : "New to the Arena? "}
                    <button
                        onClick={() => setIsRegistering(!isRegistering)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--accent-primary)',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            padding: 0,
                            textDecoration: 'underline',
                            transition: 'color 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--accent-secondary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--accent-primary)'; }}
                    >
                        {isRegistering ? 'LOG IN' : 'REGISTER'}
                    </button>
                </div>

                {/* Footer */}
                <div style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)'
                }}>
                    Dragon Ball Arena © 2026
                </div>
            </div>
        </div>
    );
};
