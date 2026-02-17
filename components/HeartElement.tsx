// *********************
// Role of the component: Wishlist icon with quantity located in the header
// Name of the component: HeartElement.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <HeartElement />
// Input parameters: no input parameters
// Output: wishlist icon with quantity
// *********************

"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Link from "next/link";
import React from "react";
import { FaHeart } from "react-icons/fa6";

const HeartElement = ({wishQuantity}: {wishQuantity: number}) => {
  return (
    <div className="relative group active:scale-90 transition-transform duration-200">
      <Link href="/wishlist" className="relative flex items-center justify-center">
        
        {/* Glassmorphic Background Circle */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl -m-2 opacity-0 group-hover:opacity-100 border border-white/10 transition-all duration-300" />
        
        {/* Heart Icon with Inner Glow */}
        <div className="relative pt-[2px]">
          <FaHeart className="text-2xl text-slate-900 group-hover:text-red-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
        </div>

        {/* Dynamic Badge */}
        {wishQuantity > 0 && (
          <span className="
            absolute -top-3 -right-4
            flex h-6 w-6 items-center justify-center
            rounded-full bg-slate-900
            text-[10px] font-black text-white
            shadow-[0_4px_12px_rgba(0,0,0,0.3)]
            border border-white/20
            animate-in fade-in zoom-in duration-300
          ">
            {/* Subtle Pulse for Active Items */}
            <span className="absolute inset-0 rounded-full bg-red-500/20 animate-ping" />
            <span className="relative z-10">{wishQuantity}</span>
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeartElement;
