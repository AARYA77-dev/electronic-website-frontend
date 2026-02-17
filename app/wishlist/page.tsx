"use client";
import { SectionTitle, WishItem } from "@/components";
import React, { useEffect, useState } from "react";
import { useWishlistStore } from "../_zustand/wishlistStore";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";

const WishlistPage = () => {
  const { data: session, status } = useSession();
  const { wishlist, setWishlist } = useWishlistStore();

  const getWishlistByUserId = async (id: string) => {
    const response = await fetch(`https://electronic-website-backend.onrender.com/api/wishlist/${id}`, {
      cache: "no-store",
    });
    const wishlist = await response.json();

    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug: string;
      stockAvailabillity: number;
      quantity: 1
    }[] = [];

    wishlist.map((item: any) => productArray.push({
      id: item?.product?.id,
       title: item?.product?.title,
        price: item?.product?.price,
         image: item?.product?.mainImage,
         slug: item?.product?.slug, 
         stockAvailabillity: item?.product?.inStock,
         quantity:item?.product?.quantity,
         }));

    setWishlist(productArray);
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);
  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
  <SectionTitle title="Wishlist" path="Home | Wishlist" />
  
  <div className="max-w-screen-2xl mx-auto px-5 pb-20">
    {wishlist && wishlist.length === 0 ? (
      <div className="mt-16 flex flex-col items-center justify-center py-20 px-10 rounded-[40px] bg-white/30 backdrop-blur-xl border border-white/60 shadow-xl">
        <h3 className="text-center text-4xl font-black text-slate-400 tracking-tight max-lg:text-3xl">
          Your collection is empty
        </h3>
        <p className="text-slate-500 mt-4">Start adding some futuristic gear to see them here.</p>
      </div>
    ) : (
      <div className="mt-10 overflow-hidden rounded-[32px] border border-white/50 bg-white/20 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Table Header with Glass tint */}
            <thead>
              <tr className="border-b border-white/40 bg-white/30">
                {/* <th></th> */}
                <th className="py-6 text-center text-sm font-black uppercase tracking-widest text-[#1e3a8a]">Image</th>
                <th className="py-6 text-center text-sm font-black uppercase tracking-widest text-[#1e3a8a]">Product Name</th>
                <th className="py-6 text-center text-sm font-black uppercase tracking-widest text-[#1e3a8a]">Stock Status</th>
                <th className="py-6 text-center text-sm font-black uppercase tracking-widest text-[#1e3a8a]">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/20">
              {wishlist?.map((item) => (
                <WishItem
                  id={item?.id}
                  title={item?.title}
                  price={item?.price}
                  image={item?.image}
                  slug={item?.slug}
                  stockAvailabillity={item?.stockAvailabillity}
                  key={nanoid()} 
                  quantity={0} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default WishlistPage;
