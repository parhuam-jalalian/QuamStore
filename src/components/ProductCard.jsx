import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const {
    id,         
    title,
    image,
    price,
    salePrice
  } = product;

  const displayPrice = salePrice && salePrice < price ? salePrice : price;

  const handleAddToCart = () => {
    addToCart({
      id,              
      title,          
      price: displayPrice,  
      quantity: 1, 
      image    
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '320px',
        padding: '1rem',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        background: 'var(--color-card-bg)',
        color: 'var(--color-text)',
        boxSizing: 'border-box',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        transition: 'background 0.25s ease, color 0.25s ease'
      }}
    >
      {/* Image container */}
      <div
        style={{
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'var(--color-image-bg)',
          borderRadius: '6px',
          overflow: 'hidden',
          marginBottom: '1rem',
          padding: '0.5rem',
          border: '1px solid var(--color-border-light)' 
        }}
      >
        <img
          src={image}
          alt={title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain'
          }}
        />
      </div>

      <div style={{ flexGrow: 1 }}>
        <h3
          title={title}
          style={{
            fontSize: '0.95rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.2rem',
            height: '2.4rem'
          }}
        >
          {title}
        </h3>

        {/* Price Section */}
        <div style={{ marginBottom: '1rem' }}>
          {salePrice && salePrice < price ? (
            <>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: '#888',
                  textDecoration: 'line-through',
                  marginRight: '0.5rem'
                }}
              >
                ${price.toFixed(2)}
              </span>
              <span
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  color: '#b12704'
                }}
              >
                ${salePrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 'bold'
              }}
            >
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--color-accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
