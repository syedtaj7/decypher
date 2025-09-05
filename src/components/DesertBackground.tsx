'use client';

import React, { useMemo } from 'react';

// Simple seeded random number generator for consistent values
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export default function DesertBackground() {
  // Generate stars with consistent positions using useMemo
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map((_, i) => {
      // Use i as the seed for consistent star properties
      const seed1 = i * 1.3;
      const seed2 = i * 2.5;
      const seed3 = i * 3.7;
      const seed4 = i * 4.9;
      const seed5 = i * 6.1;
      const seed6 = i * 7.3;

      return {
        width: seededRandom(seed1) * 2 + 1,
        height: seededRandom(seed2) * 2 + 1,
        top: seededRandom(seed3) * 70,
        left: seededRandom(seed4) * 100,
        opacity: seededRandom(seed5) * 0.7 + 0.3,
        animationDuration: (seededRandom(seed6) * 5 + 3).toFixed(3)
      };
    });
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#4c3a85] via-[#593d8d] to-[#2d254d]">
      {/* Simulated dunes */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-[#2c1e47]" 
           style={{ 
             clipPath: 'polygon(0% 100%, 100% 100%, 100% 40%, 85% 65%, 70% 35%, 55% 60%, 40% 30%, 25% 70%, 10% 40%, 0% 60%)' 
           }} 
      />
      
      {/* Stars */}
      {stars.map((star, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.width}px`,
            height: `${star.height}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration}s infinite`
          }}
        />
      ))}
      
      {/* Moon */}
      <div className="absolute w-16 h-16 rounded-full bg-[#e4d5ff] top-[10%] left-[10%] opacity-90 shadow-lg shadow-[#e4d5ff]/20" />
    </div>
  );
}
