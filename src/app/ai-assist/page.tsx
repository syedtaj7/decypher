'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, Send, Bot, User, Download, Share2, X } from 'lucide-react';
import Layout from '@/components/Layout';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export default function AiAssistPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFormats = ['.pdf', '.docx', '.txt'];

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
    
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowChat(true);
      
      // Add initial AI message
      const initialMessage: Message = {
        id: '1',
        type: 'ai',
        content: `I've analyzed your document "${file.name}". I found several key sections including terms of service, privacy policy, and user agreements. What would you like to know about this document?`,
        timestamp: new Date()
      };
      
      setMessages([initialMessage]);
    }, 3000);
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
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "Based on your document, here's what I found: The key terms include data collection practices, user responsibilities, and platform limitations. Would you like me to explain any specific section in more detail?",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout>
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
            AI <span className="text-primary-medium">Assist</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Upload your document and chat with our AI to get instant insights, 
            flowcharts, and explanations in real-time.
          </p>
        </motion.div>

        {!showChat ? (
          /* Document Upload Section */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                isDragOver
                  ? 'border-primary-medium bg-primary-light/20'
                  : 'border-gray-300 hover:border-primary-medium hover:bg-primary-light/10'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedFormats.join(',')}
                onChange={handleFileSelect}
                className="hidden"
              />

              {uploadedFile ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-primary-medium/10 rounded-full p-4 w-fit mx-auto">
                    <FileText className="h-12 w-12 text-primary-medium" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-dark">
                    {uploadedFile.name}
                  </h3>
                  <p className="text-gray-600">
                    File uploaded successfully
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-primary-medium/10 rounded-full p-6 w-fit mx-auto">
                    <Upload className="h-16 w-16 text-primary-medium" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-primary-dark">
                      Upload Your Document
                    </h3>
                    <p className="text-gray-600">
                      Drag and drop your file here, or click to browse
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-primary-medium hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
                    >
                      Choose File
                    </button>
                    
                    <div className="text-sm text-gray-500">
                      Supported formats: {acceptedFormats.join(', ')}
                    </div>
                  </div>
                </div>
              )}

              {/* Processing State */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                  >
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-medium border-t-transparent mx-auto"></div>
                      <h3 className="text-xl font-semibold text-primary-dark">
                        AI is Analyzing...
                      </h3>
                      <p className="text-gray-600">
                        Extracting content and preparing for chat
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* Chat Interface */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Chat Header */}
            <div className="bg-white rounded-t-2xl p-6 shadow-lg border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-medium rounded-full p-2">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-dark">
                      AI Assistant
                    </h3>
                    <p className="text-sm text-gray-600">
                      Analyzing: {uploadedFile?.name}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-primary-medium transition-colors duration-200">
                    <Download className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-primary-medium transition-colors duration-200">
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setShowChat(false);
                      setUploadedFile(null);
                      setMessages([]);
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white h-96 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`rounded-full p-2 ${
                        message.type === 'user' 
                          ? 'bg-primary-medium' 
                          : 'bg-gray-200'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.type === 'user'
                          ? 'bg-primary-medium text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-primary-light' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="bg-white rounded-b-2xl p-6 shadow-lg">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your document..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent"
                />
                <button
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-primary-medium hover:bg-primary-dark disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
    </Layout>
  );
}

