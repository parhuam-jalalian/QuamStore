import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, fetchCart } from '../api/cart';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchCart(userId)
        .then((items) => {
          const parsed = items.map((item) => ({
            id: Number(item.id?.N),
            title: item.title?.S,
            price: parseFloat(item.price?.N),
            quantity: Number(item.quantity?.N),
            image: item.image?.S || null,
          }));
          setCartItems(parsed);
        })
        .catch((err) => {
          console.error('⚠ Failed to load cart:', err);
          toast.error('⚠ Could not load your cart');
        });
    }
  }, []);

  const addToCart = async (product) => {
    let updatedCart = [];
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      toast.info(`Increased quantity of "${product.title}"`);
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
      toast.success(`Added "${product.title}" to cart`);
    }

    setCartItems(updatedCart);

    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        await apiAddToCart({
          userId,
          item: {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image || '', 
          },
        });
      } catch (err) {
        toast.error('⚠ Failed to sync cart with server');
        console.error('Add to cart API error:', err);
      }
    }
  };

  const removeFromCart = (productId) => {
    const removedItem = cartItems.find((item) => item.id === productId);
    const updatedCart = cartItems.filter((item) => item.id !== productId);

    if (removedItem) {
      toast.dismiss('remove-toast');
      toast.warn(`Removed "${removedItem.title}" from cart`, { toastId: 'remove-toast' });
      setCartItems(updatedCart);

      const userId = localStorage.getItem('userId');
      if (userId) {
        apiRemoveFromCart({ userId, productId }).catch((err) => {
          console.error('⚠ Failed to sync cart removal:', err);
        });
      }
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
