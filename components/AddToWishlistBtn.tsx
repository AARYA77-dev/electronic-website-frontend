"use client";

// *********************
// Role of the component: Button for adding and removing product to the wishlist on the single product page
// Name of the component: AddToWishlistBtn.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <AddToWishlistBtn product={product} slug={slug}  />
// Input parameters: AddToWishlistBtnProps interface
// Output: Two buttons with adding and removing from the wishlist functionality
// *********************

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

interface AddToWishlistBtnProps {
  product: Product;
  slug: string;
}

const AddToWishlistBtn = ({ product, slug }: AddToWishlistBtnProps) => {
  const { data: session, status } = useSession();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlistStore();
  const [isProductInWishlist, setIsProductInWishlist] = useState<boolean>();

  const addToWishlistFun = async () => {
    // getting user by email so I can get his user id
    if (session?.user?.email) {
      // sending fetch request to get user id because we will need it for saving wish item
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) =>
          fetch("https://electronic-website-backend.onrender.com/api/wishlist", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ productId: product?.id, userId: data?.id }),
          })
            .then((response) => response.json())
            .then((data) => {
              addToWishlist({
                id: product?.id,
                title: product?.title,
                price: product?.price,
                image: product?.mainImage,
                slug: product?.slug,
                stockAvailabillity: product?.inStock,
                quantity:product?.quantity
              });
              toast.success("Product added to the wishlist");
            })
        );
    } else {
      toast.error("You need to be logged in to add a product to the wishlist");
    }
  };

  const removeFromWishlistFun = async () => {
    if (session?.user?.email) {
      // sending fetch request to get user id because we will need to delete wish item
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          return fetch(
            `https://electronic-website-backend.onrender.com/api/wishlist/${data?.id}/${product?.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          removeFromWishlist(product?.id);
          toast.success("Product removed from the wishlist");
        });
    }
  };

  const isInWishlist = async () => {
    // sending fetch request to get user id because we will need it for cheching whether the product is in wishlist
    if (session?.user?.email) {
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          // checking is product in wishlist
          return fetch(
            `https://electronic-website-backend.onrender.com/api/wishlist/${data?.id}/${product?.id}`
          );
        })
        .then((response) => response.json())
        .then((data) => {
          if (data[0]?.id) {
            setIsProductInWishlist(() => true);
          } else {
            setIsProductInWishlist(() => false);
          }
        });
    }
  };

  useEffect(() => {
    isInWishlist();
  }, [session?.user?.email, wishlist]);

  return (
   <div className="flex items-center">
  {isProductInWishlist ? (
    <button
      onClick={removeFromWishlistFun}
      className="
        group flex items-center gap-x-3 px-6 py-3
        bg-red-500/10 backdrop-blur-md 
        border border-red-200/40 
        rounded-2xl shadow-sm
        transition-all duration-300 hover:bg-red-500/20 active:scale-95
      "
    >
      <FaHeartCrack className="text-xl text-red-600 transition-transform group-hover:scale-110" />
      <span className="text-xs font-black uppercase tracking-[0.15em] text-red-700">
        Saved to Wishlist
      </span>
    </button>
  ) : (
    <button
      onClick={addToWishlistFun}
      className="
        group flex items-center gap-x-3 px-6 py-3
        bg-white/20 backdrop-blur-md 
        border border-white/40 
        rounded-2xl shadow-sm
        transition-all duration-300 
        hover:bg-white/40 hover:border-white/60 hover:shadow-md
        active:scale-95
      "
    >
      <FaHeart className="text-xl text-slate-400 group-hover:text-red-400 transition-colors duration-300" />
      <span className="text-xs font-black uppercase tracking-[0.15em] text-slate-600 group-hover:text-slate-900">
        Add to Wishlist
      </span>
    </button>
  )}
</div>
  );
};

export default AddToWishlistBtn;
