import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Heart, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToastNotification } from '@/components/Toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const toast = useToastNotification();
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'demo@mindmate.ai', password: 'demo123' },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);
    if (isSignup) {
      const { authApi } = await import('@/lib/api');
      const result = await authApi.signup({ email: data.email, password: data.password });
      if (result.success) {
        toast.success('Account created!', 'Please sign in.');
        setIsSignup(false);
      } else {
        setAuthError(result.error || 'Signup failed');
      }
      return;
    }
    const result = await login({ email: data.email, password: data.password });
    if (result.success) {
      toast.success('Welcome back!', 'Good to see you again 💙');
      navigate('/dashboard');
    } else {
      setAuthError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-muted/50 p-12">
        <div className="max-w-sm text-center space-y-6">
          <div className="mx-auto w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center">
            <span className="text-5xl">🧘</span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Your Safe Space
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Talk freely, track your mood, and build healthier habits — all with the help of an empathetic AI companion designed for you.
          </p>
          <div className="flex justify-center gap-3 text-3xl">
            <span>😊</span><span>😐</span><span>😔</span><span>😡</span><span>😴</span>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">MindMate</span>
            </div>
            <h1 className="text-3xl font-display font-semibold tracking-tight text-foreground">
              {isSignup ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isSignup ? 'Start your mental wellness journey.' : 'Continue your wellness journey.'}
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {authError && (
              <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                {authError}
              </div>
            )}

            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="Email address"
                  className="pl-11 rounded-2xl"
                  error={errors.email?.message}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  {...register('password')}
                  type="password"
                  placeholder="Password"
                  className="pl-11 rounded-2xl"
                  error={errors.password?.message}
                />
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Please wait...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {isSignup ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            {/* Google button (UI only) */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full rounded-2xl"
              onClick={() => toast.info('Coming soon', 'Google login will be available soon.')}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => { setIsSignup(!isSignup); setAuthError(null); }}
                className="text-primary hover:underline font-medium"
              >
                {isSignup ? 'Sign in' : 'Create one'}
              </button>
            </p>

            {!isSignup && (
              <p className="text-center text-xs text-muted-foreground">
                Demo: demo@mindmate.ai / demo123
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
