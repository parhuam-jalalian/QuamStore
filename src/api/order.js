const ORDER_API = import.meta.env.VITE_ORDER_API_BASE;

export async function checkout({ userId }) {
  const res = await fetch(`${ORDER_API}/logCheckout`, {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ userId }),
  });

  if (!res.ok) {
    throw new Error('Checkout failed');
  }

  return res.json();
}
