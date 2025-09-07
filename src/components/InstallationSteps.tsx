'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Plus, Check, Pin } from 'lucide-react';

export default function InstallationSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: 1,
      icon: Search,
      title: "Open Chrome Web Store",
      description: "Navigate to the Chrome Web Store in your browser",
      color: "bg-blue-500"
    },
    {
      number: 2,
      icon: Search,
      title: "Search for 'Decypher Extension'",
      description: "Type 'Decypher Extension' in the search bar",
      color: "bg-green-500"
    },
    {
      number: 3,
      icon: Plus,
      title: "Click 'Add to Chrome'",
      description: "Click the blue 'Add to Chrome' button on the extension page",
      color: "bg-purple-500"
    },
    {
      number: 4,
      icon: Check,
      title: "Confirm Installation",
      description: "Click 'Add extension' in the confirmation dialog",
      color: "bg-orange-500"
    },
    {
      number: 5,
      icon: Pin,
      title: "Pin Extension for Quick Access",
      description: "Pin the Decypher extension to your toolbar for easy access",
      color: "bg-red-500"
    }
  ];

  return (
    <section 
      ref={ref} 
      className="py-16 md:py-20 relative" 
      style={{ background: 'var(--background)', zIndex: 0 }}
      id="installation-steps-section"
    >
      {/* Top divider */}
      <div className="section-divider fancy mb-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6" style={{ color: 'var(--primary-dark)' }}>
            Get Started in <span style={{ color: 'var(--primary-medium)' }}>5 Simple Steps</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--foreground)' }}>
            Install the Decypher extension and start simplifying complex documents in minutes
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-medium via-primary-medium to-primary-medium transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? 
                    { 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 70,
                        damping: 15,
                        delay: index * 0.2,
                        duration: 0.8
                      }
                    } : 
                    { opacity: 0, y: 30, scale: 0.9 }
                  }
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
                    transition: { duration: 0.3, type: "spring", stiffness: 400 }
                  }}
                  className="relative z-10"
                >
                  <div 
                    style={{ 
                      background: 'var(--background)',
                      borderColor: 'color-mix(in oklab, var(--foreground) 10%, transparent)'
                    }} 
                    className="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border group"
                  >
                    {/* Step Number */}
                    <motion.div 
                      className="flex items-center justify-center mb-4"
                      initial={{ rotate: -5 }}
                      animate={{ rotate: 0 }}
                      transition={{ 
                        delay: index * 0.3 + 0.5, 
                        type: "spring", 
                        stiffness: 200 
                      }}
                    >
                      <div className={`relative ${step.color} rounded-full p-4 shadow-lg`}>
                        <motion.div 
                          className="absolute inset-0 bg-white/20 rounded-full"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            delay: index * 0.4 
                          }}
                        ></motion.div>
                        <motion.div 
                          className="relative bg-white rounded-full w-12 h-12 flex items-center justify-center"
                          whileHover={{ 
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          <span className="text-lg font-bold text-primary-dark">{step.number}</span>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Icon */}
                    <motion.div 
                      className="flex justify-center mb-4"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: index * 0.3 + 0.8,
                        duration: 0.5,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <div className="bg-primary-light rounded-xl p-3 group-hover:bg-primary-medium/20 transition-colors duration-300">
                        <motion.div
                          whileHover={{ rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="h-6 w-6 text-primary-medium" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h3 
                        className="text-lg font-semibold font-poppins"
                        style={{ color: 'var(--primary-dark)' }}
                      >
                        {step.title}
                      </h3>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {step.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <div className="w-8 h-8 bg-primary-medium rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom divider for better section separation */}
        <div className="section-divider fancy mt-16"></div>
        
        {/* Clear fixing element to ensure proper content flow */}
        <div className="clear-both h-4"></div>
      </div>
    </section>
  );
}
