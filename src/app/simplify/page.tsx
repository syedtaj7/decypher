'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowLeft, Download, Share2, Sparkles, Split } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SimplifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileId = searchParams.get('fileId');
  
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('parsing');
  const [simplifiedContent, setSimplifiedContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  
  // Simulate document processing
  useEffect(() => {
    if (!fileId) {
      router.push('/upload');
      return;
    }
    
    // Simulate document parsing and processing
    const totalTime = 5000; // 5 seconds total
    const interval = 50;
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const simulateProcessing = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(newProgress);
      
      // Update processing step descriptions
      if (newProgress < 30) {
        setCurrentStep('parsing');
      } else if (newProgress < 60) {
        setCurrentStep('analyzing');
      } else if (newProgress < 90) {
        setCurrentStep('simplifying');
      } else {
        setCurrentStep('finalizing');
      }
      
      if (currentStep >= steps) {
        clearInterval(simulateProcessing);
        setIsLoading(false);
        
        // Sample content
        setOriginalContent('This Agreement ("Agreement") is entered into as of the Effective Date, by and between Company XYZ, Inc., a Delaware corporation with offices at 123 Main Street, Anytown, AN 12345 ("Company"), and the undersigned customer ("Customer"). WHEREAS, Company has developed certain proprietary software applications and platforms that it makes available to customers via the internet on a subscription basis; and WHEREAS, Customer desires to use Company\'s services, and Company desires to provide such services to Customer, each on the terms and conditions set forth in this Agreement. NOW, THEREFORE, in consideration of the mutual covenants, terms, and conditions set forth herein, and for other good and valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows...');
        
        setSimplifiedContent(
          `# Simplified Agreement with Company XYZ

## What This Is
This is a contract between you and Company XYZ for using their software.

## Key Points
- **Service**: You get access to Company XYZ's software via internet subscription
- **Payment**: You agree to pay the subscription fees
- **Term**: This agreement starts on the Effective Date and continues until canceled

## Your Responsibilities
- Use the software appropriately
- Maintain account security
- Provide accurate information

## Company's Responsibilities
- Provide the software service
- Maintain reasonable security measures
- Provide customer support

## Important Notes
- The software is provided "as is"
- Company XYZ can update the terms with notice
- Either party can terminate with proper notice`
        );
      }
    }, interval);
    
    return () => clearInterval(simulateProcessing);
  }, [fileId, router]);

  // Format the markdown content to HTML
  const formatMarkdown = (markdown: string) => {
    return markdown
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mb-4 text-gray-800">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold mb-3 mt-6 text-gray-800">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-2 mt-4 text-gray-800">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\- (.*$)/gm, '<li class="ml-4 mb-2">$1</li>')
      .split('\n\n').join('<br/><br/>')
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-24">
      <div className="container mx-auto px-4">
        {/* Header with back button */}
        <div className="mb-8">
          <Link href="/upload" className="inline-flex items-center text-[#8C7FF8] hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Upload
          </Link>
        </div>

        {isLoading ? (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Processing Your Document</h1>
            
            {/* Processing animation */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-[#8C7FF8]/10 flex items-center justify-center relative">
                <Sparkles className="h-12 w-12 text-[#8C7FF8]" />
                <div className="absolute inset-0 rounded-full border-4 border-[#8C7FF8] border-opacity-0 border-t-[#8C7FF8]">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {currentStep === 'parsing' && 'Parsing document...'}
                  {currentStep === 'analyzing' && 'Analyzing content...'}
                  {currentStep === 'simplifying' && 'Simplifying language...'}
                  {currentStep === 'finalizing' && 'Finalizing results...'}
                </span>
                <span className="text-sm font-semibold text-[#8C7FF8]">{progress}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-[#8C7FF8] rounded-full"
                  style={{ boxShadow: '0 0 10px rgba(140, 127, 248, 0.7)' }}
                />
              </div>
            </div>
            
            {/* Processing steps */}
            <div className="space-y-4">
              <div className={`flex items-center ${currentStep === 'parsing' || progress >= 30 ? 'text-[#8C7FF8]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'parsing' || progress >= 30 ? 'bg-[#8C7FF8]' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <span className="text-white text-sm">1</span>
                </div>
                <span className="font-medium">Parsing document structure</span>
              </div>
              
              <div className={`flex items-center ${currentStep === 'analyzing' || progress >= 60 ? 'text-[#8C7FF8]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'analyzing' || progress >= 60 ? 'bg-[#8C7FF8]' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <span className="text-white text-sm">2</span>
                </div>
                <span className="font-medium">Analyzing content complexity</span>
              </div>
              
              <div className={`flex items-center ${currentStep === 'simplifying' || progress >= 90 ? 'text-[#8C7FF8]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'simplifying' || progress >= 90 ? 'bg-[#8C7FF8]' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <span className="text-white text-sm">3</span>
                </div>
                <span className="font-medium">Simplifying language</span>
              </div>
              
              <div className={`flex items-center ${currentStep === 'finalizing' || progress >= 100 ? 'text-[#8C7FF8]' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full ${currentStep === 'finalizing' || progress >= 100 ? 'bg-[#8C7FF8]' : 'bg-gray-200'} flex items-center justify-center mr-3`}>
                  <span className="text-white text-sm">4</span>
                </div>
                <span className="font-medium">Generating simplified document</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Result header */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-xl bg-[#8C7FF8]/10 flex items-center justify-center mr-4">
                    <FileText className="h-6 w-6 text-[#8C7FF8]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Simplified Document</h1>
                    <p className="text-gray-500">Complexity reduced by 68%</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-[#8C7FF8] hover:bg-[#8C7FF8]/10 rounded-lg transition-colors">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-[#8C7FF8] hover:bg-[#8C7FF8]/10 rounded-lg transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setShowComparison(!showComparison)}
                    className={`p-2 rounded-lg transition-colors ${showComparison ? 'text-[#8C7FF8] bg-[#8C7FF8]/10' : 'text-gray-500 hover:text-[#8C7FF8] hover:bg-[#8C7FF8]/10'}`}
                  >
                    <Split className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {/* Toggle between simplified and original */}
              <div className="mt-6 flex">
                <button 
                  className={`flex-1 py-2 text-center text-sm font-medium rounded-l-lg ${!showComparison ? 'bg-[#8C7FF8] text-white' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setShowComparison(false)}
                >
                  Simplified Version
                </button>
                <button 
                  className={`flex-1 py-2 text-center text-sm font-medium rounded-r-lg ${showComparison ? 'bg-[#8C7FF8] text-white' : 'bg-gray-100 text-gray-600'}`}
                  onClick={() => setShowComparison(true)}
                >
                  Side-by-Side Comparison
                </button>
              </div>
            </div>
            
            {/* Content display */}
            {!showComparison ? (
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div 
                  className="prose max-w-none" 
                  dangerouslySetInnerHTML={{ __html: formatMarkdown(simplifiedContent) }}
                />
                
                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
                  <p className="text-gray-600 mb-4 md:mb-0">
                    Was this simplification helpful?
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Simplify Another Document
                    </button>
                    <button className="px-6 py-2 bg-[#8C7FF8] text-white rounded-lg hover:bg-[#7B6EE7] transition-colors shadow-md">
                      Save This Document
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-r border-gray-200 pr-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Original Document</h3>
                    <div className="text-gray-600">
                      {originalContent}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Simplified Version</h3>
                    <div 
                      className="prose max-w-none" 
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(simplifiedContent) }}
                    />
                  </div>
                </div>
                
                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between">
                  <p className="text-gray-600 mb-4 md:mb-0">
                    Was this simplification helpful?
                  </p>
                  <div className="flex space-x-3">
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Simplify Another Document
                    </button>
                    <button className="px-6 py-2 bg-[#8C7FF8] text-white rounded-lg hover:bg-[#7B6EE7] transition-colors shadow-md">
                      Save This Document
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
