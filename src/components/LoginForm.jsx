import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/login';
import { AuthContext } from '../context/AuthContext';


const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginUser(form);
      login(data.userId); // Store userId in context and localStorage
      navigate('/cart');
    } catch (err) {
      console.error('Login failed:', err.message);
      setError(err.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      style={formStyle}
    >
      <h2 style={headingStyle}>Sign in to QuamStore</h2>

      {error && (
        <p style={errorStyle}>
          {error}
        </p>
      )}

      <div style={fieldContainerStyle}>
        <label htmlFor="email" style={labelStyle}>Email or username</label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div style={fieldContainerStyle}>
        <label htmlFor="password" style={labelStyle}>Password</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button type="submit" style={buttonStyle}>
        Sign in
      </button>

      <p style={footerStyle}>
        Don’t have an account?{' '}
        <Link to="/signup" style={linkStyle}>
          Sign up now
        </Link>
      </p>
    </form>
  );
};

// Styles
const formStyle = {
  maxWidth: '400px',
  width: '100%',
  padding: '2rem',
  background: 'var(--color-card-bg)',
  color: 'var(--color-text)',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
};

const headingStyle = {
  fontSize: '1.75rem',
  textAlign: 'center'
};

const errorStyle = {
  color: 'red',
  marginTop: '-1rem',
  textAlign: 'center'
};

const fieldContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const labelStyle = {
  fontWeight: 500
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  background: 'var(--color-input-bg)',
  color: 'var(--color-text)',
  fontSize: '1rem'
};

const buttonStyle = {
  padding: '0.85rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: '#2f71f0',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '0.5rem'
};

const footerStyle = {
  textAlign: 'center',
  fontSize: '0.95rem'
};

const linkStyle = {
  color: '#2f71f0',
  fontWeight: 'bold',
  textDecoration: 'none'
};

export default LoginForm;
