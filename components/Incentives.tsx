// *********************
// Role of the component: Incentives on home page like Free Shipping, 24/7 Customer Support, Fast Shopping Cart...
// Name of the component: Incentives.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Incentives />
// Input parameters: no input parameters
// Output: Incentives section
// *********************

import { incentives } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Incentives = () => {
  return (
 <div className="bg-white">

  {/* Heading */}
  <h2 className="
    text-2xl 
    sm:text-3xl 
    md:text-4xl 
    font-bold 
    text-center 
    py-6
  ">
    Best Customer Benefits
  </h2>

  <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 pb-12">

    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      gap-8 
      text-center
    ">
      {incentives.map((incentive) => (
        <div
          key={incentive.name}
          className="
            flex flex-col items-center 
            p-4 
            transition-transform 
            duration-300 
            hover:scale-105
          "
        >
          {/* Icon */}
          <Image
            width={48}
            height={48}
            className="
              mb-4 
              w-10 
              h-10 
              sm:w-12 
              sm:h-12
            "
            src={incentive.imageSrc}
            alt={incentive.name}
          />

          {/* Title */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
            {incentive.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-xs">
            {incentive.description}
          </p>

        </div>
      ))}

    </div>
  </div>
</div>

  )
}

export default Incentives