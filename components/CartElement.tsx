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
    const { allQuantity,calculateTotals, clearBuyNow} = useProductStore();
    useEffect(()=>{
      calculateTotals()
    },[])
  return (
    <div className="relative active:animate-pop">
            <Link onClick={clearBuyNow} href="/cart">
            <div className='pt-[6px]'>
              <FaCartShopping className="text-2xl text-black" />
            </div>
              <span className="block w-5 h-5 lg:w-6 lg:h-6 font-bold bg-primary text-white rounded-full flex justify-center items-center absolute top-[-10px] right-[-16px] lg:top-[-12px] lg:right-[-18px]">
                { allQuantity }
              </span>
            </Link>
          </div>
  )
}

export default CartElement