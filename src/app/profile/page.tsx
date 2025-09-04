'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Settings, FileText, Download, Share2, Edit3, Save, X, Bell, Shield, CreditCard, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/authContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  // Declare all hooks before any conditional returns
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Tech Corp',
    phone: '+1 (555) 123-4567',
    bio: 'Document analysis enthusiast and legal tech advocate.'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/signin');
    }
  }, [loading, user, router]);

  if (!user) {
    return null;
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'documents', name: 'My Documents', icon: FileText },
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'billing', name: 'Billing', icon: CreditCard }
  ];

  const documents = [
    { id: 1, name: 'Instagram Terms of Service', date: '2024-01-15', type: 'Terms & Conditions', status: 'Completed' },
    { id: 2, name: 'Facebook Privacy Policy', date: '2024-01-10', type: 'Privacy Policy', status: 'Completed' },
    { id: 3, name: 'Company Contract', date: '2024-01-05', type: 'Business Contract', status: 'Processing' },
    { id: 4, name: 'Property Deed', date: '2024-01-01', type: 'Legal Document', status: 'Completed' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-primary-dark font-poppins mb-4">
            My <span className="text-primary-medium">Profile</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Manage your account settings, view your documents, and customize your Decypher experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-medium text-white'
                          : 'text-gray-600 hover:bg-primary-light/50 hover:text-primary-dark'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-primary-dark font-poppins">
                    Profile Information
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>Save</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
                      >
                        <X className="h-4 w-4" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-colors duration-200 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-colors duration-200 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-colors duration-200 disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-colors duration-200 disabled:bg-gray-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-medium focus:border-transparent transition-colors duration-200 disabled:bg-gray-100"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-primary-dark font-poppins">
                    My Documents
                  </h2>
                  <div className="text-sm text-gray-600">
                    {documents.length} documents processed
                  </div>
                </div>

                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-medium/10 rounded-lg p-3">
                            <FileText className="h-6 w-6 text-primary-medium" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-primary-dark">
                              {doc.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {doc.type} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            doc.status === 'Completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {doc.status}
                          </span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-500 hover:text-primary-medium transition-colors duration-200">
                              <Download className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-primary-medium transition-colors duration-200">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-dark font-poppins mb-8">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-5 w-5 text-primary-medium" />
                      <div>
                        <h3 className="font-semibold text-primary-dark">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive updates about your documents</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-medium/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-medium"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-primary-medium" />
                      <div>
                        <h3 className="font-semibold text-primary-dark">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-600">Add an extra layer of security</p>
                      </div>
                    </div>
                    <button className="bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                      Enable
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-5 w-5 text-primary-medium" />
                      <div>
                        <h3 className="font-semibold text-primary-dark">Help & Support</h3>
                        <p className="text-sm text-gray-600">Get help with your account</p>
                      </div>
                    </div>
                    <button className="text-primary-medium hover:text-primary-dark font-semibold transition-colors duration-300">
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-primary-dark font-poppins mb-8">
                  Billing & Subscription
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary-light/20 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">
                      Current Plan
                    </h3>
                    <p className="text-2xl font-bold text-primary-medium mb-2">Free Plan</p>
                    <p className="text-gray-600 text-sm mb-4">
                      5 documents per month
                    </p>
                    <button className="bg-primary-medium hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300">
                      Upgrade Plan
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">
                      Usage This Month
                    </h3>
                    <p className="text-2xl font-bold text-gray-800 mb-2">3 / 5</p>
                    <p className="text-gray-600 text-sm mb-4">
                      Documents processed
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-primary-medium h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Sign out at bottom */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-end">
          <button
            onClick={async () => {
              try {
                setIsSigningOut(true);
                await signOut();
                router.replace('/signin');
              } catch (e) {
                console.error(e);
                alert('Failed to sign out. Please try again.');
              } finally {
                setIsSigningOut(false);
              }
            }}
            disabled={isSigningOut}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-95 hover:scale-105 hover:shadow-md"
            style={{
              background: 'color-mix(in oklab, var(--foreground) 10%, transparent)',
              color: 'var(--foreground)',
              border: '1px solid color-mix(in oklab, var(--foreground) 12%, transparent)'
            }}
          >
            <span className="inline-flex items-center space-x-2">
              <LogOut className="h-4 w-4" />
              <span>{isSigningOut ? 'Signing Out...' : 'Sign Out'}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

