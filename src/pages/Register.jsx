import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, login } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';
import { FiGlobe } from 'react-icons/fi';

const Register = () => {
  const navigate = useNavigate();
  const { reloadUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState({});

  // Validation UX
  const passwordTooShort = touched.password && password.length > 0 && password.length < 8;
  const passwordMismatch = touched.passwordConfirm && passwordConfirm.length > 0 && password !== passwordConfirm;
  const canSubmit = name && email && password.length >= 8 && password === passwordConfirm && !loading;

  const handleBlur = (field) => setTouched({ ...touched, [field]: true });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    setLoading(true);
    try {
      await register({ name, email, password, password_confirmation: passwordConfirm });
      // Connexion automatique après inscription
      await login({ email, password });
      await reloadUser();
      navigate('/dashboard');
    } catch (err) {
      const msg = err?.response?.data?.message || "Échec de l'inscription";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Style d'input avec erreur
  const inputErrorStyle = {
    borderColor: '#dc2626',
    background: '#fff6f6',
    color: '#b91c1c',
    boxShadow: '0 0 0 2px #fee2e2',
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo" style={{ animationDelay: '0.1s' }}><FiGlobe size={38} color="#2563eb" /></div>
        <div className="auth-title">Créer un compte</div>
        <div className="auth-subtitle">Inscrivez-vous pour accéder à votre tableau de bord climatique</div>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Nom complet</label>
            <input
              className="input"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              required
              placeholder="Votre nom"
              style={touched.name && !name ? inputErrorStyle : {}}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Email</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              placeholder="exemple@email.com"
              style={touched.email && !email ? inputErrorStyle : {}}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Mot de passe</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => handleBlur('password')}
              required
              placeholder="••••••••"
              style={passwordTooShort && touched.password ? inputErrorStyle : {}}
            />
            {passwordTooShort && touched.password && (
              <span style={{ color: '#dc2626', fontSize: '0.93rem', marginTop: 2 }}>
                Le mot de passe doit contenir au moins 8 caractères
              </span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: 6 }}>Confirmer le mot de passe</label>
            <input
              className="input"
              type="password"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              onBlur={() => handleBlur('passwordConfirm')}
              required
              placeholder="••••••••"
              style={passwordMismatch && touched.passwordConfirm ? inputErrorStyle : {}}
            />
            {passwordMismatch && touched.passwordConfirm && (
              <span style={{ color: '#dc2626', fontSize: '0.93rem', marginTop: 2 }}>
                Les mots de passe ne correspondent pas
              </span>
            )}
          </div>
          <button className="auth-btn" type="submit" disabled={!canSubmit}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </button>
        </form>
        <div style={{ marginTop: 18, fontSize: '1.01rem', color: '#555', textAlign: 'center' }}>
          Déjà un compte ?
          <Link className="auth-link" to="/login">Se connecter</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
