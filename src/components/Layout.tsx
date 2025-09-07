'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Search } from 'lucide-react';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Decypher It', href: '/decypher-it' },
    { name: 'AI Assist', href: '/ai-assist' },
    ...(user ? [{ name: 'Settings', href: '/settings' }] : []),
  ];

  // Social links removed as they're not used in this component

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`absolute top-4 left-0 right-0 z-50 pointer-events-none`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 px-3 sm:px-4 pointer-events-auto"
               style={{
                 background: 'color-mix(in oklab, var(--background) 70%, transparent)',
                 backdropFilter: 'blur(12px)',
                 WebkitBackdropFilter: 'blur(12px)',
                 borderRadius: '9999px',
                 border: '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)',
                 boxShadow: isScrolled ? '0 8px 24px rgba(0,0,0,0.12)' : '0 4px 16px rgba(0,0,0,0.06)'
               }}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <Search className="h-7 w-7 text-primary-medium" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></div>
              </div>
              <span className="text-xl font-semibold font-poppins" style={{ color: 'var(--foreground)' }}>
                Decypher
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium rounded-full px-3 py-1.5 transition-all duration-200 hover:opacity-95 hover:scale-105 hover:shadow-md`}
                    style={{
                      background: isActive
                        ? 'var(--primary-medium)'
                        : 'color-mix(in oklab, var(--foreground) 10%, transparent)',
                      color: isActive ? '#ffffff' : 'var(--foreground)',
                      border: isActive ? '1px solid var(--primary-medium)' : '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)',
                      boxShadow: isActive ? '0 6px 18px rgba(14,165,233,0.35)' : '0 0 0 rgba(0,0,0,0)'
                    }}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="flex items-center space-x-2">
                {!user && (
                  <Link
                    href="/signin"
                    className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:opacity-95 hover:scale-105 hover:shadow-md"
                    style={{
                      background: 'color-mix(in oklab, var(--foreground) 10%, transparent)',
                      color: 'var(--foreground)',
                      border: '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)'
                    }}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-full transition-colors duration-200`}
                style={{ color: 'var(--foreground)', background: 'transparent' }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden shadow-lg mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ background: 'color-mix(in oklab, var(--background) 85%, transparent)', backdropFilter: 'blur(10px)' }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium rounded-full transition-all duration-200 hover:opacity-95 hover:scale-105 hover:shadow-md"
                    style={{
                      background: isActive
                        ? 'var(--primary-medium)'
                        : 'color-mix(in oklab, var(--foreground) 10%, transparent)',
                      color: isActive ? '#ffffff' : 'var(--foreground)',
                      boxShadow: isActive ? '0 6px 18px rgba(14,165,233,0.35)' : '0 0 0 rgba(0,0,0,0)'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}

              {!user && (
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-base font-medium text-white rounded-md transition-colors duration-200"
                  style={{ background: 'var(--primary-medium)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
