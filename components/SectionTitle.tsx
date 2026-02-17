"use client";
import React from 'react';

const SectionTitle = ({ title, path }: { title: string; path: string }) => {
  return (
    <div className="relative h-[280px] w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1e3a8a] max-sm:h-[220px]">
      
      {/* Decorative Blur Orbs for Glass Effect */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />

      {/* The Glass Card */}
      <div className="
        relative z-10 
        px-8 py-10 
        rounded-[40px] 
        bg-white/10 
        backdrop-blur-xl 
        border border-white/30 
        shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] 
        text-center 
        max-sm:px-4 
        max-sm:py-6
      ">
        {/* Title with Modern Typography */}
        <h1 className="
          text-7xl font-black tracking-tighter 
          bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 
          drop-shadow-sm 
          max-md:text-6xl max-sm:text-4xl 
          mb-4
        ">
          {title}
        </h1>

        {/* Breadcrumb Path */}
        <div className="flex items-center justify-center gap-2">
          <p className="
            text-sm font-bold uppercase tracking-[0.2em] 
            text-blue-100/80 
            max-sm:text-xs
          ">
            {path}
          </p>
        </div>
      </div>

      {/* Bottom Glowing Border Line */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
    </div>
  );
};

export default SectionTitle;