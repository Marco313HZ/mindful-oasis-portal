
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call for password reset
      setTimeout(() => {
        toast({
          title: "Reset Link Sent",
          description: "If your email exists in our system, you'll receive a password reset link."
        });
        
        setSubmitted(true);
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      setError('Something went wrong. Please try again later.');
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
          <h2 className="mt-6 text-3xl font-bold text-purple-800">
            {submitted ? 'Check Your Email' : 'Reset Your Password'}
          </h2>
          <p className="mt-2 text-gray-600">
            {submitted 
              ? 'We\'ve sent a password reset link to your email' 
              : 'Enter your email and we\'ll send you a link to reset your password'}
          </p>
        </div>

        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-8">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Email Sent Successfully
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We've sent a password reset link to <strong>{email}</strong>. 
                      Please check your inbox and follow the instructions to reset your password.
                    </p>
                  </div>
                  <div className="mt-5">
                    <p className="text-sm text-gray-500">
                      Didn't receive the email? Check your spam folder or request another link.
                    </p>
                  </div>
                  <div className="mt-5">
                    <Button 
                      onClick={() => setSubmitted(false)}
                      variant="outline" 
                      className="border-purple-400 text-purple-600"
                    >
                      Try Another Email
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    {error}
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
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-purple-400 hover:bg-purple-500"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center space-y-2">
          <div>
            <Link to="/signin" className="text-sm text-purple-600 hover:text-purple-500">
              Back to Sign In
            </Link>
          </div>
          <div>
            <Link to="/" className="text-sm text-gray-600 hover:text-purple-500">
              ← Back to MindfulCare Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
