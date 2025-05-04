const ADD_CART_API = import.meta.env.VITE_ADD_CART_API_BASE;
const REMOVE_CART_API = import.meta.env.VITE_REMOVE_CART_API_BASE;
const API_KEY = import.meta.env.VITE_API_KEY;
const GET_CART_API = import.meta.env.VITE_GET_CART_API_BASE;

export async function addToCart({ userId, item }) {
  const res = await fetch(`${ADD_CART_API}/cart/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      userId,
      item: {
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      },
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to add to cart');
  }

  return res.json();
}

export async function removeFromCart({ userId, productId }) {
  const res = await fetch(`${REMOVE_CART_API}/logRemoveFromCart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({ userId, productId }),
  });

  if (!res.ok) {
    throw new Error('Failed to remove from cart');
  }

  return res.json();
}

export async function fetchCart(userId) {
    const res = await fetch(`${GET_CART_API}/getCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
      body: JSON.stringify({ userId }),
    });
  
    if (!res.ok) throw new Error('Failed to fetch cart');
  
    const data = await res.json();
    return (data.cart || []).map((item) => ({
      id: Number(item.M?.id?.N),
      title: item.M?.title?.S,
      price: parseFloat(item.M?.price?.N),
      quantity: parseInt(item.M?.quantity?.N),
      image: item.M?.image?.S || null, 
    }));
  }