export interface SignUpBody {
  full_name: string;
  password: string;
  phone: string;
  email: string;
}

export async function signIn(body: SignUpBody) {
  const response = await fetch('http://localhost:3000/api/auth/signup/admin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to sign in');
  }

  return response.json();
}