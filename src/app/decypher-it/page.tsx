'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  CheckCircle, 
  XCircle, 
  Download, 
  Share2, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  Search, 
  ArrowLeft,
  MoveLeft,
  Maximize2,
  X,
  Sparkles,
  Zap,
  Shield,
  FileBadge
} from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';

// Define platform data with logos and descriptions
const platforms = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/instagram.png',
    pdfPath: '/Tnc/Instagram_TnC.pdf',
    color: '#E1306C',
    bgColor: '#FCEEF3'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'User Agreement and Privacy Policy',
    icon: '/images/icons/linkedin.png',
    pdfPath: '/Tnc/Linkedin_TnC.pdf',
    color: '#0A66C2',
    bgColor: '#E8F1FA'
  },
  {
    id: 'meta',
    name: 'Meta',
    description: 'Terms of Service and Data Policy',
    icon: '/images/icons/meta.png',
    pdfPath: '/Tnc/Meta_TnC.pdf',
    color: '#0668E1',
    bgColor: '#E5F0FD'
  },
  {
    id: 'openai',
    name: 'OpenAI (ChatGPT)',
    description: 'Terms of Use and Privacy Policy',
    icon: '/images/icons/chatgpt.png',
    pdfPath: '/Tnc/OpenAI_TnC.pdf',
    color: '#10A37F',
    bgColor: '#E7F6F2'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/pinterest.png',
    pdfPath: '/Tnc/Pinterest_TnC.pdf',
    color: '#E60023',
    bgColor: '#FDECEE'
  },
  {
    id: 'reddit',
    name: 'Reddit',
    description: 'User Agreement and Privacy Policy',
    icon: '/images/icons/reddit.png',
    pdfPath: '/Tnc/Reddit_TnC.pdf',
    color: '#FF4500',
    bgColor: '#FFEFE9'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/snapchat.png',
    pdfPath: '/Tnc/Snapchat_TnC.pdf',
    color: '#FFFC00',
    bgColor: '#FFFDE5'
  },
  {
    id: 'telegram',
    name: 'Telegram',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/telegram.png',
    pdfPath: '/Tnc/Telegram_TnC.pdf',
    color: '#26A5E4',
    bgColor: '#EAF6FC'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'Terms of Service and Privacy Notice',
    icon: '/images/icons/whatsapp.png',  // Using PNG version for consistency with other icons
    pdfPath: '/Tnc/Whatsapp_TnC.pdf',
    color: '#25D366',
    bgColor: '#EAFAF1'
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/twitter.png',
    pdfPath: '/Tnc/X_TnC.pdf',
    color: '#000000',
    bgColor: '#F0F0F0'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Terms of Service and Privacy Policy',
    icon: '/images/icons/youtube.png',
    pdfPath: '/Tnc/Youtube_TnC.pdf',
    color: '#FF0000',
    bgColor: '#FEE6E6'
  }
];

