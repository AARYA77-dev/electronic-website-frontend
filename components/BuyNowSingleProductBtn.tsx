// *********************
// Role of the component: Buy Now button that adds product to the cart and redirects to the checkout page
// Name of the component: BuyNowSingleProductBtn.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <BuyNowSingleProductBtn product={product} quantityCount={quantityCount} />
// Input parameters: SingleProductBtnProps interface
// Output: Button with buy now functionality
// *********************

"use client";
import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const BuyNowSingleProductBtn = ({
  product,
  quantityCount,
}: SingleProductBtnProps) => {
  const router = useRouter();
  const { addToBuyNow,clearBuyNow } = useProductStore();

  const handleAddToBuyNow = () => {
    clearBuyNow();
    addToBuyNow({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount,
      quantity: product?.quantity,
      slug: product.slug,
      stockAvailabillity: product.inStock
    });
    router.push("/checkout");
  };
  return (
    <button
  disabled={product.quantity === 0}
  onClick={handleAddToBuyNow}
  className="
    group relative overflow-hidden
    w-[240px] h-[60px] 
    text-sm font-black uppercase tracking-[0.2em] 
    bg-[#1e3a8a] 
    text-white
    rounded-2xl 
    shadow-[0_20px_40px_rgba(30,58,138,0.3)]
    border border-white/20
    transition-all duration-300 ease-out
    hover:scale-105 hover:shadow-[0_25px_50px_rgba(30,58,138,0.4)]
    active:scale-95
    disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed
    max-[500px]:w-full
  "
>
  {/* Inner Glow Effect */}
  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  
  {/* Modern "Glass Reflection" Overlay */}
  <div className="absolute top-0 left-0 w-full h-[50%] bg-white/10 -skew-y-12 origin-top-left transition-transform group-hover:translate-y-1" />

  <span className="relative z-10 flex items-center justify-center gap-2">
    {product.quantity === 0 ? "Out of Stock" : "Buy Now"}
    <span className="text-xl animate-pulse group-hover:translate-x-1 transition-transform">→</span>
  </span>
</button>
  );
};

export default BuyNowSingleProductBtn;
