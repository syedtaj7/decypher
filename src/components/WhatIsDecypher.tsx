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
    <section ref={ref} className="py-20 bg-primary-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark font-poppins mb-6">
            What is <span className="text-primary-medium">Decypher</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Decypher is an AI-powered tool that simplifies complex legal, business, and technical 
            documents into easy-to-understand steps, flowcharts, and actionable dos and don'ts.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 50, rotateY: -15 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Icon */}
                  <div className="relative">
                    <div className="bg-primary-medium/10 rounded-2xl p-4 group-hover:bg-primary-medium/20 transition-colors duration-300">
                      <Icon className="h-8 w-8 text-primary-medium" />
                    </div>
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-primary-medium/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-primary-dark font-poppins">
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
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              Ready to Simplify Your Documents?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of users who have already simplified their complex documents with Decypher.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/decypher-it" className="bg-primary-medium hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 text-center">
                Get Started Free
              </Link>
              <Link href="/ai-assist" className="border-2 border-primary-medium text-primary-medium hover:bg-primary-medium hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-center">
                Try AI Assist
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
