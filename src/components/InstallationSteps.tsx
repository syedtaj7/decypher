'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Search, Plus, Check, Pin, Zap } from 'lucide-react';

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
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark font-poppins mb-6">
            Get Started in <span className="text-primary-medium">5 Simple Steps</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                  className="relative z-10"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                    {/* Step Number */}
                    <div className="flex items-center justify-center mb-4">
                      <div className={`relative ${step.color} rounded-full p-4 shadow-lg`}>
                        <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
                        <div className="relative bg-white rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary-dark">{step.number}</span>
                        </div>
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="bg-primary-light rounded-xl p-3 group-hover:bg-primary-medium/20 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-primary-medium" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold text-primary-dark font-poppins">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-medium to-primary-dark rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-primary-light mr-3" />
              <h3 className="text-2xl font-bold font-poppins">
                Ready to Install?
              </h3>
            </div>
            <p className="text-primary-light mb-6 max-w-2xl mx-auto">
              Join thousands of users who have already simplified their complex documents. 
              The extension is free and takes less than 2 minutes to install.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-dark hover:bg-primary-light px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                <span>Install Extension</span>
                <Zap className="h-4 w-4" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-dark px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                View on Chrome Store
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
