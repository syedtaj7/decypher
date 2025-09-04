'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Search, Twitter, Linkedin, Instagram, Mail, Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize theme from localStorage and keep <html> in sync
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') as 'light' | 'dark' | null : null;
    const preferredDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored ?? (preferredDark ? 'dark' : 'light');
    setTheme(initial);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Decypher It', href: '/decypher-it' },
    { name: 'AI Assist', href: '/ai-assist' },
    ...(user ? [{ name: 'Profile', href: '/profile' }] : []),
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-4 left-0 right-0 z-50 pointer-events-none`}
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
                <button
                  onClick={toggleTheme}
                  role="switch"
                  aria-checked={theme === 'dark'}
                  aria-label="Toggle color theme"
                  className="relative inline-flex w-16 h-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: theme === 'dark' ? 'var(--primary-medium)' : 'color-mix(in oklab, var(--foreground) 12%, transparent)'
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white shadow transform transition-transform duration-200"
                    style={{ transform: theme === 'dark' ? 'translateX(32px)' : 'translateX(2px)' }}
                  >
                    {theme === 'dark' ? <Moon className="h-3.5 w-3.5 text-primary-medium" /> : <Sun className="h-3.5 w-3.5 text-yellow-500" />}
                  </span>
                </button>
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
                  className="block px-3 py-2 text-base font-medium rounded-full transition-colors duration-200"
                  style={{ color: 'var(--foreground)', background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
              <div className="px-3 py-2">
                <button
                  onClick={() => { toggleTheme(); }}
                  role="switch"
                  aria-checked={theme === 'dark'}
                  aria-label="Toggle color theme"
                  className="relative inline-flex w-16 h-8 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: theme === 'dark' ? 'var(--primary-medium)' : 'color-mix(in oklab, var(--foreground) 12%, transparent)'
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-white shadow transform transition-transform duration-200"
                    style={{ transform: theme === 'dark' ? 'translateX(32px)' : 'translateX(2px)' }}
                  >
                    {theme === 'dark' ? <Moon className="h-3.5 w-3.5 text-primary-medium" /> : <Sun className="h-3.5 w-3.5 text-yellow-500" />}
                  </span>
                </button>
              </div>
              <Link
                href="/signin"
                className="block px-3 py-2 text-base font-medium text-white rounded-md transition-colors duration-200"
                style={{ background: 'var(--primary-medium)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Removed spacer; main has top padding instead */}

      {/* Main Content */}
      <main className="pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-8 w-8 text-primary-light" />
                <span className="text-2xl font-bold font-poppins">Decypher</span>
              </div>
              <p className="text-primary-light mb-6 max-w-md">
                Simplify the Complex. Decypher the Legal. Transform complex documents 
                into easy-to-understand flowcharts and actionable insights.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 bg-primary-medium rounded-lg hover:bg-accent transition-colors duration-200"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/decypher-it" className="text-primary-light hover:text-white transition-colors duration-200">Decypher It</Link></li>
                <li><Link href="/ai-assist" className="text-primary-light hover:text-white transition-colors duration-200">AI Assist</Link></li>
                <li><Link href="/profile" className="text-primary-light hover:text-white transition-colors duration-200">Profile</Link></li>
                <li><Link href="/support" className="text-primary-light hover:text-white transition-colors duration-200">Support</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-primary-light hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-primary-light hover:text-white transition-colors duration-200">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-primary-light hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-8 pt-8 border-t border-primary-medium">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-primary-light">Get the latest updates and tips delivered to your inbox.</p>
              </div>
              <div className="flex w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border border-primary-medium bg-primary-medium/20 text-white placeholder-primary-light focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button className="px-6 py-2 bg-accent text-white rounded-r-lg hover:bg-accent/90 transition-colors duration-200 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-primary-medium text-center text-primary-light">
            <p>&copy; 2024 Decypher. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
