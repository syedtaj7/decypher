'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FileText, Brain, Zap, Shield } from 'lucide-react';

export default function WhatIsDecypher() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileText,
      title: "Document Analysis",
      description: "AI-powered analysis of complex legal, business, and technical documents"
    },
    {
      icon: Brain,
      title: "Smart Simplification",
      description: "Transform complex language into easy-to-understand explanations"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get clear steps, flowcharts, and actionable insights in seconds"
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "Your documents are processed securely with enterprise-grade encryption"
    }
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>
        <motion.div 
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-blue-100 opacity-30 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            y: [0, 20, 0],
            opacity: [0.3, 0.4, 0.3]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-100 opacity-30 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="inline-block py-2 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-medium">
              About Decypher
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold font-poppins mb-8 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 bg-clip-text text-transparent">
            What is Decypher?
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Decypher is an AI-powered tool that simplifies complex legal, business, and technical 
              documents into easy-to-understand steps, flowcharts, and actionable dos and don&apos;ts.
            </p>
          </motion.div>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = [
              { icon: "linear-gradient(135deg, #60a5fa, #3b82f6)", bg: "#dbeafe", text: "#1e40af" },
              { icon: "linear-gradient(135deg, #a78bfa, #8b5cf6)", bg: "#ede9fe", text: "#5b21b6" },
              { icon: "linear-gradient(135deg, #34d399, #10b981)", bg: "#d1fae5", text: "#065f46" },
              { icon: "linear-gradient(135deg, #fb923c, #f97316)", bg: "#ffedd5", text: "#9a3412" }
            ];
            
            return (
              <motion.div
                key={feature.title}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 60
                }}
                whileHover={{ 
                  y: -12,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                className="group relative"
              >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 transform group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 overflow-hidden z-10">
                  {/* Background glow effect */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 blur-3xl transition-all duration-300 group-hover:opacity-30 group-hover:scale-125"
                    style={{ backgroundColor: colors[index].bg }}></div>
                  
                  {/* Icon with animated circle */}
                  <div className="relative z-10 mb-6">
                    <div className="relative flex justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-30"
                        style={{ backgroundColor: colors[index].bg }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="relative z-10 rounded-full p-4 shadow-lg group-hover:shadow-xl transition-all duration-300 w-16 h-16 flex items-center justify-center"
                        style={{ background: colors[index].icon }}>
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3 relative z-10">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-24"
        >
          <motion.div 
            className="rounded-3xl max-w-3xl mx-auto relative overflow-hidden shadow-xl"
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.15)"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {/* Glass card effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/90 to-white/80 backdrop-blur-sm border border-white/40 rounded-3xl"></div>
            
            {/* Decorative circles */}
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-blue-200/50 blur-3xl"></div>
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-indigo-200/50 blur-3xl"></div>
            
            <div className="relative z-10 p-10 md:p-14">
              <motion.h3 
                className="text-3xl font-bold mb-5 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                Ready to Simplify Your Documents?
              </motion.h3>
              
              <motion.p 
                className="mb-10 text-lg text-gray-700 max-w-xl mx-auto"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Join thousands of users who have already simplified their complex documents with Decypher.
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, delay: 1.4, type: "spring" }}
                >
                  <Link 
                    href="/decypher-it" 
                    className="group relative bg-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 text-center overflow-hidden shadow-lg hover:shadow-2xl"
                  >
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                      Get Started Free
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 1.6, type: "spring" }}
                >
                  <Link 
                    href="/ai-assist" 
                    className="group relative border-2 border-indigo-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 text-center overflow-hidden"
                  >
                    <span className="relative z-10 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                      Try AI Assist
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
