import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { FiGlobe } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();
  const { reloadUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      await reloadUser(); // Recharge le contexte utilisateur immédiatement
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Échec de la connexion';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo" style={{ animationDelay: '0.1s' }}><FiGlobe size={38} color="#2563eb" /></div>
        <div className="auth-title">Bienvenue !</div>
        <div className="auth-subtitle">Connectez-vous pour accéder à votre tableau de bord climatique</div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              placeholder="exemple@email.com"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Mot de passe</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button className="auth-btn" type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div style={{ marginTop: 18, fontSize: '1.01rem', color: '#555', textAlign: 'center' }}>
          Pas de compte ?
          <Link className="auth-link" to="/register">S'inscrire</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
