export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn(body: SignInBody) {
  const response = await fetch('http://localhost:3000/api/auth/login', {
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

export interface VerifyEmailBody {
  email: string;
  code: string;
  userType: string;
}

export async function verifyEmail(body: VerifyEmailBody) {
  const response = await fetch('http://localhost:3000/api/auth/verify-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to verify email');
  }

  return response.json();
}