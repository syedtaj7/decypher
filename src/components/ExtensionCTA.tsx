'use client';

import { motion } from 'framer-motion';
import { Download, Chrome, ChevronRight, Star, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ExtensionCTA() {
  return (
    <section 
      className="py-16 md:py-24 overflow-hidden relative"
      style={{ 
        background: 'var(--background)',
        borderTop: '1px solid color-mix(in oklab, var(--foreground) 10%, transparent)'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--primary-medium) 0%, transparent 70%)' }}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, var(--primary-medium) 0%, transparent 70%)' }}
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.12, 0.08, 0.12],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Extension mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <div className="relative">
              {/* Browser window mockup */}
              <motion.div 
                className="rounded-xl shadow-2xl overflow-hidden border"
                style={{ borderColor: 'color-mix(in oklab, var(--foreground) 20%, transparent)' }}
                whileInView={{ 
                  boxShadow: [
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    "0 25px 35px -5px color-mix(in oklab, var(--primary-medium) 25%, transparent)", 
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Browser header */}
                <div 
                  className="flex items-center px-4 py-2 border-b"
                  style={{ 
                    background: 'color-mix(in oklab, var(--background) 80%, var(--foreground))',
                    borderColor: 'color-mix(in oklab, var(--foreground) 20%, transparent)'
                  }}
                >
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div 
                    className="flex-1 mx-4 rounded-md px-4 py-1 text-xs truncate"
                    style={{ 
                      background: 'color-mix(in oklab, var(--background) 90%, var(--foreground))',
                    }}
                  >
                    https://example.com/terms-of-service
                  </div>
                  <motion.div
                    whileInView={{ rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ background: 'var(--primary-medium)' }}>
                      <Download className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                </div>
                
                {/* Browser content */}
                <div 
                  className="p-8"
                  style={{ background: 'var(--background)' }}
                >
                  <div className="space-y-6">
                    {/* Example content */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div 
                          className="h-8 w-40 rounded-md mb-2"
                          style={{ background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                        ></div>
                        <div 
                          className="h-4 w-60 rounded-md"
                          style={{ background: 'color-mix(in oklab, var(--foreground) 5%, transparent)' }}
                        ></div>
                      </div>
                      
                      {/* Decypher popup */}
                      <motion.div
                        initial={{ scale: 0.9, y: 10 }}
                        whileInView={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-col"
                      >
                        <div 
                          className="h-10 w-10 rounded-full mb-1 mx-auto shadow-md"
                          style={{ background: 'var(--primary-medium)' }}
                        >
                          <div className="h-full w-full flex items-center justify-center">
                            <Search className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div 
                          className="text-xs text-center"
                          style={{ color: 'var(--primary-medium)' }}
                        >
                          Decypher
                        </div>
                      </motion.div>
                    </div>
                    
                    <div 
                      className="h-3 w-full rounded-md"
                      style={{ background: 'color-mix(in oklab, var(--foreground) 8%, transparent)' }}
                    ></div>
                    <div 
                      className="h-3 w-5/6 rounded-md"
                      style={{ background: 'color-mix(in oklab, var(--foreground) 8%, transparent)' }}
                    ></div>
                    <div 
                      className="h-3 w-full rounded-md"
                      style={{ background: 'color-mix(in oklab, var(--foreground) 8%, transparent)' }}
                    ></div>
                    
                    {/* Decypher results popup */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                      className="rounded-lg shadow-lg border p-4 mt-4 relative z-10"
                      style={{ 
                        background: 'color-mix(in oklab, var(--background) 98%, var(--primary-medium))',
                        borderColor: 'color-mix(in oklab, var(--foreground) 10%, var(--primary-light))' 
                      }}
                    >
                      <div className="flex items-center mb-2">
                        <div 
                          className="h-6 w-6 rounded-full mr-2"
                          style={{ background: 'var(--primary-medium)' }}
                        >
                          <div className="h-full w-full flex items-center justify-center">
                            <Search className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        <div 
                          className="text-sm font-medium"
                          style={{ color: 'var(--primary-dark)' }}
                        >
                          Decypher Results
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div 
                          className="h-2 w-full rounded-md"
                          style={{ background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                        ></div>
                        <div 
                          className="h-2 w-5/6 rounded-md"
                          style={{ background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                        ></div>
                        <div className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500" />
                          <div 
                            className="h-2 w-40 rounded-md"
                            style={{ background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                          ></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <X className="h-4 w-4 text-red-500" />
                          <div 
                            className="h-2 w-48 rounded-md"
                            style={{ background: 'color-mix(in oklab, var(--foreground) 10%, transparent)' }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Right side - CTA text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--primary-dark)' }}
              >
                Install the Decypher <br />
                <span style={{ color: 'var(--primary-medium)' }}>Browser Extension</span>
              </h2>
              <p 
                className="text-lg mb-8 max-w-lg"
                style={{ color: 'var(--foreground)' }}
              >
                Get instant access to Decypher&apos;s powerful document analysis directly in your browser. 
                Transform complex text with a single click.
              </p>
            </motion.div>
            
            <div className="space-y-5">
              {/* Benefits list */}
              {[
                { 
                  icon: Zap, 
                  title: "Instant Analysis", 
                  description: "One-click access to simplify any document you browse" 
                },
                { 
                  icon: Lock, 
                  title: "Private & Secure", 
                  description: "Your documents stay private with end-to-end encryption" 
                },
                { 
                  icon: Desktop, 
                  title: "Works Everywhere", 
                  description: "Compatible with all major browsers and websites" 
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <div 
                      className="p-2 rounded-lg mr-4 flex-shrink-0 mt-1"
                      style={{ background: 'color-mix(in oklab, var(--primary-medium) 15%, transparent)' }}
                    >
                      <Icon className="h-5 w-5" style={{ color: 'var(--primary-medium)' }} />
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-semibold mb-1"
                        style={{ color: 'var(--primary-dark)' }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ color: 'var(--foreground)' }}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Chrome store rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center mb-6"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <div className="ml-2">
                <span className="font-semibold">4.9/5</span>{" "}
                <span style={{ color: 'color-mix(in oklab, var(--foreground) 70%, transparent)' }}>
                  (2,000+ ratings)
                </span>
              </div>
            </motion.div>
            
            {/* CTA Button */}
            <motion.div
              whileInView={{ 
                y: [0, -5, 0],
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  href="https://chrome.google.com/webstore"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                  style={{
                    textShadow: "0 1px 1px rgba(0,0,0,0.2)"
                  }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 animate-pulse rounded-full bg-white/30"></div>
                    <Chrome className="h-6 w-6 text-white relative z-10" />
                  </div>
                  <span>Add to Chrome</span>
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Browser compatibility */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
              className="text-sm mt-4"
              style={{ color: 'color-mix(in oklab, var(--foreground) 70%, transparent)' }}
            >
              Also available for Firefox, Edge, and Safari
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Missing Lucide icon components 
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Desktop(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="12" rx="2" />
      <rect x="6" y="16" width="12" height="4" />
    </svg>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function X(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
