// src/components/CartSummary.jsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CartSummary = ({ itemCount, subtotal }) => {
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);

  const handleCheckout = () => {
    // Store gift status for optional use in checkout
    localStorage.setItem('isGift', JSON.stringify(isGift));
    navigate('/checkout');
  };

  return (
    <aside style={{
      padding: '1.5rem',
      backgroundColor: 'var(--color-card-bg)',
      border: '1px solid var(--color-border)',
      borderRadius: '10px',
      width: '100%',
      maxWidth: '300px',
      alignSelf: 'flex-start',
      boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
        Subtotal ({itemCount} item{itemCount !== 1 ? 's' : ''}): <strong>${subtotal.toFixed(2)}</strong>
      </h3>

      {/* <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="checkbox"
          id="gift"
          checked={isGift}
          onChange={(e) => setIsGift(e.target.checked)}
        />
        <label htmlFor="gift" style={{ fontSize: '0.9rem' }}>This order contains a gift</label>
      </div> */}

      <button
        onClick={handleCheckout}
        style={{
          padding: '0.75rem 1.25rem',
          width: '100%',
          backgroundColor: '#ffc107',
          border: 'none',
          borderRadius: '6px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Proceed to checkout
      </button>
    </aside>
  );
};

export default CartSummary;
