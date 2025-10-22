import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/users/login' : '/users';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;
      const { data } = await axios.post(`${API_URL}${endpoint}`, payload);
      
      if (isLogin) {
        onLogin(data.user, data.token);
      } else {
        setIsLogin(true);
        setError('Account created! Please login.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>CipherStudio</h1>
        <h2 style={styles.subtitle}>{isLogin ? 'Login' : 'Register'}</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#58a6ff'}
              onBlur={(e) => e.target.style.borderColor = '#30363d'}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#58a6ff'}
            onBlur={(e) => e.target.style.borderColor = '#30363d'}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={styles.input}
            onFocus={(e) => e.target.style.borderColor = '#58a6ff'}
            onBlur={(e) => e.target.style.borderColor = '#30363d'}
            required
          />
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button 
            type="submit" 
            style={styles.button}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        
        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span onClick={() => setIsLogin(!isLogin)} style={styles.link}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh', 
    background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
    padding: '20px'
  },
  card: { 
    background: '#161b22', 
    padding: '48px', 
    borderRadius: '16px', 
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    border: '1px solid #30363d'
  },
  title: { 
    fontSize: '36px', 
    marginBottom: '8px', 
    background: 'linear-gradient(135deg, #58a6ff 0%, #79c0ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
    fontWeight: '700',
    letterSpacing: '-0.5px'
  },
  subtitle: { 
    fontSize: '22px', 
    marginBottom: '32px', 
    color: '#e6edf3', 
    textAlign: 'center',
    fontWeight: '600'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '18px' },
  input: { 
    padding: '14px 16px', 
    background: '#0d1117', 
    border: '2px solid #30363d', 
    borderRadius: '8px', 
    color: '#e6edf3', 
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.2s ease'
  },
  button: { 
    padding: '14px', 
    background: 'linear-gradient(135deg, #1f6feb 0%, #58a6ff 100%)', 
    color: 'white', 
    border: 'none', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    fontSize: '16px', 
    fontWeight: '600',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(31, 111, 235, 0.3)',
    transition: 'all 0.2s ease'
  },
  error: { 
    color: '#ff7b72', 
    fontSize: '14px', 
    padding: '12px', 
    background: 'rgba(255, 123, 114, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(255, 123, 114, 0.3)'
  },
  toggle: { 
    marginTop: '24px', 
    textAlign: 'center', 
    color: '#8b949e', 
    fontSize: '14px' 
  },
  link: { 
    color: '#58a6ff', 
    cursor: 'pointer', 
    fontWeight: '600',
    textDecoration: 'none'
  }
};
