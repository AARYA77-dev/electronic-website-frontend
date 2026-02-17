// *********************
// Role of the component: Incentives on home page like Free Shipping, 24/7 Customer Support, Fast Shopping Cart...
// Name of the component: Incentives.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (Glassmorphism update)
// *********************

import { incentives } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Incentives = () => {
  return (
    /* Main Container with the soft periwinkle gradient background */
    <div className="bg-gradient-to-b from-[#dae2f8] to-[#eff3ff] py-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        
        {/* Heading styled to match "Best Customer Benefits" in the image */}
        <h2 className="
          text-3xl 
          md:text-4xl 
          font-bold 
          text-center 
          text-[#1e3a8a] 
          mb-12
          tracking-tight
        ">
          Best Customer Benefits
        </h2>

        <div className="
          grid 
          grid-cols-1 
          md:grid-cols-3 
          gap-8
        ">
          {incentives.map((incentive) => (
            <div
              key={incentive.name}
              className="
                group
                flex flex-row items-center gap-x-6
                p-6 sm:p-8
                /* Glassmorphism Effect */
                bg-white/40 
                backdrop-blur-md 
                border border-white/60 
                rounded-[24px] 
                shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
                transition-all 
                duration-300 
                hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
                hover:-translate-y-1
              "
            >
              {/* Icon Container with subtle glow */}
              <div className="flex-shrink-0 relative">
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full scale-0 group-hover:scale-110 transition-transform duration-500" />
                <Image
                  width={64}
                  height={64}
                  className="
                    relative
                    w-12 h-12 
                    sm:w-16 sm:h-16
                    object-contain
                    drop-shadow-md
                  "
                  src={incentive.imageSrc}
                  alt={incentive.name}
                />
              </div>

              {/* Text Content aligned left as per image */}
              <div className="flex flex-col text-left">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                  {incentive.name}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3">
                  {incentive.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Incentives