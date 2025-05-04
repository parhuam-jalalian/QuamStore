import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <div
      onClick={() => setDarkMode(prev => !prev)}
      style={{
        width: '50px',
        height: '28px',
        backgroundColor: darkMode ? '#333' : '#ddd',
        border: darkMode ? '1px solid #666' : '1px solid #aaa',
        borderRadius: '9999px',
        cursor: 'pointer',
        padding: '3px',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease, border 0.3s ease',
        position: 'relative',
        boxShadow: 'inset 0 1px 4px rgba(0,0,0,0.2)'
      }}
      title="Toggle theme"
    >
      <div
        style={{
          width: '22px',
          height: '22px',
          borderRadius: '50%',
          backgroundColor: darkMode ? '#111' : '#f0f0f0',
          color: darkMode ? '#fff' : '#f39c12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          transform: darkMode ? 'translateX(22px)' : 'translateX(0px)',
          transition: 'transform 0.25s ease-in-out, background-color 0.25s ease',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
          animation: 'pulse-ring 2.5s ease-in-out infinite'
        }}
      >
        {darkMode ? <FaMoon /> : <FaSun />}
      </div>

      {/* Pulse ring animation keyframes */}
      <style>
        {`
          @keyframes pulse-ring {
            0% {
              box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.4);
            }
            70% {
              box-shadow: 0 0 0 6px rgba(255, 193, 7, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(255, 193, 7, 0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default ThemeToggle;
