// *********************
// Role of the component: IntroducingSection with the text "Introducing Singitronic"
// Name of the component: IntroducingSection.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <IntroducingSection />
// Input parameters: no input parameters
// Output: Section with the text "Introducing Singitronic" and button
// *********************

import Link from "next/link";
import React from "react";

const IntroducingSection = () => {
  return (
<div className="py-16 md:py-20 bg-gradient-to-l from-white to-primary">

  <div className="text-center flex flex-col gap-y-4 items-center px-4">

    {/* Heading */}
    <h2 className="
      text-white 
      font-extrabold 
      leading-tight
      text-[clamp(2rem,6vw,5rem)]
    ">
      INTRODUCING{" "}
      <span className="text-black">SINGI</span>
      <span className="text-secondary">TRONIC</span>
    </h2>

    {/* Subtitle */}
    <div className="space-y-2">

      <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
        Buy the latest electronics.
      </p>

      <p className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
        The best electronics for tech lovers.
      </p>

      {/* Button */}
      <Link
        href="/shop"
        className="
          mt-4 
          inline-block
          bg-secondary 
          border-2 
          border-primary 
          rounded-full
          text-tertiary 
          font-bold
          px-8 
          py-3
          text-base 
          sm:text-lg 
          md:text-xl
          hover:text-secondary 
          hover:bg-tertiary
          active:animate-pop
          transition-all
        "
      >
        SHOP NOW
      </Link>

    </div>
  </div>
</div>

  );
};

export default IntroducingSection;
