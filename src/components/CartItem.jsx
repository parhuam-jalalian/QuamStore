import { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);
  const { id, title, price, image, quantity = 1 } = item; 

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      borderBottom: '1px solid var(--color-border)'
    }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          background: 'var(--color-image-bg)',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-light)'
            }}
          >
            No Image
          </span>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{title}</h4>
        <p style={{ margin: '0.25rem 0', color: '#666' }}>${price.toFixed(2)}</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>Qty: {quantity}</p>
      </div>

      <button
        onClick={handleRemove}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#d11a2a',
          fontSize: '1.2rem'
        }}
        title="Remove from cart"
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default CartItem;
