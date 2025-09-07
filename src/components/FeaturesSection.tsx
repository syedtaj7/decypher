'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FileText, BarChart3, CheckCircle, Zap, Shield, Clock, Users } from 'lucide-react';

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileText,
      title: "Simplify lengthy Terms & Conditions",
      description: "Break down complex legal jargon into simple, understandable language",
      color: "blue",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Explain property deeds via flowcharts",
      description: "Visualize complex property documents with interactive flowcharts",
      color: "green",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: FileText,
      title: "Summarize company proposals",
      description: "Extract key points and create executive summaries automatically",
      color: "purple",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Highlight dos and don'ts",
      description: "Identify important actions and warnings in your documents",
      color: "orange",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Enable faster decision-making",
      description: "Get instant insights to make informed decisions quickly",
      color: "red",
      gradient: "from-red-500 to-red-600"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users", color: "blue" },
    { icon: FileText, value: "50,000+", label: "Documents Processed", color: "purple" },
    { icon: Clock, value: "2 min", label: "Average Processing Time", color: "green" },
    { icon: Shield, value: "99.9%", label: "Uptime Guarantee", color: "orange" }
  ];

  return (
    <section 
      ref={ref} 
      className="py-24 md:py-32 relative"
      id="features-section"
    >
      {/* Background effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70"></div>
        <motion.div 
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-blue-100 opacity-30 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-purple-100 opacity-40 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Top divider */}
      <div className="relative z-10">
        <svg viewBox="0 0 1440 120" className="absolute top-0 w-full">
          <path
            fill="currentColor"
            fillOpacity="0.05"
            d="M0,32L60,37.3C120,43,240,53,360,74.7C480,96,600,128,720,133.3C840,139,960,117,1080,106.7C1200,96,1320,96,1380,96L1440,96L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="inline-block py-2 px-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-lg font-medium">
              Powerful Features
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold font-poppins mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            What Decypher Can Do
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-3xl"
          >
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Transform complex documents into actionable insights with our AI-powered platform
            </p>
          </motion.div>
        </motion.div>

        {/* Features - 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 50
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/20 to-purple-600/20 transform group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
                
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-xl border border-gray-100 overflow-hidden z-10">
                  {/* Background glow effect */}
                  <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full opacity-20 blur-3xl transition-all duration-300 group-hover:opacity-30 group-hover:scale-125"
                    style={{
                      backgroundColor: feature.color === 'blue' ? '#dbeafe' :
                                      feature.color === 'green' ? '#dcfce7' :
                                      feature.color === 'purple' ? '#f3e8ff' :
                                      feature.color === 'orange' ? '#ffedd5' : 
                                      '#fee2e2'
                    }}
                  ></div>
                  
                  {/* Icon with animated circle */}
                  <div className="relative z-10 mb-6">
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-100 opacity-30"
                        animate={{ 
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <div className="relative z-10 rounded-full p-4 shadow-lg group-hover:shadow-xl transition-all duration-300"
                        style={{
                          background: feature.color === 'blue' ? 'linear-gradient(to bottom right, #3b82f6, #2563eb)' :
                                    feature.color === 'green' ? 'linear-gradient(to bottom right, #22c55e, #16a34a)' :
                                    feature.color === 'purple' ? 'linear-gradient(to bottom right, #a855f7, #7e22ce)' :
                                    feature.color === 'orange' ? 'linear-gradient(to bottom right, #f97316, #ea580c)' : 
                                    'linear-gradient(to bottom right, #ef4444, #dc2626)'
                        }}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Learn More Button */}
                    <div className="pt-4">
                      <button className="flex items-center font-medium transition-colors"
                        style={{
                          color: feature.color === 'blue' ? '#2563eb' :
                                feature.color === 'green' ? '#16a34a' :
                                feature.color === 'purple' ? '#7e22ce' :
                                feature.color === 'orange' ? '#ea580c' : 
                                '#dc2626'
                        }}
                      >
                        <span>Learn More</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="inline-block ml-2"
                        >
                          →
                        </motion.span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          {/* Decorative elements */}
          <div className="absolute -left-16 -top-16 w-32 h-32 rounded-full bg-blue-50 opacity-70 blur-xl"></div>
          <div className="absolute -right-16 -bottom-16 w-40 h-40 rounded-full bg-purple-50 opacity-70 blur-xl"></div>
          
          {/* Stats container */}
          <div className="relative bg-white rounded-2xl shadow-xl p-10 md:p-14 backdrop-blur-sm border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50 rounded-2xl"></div>
            
            {/* Stats heading */}
            <div className="text-center mb-12 relative z-10">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent mb-4">
                Trusted by Thousands
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of users who are already simplifying their document experience
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-8 relative z-10">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    custom={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    className="flex flex-col items-center text-center group"
                  >
                    <div className="rounded-2xl p-4 mb-4 transition-colors duration-300 shadow-sm"
                      style={{
                        backgroundColor: stat.color === 'blue' ? '#dbeafe' :
                                        stat.color === 'green' ? '#dcfce7' :
                                        stat.color === 'purple' ? '#f3e8ff' : 
                                        '#ffedd5'
                      }}
                    >
                      <Icon className="h-8 w-8"
                        style={{
                          color: stat.color === 'blue' ? '#2563eb' :
                                stat.color === 'green' ? '#16a34a' :
                                stat.color === 'purple' ? '#7e22ce' : 
                                '#ea580c'
                        }}
                      />
                    </div>
                    
                    <div>
                      <motion.h3 
                        className="text-3xl md:text-4xl font-bold mb-1"
                        style={{
                          color: stat.color === 'blue' ? '#1d4ed8' :
                                stat.color === 'green' ? '#15803d' :
                                stat.color === 'purple' ? '#6b21a8' : 
                                '#c2410c'
                        }}
                        initial={{ scale: 0.9 }}
                        animate={isInView ? { scale: [0.9, 1.1, 1] } : { scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                      >
                        {stat.value}
                      </motion.h3>
                      <p className="text-gray-600 font-medium">{stat.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-24"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-2xl p-12 shadow-xl">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <motion.h3 
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                Ready to Transform Your Documents?
              </motion.h3>
              
              <motion.p 
                className="text-white/90 mb-10 max-w-2xl mx-auto text-lg md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                Start simplifying complex documents today. No credit card required, 
                and you can process your first document in under 2 minutes.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <Link 
                  href="/decypher-it" 
                  className="group relative bg-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 text-center overflow-hidden shadow-lg hover:shadow-2xl"
                >
                  <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:text-white transition-colors duration-300">
                    Start Free Trial
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </Link>
                
                <Link 
                  href="/ai-assist" 
                  className="group relative border-2 border-white text-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 text-center overflow-hidden"
                >
                  <span className="relative z-10">
                    Try AI Assist
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
