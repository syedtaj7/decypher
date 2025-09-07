'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useState } from 'react';

export default function DemoSection() {
  // Will be used when video is available
  const [isPlaying] = useState(false);

  const handlePlayClick = () => {
    // When video is available, uncomment this code
    // setIsPlaying(true);
    // const videoElement = document.getElementById('demoVideo') as HTMLVideoElement;
    // if (videoElement) {
    //   videoElement.play();
    // }
    
    // Temporary alert until video is available
    alert('Demo video coming soon!');
  };

  return (
    <section 
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ 
        background: 'color-mix(in oklab, var(--background) 90%, var(--primary-light))' 
      }}
    >
      {/* Decorative background elements */}
      <motion.div 
        style={{ background: 'color-mix(in oklab, var(--primary-medium) 20%, transparent)' }}
        className="absolute top-10 right-10 w-40 h-40 rounded-full blur-3xl"
        animate={{ 
          x: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        style={{ background: 'color-mix(in oklab, var(--primary-medium) 30%, transparent)' }}
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl"
        animate={{ 
          x: [0, -40, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Section divider */}
      <div className="section-divider fancy mb-16"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--primary-dark)' }}
          >
            See Decypher in Action
          </h2>
          <motion.p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--foreground)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Watch how quickly Decypher transforms complex documents into clear, actionable insights
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Video Container */}
          <div className="relative aspect-video bg-black">
            {/* 
              Video is currently not available. 
              When you have a demo video, place it at /public/videos/demo.mp4
            */}
            <div className="w-full h-full flex items-center justify-center bg-gray-900">
              <p className="text-white text-lg">Demo video coming soon</p>
            </div>
            {/* Uncomment when video is available
            <video
              id="demoVideo"
              src="/videos/demo.mp4"
              className="w-full h-full object-cover"
              controls={isPlaying}
              playsInline
              onEnded={() => setIsPlaying(false)}
            />
            */}
            
            {/* Play button overlay */}
            {!isPlaying && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-opacity hover:bg-black/40"
                onClick={handlePlayClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0.5)", "0px 0px 30px rgba(59, 130, 246, 0.7)", "0px 0px 0px rgba(59, 130, 246, 0.5)"],
                  }}
                  transition={{ 
                    boxShadow: { repeat: Infinity, duration: 2 },
                    scale: { type: "spring", stiffness: 400 }
                  }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Play className="h-10 w-10 text-blue-600 ml-1" />
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="absolute bottom-8 left-0 right-0 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <span className="text-white text-xl font-medium px-6 py-2 rounded-full bg-black/40 backdrop-blur-sm shadow-lg">
                    Watch Demo
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>
          
          {/* Video description */}
          <motion.div 
            style={{ 
              background: 'var(--background)',
              borderColor: 'color-mix(in oklab, var(--foreground) 10%, transparent)'
            }}
            className="p-6 border-t"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div 
                  className="p-2 rounded-lg" 
                  style={{ background: 'color-mix(in oklab, var(--primary-medium) 10%, transparent)' }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Play style={{ color: 'var(--primary-medium)' }} className="h-6 w-6" />
                  </motion.div>
                </div>
              </div>
              <div>
                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: 'var(--primary-dark)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Transform Complex Text into Clear Understanding
                </motion.h3>
                <motion.p 
                  style={{ color: 'var(--foreground)' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Our demo showcases how Decypher breaks down difficult language into easy-to-follow steps, 
                  highlighted key points, and visual elements that make comprehension instant.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Feature highlights */}
        <motion.div 
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { title: "Instant Analysis", description: "Upload any document and get insights within seconds" },
            { title: "Visual Summaries", description: "Complex ideas converted to easy-to-understand visuals" },
            { title: "Actionable Steps", description: "Clear instructions on what to do next after reading" }
          ].map((item, index) => (
            <motion.div 
              key={item.title}
              style={{ 
                background: 'var(--background)',
              }}
              className="p-6 rounded-xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.2) }}
              viewport={{ once: true }}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <h4 
                className="font-semibold text-lg mb-2"
                style={{ color: 'var(--primary-dark)' }}
              >
                {item.title}
              </h4>
              <p style={{ color: 'var(--foreground)' }}>{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
