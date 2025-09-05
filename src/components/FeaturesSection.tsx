'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FileText, BarChart3, CheckCircle, XCircle, Zap, Shield, Clock, Users } from 'lucide-react';

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: FileText,
      title: "Simplify lengthy Terms & Conditions",
      description: "Break down complex legal jargon into simple, understandable language",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: BarChart3,
      title: "Explain property deeds via flowcharts",
      description: "Visualize complex property documents with interactive flowcharts",
      color: "from-green-500 to-green-600"
    },
    {
      icon: FileText,
      title: "Summarize company proposals",
      description: "Extract key points and create executive summaries automatically",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: CheckCircle,
      title: "Highlight dos and don'ts",
      description: "Identify important actions and warnings in your documents",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Zap,
      title: "Enable faster decision-making",
      description: "Get instant insights to make informed decisions quickly",
      color: "from-red-500 to-red-600"
    }
  ];

  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users" },
    { icon: FileText, value: "50,000+", label: "Documents Processed" },
    { icon: Clock, value: "2 min", label: "Average Processing Time" },
    { icon: Shield, value: "99.9%", label: "Uptime Guarantee" }
  ];

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark font-poppins mb-6">
            What <span className="text-primary-medium">Decypher</span> Can Do
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform complex documents into actionable insights with our AI-powered platform
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className={`bg-gradient-to-r ${feature.color} rounded-2xl p-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary-dark font-poppins group-hover:text-primary-medium transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center text-primary-medium font-semibold">
                    <span>Learn More</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary-dark font-poppins mb-2">
              Trusted by Thousands
            </h3>
            <p className="text-gray-600">
              Join the growing community of users who rely on Decypher
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="bg-primary-light rounded-xl p-3">
                      <Icon className="h-6 w-6 text-primary-medium" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary-dark font-poppins mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-dark to-primary-medium rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold font-poppins mb-4">
              Ready to Transform Your Documents?
            </h3>
            <p className="text-primary-light mb-8 max-w-2xl mx-auto text-lg">
              Start simplifying complex documents today. No credit card required, 
              and you can process your first document in under 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/decypher-it" className="bg-white text-primary-dark hover:bg-primary-light px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 text-center">
                Start Free Trial
              </Link>
              <Link href="/ai-assist" className="border-2 border-white text-white hover:bg-white hover:text-primary-dark px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 text-center">
                Try AI Assist
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
