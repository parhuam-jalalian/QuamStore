import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import EmptyCartPrompt from '../components/EmptyCartPrompt';
import useUserId from '../auth/useUserId';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const userId = useUserId(); // e.g., "user123" or null

  if (!userId) {
    return <EmptyCartPrompt mode="login" />;
  }

  if (cartItems.length === 0) {
    return <EmptyCartPrompt mode="empty" />;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const itemCount = cartItems.reduce((count, item) => count + (item.quantity || 1), 0);

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '2rem',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '2rem'
    }}>
      {/* Left: Items */}
      <div style={{ flex: '1 1 60%' }}>
        {/* <h1 style={{ marginBottom: '1rem' }}>Shopping Cart</h1> */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          background: 'var(--color-card-bg)',
          overflow: 'hidden'
        }}>
          {cartItems.map((item, idx) => (
            <CartItem key={idx} item={item} onRemove={removeFromCart} />
          ))}
        </div>
      </div>

        {/* Right: Summary */}
        <div style={{
        flex: '1 1 30%',
        maxWidth: '320px',
        alignSelf: 'flex-start'
        }}>
        <CartSummary
            itemCount={itemCount}
            subtotal={subtotal}
            onCheckout={() => alert('Checkout not implemented yet')}
        />
        </div>
    </div>
  );
};


export default Cart;
