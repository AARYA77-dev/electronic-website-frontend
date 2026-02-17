// *********************
// Role of the component: Button for adding product to the cart on the single product page
// Name of the component: AddToCartSingleProductBtn.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <AddToCartSingleProductBtn product={product} quantityCount={quantityCount}  />
// Input parameters: SingleProductBtnProps interface
// Output: Button with adding to cart functionality
// *********************
"use client";

import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const AddToCartSingleProductBtn = ({ product, quantityCount }: SingleProductBtnProps) => {
  const { addToCart, calculateTotals } = useProductStore();
  const { data: session } = useSession();

  const handleAddToCart = async () => {
    // getting user by email so I can get his user id
    if (session?.user?.email) {
      // sending fetch request to get user id because we will need it for saving cart item
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) =>
          fetch("https://electronic-website-backend.onrender.com/api/cart", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({quantity:quantityCount, productId: product?.id, userId: data?.id, }),
          })
            .then((response) => response.json())
            .then((data) => {
              addToCart({
                id: product?.id.toString(),
                title: product?.title,
                price: product?.price,
                image: product?.mainImage,
                amount: quantityCount,
                // quantityCount: 0,
                quantity: product?.quantity,
                slug: product.slug,
                stockAvailabillity: product.inStock
              });
              calculateTotals();
              toast.success("Product added to the cart");
            })
        );
    } else {
      addToCart({
        id: product?.id.toString(),
        title: product?.title,
        price: product?.price,
        image: product?.mainImage,
        amount: quantityCount,
        // quantityCount: 0,
        quantity: product?.quantity,
        slug: product.slug,
        stockAvailabillity: product.inStock
      });
      calculateTotals();
      toast.success("Product added to the cart");
    }
  };
  // const handleAddToCart = () => {
  //   addToCart({
  //     id: product?.id.toString(),
  //     title: product?.title,
  //     price: product?.price,
  //     image: product?.mainImage,
  //     amount: quantityCount,
  //     quantityCount: 0,
  //     quantity: product?.quantity
  //   });


  //   calculateTotals();
  //   toast.success("Product added to the cart");
  // };
  return (
    <button
  onClick={handleAddToCart}
  className="
    group relative overflow-hidden
    w-[240px] h-[60px] 
    text-sm font-black uppercase tracking-[0.2em] 
    bg-white/10 backdrop-blur-md
    border border-white/40
    text-[#1e3a8a] 
    rounded-2xl 
    shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]
    transition-all duration-300 ease-out
    hover:scale-105 hover:bg-white/20 hover:border-white/60 hover:text-blue-700
    active:scale-95
    max-[500px]:w-full
  "
>
  {/* Shimmer Effect Layer */}
  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  
  <span className="relative z-10 flex items-center justify-center gap-2">
    Add to cart
    <span className="text-xl group-hover:translate-x-1 transition-transform">+</span>
  </span>
</button>
  );
};

export default AddToCartSingleProductBtn;
