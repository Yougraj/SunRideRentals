import { GoogleLogin } from '@react-oauth/google';
import { Bike, Shield, Clock, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export function LoginPage() {
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center px-4 md:px-6">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
            <Bike className="h-6 w-6 text-orange-500" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Welcome to SunRide</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your Google account to book bikes and manage your rentals
          </p>
        </div>

        <div className="grid gap-4">
          <div className="flex justify-center py-4">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                if (credentialResponse.credential) {
                  login({ credential: credentialResponse.credential });
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Why sign in?
              </span>
            </div>
          </div>

          <div className="grid gap-4 text-sm">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-orange-500" />
              <span>Secure booking management</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>Track your rental history</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-orange-500" />
              <span>Easy pickup and drop-off</span>
            </div>
          </div>
        </div>

        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
