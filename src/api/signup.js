const SIGNUP_API = import.meta.env.VITE_USER_SIGNUP_API_BASE;

await fetch(`${SIGNUP_API}/signupUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_API_KEY,
    },
    body: JSON.stringify({ name, email, password }),
  });
  