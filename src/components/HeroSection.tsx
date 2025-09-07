'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1976d2] via-[#1e88e5] to-[#42a5f5] py-16 md:py-24">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
        className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3, y: [0, -15, 0] }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.6 },
          y: { repeat: Infinity, duration: 8, ease: "easeInOut" }
        }}
        className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl"
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2, x: [0, 15, 0] }}
        transition={{ 
          opacity: { duration: 1.5, delay: 0.9 },
          x: { repeat: Infinity, duration: 10, ease: "easeInOut" }
        }}
        className="absolute top-1/4 right-1/4 w-28 h-28 bg-white/10 rounded-full blur-xl"
      />

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="0.1"
            d="M0,64L60,69.3C120,75,240,85,360,74.7C480,64,600,32,720,21.3C840,11,960,21,1080,21.3C1200,21,1320,11,1380,5.3L1440,0L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="block">Decypher - AI That</span>
              <span className="block">Makes Documents</span>
              <span className="block">Human-Friendly</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-lg">
              From Terms & Conditions to Business Proposals, 
              get clear steps, flowcharts, and dos & don&apos;ts 
              instantly.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link 
                  href="/decypher-it" 
                  className="bg-[#1565c0] hover:bg-[#0d47a1] text-white px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  Try Decypher
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
              >
                <Link 
                  href="/extension" 
                  className="bg-white text-[#1976d2] px-8 py-3 rounded-md font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    <Download className="h-5 w-5" />
                  </motion.div>
                  <span>Install Extension</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Robot Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center lg:justify-end relative"
          >
            {/* Floating circle decorations */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="absolute -left-4 top-1/2 w-8 h-8 bg-blue-200/40 rounded-full blur-sm z-0"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.5, scale: 1, y: [0, -15, 0] }}
              transition={{ 
                opacity: { duration: 1, delay: 1.5 },
                scale: { duration: 1, delay: 1.5 },
                y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
              }}
              className="absolute -right-6 bottom-1/3 w-10 h-10 bg-blue-100/30 rounded-full blur-sm z-0"
            />
            
            {/* Robot container with float animation */}
            <motion.div
              animate={{ 
                y: [0, -12, 0],
                rotateZ: [0, 1, 0, -1, 0] 
              }}
              transition={{ 
                y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                rotateZ: { repeat: Infinity, duration: 8, ease: "easeInOut" }
              }}
              className="relative z-10"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.5,
                  duration: 0.8
                }}
              >
                {/* Light glow behind robot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-400/20 rounded-full blur-2xl z-0"></div>
                
                <Image
                  src="/robot1.png"
                  alt="Decypher AI Robot"
                  width={500}
                  height={500}
                  priority
                  className="object-contain relative z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
