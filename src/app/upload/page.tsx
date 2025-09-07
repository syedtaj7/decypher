'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle file drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);

  // Process dropped files
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      const validFiles = droppedFiles.filter(file => {
        // Filter for PDF, DOCX, DOC, TXT and other document formats
        const validTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
          'text/plain',
          'application/rtf',
          'text/rtf'
        ];
        return validTypes.includes(file.type);
      });

      if (validFiles.length !== droppedFiles.length) {
        setUploadError('Some files are not valid document formats. Please upload PDF, DOCX, DOC, or TXT files.');
        setTimeout(() => setUploadError(null), 5000);
      }

      if (validFiles.length > 0) {
        setSelectedFiles(validFiles);
      }
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = useCallback(() => {
    if (selectedFiles.length === 0) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload with progress
    const totalTime = 3000; // 3 seconds for upload simulation
    const interval = 50; // Update progress every 50ms
    const steps = totalTime / interval;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setUploadProgress(newProgress);
      
      if (currentStep >= steps) {
        clearInterval(progressInterval);
        setUploadComplete(true);
        setIsUploading(false);
        
        // Redirect to decypher-it page after completion
        setTimeout(() => {
          router.push('/decypher-it'); // Redirect to decypher-it instead
        }, 1500); // Wait 1.5 seconds before redirecting
      }
    }, interval);
    
    // Cleanup function
    return () => clearInterval(progressInterval);
  }, [selectedFiles, router]);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Automatically start upload when files are selected
  useEffect(() => {
    if (selectedFiles.length > 0 && !isUploading && !uploadComplete) {
      handleUpload();
    }
  }, [selectedFiles, isUploading, uploadComplete, handleUpload]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Upload Your Document</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your document and we&apos;ll simplify it for you. Supported formats: PDF, DOCX, DOC, TXT, and RTF.
          </p>
        </div>

        {/* Upload Container */}
        <div className="max-w-3xl mx-auto">
          {/* Error Message */}
          <AnimatePresence>
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md"
              >
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-red-700">{uploadError}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload Status */}
          <AnimatePresence>
            {uploadComplete ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 shadow-lg text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Complete!</h2>
                <p className="text-gray-600 mb-4">Your document has been uploaded successfully.</p>
                <p className="text-gray-600">Redirecting to document simplification...</p>
                <div className="mt-4">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5 }}
                      className="h-full bg-[#8C7FF8] rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            ) : selectedFiles.length > 0 && isUploading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-100 rounded-3xl p-8 mb-8 shadow-lg"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Uploading {selectedFiles.length} file(s)</h2>
                
                {/* Files list */}
                <div className="space-y-4 mb-6">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-10 h-10 rounded-lg bg-[#8C7FF8]/10 flex items-center justify-center mr-3">
                        <FileText className="h-5 w-5 text-[#8C7FF8]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Upload progress */}
                <div className="mt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Uploading...</span>
                    <span className="text-sm font-medium text-gray-800">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="h-full bg-[#8C7FF8] rounded-full"
                      style={{
                        boxShadow: "0 0 10px rgba(140, 127, 248, 0.7)"
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Drag & Drop Area */}
          {!uploadComplete && (
            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-3xl transition-all duration-200 ${selectedFiles.length > 0 && !isUploading ? 'bg-white border-green-300' : isDragging ? 'bg-[#8C7FF8]/5 border-[#8C7FF8]' : 'bg-white border-gray-300 hover:border-[#8C7FF8]/50 hover:bg-gray-50'}`}
            >
              <div className="flex flex-col items-center justify-center py-12 px-6">
                {selectedFiles.length === 0 ? (
                  <>
                    <div className="w-20 h-20 rounded-full bg-[#8C7FF8]/10 flex items-center justify-center mb-6">
                      <Upload className="h-10 w-10 text-[#8C7FF8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {isDragging ? 'Drop your files here' : 'Drag & Drop your files here'}
                    </h3>
                    <p className="text-gray-500 text-center mb-6">
                      or
                    </p>
                    <button
                      onClick={triggerFileInput}
                      className="px-6 py-3 bg-[#8C7FF8] text-white rounded-xl font-medium hover:bg-[#7B6EE7] transition-colors shadow-md hover:shadow-lg active:shadow-sm"
                    >
                      Browse Files
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileInputChange}
                      className="hidden"
                      accept=".pdf,.docx,.doc,.txt,.rtf"
                      multiple
                    />
                    <p className="text-xs text-gray-400 mt-4">
                      Supported formats: PDF, DOCX, DOC, TXT, RTF
                    </p>
                  </>
                ) : !isUploading ? (
                  <div className="w-full max-w-md">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Selected Files:</h3>
                    <div className="space-y-3 mb-6">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-gray-500 mr-2" />
                            <span className="text-sm font-medium text-gray-700 truncate max-w-xs">
                              {file.name}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-gray-200 rounded-full"
                          >
                            <X className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={triggerFileInput}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Add More
                      </button>
                      <button
                        onClick={handleUpload}
                        className="px-4 py-2 bg-[#8C7FF8] text-white rounded-lg font-medium hover:bg-[#7B6EE7] transition-colors flex-1 shadow-md"
                      >
                        Upload & Simplify
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {!uploadComplete && !isUploading && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <span className="text-blue-600 font-semibold text-xl">1</span>
                  </div>
                  <h4 className="text-gray-800 font-medium mb-2">Upload Document</h4>
                  <p className="text-gray-600 text-sm">Upload any complex document you need to understand better.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                    <span className="text-purple-600 font-semibold text-xl">2</span>
                  </div>
                  <h4 className="text-gray-800 font-medium mb-2">AI Processing</h4>
                  <p className="text-gray-600 text-sm">Our AI analyzes and breaks down the complex language and structure.</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <span className="text-green-600 font-semibold text-xl">3</span>
                  </div>
                  <h4 className="text-gray-800 font-medium mb-2">Get Simplified Version</h4>
                  <p className="text-gray-600 text-sm">Receive an easy-to-understand version with key points highlighted.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
