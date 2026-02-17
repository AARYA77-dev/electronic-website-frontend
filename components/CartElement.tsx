// *********************
// Role of the component: Cart icon and quantity that will be located in the header
// Name of the component: CartElement.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CartElement />
// Input parameters: no input parameters
// Output: Cart icon and quantity
// *********************

"use client";
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
  const { allQuantity, calculateTotals } = useProductStore();
  useEffect(() => {
    calculateTotals()
  }, [])
  return (
      <div className="relative group active:scale-90 transition-transform duration-200">
      <Link href="/cart" className="relative flex items-center justify-center">
        
        {/* Glassmorphic Background Circle */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl -m-2 opacity-0 group-hover:opacity-100 border border-white/10 transition-all duration-300" />
        
        {/* Heart Icon with Inner Glow */}
        <div className="relative pt-[2px]">
          <FaCartShopping className="text-2xl text-slate-900 group-hover:text-red-500 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(239,68,68,0.2)]" />
        </div>

        {/* Dynamic Badge */}
        {allQuantity > 0 && (
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
            <span className="relative z-10">{allQuantity}</span>
          </span>
        )}
      </Link>
    </div>
  )
}

export default CartElement