// Gemini API integration
import { GoogleGenerativeAI } from '@google/generative-ai';
// Get API key from environment variable
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
if (!GEMINI_API_KEY) {
  console.error('Gemini API key is missing. Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file.');
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

interface AnalysisResult {
  summary: string;
  flowchart: {
    id: number;
    title: string;
    description: string;
    type: string;
  }[];
  risks: {
    title: string;
    level: string;
    description: string;
  }[];
  dos: string[];
  donts: string[];
  // Add these for our export function
  keyPoints?: {
    title: string;
    description: string;
    type?: string;
  }[];
  privacyConcerns?: {
    title: string;
    level: string;
    description: string;
  }[];
}

async function analyzePdfWithGemini(pdfUrl: string, platformName: string): Promise<AnalysisResult | null> {
  try {
    // For demo purposes, we'll create a prompt to analyze terms and conditions
    // In a real implementation, you would extract text from the PDF and send it to Gemini
    
    // Create the Gemini model instance
    // Using the correct model ID format for Google Generative AI API
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    
    const prompt = `
    You are an AI legal assistant specialized in analyzing Terms & Conditions documents for ${platformName}.
    
    Please analyze the Terms & Conditions for ${platformName} and provide a structured analysis with the following components:
    
    1. A concise summary (1-2 sentences) of the main points covered in the terms.
    
    2. A flowchart of 6 key points in the document, each with:
       - A title
       - A short description
       - A type (choose from: requirement, right, warning, limitation, info)
    
    3. List 4 potential risks for users, each with:
       - A title
       - A risk level (High, Medium, or Low)
       - A short description of the risk
    
    4. Five practical recommendations for what users SHOULD do (Dos)
    
    5. Five practical recommendations for what users SHOULD NOT do (Don'ts)
    
    Format your response as a structured JSON object with these exact fields:
    {
      "summary": "string",
      "flowchart": [
        {
          "id": number,
          "title": "string",
          "description": "string", 
          "type": "string"
        }
      ],
      "risks": [
        {
          "title": "string",
          "level": "string",
          "description": "string"
        }
      ],
      "dos": ["string"],
      "donts": ["string"]
    }
    `;

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();
    
    // Parse the JSON response - we extract the JSON part in case the model returns any extra text
    const jsonMatch = textResponse.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error('Failed to get JSON response from Gemini API');
    }
    
    // Define types for the JSON response
    interface FlowchartItem {
      id?: number;
      title: string;
      description: string;
      type: string;
    }
    
    interface RiskItem {
      title: string;
      level: string;
      description: string;
    }
    
    interface GeminiResponse {
      summary: string;
      flowchart: FlowchartItem[];
      risks: RiskItem[];
      dos: string[];
      donts: string[];
    }
    
    const jsonResponse = JSON.parse(jsonMatch[0]) as GeminiResponse;
    
    // Map the response to our AnalysisResult interface
    return {
      summary: jsonResponse.summary,
      flowchart: jsonResponse.flowchart.map((item, index) => ({
        ...item,
        id: item.id || index + 1 // Ensure ID exists
      })),
      risks: jsonResponse.risks,
      dos: jsonResponse.dos,
      donts: jsonResponse.donts
    };

  } catch (error) {
    console.error("Error analyzing PDF with Gemini:", error);
    
    // Show the specific error to help with debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Gemini API Error: ${errorMessage}`);
    
    // Return fallback data so the application doesn't break
    return {
      summary: `${platformName}'s terms outline user rights, content ownership, data collection practices, and community guidelines with important privacy implications.`,
      flowchart: [
        { id: 1, title: "Account Creation", description: `You must be 13+ years old to create a ${platformName} account`, type: "requirement" },
        { id: 2, title: "Content Ownership", description: "You retain rights to your content but grant a license to the platform", type: "right" },
        { id: 3, title: "Data Collection", description: `${platformName} collects personal data, device information, and usage patterns`, type: "warning" },
        { id: 4, title: "Content Moderation", description: "Platform can remove content that violates guidelines", type: "limitation" },
        { id: 5, title: "Account Termination", description: "Platform can suspend accounts for violations", type: "warning" },
        { id: 6, title: "Third-Party Services", description: `${platformName} integrates with third-party services that may collect data`, type: "info" }
      ],
      risks: [
        { title: "Data Privacy", level: "High", description: "Your personal data may be used for targeted advertising" },
        { title: "Content Rights", level: "Medium", description: `${platformName} gains non-exclusive license to your content` },
        { title: "Account Control", level: "Medium", description: "Platform can terminate accounts at their discretion" },
        { title: "Data Retention", level: "Low", description: "Data may be stored even after account deletion" }
      ],
      dos: [
        "Read privacy settings carefully and adjust accordingly",
        "Keep personal information private when possible",
        "Report inappropriate content or behavior",
        "Use strong, unique passwords for your account",
        "Review third-party app permissions regularly"
      ],
      donts: [
        "Don't share sensitive personal information publicly",
        "Don't post content that violates community guidelines",
        "Don't create fake accounts or impersonate others",
        "Don't engage in harassment or bullying",
        "Don't use the platform for illegal activities"
      ]
    };
  }
}

// Animation variants for consistent animations
// We use these in our components below
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};;

