'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Play } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary-medium/80 to-primary-medium/90"></div>
        
        {/* Animated Background Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-accent/20 rounded-full blur-lg animate-bounce-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse-slow"></div>
        
        {/* Wave Element */}
        <div className="absolute bottom-0 right-0 w-96 h-96">
          <svg viewBox="0 0 400 400" className="w-full h-full">
            <path
              d="M0,200 Q100,100 200,200 T400,200 L400,400 L0,400 Z"
              fill="rgba(255,255,255,0.1)"
              className="animate-pulse-slow"
            />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white space-y-8"
          >
            {/* Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight"
              >
                <span className="block">Decypher -</span>
                <span className="block text-primary-light">AI That Makes</span>
                <span className="block">Documents Human-Friendly</span>
              </motion.h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl text-primary-light max-w-lg leading-relaxed"
            >
              From Terms & Conditions to Business Proposals, get clear steps, 
              flowcharts, and dos & don'ts instantly.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/decypher-it"
                className="group bg-primary-medium hover:bg-primary-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Try Decypher</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                href="/extension"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:border-white/50"
              >
                <Download className="h-5 w-5" />
                <span>Install Extension</span>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-white/20 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-semibold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-primary-light">10,000+ users</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-sm">★</span>
                  ))}
                </div>
                <span className="text-sm text-primary-light">4.9/5 rating</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - AI Robot Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* AI Robot */}
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
                className="relative z-20"
              >
                {/* Robot Body */}
                <div className="bg-white rounded-2xl p-8 shadow-2xl">
                  {/* Robot Head */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary-medium rounded-full p-4">
                      <div className="bg-white rounded-lg w-12 h-8 flex items-center justify-center">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                          <div className="w-2 h-2 bg-primary-dark rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Robot Body */}
                  <div className="bg-primary-light rounded-xl p-6 mb-4">
                    <div className="space-y-2">
                      <div className="h-2 bg-primary-medium rounded w-3/4"></div>
                      <div className="h-2 bg-primary-medium rounded w-1/2"></div>
                      <div className="h-2 bg-primary-medium rounded w-2/3"></div>
                    </div>
                  </div>
                  
                  {/* Robot Arms */}
                  <div className="flex justify-between items-center">
                    <div className="bg-primary-medium rounded-lg w-8 h-16"></div>
                    <div className="bg-primary-medium rounded-lg w-8 h-16"></div>
                  </div>
                </div>
              </motion.div>

              {/* Document in Robot's Hand */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-lg p-4 shadow-lg z-10"
              >
                <div className="space-y-2">
                  <div className="h-1 bg-primary-medium rounded w-16"></div>
                  <div className="h-1 bg-primary-medium rounded w-12"></div>
                  <div className="h-1 bg-primary-medium rounded w-14"></div>
                  <div className="h-1 bg-primary-medium rounded w-10"></div>
                </div>
              </motion.div>

              {/* Flowchart Background */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -right-8 -top-8 bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg z-0"
              >
                <div className="space-y-3">
                  {/* Flowchart Nodes */}
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary-medium rounded-full"></div>
                    <div className="w-16 h-2 bg-primary-light rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div className="w-12 h-2 bg-primary-light rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2 ml-8">
                    <div className="w-3 h-3 bg-primary-medium rounded-full"></div>
                    <div className="w-14 h-2 bg-primary-light rounded"></div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <div className="w-10 h-2 bg-primary-light rounded"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-accent text-white rounded-full p-2 shadow-lg"
              >
                <Play className="h-4 w-4" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
