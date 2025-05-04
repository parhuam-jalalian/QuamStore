import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const { name, email, password, confirmPassword } = form;
  
    if (!name || !email || !password || !confirmPassword) {
      return setError('All fields are required.');
    }
  
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
  
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
  
    try {
      const res = await fetch(`${import.meta.env.VITE_USER_SIGNUP_API_BASE}/signupUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      // Optional: store dummy user ID or token
      localStorage.setItem('userId', email); // or generate a UUID
      navigate('/cart');
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred');
    }
  };
  

  return (
    <div style={{
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          borderRadius: '12px',
          backgroundColor: 'var(--color-card-bg)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create your QuamStore account</h2>

        {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Your name</label>
        <input
          name="name"
          type="text"
          placeholder="First and last name"
          value={form.name}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: 'block', margin: '1rem 0 0.25rem' }}>Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: 'block', margin: '1rem 0 0.25rem' }}>Password</label>
        <input
          name="password"
          type="password"
          placeholder="At least 6 characters"
          value={form.password}
          onChange={handleChange}
          style={inputStyle}
        />

        <label style={{ display: 'block', margin: '1rem 0 0.25rem' }}>Re-enter password</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Re-enter password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            marginTop: '1.5rem',
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2f71f0',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Continue
        </button>

        <p style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
          By creating an account, you agree to QuamStore's <a href="#">Terms</a> and <a href="#">Privacy Notice</a>.
        </p>

        <hr style={{ margin: '1.5rem 0' }} />

        <p style={{ textAlign: 'center', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0070f3', textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  maxWidth: '360px',
  padding: '0.65rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  backgroundColor: 'var(--color-input-bg)',
  color: 'var(--color-text)'
};

export default Signup;
