import { useNavigate } from 'react-router-dom';

const EmptyCartPrompt = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('userId');
  // const isLoggedIn = false; // Simulated login check

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '3rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem'
      }}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
        alt="Empty Cart"
        style={{ maxWidth: '200px', opacity: 0.8 }}
      />

      <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
        Your QuamStore Cart is empty
      </h2>

      {!isLoggedIn ? (
        <>
          <p style={{ fontSize: '1rem' }}>
            Sign in to add items or view your order history.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleLogin}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#ffc107',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Sign in to your account
            </button>
            <button
              onClick={handleSignup}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                color: '#333',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              Sign up now
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: '1rem' }}>
            Check your saved items below or continue shopping.
          </p>
          <button
            onClick={handleContinueShopping}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </>
      )}
    </div>
  );
};

export default EmptyCartPrompt;
