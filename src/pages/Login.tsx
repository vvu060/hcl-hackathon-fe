import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Github, Chrome } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logo.png';

export const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // In a real app, this would handle social authentication
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4 w-full'>
      <div className='w-full max-w-md'>
        {/* Logo Section */}
        <div className='text-center mb-8'>
          <img
            src={logo}
            alt='Shiftly Logo'
            className='h-16 w-32 object-cover mx-auto mb-4'
          />

          <p className='text-gray-600 mt-2'>
            Sign in to your account to continue
          </p>
        </div>

        <Card className='shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl text-center'>Sign in</CardTitle>
            <CardDescription className='text-center'>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            {/* Demo Credentials Info */}
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm'>
              <p className='font-medium text-blue-800 mb-2'>
                Demo Credentials:
              </p>
              <div className='text-blue-700 space-y-1'>
                <p>
                  <strong>Admin:</strong> admin@shiftly.com / admin123
                </p>
                <p>
                  <strong>User:</strong> user@shiftly.com / user123
                </p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700'>
                {error}
              </div>
            )}

            {/* Social Login Buttons */}
            <div className='grid grid-cols-2 gap-4'>
              <Button
                variant='outline'
                onClick={() => handleSocialLogin('Google')}
                className='w-full'
              >
                <Chrome className='h-4 w-4 mr-2' />
                Google
              </Button>
              <Button
                variant='outline'
                onClick={() => handleSocialLogin('GitHub')}
                className='w-full'
              >
                <Github className='h-4 w-4 mr-2' />
                GitHub
              </Button>
            </div>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <Separator className='w-full' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-white px-2 text-gray-500'>
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='email'
                    type='email'
                    placeholder='Enter your email'
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className='pl-10'
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='password'>Password</Label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
                  <Input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter your password'
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange('password', e.target.value)
                    }
                    className='pl-10 pr-10'
                    required
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-3 text-gray-400 hover:text-gray-600'
                  >
                    {showPassword ? (
                      <EyeOff className='h-4 w-4' />
                    ) : (
                      <Eye className='h-4 w-4' />
                    )}
                  </button>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <input
                    id='remember'
                    type='checkbox'
                    className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                  />
                  <Label htmlFor='remember' className='text-sm text-gray-600'>
                    Remember me
                  </Label>
                </div>
                <Link
                  to='/forgot-password'
                  className='text-sm text-blue-600 hover:text-blue-700 hover:underline'
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type='submit'
                className='w-full bg-blue-600 hover:bg-blue-700'
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className='flex items-center'>
                    <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>

            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='text-blue-600 hover:text-blue-700 hover:underline font-medium'
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className='text-center mt-8'>
          <p className='text-xs text-gray-500'>
            By signing in, you agree to our{' '}
            <Link to='/terms' className='hover:underline'>
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to='/privacy' className='hover:underline'>
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
