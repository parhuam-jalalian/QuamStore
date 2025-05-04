import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = ({ searchTerm, setSearchTerm, suggestions = [] }) => {
  const [placeholder, setPlaceholder] = useState('Search products...');
  const [isFocused, setIsFocused] = useState(false);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);
  const location = useLocation();
  const { userId, logout } = useAuth();
  

  const pageTitleMap = {
    '/login': 'Sign In',
    '/signup': 'Sign Up',
    '/cart': 'Shopping Cart',
    '/checkout': 'Checkout',
  };

  const pageTitle = pageTitleMap[location.pathname];

  useEffect(() => {
    if (!isFocused && suggestions.length > 0) {
      intervalRef.current = setInterval(() => {
        indexRef.current = (indexRef.current + 1) % suggestions.length;
        setPlaceholder(suggestions[indexRef.current]);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isFocused, suggestions]);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 2rem',
        minHeight: '70px',
        backgroundColor: 'var(--color-navbar-bg)',
        color: 'var(--color-text)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        gap: '1rem',
        flexWrap: 'wrap'
      }}
    >
      {/* Left: Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <FaShoppingBag size={22} color="#febd69" />
        <span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-text)' }}>QuamStore</span>
      </Link>

      {/* Center: Page Title or Search */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 1rem', minHeight: '40px' }}>
        {pageTitle ? (
          <div style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '600',
              color: 'var(--color-text)',
              margin: 0
            }}>
              {pageTitle}
            </h1>
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '38px',
              backgroundColor: '#fff',
              borderRadius: '6px',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '800px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <input
              type="text"
              placeholder={isFocused ? 'Search products...' : placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setPlaceholder('Search products...');
                clearInterval(intervalRef.current);
              }}
              onBlur={() => setIsFocused(false)}
              style={{
                flex: 1,
                height: '100%',
                border: 'none',
                padding: '0 0.75rem',
                fontSize: '0.95rem',
                outline: 'none',
                backgroundColor: '#232f3e',
                color: '#fff'
              }}
            />
            <button
              style={{
                height: '100%',
                padding: '0 1rem',
                backgroundColor: '#febd69',
                border: 'none',
                borderRadius: '0 6px 6px 0',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              🔍
            </button>
          </div>
        )}
      </div>

      {/* Right: Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <Link to="/" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Home</Link>
        {userId ? (
          <>
            <span style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>{userId}</span>
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-text)',
                cursor: 'pointer',
                padding: '0',
                fontSize: '0.95rem',
                textDecoration: 'underline',
              }}
              title="Log out"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Login</Link>
        )}
        <Link to="/cart" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Cart</Link>
        <Link to="/checkout" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>Checkout</Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