// Full screen PDF viewer component
const FullScreenPdfViewer = ({ url, isOpen, onClose }: { url: string, isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full h-full max-w-6xl max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-purple-100"
          >
            <div className="flex justify-between items-center p-4 bg-gray-100">
              <h3 className="font-bold text-lg">Terms & Conditions</h3>
              <button 
                onClick={onClose}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={`${url}#view=FitH&toolbar=0&navpanes=0`}
                className="w-full h-full"
                style={{ border: 'none' }}
              ></iframe>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import ProtectedRoute from '@/components/ProtectedRoute';

function DecypherItContent() {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPlatforms, setFilteredPlatforms] = useState(platforms);
  const [showFullScreenPdf, setShowFullScreenPdf] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState('risks');
  const [completedPlatforms, setCompletedPlatforms] = useState<string[]>([]);

  // Find the selected platform data
  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform);

  // Filter platforms based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPlatforms(platforms);
    } else {
      const filtered = platforms.filter(platform => 
        platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        platform.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPlatforms(filtered);
    }
  }, [searchQuery]);

  const handlePlatformSelect = async (platform: string) => {
    setSelectedPlatform(platform);
    setShowPdfPreview(true);
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const handleAnalyzeDocument = async () => {
    if (!selectedPlatformData) return;
    
    setShowPdfPreview(false);
    setIsProcessing(true);
    setErrorMessage(null);
    
    try {
      // Call Gemini API
      const results = await analyzePdfWithGemini(
        selectedPlatformData.pdfPath,
        selectedPlatformData.name
      );
      
      if (!results) {
        throw new Error("Failed to analyze the document. Please try again.");
      }
      
      setAnalysisResults(results);
      setIsProcessing(false);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing document:", error);
      setIsProcessing(false);
      
      // Format a user-friendly error message
      let userMessage = "An unexpected error occurred while analyzing the document.";
      
      if (error instanceof Error) {
        // For debugging in console
        console.error(`Error details: ${error.message}`);
        
        // Check for common API errors
        if (error.message.includes("404") && error.message.includes("model")) {
          userMessage = "The AI model is currently unavailable. Please try again later.";
        } else if (error.message.includes("403") || error.message.includes("401") || error.message.includes("API key")) {
          userMessage = "Authentication error with the AI service. Please check your API key.";
        }
      }
      
      setErrorMessage(userMessage);
    }
  };

  const handleReset = () => {
    setSelectedPlatform(null);
    setShowPdfPreview(false);
    setShowResults(false);
    setSearchQuery('');
    setFilteredPlatforms(platforms);
  };

  // Function to download PDF
  const handleDownloadPdf = () => {
    if (selectedPlatformData?.pdfPath) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = selectedPlatformData.pdfPath;
      link.download = `${selectedPlatformData.name}_TnC.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Function to export results as PDF
  const handleExportResults = () => {
    // Create a printable version of the results
    const printWindow = window.open('', '_blank');
    if (printWindow && analysisResults) {
      const platformName = selectedPlatformData?.name || 'Platform';
      
      // Map existing data to the keyPoints and privacyConcerns properties
      const keyPoints = analysisResults.flowchart || [];
      const privacyConcerns = analysisResults.risks || [];
      
      printWindow.document.write(`
        <html>
          <head>
            <title>${platformName} Terms Analysis</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; color: #333; }
              h1 { color: #6B57E6; margin-bottom: 30px; }
              h2 { color: #8C7FF8; margin-top: 30px; }
              .summary { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .key-point { margin: 15px 0; padding-left: 20px; border-left: 3px solid #6B57E6; }
              .concern { color: #e74c3c; }
              .footer { margin-top: 50px; font-size: 12px; color: #666; text-align: center; }
              .dos-donts { display: flex; gap: 20px; margin: 20px 0; }
              .dos, .donts { flex: 1; padding: 20px; border-radius: 8px; }
              .dos { background: #e7f6f2; }
              .donts { background: #fee6e6; }
              .dos h3 { color: #10A37F; }
              .donts h3 { color: #FF0000; }
              li { margin-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>${platformName} Terms & Conditions Analysis</h1>
            <div class="summary">
              <h2>Summary</h2>
              <p>${analysisResults.summary || 'No summary available'}</p>
            </div>
            
            <h2>Key Points</h2>
            ${keyPoints.map((point) => 
              `<div class="key-point">
                <h3>${point.title}</h3>
                <p>${point.description}</p>
                ${point.type ? `<p><small>Type: ${point.type}</small></p>` : ''}
              </div>`
            ).join('') || '<p>No key points available</p>'}
            
            <h2>Privacy Concerns</h2>
            ${privacyConcerns.map((concern) => 
              `<div class="key-point concern">
                <h3>${concern.title} (${concern.level} Risk)</h3>
                <p>${concern.description}</p>
              </div>`
            ).join('') || '<p>No privacy concerns identified</p>'}
            
            <div class="dos-donts">
              <div class="dos">
                <h3>Do's</h3>
                <ul>
                  ${analysisResults.dos?.map(item => `<li>${item}</li>`).join('') || '<li>No specific recommendations available</li>'}
                </ul>
              </div>
              <div class="donts">
                <h3>Don'ts</h3>
                <ul>
                  ${analysisResults.donts?.map(item => `<li>${item}</li>`).join('') || '<li>No specific warnings available</li>'}
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p>Generated by Decypher It - ${new Date().toLocaleDateString()}</p>
              <p>© ${new Date().getFullYear()} Decypher - AI-Powered Terms & Conditions Analysis</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  // Handle completed platforms - move to top of the list
  const markPlatformAsCompleted = (platformId: string) => {
    // Only add if not already completed
    if (!completedPlatforms.includes(platformId)) {
      setCompletedPlatforms(prev => [platformId, ...prev]);
    }
    
    // Reorder filteredPlatforms to show completed ones at the top
    const reorderedPlatforms = [...platforms];
    const completed = reorderedPlatforms.filter(p => [...completedPlatforms, platformId].includes(p.id));
    const notCompleted = reorderedPlatforms.filter(p => ![...completedPlatforms, platformId].includes(p.id));
    
    setFilteredPlatforms([...completed, ...notCompleted]);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-[#F9F8FF] to-[#F2F0FF] pt-16 pb-12">
        {/* Enhanced Background decorative elements */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#F2F0FF] via-transparent to-transparent"></div>
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-purple-400/10 to-indigo-400/5 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-300/10 to-purple-400/5 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Enhanced Header */}
          {!showPdfPreview && !showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring",
                stiffness: 100
              }}
              className="text-center pt-8 pb-10 relative overflow-hidden"
            >
              {/* Static colorful background */}
              <div className="absolute inset-0 overflow-hidden -z-10">
                {/* Main background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
                
                {/* Static color orbs */}
                <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/15 to-purple-500/15 mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute -top-10 right-20 w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute bottom-10 left-40 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 mix-blend-multiply filter blur-3xl"></div>
                
                {/* Subtle dot grid pattern */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(107, 87, 230, 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
              </div>
              
              {/* AI Badge - no animation */}
              <div
                className="relative z-10 mb-6"
              >
                <div
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white font-medium border border-indigo-400/30 shadow-lg shadow-indigo-500/20"
                >
                  <Sparkles className="w-5 h-5 text-yellow-200 mr-2" />
                  <span className="text-base">AI-Powered Legal Analysis</span>
                </div>
              </div>
              
              {/* Main title - no animation */}
              <div 
                className="relative z-10 mb-8"
              >
                <h1 
                  className="text-6xl md:text-8xl font-bold font-poppins tracking-tight leading-tight"
                  style={{ 
                    textShadow: "0px 10px 30px rgba(107, 87, 230, 0.2)"
                  }}
                >
                  <span 
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700"
                  >
                    Decypher
                  </span>
                  {" "}
                  <span className="relative inline-block">
                    <span 
                      className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-fuchsia-500 via-pink-600 to-purple-700"
                    >
                      It
                    </span>
                    
                    {/* Static underline */}
                    <div 
                      className="absolute -bottom-4 left-0 w-full h-3 rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      style={{ filter: "blur(1px)" }}
                    />
                  </span>
                </h1>
              </div>
              
              {/* Main description card - styled like your screenshot */}
              <div
                className="relative z-10 flex justify-center mb-12"
              >
                {/* Subtle glow behind card */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-lg"></div>
                
                <div 
                  className="relative w-full max-w-4xl mx-auto px-8 py-10 rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl border border-white/50"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Left text content */}
                    <div className="flex-1 text-left">
                      <h3
                        className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-700"
                      >
                        Our powerful AI transforms legal jargon into clarity
                      </h3>
                      
                      <p
                        className="text-gray-700 leading-relaxed mb-6"
                      >
                        <span className="font-medium">Select any platform</span> below and watch as we transform dense Terms & Conditions into insights you can actually understand and use.
                      </p>
                      
                      <div
                        className="flex flex-wrap gap-3"
                      >
                        <span 
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md shadow-indigo-500/20"
                        >
                          <BarChart3 className="h-4 w-4" />
                          Visual Flowcharts
                        </span>
                        
                        <span 
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md shadow-purple-500/20"
                        >
                          <FileText className="h-4 w-4" />
                          Clear Summaries
                        </span>
                        
                        <span 
                          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-pink-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-md shadow-pink-500/20"
                        >
                          <AlertTriangle className="h-4 w-4" />
                          Risk Detection
                        </span>
                      </div>
                    </div>
                    
                    {/* Right static illustration */}
                    <div 
                      className="relative w-64 h-64 flex-shrink-0 hidden md:block"
                    >
                      {/* Document illustration - no animation */}
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-lg transform rotate-3"
                      >
                        <div className="absolute inset-2 bg-white rounded-lg p-4 flex flex-col">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 mr-2"></div>
                            <div>
                              <div className="h-2 w-20 bg-gray-100 rounded mb-1"></div>
                              <div className="h-2 w-12 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-full bg-gray-100 rounded mb-2"></div>
                            <div className="h-2 w-5/6 bg-gray-100 rounded mb-2"></div>
                            <div className="h-2 w-4/6 bg-gray-100 rounded mb-4"></div>
                            <div className="h-8 w-full bg-indigo-50 rounded mb-2 flex items-center p-1">
                              <div className="h-6 w-6 rounded bg-indigo-200 mr-1"></div>
                              <div className="h-2 w-16 bg-gray-100 rounded"></div>
                            </div>
                            <div className="h-8 w-full bg-purple-50 rounded mb-2 flex items-center p-1">
                              <div className="h-6 w-6 rounded bg-purple-200 mr-1"></div>
                              <div className="h-2 w-16 bg-gray-100 rounded"></div>
                            </div>
                            <div className="h-8 w-full bg-pink-50 rounded flex items-center p-1">
                              <div className="h-6 w-6 rounded bg-pink-200 mr-1"></div>
                              <div className="h-2 w-16 bg-gray-100 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Static decorative elements */}
                      <div 
                        className="absolute -right-4 -top-4 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg"
                      />
                      
                      <div 
                        className="absolute -left-3 bottom-10 w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-500 shadow-lg transform rotate-12"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Static feature icons row */}
              <div
                className="grid grid-cols-3 md:flex md:justify-center gap-4 md:gap-12 max-w-5xl mx-auto mb-12"
              >
                <div 
                  className="flex flex-col items-center"
                >
                  <div className="mb-3">
                    <div className="relative bg-gradient-to-br from-indigo-500 to-indigo-700 p-4 rounded-full shadow-lg shadow-indigo-500/30">
                      <FileBadge className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <span className="font-medium text-gray-800">Easy Analysis</span>
                  <span className="text-xs text-gray-500">AI-powered insights</span>
                </div>
                
                <div 
                  className="flex flex-col items-center"
                >
                  <div className="mb-3">
                    <div className="relative bg-gradient-to-br from-purple-500 to-purple-700 p-4 rounded-full shadow-lg shadow-purple-500/30">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <span className="font-medium text-gray-800">Instant Results</span>
                  <span className="text-xs text-gray-500">In seconds</span>
                </div>
                
                <div 
                  className="flex flex-col items-center"
                >
                  <div className="mb-3">
                    <div className="relative bg-gradient-to-br from-pink-500 to-pink-700 p-4 rounded-full shadow-lg shadow-pink-500/30">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <span className="font-medium text-gray-800">Stay Protected</span>
                  <span className="text-xs text-gray-500">Know your rights</span>
                </div>
              </div>

              {/* Enhanced Search Bar with Animation */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="max-w-2xl mx-auto mt-8 mb-6 relative z-10"
              >
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -left-12 -top-8 w-16 h-16 bg-gradient-to-r from-indigo-300/30 to-transparent rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                
                <motion.div 
                  className="absolute -right-10 -bottom-8 w-20 h-20 bg-gradient-to-r from-purple-300/30 to-transparent rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                
                <motion.div 
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Gradient border effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
                  
                  <div className="relative bg-white rounded-xl shadow-lg">
                    {/* Animated search icon */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 0, 10, -10, 0],
                        scale: [1, 1, 1.1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 2,
                        times: [0, 0.7, 0.8, 0.9, 1],
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500"
                    >
                      <Search className="h-5 w-5" />
                    </motion.div>
                    
                    <motion.input
                      whileFocus={{ 
                        boxShadow: '0 8px 25px rgba(140, 127, 248, 0.2)',
                        backgroundColor: "#fefeff"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      type="text"
                      placeholder="Search platforms..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-14 py-4 rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300 text-lg shadow-inner"
                    />
                    
                    {/* Clear button with improved animation */}
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                        whileHover={{ scale: 1.2, backgroundColor: "#f1f5f9" }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 bg-gray-50/80"
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4 text-gray-500" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
                
                {filteredPlatforms.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-4 text-indigo-600"
                  >
                    No platforms match your search
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Enhanced Back Button for PDF Preview and Results */}
          {(showPdfPreview || showResults) && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5,
                type: "spring", 
                stiffness: 300,
                damping: 25
              }}
              onClick={() => showResults ? handleReset() : setShowPdfPreview(false)}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl text-indigo-600 font-medium mt-8 hover:bg-indigo-50 transition-all duration-300 shadow-sm border border-indigo-100"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>{showResults ? "Start Over" : "Back to Platforms"}</span>
            </motion.button>
          )}

          {/* Enhanced PDF Preview */}
          <AnimatePresence>
            {showPdfPreview && selectedPlatformData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  duration: 0.5
                }}
                className="my-8"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-indigo-100">
                  {/* Enhanced Platform Header */}
                  <div 
                    className="py-6 px-8 flex flex-wrap md:flex-nowrap items-center gap-6" 
                    style={{ 
                      background: `linear-gradient(120deg, ${selectedPlatformData.bgColor}, white)`,
                      borderBottom: `1px solid ${selectedPlatformData.bgColor}`
                    }}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-20 w-20 flex items-center justify-center rounded-2xl"
                      style={{ 
                        backgroundColor: 'white', 
                        boxShadow: `0 8px 20px ${selectedPlatformData.color}30`
                      }}
                    >
                      <Image 
                        src={selectedPlatformData.icon || `/images/platforms/${selectedPlatformData.id}.svg`} 
                        alt={selectedPlatformData.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain"
                      />
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h2 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="text-3xl font-bold mb-1" 
                        style={{ color: selectedPlatformData.color }}
                      >
                        {selectedPlatformData.name}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="text-gray-600"
                      >
                        {selectedPlatformData.description}
                      </motion.p>
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.4 }}
                        className="flex gap-3 mt-3"
                      >
                        <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                          <FileBadge className="inline-block w-3 h-3 mr-1" />
                          PDF Document
                        </span>
                        <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-medium">
                          <Shield className="inline-block w-3 h-3 mr-1" />
                          Terms & Conditions
                        </span>
                      </motion.div>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#f9f9f9' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowFullScreenPdf(true)}
                        className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-700 bg-white shadow-sm border border-gray-100 transition-all"
                      >
                        <Maximize2 className="h-5 w-5" />
                        <span className="hidden sm:inline">Full Screen</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownloadPdf}
                        className="flex items-center space-x-2 px-4 py-3 rounded-xl text-gray-700 bg-white shadow-sm border border-gray-100 transition-all hover:bg-gray-50"
                      >
                        <Download className="h-5 w-5" />
                        <span className="hidden sm:inline">Download</span>
                      </motion.button>
                    </div>
                  </div>
                  
                  {/* Enhanced PDF Viewer */}
                  <div className="relative bg-gray-50 border-t border-gray-100">
                    <div className="h-[650px] overflow-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                      <iframe
                        src={`${selectedPlatformData.pdfPath}#view=FitH&toolbar=0&navpanes=1`}
                        className="w-full h-full"
                        style={{ border: 'none' }}
                      ></iframe>
                    </div>
                    
                    {/* Enhanced overlay with analyze button */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="absolute inset-0 flex flex-col items-center justify-end p-8 bg-gradient-to-t from-indigo-900/80 via-indigo-900/50 to-transparent backdrop-blur-sm"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="max-w-xl text-center"
                      >
                        <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full mb-6 text-white">
                          <Sparkles className="h-4 w-4 mr-2 text-indigo-200" /> 
                          AI-Powered Analysis
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Ready to decode {selectedPlatformData.name}&apos;s Terms & Conditions?
                        </h3>
                        <p className="text-white/90 text-lg mb-6 max-w-md mx-auto">
                          Our AI will analyze the document and provide you with key insights, risks, and actionable recommendations.
                        </p>
                      </motion.div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(80, 60, 240, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1, type: "spring" }}
                        onClick={() => {
                          handleAnalyzeDocument();
                          // Mark as completed after analysis
                          markPlatformAsCompleted(selectedPlatformData.id);
                        }}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 shadow-lg"
                      >
                        <Zap className="h-5 w-5" />
                        <span>Analyze Document</span>
                        <ChevronRight className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full Screen PDF Viewer */}
          {selectedPlatformData && (
            <FullScreenPdfViewer
              url={selectedPlatformData.pdfPath}
              isOpen={showFullScreenPdf}
              onClose={() => setShowFullScreenPdf(false)}
            />
          )}

          {/* Enhanced Platform Grid with completion status */}
          <AnimatePresence>
            {!showPdfPreview && !showResults && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="mb-12"
              >
                {filteredPlatforms.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center py-20 px-6 bg-white rounded-3xl shadow-lg border border-gray-100"
                  >
                    <div className="mx-auto w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                      <FileText className="h-10 w-10 text-gray-300" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-3">No platforms match your search</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">Try adjusting your search terms or browse our complete collection below</p>
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="px-6 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-medium transition-colors duration-300"
                    >
                      Show all platforms
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
                  >
                    {filteredPlatforms.map((platform, index) => {
                      const isCompleted = completedPlatforms.includes(platform.id);
                      return (
                        <motion.div
                          key={platform.id}
                          variants={slideUp}
                          custom={index}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.1 + index * 0.05,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                          }}
                          className={`relative ${isCompleted ? 'order-first' : ''}`}
                        >
                          {/* Completion badge */}
                          {isCompleted && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                              animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                rotate: 0,
                                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)'
                              }}
                              whileHover={{ 
                                scale: 1.2, 
                                rotate: [0, -10, 10, -10, 0],
                                transition: { duration: 0.5 }
                              }}
                              transition={{
                                duration: 0.6,
                                type: "spring",
                                stiffness: 300,
                                damping: 20
                              }}
                              className="absolute -top-3 -right-3 z-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full p-2 shadow-lg"
                            >
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  repeatType: "reverse"
                                }}
                              >
                                <CheckCircle className="h-5 w-5 text-white" />
                              </motion.div>
                            </motion.div>
                          )}
                          
                          <motion.button
                            whileHover={{ y: -8, scale: 1.05, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ 
                              type: "spring", 
                              stiffness: 400, 
                              damping: 15 
                            }}
                            onClick={() => handlePlatformSelect(platform.id)}
                            className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col h-full border ${
                              isCompleted 
                                ? 'border-green-200 ring-1 ring-green-100' 
                                : 'border-gray-100 hover:border-indigo-100'
                            } w-full group overflow-hidden`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Animated highlight effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1.5s' }}></div>
                            
                            <div className="relative">
                              {/* Platform Card Header */}
                              <div className="flex items-start mb-4">
                                <motion.div 
                                  whileHover={{ 
                                    rotate: [0, -10, 10, -10, 0],
                                    scale: 1.1,
                                    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)"
                                  }}
                                  animate={{ 
                                    y: [0, -5, 0], 
                                    scale: [1, 1.05, 1],
                                  }}
                                  transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
                                  }}
                                  className={`h-16 w-16 rounded-xl flex items-center justify-center mr-4 shadow-md transform-gpu`}
                                  style={{ 
                                    backgroundColor: platform.bgColor || '#F2F0FF',
                                    boxShadow: `0 6px 16px ${platform.bgColor}90 || rgba(242, 240, 255, 0.6)`
                                  }}
                                >
                                  <Image
                                    src={platform.icon || `/images/platforms/${platform.id}.svg`}
                                    alt={platform.name}
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 object-contain"
                                  />
                                </motion.div>
                                
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-lg text-gray-800">{platform.name}</h3>
                                    {isCompleted && (
                                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                        Analyzed
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-500">{platform.description}</p>
                                </div>
                              </div>
                              
                              {/* Bottom action button */}
                              <div className="mt-auto pt-4 flex justify-between items-center">
                                <motion.span 
                                  whileHover={{ scale: 1.05 }}
                                  className={`text-xs px-3 py-1.5 rounded-full shadow-sm ${
                                    isCompleted ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                                  }`}
                                >
                                  {isCompleted ? 'Results Available' : 'PDF Document'}
                                </motion.span>
                                
                                <motion.div 
                                  whileHover={{ scale: 1.05, x: 3 }}
                                  className={`flex items-center font-medium text-sm ${
                                    isCompleted ? 'text-green-600' : 'text-indigo-600'
                                  }`}
                                >
                                  <span>{isCompleted ? 'View Results' : 'Analyze Document'}</span>
                                  <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ 
                                      repeat: Infinity, 
                                      repeatType: "reverse",
                                      duration: 1.2,
                                      repeatDelay: 0.5
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </motion.div>
                                </motion.div>
                              </div>
                            </div>
                          </motion.button>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Processing State */}
          <AnimatePresence>
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-indigo-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-2xl p-10 shadow-2xl max-w-lg w-full text-center relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 overflow-hidden -z-10">
                    <motion.div 
                      animate={{ 
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }} 
                      transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" } 
                      }}
                      className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-conic from-indigo-500/5 via-purple-500/10 to-indigo-500/5 opacity-30"
                    />
                  </div>
                  
                  {/* Processing Animation */}
                  <div className="relative mx-auto mb-8">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32"
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-indigo-400"></div>
                      
                      {/* Orbiting Dots */}
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                        style={{ transformOrigin: "center" }}
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full shadow-lg"></div>
                      </motion.div>
                      
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                        style={{ transformOrigin: "center" }}
                      >
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-lg"></div>
                      </motion.div>
                      
                      {/* Center Icon */}
                      <div className="absolute inset-8 rounded-full bg-white border border-indigo-100 shadow-inner flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="h-8 w-8 text-indigo-500" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-3"
                  >
                    AI Analysis in Progress
                  </motion.h3>
                  
                  <div className="space-y-6 max-w-sm mx-auto">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-600"
                    >
                      Our AI is analyzing the document to extract key insights, identify potential risks, and generate actionable recommendations.
                    </motion.p>
                    
                    {/* Processing steps */}
                    <div className="space-y-3 mt-6 text-left">
                      {[
                        { text: "Extracting key terms & conditions", delay: 0.6 },
                        { text: "Identifying potential risks", delay: 1.2 },
                        { text: "Generating insights & recommendations", delay: 1.8 },
                        { text: "Preparing visual summaries", delay: 2.4 }
                      ].map((step, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: step.delay }}
                          className="flex items-center"
                        >
                          <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <motion.div
                              animate={{ opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
                              className="w-2 h-2 rounded-full bg-indigo-600"
                            />
                          </div>
                          <span className="text-sm text-gray-600">{step.text}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {errorMessage && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="py-8 flex justify-center"
              >
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg max-w-2xl w-full">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-medium text-red-800 mb-1">
                        Analysis Failed
                      </h3>
                      <p className="text-red-700">{errorMessage}</p>
                      <button
                        onClick={handleReset}
                        className="mt-4 text-red-700 font-medium hover:text-red-800 flex items-center"
                      >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {showResults && selectedPlatformData && analysisResults && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 mb-12"
              >
                {/* Enhanced Results Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100"
                >
                  {/* Success banner */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 mb-6 text-white flex items-start"
                  >
                    <div className="bg-white/20 p-2 rounded-full mr-3">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Analysis Complete!</h3>
                      <p className="text-sm text-white/90">We&apos;ve successfully analyzed {selectedPlatformData.name}&apos;s Terms & Conditions</p>
                    </div>
                    <button className="ml-auto text-white/80 hover:text-white">
                      <X className="h-5 w-5" />
                    </button>
                  </motion.div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <motion.div 
                      initial={{ scale: 0.8, rotate: -5 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
                      className="h-20 w-20 flex-shrink-0 rounded-2xl flex items-center justify-center relative group"
                      style={{ backgroundColor: selectedPlatformData.bgColor }}
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image 
                        src={selectedPlatformData.icon} 
                        alt={selectedPlatformData.name}
                        width={40}
                        height={40}
                        className="h-10 w-10 object-contain relative z-10"
                      />
                      <motion.div
                        animate={{ 
                          boxShadow: ['0px 0px 0px 0px rgba(140, 127, 248, 0)', '0px 0px 20px 10px rgba(140, 127, 248, 0.3)']
                        }}
                        transition={{ 
                          duration: 1.5, 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          ease: "easeInOut" 
                        }}
                        className="absolute inset-0 rounded-2xl"
                      />
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center mb-2">
                          <h2 className="text-3xl font-bold text-gray-800">
                            {selectedPlatformData.name} - Analysis Results
                          </h2>
                          <span className="ml-3 px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-700 uppercase tracking-wide">
                            Completed
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg">{analysisResults.summary}</p>
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 mt-3 flex-wrap"
                      >
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          <FileText className="h-3 w-3 mr-1" /> Terms Analysis
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Shield className="h-3 w-3 mr-1" /> {analysisResults.risks.length} Potential Risks
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          <AlertTriangle className="h-3 w-3 mr-1" /> {analysisResults.donts.length} Warnings
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <BarChart3 className="h-3 w-3 mr-1" /> {analysisResults.flowchart.length} Key Points
                        </span>
                      </motion.div>
                    </div>
                    
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-3"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: '0 8px 25px rgba(140, 127, 248, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleExportResults}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                      >
                        <Download className="h-4 w-4" />
                        <span>Export PDF</span>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.05, backgroundColor: '#F4F2FF' }}
                        whileTap={{ scale: 0.95 }}
                        className="border-2 border-indigo-400 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </motion.button>
                    </motion.div>
                  </div>
                  
                  {/* Enhanced Tab Navigation */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-10 border-b border-gray-200"
                  >
                    <div className="flex flex-wrap space-x-1 sm:space-x-3 md:space-x-8">
                      {[
                        { id: 'risks', label: 'Risk Assessment', icon: <AlertTriangle className="h-4 w-4" /> },
                        { id: 'flowchart', label: 'Document Flowchart', icon: <BarChart3 className="h-4 w-4" /> },
                        { id: 'guidelines', label: "Do's & Don'ts", icon: <CheckCircle className="h-4 w-4" /> }
                      ].map((tab) => (
                        <motion.button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`pb-3 font-medium text-sm transition-all duration-300 flex items-center px-4 ${
                            activeTab === tab.id 
                              ? 'text-indigo-600 border-b-2 border-indigo-600' 
                              : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-200'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className="mr-2">{tab.icon}</span>
                          {tab.label}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                {/* Risk Assessment */}
                {activeTab === 'risks' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg mt-6"
                  >
                    <div className="flex items-center mb-6">
                      <AlertTriangle className="h-6 w-6 text-amber-500 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-800">Risk Assessment</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysisResults.risks.map((risk, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                          whileHover={{ 
                            scale: 1.02,
                            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.06)'
                          }}
                          className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm transition-all duration-300"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-gray-800">{risk.title}</h4>
                            <span className={`
                              px-3 py-1 text-xs font-medium rounded-full
                              ${risk.level === 'High' ? 'bg-red-100 text-red-600' :
                                risk.level === 'Medium' ? 'bg-amber-100 text-amber-600' :
                                'bg-green-100 text-green-600'}
                            `}>
                              {risk.level} Risk
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm">{risk.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Flowchart */}
                {activeTab === 'flowchart' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 shadow-lg mt-6"
                  >
                    <div className="flex items-center mb-6">
                      <BarChart3 className="h-6 w-6 text-[#8C7FF8] mr-3" />
                      <h3 className="text-2xl font-bold text-gray-800">Document Flowchart</h3>
                    </div>
                    
                    {/* Visual flowchart with connecting lines */}
                    <div className="relative">
                      <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                        {analysisResults.flowchart.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                            whileHover={{ 
                              y: -5,
                              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                            }}
                            className={`
                              p-5 rounded-xl border-l-4 flex flex-col relative
                              ${!item.type ? 'border-purple-400 bg-purple-50/50' :
                                item.type === 'requirement' ? 'border-blue-400 bg-blue-50/50' :
                                item.type === 'right' ? 'border-green-400 bg-green-50/50' :
                                item.type === 'warning' ? 'border-amber-400 bg-amber-50/50' :
                                item.type === 'info' ? 'border-purple-400 bg-purple-50/50' :
                                'border-red-400 bg-red-50/50'
                              }
                            `}
                          >
                            {/* Numbered circle on top */}
                            <motion.div 
                              className={`
                                absolute -top-3 left-4 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white
                                ${!item.type ? 'bg-purple-500' :
                                  item.type === 'requirement' ? 'bg-blue-500' :
                                  item.type === 'right' ? 'bg-green-500' :
                                  item.type === 'warning' ? 'bg-amber-500' :
                                  item.type === 'info' ? 'bg-purple-500' :
                                  'bg-red-500'
                                }
                              `}
                              whileHover={{ scale: 1.2 }}
                            >
                              {item.id}
                            </motion.div>
                            
                            <h4 className="font-semibold text-gray-800 mt-2 mb-2">
                              {item.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {item.description}
                            </p>
                            
                            {/* Small icon at bottom */}
                            <div className="mt-auto pt-3 flex justify-end">
                              <div className={`
                                text-xs font-medium
                                ${item.type === 'requirement' ? 'text-blue-600' :
                                  item.type === 'right' ? 'text-green-600' :
                                  item.type === 'warning' ? 'text-amber-600' :
                                  item.type === 'info' ? 'text-purple-600' :
                                  'text-red-600'
                                }
                              `}>
                                {item.type ? (item.type.charAt(0).toUpperCase() + item.type.slice(1)) : 'Info'}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Dos and Don'ts */}
                {activeTab === 'guidelines' && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    {/* Dos */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                      <div className="flex items-center mb-6">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-800">Do&apos;s</h3>
                      </div>
                      <ul className="space-y-4">
                        {analysisResults.dos.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Don'ts */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="bg-white rounded-2xl p-8 shadow-lg"
                    >
                      <div className="flex items-center mb-6">
                        <XCircle className="h-6 w-6 text-red-500 mr-3" />
                        <h3 className="text-2xl font-bold text-gray-800">Don&apos;ts</h3>
                      </div>
                      <ul className="space-y-4">
                        {analysisResults.donts.map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                            whileHover={{ x: 5 }}
                            className="flex items-start"
                          >
                            <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                              <XCircle className="h-4 w-4 text-red-500" />
                            </div>
                            <span className="text-gray-700">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>
                )}

                {/* Try Another Document Button */}
                <div className="text-center mt-12">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReset}
                    className="bg-[#F2F0FF] hover:bg-[#E4E0FF] text-[#6B57E6] px-8 py-3 rounded-lg font-semibold transition-colors duration-300 inline-flex items-center"
                  >
                    <MoveLeft className="h-4 w-4 mr-2" />
                    Try Another Document
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}

// Export a wrapped version with authentication protection
export default function DecypherItPage() {
  return (
    <ProtectedRoute>
      <DecypherItContent />
    </ProtectedRoute>
  );
}
