'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, CheckCircle, XCircle, Download, Share2 } from 'lucide-react';

export default function DecypherItPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const platforms = [
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Terms of Service and Privacy Policy',
      icon: '📸'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Terms of Service and Data Policy',
      icon: '👥'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      description: 'Terms of Service and Privacy Policy',
      icon: '👻'
    }
  ];

  const handlePlatformSelect = async (platform: string) => {
    setSelectedPlatform(platform);
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResults(true);
    }, 3000);
  };

  const results = {
    flowchart: [
      { id: 1, title: "Account Creation", description: "You must be 13+ to create an account", type: "requirement" },
      { id: 2, title: "Content Ownership", description: "You retain rights to your content", type: "right" },
      { id: 3, title: "Data Collection", description: "Platform collects usage data", type: "warning" },
      { id: 4, title: "Content Moderation", description: "Platform can remove content", type: "limitation" },
      { id: 5, title: "Account Termination", description: "Platform can suspend accounts", type: "warning" }
    ],
    dos: [
      "Read privacy settings carefully",
      "Keep personal information private",
      "Report inappropriate content",
      "Use strong passwords"
    ],
    donts: [
      "Don't share personal information",
      "Don't post inappropriate content",
      "Don't create fake accounts",
      "Don't violate community guidelines"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-0 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark font-poppins mb-4">
            Decypher <span className="text-primary-medium">It</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our preloaded Terms & Conditions to see how Decypher works. 
            Get instant flowcharts, summaries, and actionable insights.
          </p>
        </motion.div>

        {/* Platform Selection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-primary-dark mb-6 text-center">
            Select a Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platforms.map((platform, index) => (
              <motion.button
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePlatformSelect(platform.id)}
                disabled={isProcessing}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? 'border-primary-medium bg-primary-medium/10'
                    : 'border-gray-200 bg-white hover:border-primary-medium hover:bg-primary-light/50'
                } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="text-center space-y-4">
                  <div className="text-4xl">{platform.icon}</div>
                  <h3 className="text-xl font-semibold text-primary-dark">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {platform.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Processing State */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-12"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-medium border-t-transparent mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-primary-dark mb-2">
                  AI is Processing...
                </h3>
                <p className="text-gray-600">
                  Analyzing document structure and extracting key insights
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary-medium hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export to PDF</span>
                </button>
                <button className="border-2 border-primary-medium text-primary-medium hover:bg-primary-medium hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                  <Share2 className="h-4 w-4" />
                  <span>Share Results</span>
                </button>
              </div>

              {/* Flowchart */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <BarChart3 className="h-6 w-6 text-primary-medium mr-3" />
                  <h3 className="text-2xl font-semibold text-primary-dark">
                    Document Flowchart
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.flowchart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        item.type === 'requirement' ? 'border-blue-500 bg-blue-50' :
                        item.type === 'right' ? 'border-green-500 bg-green-50' :
                        item.type === 'warning' ? 'border-orange-500 bg-orange-50' :
                        'border-red-500 bg-red-50'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dos and Don'ts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dos */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                    <h3 className="text-2xl font-semibold text-primary-dark">
                      Do&apos;s
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {results.dos.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Don'ts */}
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <XCircle className="h-6 w-6 text-red-500 mr-3" />
                    <h3 className="text-2xl font-semibold text-primary-dark">
                      Don&apos;ts
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {results.donts.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Try Another Document */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setSelectedPlatform(null);
                    setShowResults(false);
                  }}
                  className="bg-primary-light hover:bg-primary-medium/20 text-primary-dark px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                >
                  Try Another Document
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

