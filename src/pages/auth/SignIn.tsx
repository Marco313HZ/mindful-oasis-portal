
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, AlertCircle } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', general: '' };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate authentication API call
      setTimeout(() => {
        // For demo purposes, hardcode verified users
        const verifiedUsers = [
          { email: 'admin@mindfulcare.com', password: 'admin123', role: 'admin', name: 'Admin User', verified: true },
          { email: 'doctor@mindfulcare.com', password: 'doctor123', role: 'doctor', name: 'Doctor User', verified: true },
          { email: 'patient@mindfulcare.com', password: 'patient123', role: 'patient', name: 'Patient User', verified: false }
        ];
        
        const user = verifiedUsers.find(u => u.email === formData.email && u.password === formData.password);
        
        if (user) {
          if (!user.verified) {
            // User found but email not verified
            toast({
              title: "Email not verified",
              description: "Please verify your email before signing in.",
              variant: "destructive"
            });
            navigate('/auth/verify-email', { state: { email: formData.email } });
          } else {
            // User found and email verified - proceed with login
            localStorage.setItem('user', JSON.stringify({ 
              email: user.email,
              role: user.role,
              name: user.name
            }));
            
            toast({
              title: "Sign in successful",
              description: user.role === 'admin' ? "Welcome to the admin dashboard." : "Welcome back to MindfulCare."
            });
            
            // Redirect based on role
            if (user.role === 'admin') {
              navigate('/admin/dashboard');
            } else {
              navigate('/');
            }
          }
        } else {
          // User not found or incorrect credentials
          setErrors(prev => ({ 
            ...prev, 
            general: 'Invalid email or password. Try one of the demo accounts: admin@mindfulcare.com/admin123, doctor@mindfulcare.com/doctor123, or patient@mindfulcare.com/patient123 (unverified)' 
          }));
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      setErrors(prev => ({ ...prev, general: 'Authentication failed. Please try again.' }));
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-purple-400 flex items-center justify-center">
              <span className="font-bold text-white text-xl">MC</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-purple-800">Sign in to MindfulCare</h2>
          <p className="mt-2 text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-8">
            {errors.general && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="your@email.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 ${errors.password ? 'border-red-500' : ''}`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/auth/forgot-password" className="text-purple-600 hover:text-purple-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-purple-400 hover:bg-purple-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/auth/register">
                  <Button variant="outline" className="w-full border-purple-400 text-purple-600">
                    Create an account
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-purple-500">
            ← Back to MindfulCare Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
