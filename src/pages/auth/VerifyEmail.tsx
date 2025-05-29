import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { verifyEmail } from '../services-api/authService';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // Get email from location state if available
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  useEffect(() => {
    // Countdown timer for resend button
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendCode = () => {
    setIsResending(true);
    
    // Simulate API call to resend code
    setTimeout(() => {
      toast({
        title: "Verification Code Sent",
        description: `A new verification code has been sent to ${email}`
      });
      setIsResending(false);
      setCountdown(60); // Enable resend after 60 seconds
    }, 1500);
  };

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d+$/.test(value)) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (!pastedData || !/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split('');
    const newCode = [...verificationCode];
    
    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });
    
    setVerificationCode(newCode);
    
    // Focus the input after the last pasted digit
    const lastIndex = Math.min(digits.length, 5);
    const lastInput = document.getElementById(`code-${lastIndex}`);
    if (lastInput) lastInput.focus();
  };

  const handleVerify = async () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive"
      });
      return;
    }
    setIsVerifying(true);
    try {
      // Call backend verification API
      const result = await verifyEmail({
        email,
        code,
        userType: 'SuperAdmin'
      });
      if (result.active === false) {
        toast({
          title: "Account Inactive",
          description: "Your account is not active. Please contact support.",
          variant: "destructive"
        });
        setIsVerifying(false);
        navigate('/auth/inactive', { state: { email } });
        return;
      }
      setIsVerified(true);
      setIsVerifying(false);
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified"
      });
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error: any) {
      setIsVerifying(false);
      toast({
        title: "Verification Failed",
        description: error?.message || 'Verification failed. Please try again.',
        variant: "destructive"
      });
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
            {isVerified ? 'Email Verified!' : 'Verify Your Email'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isVerified 
              ? 'Thank you for verifying your email address' 
              : 'Please enter the verification code sent to your email'}
          </p>
        </div>

        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-8">
            {isVerified ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Email Successfully Verified
                  </h3>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Your account has been successfully activated. You can now sign in to access your account.
                    </p>
                  </div>
                  <div className="mt-6">
                    <Button 
                      className="w-full bg-purple-400 hover:bg-purple-500"
                      onClick={() => navigate('/signin')}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
                
                {!email ? (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Enter your email address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                    <Button 
                      className="w-full bg-purple-400 hover:bg-purple-500"
                      onClick={handleResendCode}
                      disabled={isResending || !email}
                    >
                      {isResending ? 'Sending...' : 'Send Verification Code'}
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-center text-gray-600 mb-6">
                      We've sent a verification code to <strong>{email}</strong>
                    </p>
                    
                    <div className="mb-6">
                      <label htmlFor="code-0" className="block text-sm font-medium text-gray-700 mb-2 text-center">
                        Enter verification code
                      </label>
                      <div className="flex justify-center gap-2" onPaste={handlePaste}>
                        {verificationCode.map((digit, index) => (
                          <Input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-lg font-semibold"
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Button
                        className="w-full bg-purple-400 hover:bg-purple-500"
                        onClick={handleVerify}
                        disabled={isVerifying || verificationCode.join('').length !== 6}
                      >
                        {isVerifying ? 'Verifying...' : 'Verify Email'}
                      </Button>
                    </div>
                    
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">
                        Didn't receive the code?
                      </p>
                      <Button
                        variant="outline"
                        className="text-purple-600 border-purple-400"
                        onClick={handleResendCode}
                        disabled={isResending || countdown > 0}
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        {countdown > 0
                          ? `Resend in ${countdown}s`
                          : isResending
                            ? 'Sending...'
                            : 'Resend Code'
                        }
                      </Button>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <Button
                        variant="link"
                        className="text-purple-600 p-0 h-auto"
                        onClick={() => setEmail('')}
                      >
                        Use a different email
                      </Button>
                    </div>
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link to="/signin" className="text-sm text-gray-600 hover:text-purple-500">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
