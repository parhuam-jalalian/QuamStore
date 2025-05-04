const LOGIN_API = import.meta.env.VITE_USER_LOGIN_API_BASE;

export const loginUser = async ({ email, password }) => {
  const res = await fetch(`${LOGIN_API}/loginUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data; // e.g., return token or user object
};
