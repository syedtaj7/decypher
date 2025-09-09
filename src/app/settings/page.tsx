'use client';

import { useState, useEffect } from 'react';
import { 
  Edit3, Save, LogOut, UserCircle, 
  FileText, HelpCircle, MessagesSquare,
  Lock, Download, Trash2, 
  Clock, Calendar, Shield
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Settings state
  const [settings, setSettings] = useState({
    // My Profile
    name: '',
    email: '',
    profileVisibility: 'public',
    
    // Document Settings
    autoSave: true,
    defaultPrivacy: 'private',
    fileSort: 'recent',
    
    // AI Conversations
    saveHistory: true,
    aiModel: 'advanced',
    suggestionsEnabled: true,
    
    // Advanced Settings
    darkMode: false,
    twoFactor: false,
    dataCollection: true,
    debugMode: false,
  });

  // Mock data for documents and conversations
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Project Proposal.docx', type: 'Document', date: '2025-08-28', size: '1.2 MB' },
    { id: 2, name: 'Meeting Notes.pdf', type: 'PDF', date: '2025-09-01', size: '0.8 MB' },
    { id: 3, name: 'Financial Report.xlsx', type: 'Spreadsheet', date: '2025-09-03', size: '2.4 MB' },
    { id: 4, name: 'Product Roadmap.pptx', type: 'Presentation', date: '2025-09-04', size: '5.1 MB' },
  ]);
  
  const [conversations, setConversations] = useState([
    { id: 1, topic: 'Code Review Help', date: '2025-09-04', messages: 12 },
    { id: 2, topic: 'Document Analysis', date: '2025-09-03', messages: 8 },
    { id: 3, topic: 'Text Summarization', date: '2025-09-01', messages: 5 },
    { id: 4, topic: 'Data Visualization Help', date: '2025-08-25', messages: 15 },
  ]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    } else if (user) {
      // Populate user data
      setSettings(prev => ({
        ...prev,
        name: user.displayName || '',
        email: user.email || '',
      }));
    }
  }, [user, loading, router]);

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const handleChange = (setting: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  const handleSaveProfile = () => {
    // Save profile changes to backend/Firebase
    setIsEditing(false);
    // Show success notification
  };
  
  const handleDeleteDocument = (id: number) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };
  
  const handleDeleteConversation = (id: number) => {
    setConversations(prev => prev.filter(convo => convo.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-medium"></div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#f8f9fa] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section with User Info */}
          <div className="bg-gradient-to-r from-[#8C7FF8] to-[#9B8BFF] rounded-3xl p-8 mb-8 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mt-24 -mr-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -mb-16 -ml-16"></div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="relative">
                {user?.photoURL ? (
                  <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                    <Image 
                      src={user.photoURL} 
                      alt="Profile" 
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white border-4 border-white shadow-md">
                    <UserCircle className="w-12 h-12" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold">{user?.displayName || 'User'}</h1>
                    <p className="text-white/80">{user?.email}</p>
                    <div className="flex items-center mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20">
                        Free Plan
                      </span>
                      <button className="ml-2 text-sm underline text-white/80 hover:text-white">
                        Upgrade
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Settings Container */}
          <div className="bg-white rounded-3xl shadow-lg">
            {/* Tabs */}
            <div className="border-b px-6 overflow-x-auto">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'border-[#8C7FF8] text-[#8C7FF8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === 'documents'
                      ? 'border-[#8C7FF8] text-[#8C7FF8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Documents
                </button>
                <button
                  onClick={() => setActiveTab('conversations')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === 'conversations'
                      ? 'border-[#8C7FF8] text-[#8C7FF8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Past AI Conversations
                </button>
                <button
                  onClick={() => setActiveTab('advanced')}
                  className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === 'advanced'
                      ? 'border-[#8C7FF8] text-[#8C7FF8]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Advanced
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {/* My Profile */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-800">My Profile</h2>
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleSaveProfile}
                          className="px-4 py-2 text-sm font-medium text-white bg-[#8C7FF8] rounded-lg hover:bg-[#7B6EE7] transition-colors flex items-center gap-1"
                        >
                          <Save className="w-4 h-4" />
                          Save Changes
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-[#8C7FF8] bg-[#8C7FF8]/10 rounded-lg hover:bg-[#8C7FF8]/20 transition-colors flex items-center gap-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="space-y-4">
                      {/* Profile Picture */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-sm font-medium text-gray-800">Profile Picture</h3>
                          <p className="text-xs text-gray-500">This will be displayed on your profile</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            {user?.photoURL ? (
                              <div className="relative w-16 h-16 rounded-full border border-gray-200 overflow-hidden">
                                <Image 
                                  src={user.photoURL} 
                                  alt="Profile"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border border-gray-300">
                                <UserCircle className="w-8 h-8" />
                              </div>
                            )}
                            
                            {isEditing && (
                              <button className="absolute bottom-0 right-0 bg-[#8C7FF8] text-white p-1 rounded-full shadow-md hover:bg-[#7B6EE7]">
                                <Edit3 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          
                          {isEditing && (
                            <div>
                              <button className="text-sm font-medium text-[#8C7FF8]">Upload</button>
                              <p className="text-xs text-gray-500">JPG, PNG, GIF (Max 5MB)</p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {/* Name */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-sm font-medium text-gray-800">Name</h3>
                          <p className="text-xs text-gray-500">Your full name</p>
                        </div>
                        
                        {isEditing ? (
                          <input 
                            type="text" 
                            className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                            value={settings.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                          />
                        ) : (
                          <div className="text-sm text-gray-800">{settings.name || 'Not set'}</div>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-sm font-medium text-gray-800">Email Address</h3>
                          <p className="text-xs text-gray-500">Your email address</p>
                        </div>
                        
                        {isEditing ? (
                          <input 
                            type="email" 
                            className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                            value={settings.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                          />
                        ) : (
                          <div className="text-sm text-gray-800">{settings.email || 'Not set'}</div>
                        )}
                      </div>
                      
                      {/* Profile Visibility */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3">
                        <div className="mb-3 sm:mb-0">
                          <h3 className="text-sm font-medium text-gray-800">Profile Visibility</h3>
                          <p className="text-xs text-gray-500">Control who can see your profile</p>
                        </div>
                        
                        {isEditing ? (
                          <select
                            className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                            value={settings.profileVisibility}
                            onChange={(e) => handleChange('profileVisibility', e.target.value)}
                          >
                            <option value="public">Public</option>
                            <option value="private">Private</option>
                            <option value="contacts">Contacts Only</option>
                          </select>
                        ) : (
                          <div className="text-sm text-gray-800 capitalize">{settings.profileVisibility}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Account Management Section */}
                  <div className="mt-8">
                    <h3 className="text-base font-medium text-gray-800 mb-4">Account Management</h3>
                    
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg group">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                            <Shield className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">Password & Security</h4>
                            <p className="text-xs text-gray-500">Manage your password and login settings</p>
                          </div>
                        </div>
                        <span className="text-gray-400 group-hover:text-gray-600">→</span>
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 rounded-lg group">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                            <Download className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-800">Download Your Data</h4>
                            <p className="text-xs text-gray-500">Download all of your documents and personal data</p>
                          </div>
                        </div>
                        <span className="text-gray-400 group-hover:text-gray-600">→</span>
                      </button>
                      
                      <button className="w-full flex items-center justify-between p-3 text-left text-red-600 hover:bg-red-50 rounded-lg group">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                            <Lock className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Delete Account</h4>
                            <p className="text-xs text-red-500">Permanently delete your account and all data</p>
                          </div>
                        </div>
                        <span className="text-red-400 group-hover:text-red-600">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* My Documents */}
              {activeTab === 'documents' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800">My Documents</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Search documents..."
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                      />
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent">
                        <option value="all">All Types</option>
                        <option value="document">Documents</option>
                        <option value="pdf">PDFs</option>
                        <option value="spreadsheet">Spreadsheets</option>
                        <option value="presentation">Presentations</option>
                      </select>
                    </div>
                    
                    <div>
                      <select 
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                        value={settings.fileSort}
                        onChange={(e) => handleChange('fileSort', e.target.value)}
                      >
                        <option value="recent">Recently Modified</option>
                        <option value="name">Name</option>
                        <option value="size">Size</option>
                        <option value="type">Type</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Modified</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {documents.map((document) => (
                          <tr key={document.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-gray-400 mr-2" />
                                {document.name}
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.type}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.date}</td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{document.size}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                              <div className="flex gap-2 justify-end">
                                <button className="text-[#8C7FF8] hover:text-[#7B6EE7]">
                                  <Download className="h-4 w-4" />
                                </button>
                                <button 
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleDeleteDocument(document.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        
                        {documents.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-8 text-center text-gray-500">
                              No documents found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="text-base font-medium text-gray-800 mb-3">Document Settings</h3>
                    
                    <div className="space-y-4">
                      {/* Auto Save */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Auto Save</h4>
                          <p className="text-xs text-gray-500">Automatically save your document changes</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.autoSave}
                            onChange={() => handleToggle('autoSave')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                      
                      {/* Default Privacy */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 hover:bg-white rounded-lg">
                        <div className="mb-3 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-800">Default Privacy</h4>
                          <p className="text-xs text-gray-500">Set the default privacy for new documents</p>
                        </div>
                        
                        <select
                          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                          value={settings.defaultPrivacy}
                          onChange={(e) => handleChange('defaultPrivacy', e.target.value)}
                        >
                          <option value="private">Private</option>
                          <option value="public">Public</option>
                          <option value="shared">Shared</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Past AI Conversations */}
              {activeTab === 'conversations' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800">Past AI Conversations</h2>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4 flex justify-between items-center">
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      className="px-3 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                    />
                    
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#8C7FF8] rounded-lg hover:bg-[#7B6EE7] transition-colors">
                      New Conversation
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {conversations.map((conversation) => (
                      <div key={conversation.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-3">
                            <div className="bg-[#8C7FF8]/10 p-2 rounded-lg">
                              <MessagesSquare className="h-6 w-6 text-[#8C7FF8]" />
                            </div>
                            
                            <div>
                              <h4 className="text-base font-medium text-gray-800">{conversation.topic}</h4>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                <span>{conversation.date}</span>
                                <span className="mx-2">•</span>
                                <MessagesSquare className="h-3.5 w-3.5 mr-1" />
                                <span>{conversation.messages} messages</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex space-x-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded">
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                            <button 
                              className="p-1.5 hover:bg-gray-100 rounded text-red-500"
                              onClick={() => handleDeleteConversation(conversation.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <button className="text-[#8C7FF8] text-sm font-medium hover:underline">
                            Continue conversation →
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {conversations.length === 0 && (
                      <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
                        <div className="flex justify-center mb-4">
                          <MessagesSquare className="h-12 w-12 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800 mb-1">No conversations yet</h3>
                        <p className="text-gray-500 mb-4">Start a new conversation with the AI assistant</p>
                        <button className="px-4 py-2 text-sm font-medium text-white bg-[#8C7FF8] rounded-lg hover:bg-[#7B6EE7] transition-colors">
                          New Conversation
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h3 className="text-base font-medium text-gray-800 mb-3">AI Conversation Settings</h3>
                    
                    <div className="space-y-4">
                      {/* Save History */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Save Conversation History</h4>
                          <p className="text-xs text-gray-500">Store your AI conversations for future reference</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.saveHistory}
                            onChange={() => handleToggle('saveHistory')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                      
                      {/* AI Model */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 hover:bg-white rounded-lg">
                        <div className="mb-3 sm:mb-0">
                          <h4 className="text-sm font-medium text-gray-800">AI Model</h4>
                          <p className="text-xs text-gray-500">Select which AI model to use for conversations</p>
                        </div>
                        
                        <select
                          className="px-3 py-2 border border-gray-300 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-[#8C7FF8] focus:border-transparent"
                          value={settings.aiModel}
                          onChange={(e) => handleChange('aiModel', e.target.value)}
                        >
                          <option value="standard">Standard</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert (Premium)</option>
                        </select>
                      </div>
                      
                      {/* AI Suggestions */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Enable AI Suggestions</h4>
                          <p className="text-xs text-gray-500">Allow the AI to suggest responses and actions</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.suggestionsEnabled}
                            onChange={() => handleToggle('suggestionsEnabled')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Advanced Settings */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800">Advanced Settings</h2>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-base font-medium text-gray-800 mb-4">Application Settings</h3>
                    
                    <div className="space-y-4">
                      {/* Dark Mode */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Dark Mode</h4>
                          <p className="text-xs text-gray-500">Enable dark theme for the application</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.darkMode}
                            onChange={() => handleToggle('darkMode')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                      
                      {/* Two-Factor Authentication */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Two-Factor Authentication</h4>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.twoFactor}
                            onChange={() => handleToggle('twoFactor')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                      
                      {/* Data Collection */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Data Collection</h4>
                          <p className="text-xs text-gray-500">Allow us to collect usage data to improve our services</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.dataCollection}
                            onChange={() => handleToggle('dataCollection')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                      
                      {/* Debug Mode */}
                      <div className="flex items-center justify-between p-3 hover:bg-white rounded-lg">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Debug Mode</h4>
                          <p className="text-xs text-gray-500">Enable advanced debugging features</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={settings.debugMode}
                            onChange={() => handleToggle('debugMode')} 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8C7FF8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8C7FF8]"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-base font-medium text-gray-800 mb-4">System Maintenance</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#8C7FF8] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Clock className="w-4 h-4" />
                        Clear Cache
                      </button>
                      
                      <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#8C7FF8] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Shield className="w-4 h-4" />
                        Security Scan
                      </button>
                      
                      <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#8C7FF8] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="w-4 h-4" />
                        Export Settings
                      </button>
                      
                      <button className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#8C7FF8] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        Advanced Support
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Help & Support */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-[#8C7FF8]/10 rounded-full">
                <HelpCircle className="h-6 w-6 text-[#8C7FF8]" />
              </div>
              <div className="ml-4">
                <h2 className="text-base font-medium text-gray-800">Need Help with Settings?</h2>
                <p className="text-sm text-gray-500 mt-1">
                  If you need assistance with your account settings or have any questions, 
                  our support team is ready to help.
                </p>
                <div className="mt-3">
                  <button className="px-4 py-2 text-sm font-medium text-[#8C7FF8] bg-[#8C7FF8]/10 rounded-lg hover:bg-[#8C7FF8]/20 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
