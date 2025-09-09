'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { AmuLogo } from '@/components/AmuLogo';
import { GithubIcon } from '@/components/GithubIcon';
import DesertBackground from '@/components/DesertBackground';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.69 6.053 29.077 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"/>
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.297 16.108 18.789 14 24 14c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C33.69 6.053 29.077 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.796-1.977 13.283-5.197l-6.141-5.2C29.055 35.488 26.64 36.5 24 36.5c-5.202 0-9.626-3.321-11.287-7.955l-6.55 5.046C9.49 39.556 16.138 44 24 44z"/>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.236-2.279 4.166-4.22 5.603.002-.001 6.141 5.2 6.141 5.2C39.251 35.508 44 30.051 44 24c0-1.341-.138-2.651-.389-3.917z"/>
  </svg>
);

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [lastAuthAttempt, setLastAuthAttempt] = useState(0);
  const router = useRouter();
  
  // Prevent multiple auth attempts in quick succession
  const isAuthThrottled = useCallback(() => {
    const now = Date.now();
    if (now - lastAuthAttempt < 2000) { // 2 second cooldown
      return true;
    }
    setLastAuthAttempt(now);
    return false;
  }, [lastAuthAttempt]);
  
  // Cleanup any lingering auth sessions when component unmounts
  useEffect(() => {
    return () => {
      // This helps prevent issues with multiple auth requests
      if (isGoogleLoading || isGithubLoading) {
        console.log('Cleaning up pending auth sessions');
      }
    };
  }, [isGoogleLoading, isGithubLoading]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      router.replace('/profile');
    } catch (err: unknown) {
      console.error(err);
      const firebaseError = err as { code?: string; message?: string };
      
      // Handle common Firebase auth errors
      if (firebaseError.code === 'auth/email-already-in-use') {
        alert('This email is already in use. Please try logging in instead.');
      } else if (firebaseError.code === 'auth/invalid-email') {
        alert('Please enter a valid email address.');
      } else if (firebaseError.code === 'auth/weak-password') {
        alert('Password is too weak. Please use a stronger password.');
      } else {
        alert('Account creation failed: ' + (firebaseError.message || 'Please check your details.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isGoogleLoading || isGithubLoading) return;
    if (isAuthThrottled()) return;
    
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions before signing in with Google.');
      return;
    }

    setIsGoogleLoading(true);
    const provider = new GoogleAuthProvider();
    // Add login hint to persist login attempt
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    try {
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      router.replace('/profile');
    } catch (err: unknown) {
      console.error(err);
      // Handle specific Firebase errors
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === 'auth/cancelled-popup-request') {
        console.log('Authentication popup was closed by the user');
      } else if (firebaseError.code === 'auth/popup-blocked') {
        alert('Popup was blocked by the browser. Please enable popups for this site.');
      } else {
        alert('Google sign-in failed: ' + (firebaseError.message || 'Unknown error'));
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  const handleGithubSignIn = async () => {
    if (isGoogleLoading || isGithubLoading) return;
    if (isAuthThrottled()) return;
    
    if (!termsAccepted) {
      alert('Please accept the Terms & Conditions before signing in with GitHub.');
      return;
    }

    setIsGithubLoading(true);
    const provider = new GithubAuthProvider();
    // Add login parameters to persist login attempt
    provider.setCustomParameters({
      'allow_signup': 'true'
    });
    
    try {
      await signInWithPopup(auth, provider, browserPopupRedirectResolver);
      router.replace('/profile');
    } catch (err: unknown) {
      console.error(err);
      // Handle specific Firebase errors
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === 'auth/cancelled-popup-request') {
        console.log('Authentication popup was closed by the user');
      } else if (firebaseError.code === 'auth/popup-blocked') {
        alert('Popup was blocked by the browser. Please enable popups for this site.');
      } else {
        alert('GitHub sign-in failed: ' + (firebaseError.message || 'Unknown error'));
      }
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="auth-page h-screen max-h-screen flex flex-col bg-[#2E2A3D] overflow-hidden">
      {/* Virtual navbar space - adds top spacing */}
      <div className="h-16 w-full"></div>
      
      <div className="flex flex-grow overflow-hidden">
        {/* Left side - Purple background with image */}
        <div className="hidden lg:flex lg:w-1/2 bg-[#59509F] relative overflow-hidden items-center justify-center">
          <div className="absolute top-8 left-8 z-10">
            <AmuLogo />
          </div>
        
          <div className="absolute top-8 right-8 z-10">
            <Link href="/" className="py-2 px-4 bg-[#6862AC]/50 rounded-full text-white text-sm hover:bg-[#6862AC] transition-all flex items-center justify-center backdrop-blur-sm">
              Back to website <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
          
          <div className="p-12 relative z-10 flex flex-col justify-end h-full pb-24 text-white">
            <h2 className="text-3xl font-bold mb-3">
              Capturing Moments,<br />Creating Memories
            </h2>
            <div className="flex space-x-2 mt-4">
              <div className="w-8 h-1 rounded-full bg-white/30"></div>
              <div className="w-8 h-1 rounded-full bg-white/30"></div>
              <div className="w-8 h-1 rounded-full bg-white"></div>
            </div>
          </div>
          
          {/* Background image */}
          <DesertBackground />
        </div>

        {/* Right side - Sign up form */}
        <div className="w-full lg:w-1/2 p-6 pt-4 flex items-center justify-center overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="lg:hidden mb-6 flex justify-between items-center">
              <AmuLogo />
              <Link href="/" className="py-2 px-4 bg-[#59509F]/20 rounded-full text-white text-sm hover:bg-[#59509F]/30 transition-all">
                Back to website
              </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-3">Create an account</h1>
            <p className="text-white/80 mb-6">
              Already have an account? <Link href="/login" className="text-white underline hover:no-underline">Log in</Link>
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    className="w-full p-4 bg-[#38344A] text-white rounded-lg border border-[#5A5670] focus:outline-none focus:ring-1 focus:ring-[#59509F] placeholder-gray-400"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    className="w-full p-4 bg-[#38344A] text-white rounded-lg border border-[#5A5670] focus:outline-none focus:ring-1 focus:ring-[#59509F] placeholder-gray-400"
                    required
                  />
                </div>
              </div>
              
              <div>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full p-4 bg-[#38344A] text-white rounded-lg border border-[#5A5670] focus:outline-none focus:ring-1 focus:ring-[#59509F] placeholder-gray-400"
                  required
                />
              </div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full p-4 bg-[#38344A] text-white rounded-lg border border-[#5A5670] focus:outline-none focus:ring-1 focus:ring-[#59509F] placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="flex items-start pt-2">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={() => setTermsAccepted(!termsAccepted)}
                  className="h-5 w-5 mt-1 bg-[#38344A] border border-[#5A5670] rounded text-[#59509F] focus:ring-[#59509F]"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-white/80">
                  I agree to the <Link href="/terms" className="text-white underline hover:no-underline">Terms & Conditions</Link>
                </label>
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !termsAccepted || isGoogleLoading || isGithubLoading}
                className={`w-full p-3 mt-3 rounded-lg font-medium text-center ${
                  termsAccepted && !isLoading && !isGoogleLoading && !isGithubLoading 
                    ? 'bg-[#8C7FF8] text-white hover:bg-[#7B6EE7] transition-colors' 
                    : 'bg-[#5A5670] text-white/50 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Creating account...</span>
                  </div>
                ) : 'Create account'}
              </button>
            </form>
            
            <div className="mt-8 mb-4 flex items-center">
              <div className="flex-1 h-px bg-[#5A5670]"></div>
              <span className="px-4 text-white/60 text-sm">Or register with</span>
              <div className="flex-1 h-px bg-[#5A5670]"></div>
            </div>
            
            {!termsAccepted && (
              <div className="mb-4 p-2 bg-[#493F73] text-white/80 text-sm rounded-lg flex items-center">
                <AlertCircle className="h-4 w-4 text-[#8C7FF8] mr-2 flex-shrink-0" />
                <span>Please accept the Terms & Conditions to enable social login options</span>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignIn}
                className={`flex items-center justify-center py-3 px-4 border rounded-lg text-white transition-colors ${
                  termsAccepted && !isGoogleLoading
                    ? 'border-[#5A5670] hover:bg-[#38344A]' 
                    : 'border-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!termsAccepted || isGoogleLoading || isGithubLoading}
              >
                {isGoogleLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  <>
                    <GoogleIcon />
                    <span className="ml-2">Google</span>
                  </>
                )}
              </button>
              <button
                onClick={handleGithubSignIn}
                className={`flex items-center justify-center py-3 px-4 border rounded-lg text-white transition-colors ${
                  termsAccepted && !isGithubLoading
                    ? 'border-[#5A5670] hover:bg-[#38344A]' 
                    : 'border-gray-700 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!termsAccepted || isGoogleLoading || isGithubLoading}
              >
                {isGithubLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span className="ml-2">Signing in...</span>
                  </div>
                ) : (
                  <>
                    <GithubIcon />
                    <span className="ml-2">GitHub</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
