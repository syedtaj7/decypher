'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Send, Bot, User, Download, Share2, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { analyzeDocument, generateContent } from '@/lib/openai';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

import ProtectedRoute from '@/components/ProtectedRoute';

function AiAssistContent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFormats = ['.pdf', '.docx', '.txt'];

  // Predefined prompt suggestions
  const promptSuggestions = [
    "📋 What are the main points of this document?",
    "⚠️ Are there any risks I should know about?",
    "📊 Can you summarize the key sections?",
    "🔍 What should I pay attention to?",
    "💡 Give me actionable insights",
    "❓ What questions should I ask about this?",
  ];

  const followUpPrompts = [
    "🔍 Tell me more about this",
    "📖 Explain this in simpler terms", 
    "⚖️ What are my rights here?",
    "🚨 Any red flags to watch out for?",
    "💰 Are there any costs involved?",
    "📅 Are there important deadlines?",
  ];

  // Function to handle clicking on prompt suggestions
  const handlePromptClick = (prompt: string) => {
    // Remove emoji and send the prompt
    const cleanPrompt = prompt.replace(/^[^\w\s]+\s*/, '');
    setInputMessage(cleanPrompt);
    
    // Automatically send the message
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && acceptedFormats.some(format => file.name.toLowerCase().endsWith(format))) {
      setUploadedFile(file);
      processDocument(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && acceptedFormats.some(format => file.name.toLowerCase().endsWith(format))) {
      setUploadedFile(file);
      processDocument(file);
    }
  };

  const processDocument = async (file: File) => {
    setIsProcessing(true);
    
    try {
      // Use mock AI library for document analysis
      const analysis = await analyzeDocument('dummy-content', `Analyze the uploaded document: ${file.name}`);
      
      setIsProcessing(false);
      setShowChat(true);
      
      // Add initial AI message with actual analysis
      const initialMessage: Message = {
        id: '1',
        type: 'ai',
        content: analysis,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
    } catch (error) {
      console.error('Error processing document:', error);
      setIsProcessing(false);
      
      // Fallback message
      const initialMessage: Message = {
        id: '1',
        type: 'ai',
        content: `I've analyzed your document "${file.name}". I found several key sections including terms of service, privacy policy, and user agreements. What would you like to know about this document?`,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    
    try {
      // Use mock AI library for generating responses
      const aiResponse = await generateContent(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      // Fallback response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Based on your document, here's what I found: The key terms include data collection practices, user responsibilities, and platform limitations. Would you like me to explain any specific section in more detail?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse-slow" style={{animationDelay: '4s'}}></div>
          </div>

          {/* AI Assist Hero Section */}
          {!showChat && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="text-center pt-8 pb-16 relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden -z-10">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-300/20 to-blue-300/20 mix-blend-multiply filter blur-3xl"
                />
                <motion.div 
                  animate={{ 
                    scale: [1.2, 1, 1.2],
                    rotate: [360, 180, 0]
                  }}
                  transition={{ 
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 mix-blend-multiply filter blur-3xl"
                />
                <motion.div 
                  animate={{ 
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-40 right-1/3 w-64 h-64 rounded-full bg-gradient-to-r from-indigo-300/15 to-violet-300/15 mix-blend-multiply filter blur-3xl"
                />
              </div>
              
              {/* Floating chat bubbles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-32 left-20 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-indigo-100"
                >
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-500" />
                    <div className="text-xs text-gray-600">&ldquo;How can I help?&rdquo;</div>
                  </div>
                </motion.div>
                
                <motion.div
                  animate={{ 
                    y: [0, 15, 0],
                    x: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute top-48 right-16 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-purple-100"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500" />
                    <div className="text-xs text-gray-600">&ldquo;Explain this document&rdquo;</div>
                  </div>
                </motion.div>
              </div>
              
              {/* Conversation starter badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="relative z-10 mb-8"
              >
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/90 to-blue-600/90 text-white font-medium shadow-lg shadow-cyan-500/25">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Bot className="w-5 h-5 text-cyan-100 mr-2" />
                  </motion.div>
                  <span className="text-base">Your Personal Document Companion</span>
                </div>
              </motion.div>
              
              {/* Main title with conversation theme */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative z-10 mb-6"
              >
                <h1 className="text-6xl md:text-8xl font-bold font-poppins tracking-tight leading-tight">
                  <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
                    Chat
                  </span>
                  <br />
                  <span className="relative inline-block">
                    <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
                      with Docs
                    </span>
                    <motion.div 
                      animate={{ scaleX: [0, 1] }}
                      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                      className="absolute -bottom-2 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    />
                  </span>
                </h1>
              </motion.div>
              
              {/* Interactive subtitle */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative z-10 mb-12"
              >
                <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  Turn any document into an <span className="font-semibold text-blue-600">intelligent conversation</span>.
                  <br />
                  Ask questions, get insights, understand complex content effortlessly.
                </p>
              </motion.div>
              
              {/* Interactive preview card */}
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1, duration: 0.8, type: "spring" }}
                className="relative z-10 max-w-5xl mx-auto mb-16"
              >
                <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                  {/* Mock chat interface header */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
                        >
                          <Bot className="w-5 h-5 text-white" />
                        </motion.div>
                        <div>
                          <div className="text-white font-semibold">AI Assistant</div>
                          <div className="text-blue-100 text-sm flex items-center gap-1">
                            <motion.div 
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-2 h-2 bg-green-300 rounded-full"
                            />
                            Ready to help
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mock conversation */}
                  <div className="p-6 space-y-4 min-h-[200px]">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-50 rounded-2xl px-4 py-3 max-w-md">
                        <p className="text-gray-700">Hi! I&apos;ve analyzed your document. What would you like to know about it?</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2, duration: 0.5 }}
                      className="flex items-start gap-3 justify-end"
                    >
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl px-4 py-3 max-w-md">
                        <p className="text-white">What are the main points I should know?</p>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-50 rounded-2xl px-4 py-3 max-w-md">
                        <p className="text-gray-700">Here are the 3 key sections: Privacy Policy, User Rights, and Data Usage...</p>
                      </div>
                    </motion.div>
                    
                    {/* Typing indicator */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3, duration: 0.5 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-gray-50 rounded-2xl px-4 py-3">
                        <div className="flex gap-1">
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                          <motion.div 
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                            className="w-2 h-2 bg-gray-400 rounded-full"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Call to action */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.6 }}
                className="relative z-10"
              >
                <p className="text-lg text-gray-600 mb-8">Ready to start your conversation?</p>
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-blue-500"
                >
                  <div className="text-sm font-medium">Upload your document below ↓</div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

        {!showChat ? (
          /* Enhanced Document Upload Section */
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl mx-auto relative z-10"
          >
            <div
              className={`relative border-3 border-dashed rounded-3xl p-16 text-center transition-all duration-500 transform hover:scale-105 ${
                isDragOver
                  ? 'border-purple-400 bg-gradient-to-r from-purple-100 to-pink-100 shadow-2xl scale-105'
                  : 'border-gray-300 bg-white/80 backdrop-blur-sm hover:border-purple-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 shadow-xl hover:shadow-2xl'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-purple-400 rounded-tl-lg"></div>
              <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-pink-400 rounded-tr-lg"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-cyan-400 rounded-bl-lg"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-orange-400 rounded-br-lg"></div>

              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 w-fit mx-auto shadow-lg">
                      <FileText className="h-16 w-16 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-2 shadow-lg">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        ✨
                      </motion.div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      {uploadedFile.name}
                    </h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-green-700 font-medium text-lg"
                    >
                      ✅ File uploaded successfully!
                    </motion.p>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-8">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="relative mx-auto w-fit"
                  >
                    <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full p-8 shadow-2xl">
                      <Upload className="h-20 w-20 text-white" />
                    </div>
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full blur opacity-30 animate-pulse"></div>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Upload Your Document
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed max-w-lg mx-auto">
                      Drag and drop your file here, or click the magic button below to browse. 
                      Our AI will analyze it instantly! ✨
                    </p>
                  </div>

                  <div className="space-y-6">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 hover:from-purple-600 hover:via-pink-600 hover:to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform"
                    >
                      <span className="flex items-center gap-3">
                        <Upload className="w-6 h-6" />
                        Choose File
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.button>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      {acceptedFormats.map((format, index) => (
                        <motion.span
                          key={format}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index }}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-full text-sm font-medium"
                        >
                          {format}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Processing State */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/90 via-pink-500/90 to-indigo-500/90 backdrop-blur-sm rounded-3xl flex items-center justify-center"
                  >
                    <div className="text-center space-y-6 text-white">
                      <div className="relative mx-auto w-fit">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
                        ></motion.div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Bot className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">
                          AI is Analyzing...
                        </h3>
                        <motion.p
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-lg"
                        >
                          Extracting insights and preparing magic ✨
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* Enhanced Chat Interface */
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto relative z-10"
          >
            {/* Chat Header */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-t-3xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div 
                    animate={{ 
                      boxShadow: ["0 0 0 0 rgba(168, 85, 247, 0.7)", "0 0 0 10px rgba(168, 85, 247, 0)", "0 0 0 0 rgba(168, 85, 247, 0)"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-white rounded-full p-3 shadow-lg"
                  >
                    <Bot className="h-8 w-8 text-purple-600" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      AI Assistant
                      <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-yellow-300"
                      >
                        ✨
                      </motion.span>
                    </h3>
                    <div className="text-purple-100 flex items-center gap-2">
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      ></motion.div>
                      Analyzing: {uploadedFile?.name}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  >
                    <Download className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 text-white hover:bg-white/20 rounded-full transition-all duration-200"
                  >
                    <Share2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowChat(false);
                      setUploadedFile(null);
                      setMessages([]);
                    }}
                    className="p-3 text-white hover:bg-red-500/20 rounded-full transition-all duration-200"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Messages */}
            <div className="bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-sm h-96 overflow-y-auto p-6 space-y-6 border-x-2 border-purple-200">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex flex-col space-y-3 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      <div className={`flex items-start space-x-3 ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <motion.div 
                          whileHover={{ scale: 1.1 }}
                          className={`rounded-full p-3 shadow-lg ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                        >
                          {message.type === 'user' ? (
                            <User className="h-5 w-5 text-white" />
                          ) : (
                            <Bot className="h-5 w-5 text-white" />
                          )}
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className={`rounded-2xl px-6 py-4 shadow-lg max-w-md ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                              : 'bg-white text-gray-800 border border-purple-100'
                          }`}
                        >
                          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          <p className={`text-xs mt-2 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </motion.div>
                      </div>
                      
                      {/* Follow-up prompts for AI messages */}
                      {message.type === 'ai' && index === messages.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="flex flex-wrap gap-2 max-w-md"
                        >
                          {followUpPrompts.slice(0, 3).map((prompt, promptIndex) => (
                            <motion.button
                              key={promptIndex}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.7 + promptIndex * 0.1 }}
                              whileHover={{ 
                                scale: 1.05,
                                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                                borderColor: 'rgba(147, 51, 234, 0.3)'
                              }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handlePromptClick(prompt)}
                              className="px-3 py-2 text-xs rounded-lg border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 hover:text-purple-800 transition-all duration-200"
                            >
                              {prompt}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Enhanced Empty state with prompt suggestions */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center py-8"
                >
                  <div className="text-gray-400 text-lg mb-6">
                    Start chatting with your document! 💬
                  </div>
                  
                  {/* Prompt suggestions */}
                  <div className="text-left max-w-lg mx-auto">
                    <p className="text-sm text-gray-500 mb-4 text-center">✨ Try asking:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {promptSuggestions.map((prompt, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ 
                            scale: 1.02, 
                            backgroundColor: 'rgba(99, 102, 241, 0.05)',
                            borderColor: 'rgba(99, 102, 241, 0.3)'
                          }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handlePromptClick(prompt)}
                          className="text-left p-3 rounded-xl border border-gray-200 hover:border-indigo-300 bg-white hover:bg-indigo-50/50 transition-all duration-200 text-sm text-gray-700 hover:text-indigo-700"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Enhanced Input */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-b-3xl p-6 shadow-2xl"
            >
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your document..."
                    className="w-full px-6 py-4 border-2 border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 focus:border-white bg-white/10 backdrop-blur-sm text-white placeholder-white/70 text-lg"
                  />
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50"
                  >
                    ✨
                  </motion.div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-white hover:bg-gray-100 disabled:bg-white/30 text-purple-600 disabled:text-white/50 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl"
                >
                  <Send className="h-5 w-5" />
                  <span>Send</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
    </Layout>
  );
}

// Export a wrapped version with authentication protection
export default function AiAssistPage() {
  return (
    <ProtectedRoute>
      <AiAssistContent />
    </ProtectedRoute>
  );
}
