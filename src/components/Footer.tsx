'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Github, Facebook, SendHorizonal } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    product: [
      { name: 'Decypher It', href: '/decypher-it' },
      { name: 'AI Assist', href: '/ai-assist' },
      { name: 'Simplify', href: '/simplify' },
      { name: 'Upload', href: '/upload' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
      { name: 'Contact', href: '/contact' },
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Documentation', href: '/docs' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
    social: [
      { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
      { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
      { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
      { name: 'GitHub', icon: Github, href: 'https://github.com' },
      { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-[var(--primary-dark)] to-[var(--primary-medium)] text-white mt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2">
            <motion.div 
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image src="/robot1.png" alt="Decypher Logo" width={40} height={40} />
              </motion.div>
              <span className="text-2xl font-bold font-poppins">Decypher</span>
            </motion.div>
            
            <motion.p 
              className="text-blue-100 mb-6 max-w-md"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Simplify the complex. Transform difficult documents into 
              easy-to-understand flowcharts, summaries, and actionable insights.
            </motion.p>
            
            <motion.div 
              className="flex space-x-3"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {footerLinks.social.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + (index * 0.1) }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-4 text-white"
              whileInView={{ 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"] 
              }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              Product
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-4 text-white"
              whileInView={{ 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"] 
              }}
              transition={{ duration: 2, delay: 1, repeat: Infinity, repeatDelay: 5 }}
            >
              Company
            </motion.h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-lg font-semibold mb-4 text-white"
              whileInView={{ 
                textShadow: ["0px 0px 0px rgba(255,255,255,0)", "0px 0px 8px rgba(255,255,255,0.3)", "0px 0px 0px rgba(255,255,255,0)"] 
              }}
              transition={{ duration: 2, delay: 2, repeat: Infinity, repeatDelay: 5 }}
            >
              Support
            </motion.h3>
            <ul className="space-y-3">
              {[...footerLinks.support, ...footerLinks.legal].map((link, index) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-blue-100 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter */}
        <motion.div 
          className="pt-8 border-t border-white/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-2">Subscribe to our newsletter</h3>
              <p className="text-blue-100">Stay updated with the latest features and releases</p>
            </motion.div>
            
            <motion.div 
              className="flex w-full md:w-auto relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              {/* Background glow effect */}
              <motion.div 
                className="absolute -inset-1 bg-blue-300/20 rounded-md blur-md"
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <div className="relative flex w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-l-md w-full md:w-64 bg-white/10 border border-white/20 text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <motion.button 
                  className="bg-white text-[var(--primary-dark)] px-4 py-3 rounded-r-md font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Subscribe</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                    className="ml-2"
                  >
                    <SendHorizonal className="h-4 w-4" />
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="pt-8 mt-8 border-t border-white/20 text-center text-blue-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
            >
              &copy; {currentYear} Decypher. All rights reserved.
            </motion.p>
            <motion.div 
              className="mt-4 md:mt-0 flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              viewport={{ once: true }}
            >
              {footerLinks.legal.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1.2 + (index * 0.1) }}
                  viewport={{ once: true }}
                >
                  <Link 
                    href={link.href} 
                    className="text-sm hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
