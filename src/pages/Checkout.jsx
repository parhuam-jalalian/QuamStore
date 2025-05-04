// src/pages/Checkout.jsx
import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { checkout } from '../api/order';
import { toast } from 'react-toastify';

function CheckoutPage() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId') || 'user123';

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.info('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      await checkout({ userId });
      setCartItems([]);
      toast.success('Order placed successfully!');
    } catch (err) {
      console.error('Checkout failed:', err);
      toast.error('⚠ Failed to complete checkout.');
    } finally {
      setLoading(false);
    }
  };

  const sectionStyle = {
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: 'var(--color-card-bg)',
    border: '1px solid var(--color-border)',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    color: 'var(--color-text)',
  };

  const sectionHeader = {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--color-text)',
  };

  const sectionBody = {
    fontSize: '0.95rem',
    lineHeight: '1.5',
    color: 'var(--color-text)',
  };

  return (
    <div style={{
      padding: '2rem',
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '2rem',
      backgroundColor: 'var(--color-bg)',
      color: 'var(--color-text)',
      minHeight: '100vh',
    }}>
      {/* Left Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <section style={sectionStyle}>
          <h3 style={sectionHeader}><span role="img" aria-label="address">🏠</span> Shipping Address</h3>
          <p style={sectionBody}>123 Demo Street<br />San Jose, CA 95112<br />United States</p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionHeader}><span role="img" aria-label="payment">💳</span> Payment</h3>
          <p style={sectionBody}>QuamPoints Balance: <strong>10,000 QP</strong></p>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
            No real charges — this is a demo checkout.
          </p>
        </section>

        <section style={sectionStyle}>
          <h3 style={sectionHeader}><span role="img" aria-label="items">📦</span> Items</h3>
          <ul style={{ paddingLeft: '1rem', margin: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: '0.5rem' }}>
                {item.title} — Qty: {item.quantity} — ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Sidebar */}
      <aside style={{
        alignSelf: 'start',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        borderRadius: '10px',
        backgroundColor: 'var(--color-card-bg)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        color: 'var(--color-text)',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ marginBottom: '1rem' }}>Order Summary</h3>
          <p>Subtotal: <strong>${total.toFixed(2)}</strong></p>
          <p>Shipping: <strong>FREE</strong></p>
          <p>Tax: <strong>$0.00</strong></p>
          <hr style={{ margin: '1rem 0', borderColor: 'var(--color-border)' }} />
          <p style={{ fontSize: '1.1rem' }}>Total: <strong>${total.toFixed(2)}</strong></p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.25rem',
              width: '100%',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Processing...' : 'Place Your Order'}
          </button>
        </div>
      </aside>
    </div>
  );
}

export default CheckoutPage;
