"use client";

import {
  CustomButton,
  QuantityInput,
  QuantityInputCart,
  SectionTitle,
} from "@/components";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaCheck, FaCircleQuestion, FaXmark, FaX } from "react-icons/fa6";
import { useProductStore } from "../_zustand/store";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const CartPage = () => {
  const { products, removeFromCart, clearBuyNow, calculateTotals, total } =
    useProductStore();
  const { data: session } = useSession();
  const [userId, setUserId] = useState<string>();

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data?.id);
        });
    }
  };
  const handleRemoveItem = (id: string) => {
    if (userId) {
      fetch(`https://electronic-website-backend.onrender.com/api/cart/${userId}/${id}`, { method: "DELETE" }).then(
        (response) => {
          removeFromCart(id);
          toast.success("Product removed from your cart");
          calculateTotals();
        }
      );
    } else {
      removeFromCart(id);
      toast.success("Product removed from your cart");
      calculateTotals();
    }
  };

  useEffect(() => {
    calculateTotals()
    getUserByEmail();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#dae2f8] to-[#ffffff] min-h-screen">
      <SectionTitle title="Cart Page" path="Home | Cart" />
      
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-[#1e3a8a] sm:text-5xl mb-10">
          Shopping Cart
        </h1>

        <form className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          {/* Cart Items List */}
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>

            <ul role="list" className="space-y-6">
              {products.map((product) => (
                <li key={product.id} className="
                  relative flex py-6 px-4 sm:px-6 
                  bg-white/40 backdrop-blur-md 
                  border border-white/60 
                  rounded-[32px] 
                  shadow-[0_8px_32px_rgba(31,38,135,0.05)]
                  transition-all hover:bg-white/60
                ">
                  <div className="flex-shrink-0">
                    <Image
                      width={192}
                      height={192}
                      src={product?.image ? `/${product.image}` : "/product_placeholder.jpg"}
                      alt={product.title}
                      className="h-24 w-24 rounded-2xl object-cover object-center sm:h-40 sm:w-40 shadow-sm"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <h3 className="text-lg font-bold text-[#1e3a8a]">
                          {product.title}
                        </h3>
                        <p className="mt-2 text-xl font-bold text-slate-700">
                          ₹{product.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <QuantityInputCart product={product} userId={userId} />
                        
                        <div className="absolute right-0 top-0">
                          <button
                            onClick={() => handleRemoveItem(product.id)}
                            type="button"
                            className="group -m-2 inline-flex p-2"
                          >
                            <span className="sr-only">Remove</span>
                            <div className="bg-white/80 p-2 rounded-full shadow-sm group-hover:bg-red-50 group-hover:text-red-500 transition-all">
                              <FaXmark className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 flex items-center space-x-2 text-sm font-medium">
                      {product.quantity > 0 ? (
                        <>
                          <FaCheck className="h-4 w-4 text-green-500" />
                          <span className="text-green-600">In stock</span>
                        </>
                      ) : (
                        <>
                          <FaX className="h-4 w-4 text-red-500" />
                          <span className="text-red-600">Out of stock</span>
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary - Glassmorphic Sidebar */}
          <section
            aria-labelledby="summary-heading"
            className="
              mt-16 rounded-[40px] 
              bg-white/60 backdrop-blur-xl 
              border border-white/80 
              px-6 py-8 sm:p-10 
              lg:col-span-5 lg:mt-0 
              shadow-[0_20px_50px_rgba(0,0,0,0.05)]
              sticky top-32
            "
          >
            <h2 id="summary-heading" className="text-2xl font-bold text-[#1e3a8a]">
              Order summary
            </h2>

            <dl className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-bold text-[#1e3a8a]">₹{total}</dd>
              </div>
              
              <div className="flex items-center justify-between border-t border-white/60 pt-4">
                <dt className="flex items-center text-slate-600">
                  <span>Shipping estimate</span>
                  <FaCircleQuestion className="ml-2 h-4 w-4 text-slate-400" />
                </dt>
                <dd className="font-bold text-[#1e3a8a]">₹5.00</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white/60 pt-4">
                <dt className="flex items-center text-slate-600">
                  <span>Tax estimate</span>
                  <FaCircleQuestion className="ml-2 h-4 w-4 text-slate-400" />
                </dt>
                <dd className="font-bold text-[#1e3a8a]">₹{Math.round(total / 5)}</dd>
              </div>

              <div className="flex items-center justify-between border-t border-[#1e3a8a]/20 pt-6">
                <dt className="text-xl font-bold text-[#1e3a8a]">Order total</dt>
                <dd className="text-2xl font-black text-[#1e3a8a]">
                  ₹{total === 0 ? 0 : Math.round(total + total / 5 + 5)}
                </dd>
              </div>
            </dl>

            {products.length > 0 && (
              <div className="mt-10">
                <Link
                  onClick={clearBuyNow}
                  href="/checkout"
                  className="
                    flex justify-center items-center w-full 
                    bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] 
                    text-white font-bold uppercase tracking-widest
                    px-4 py-4 rounded-full 
                    shadow-[0_10px_20px_rgba(30,58,138,0.2)]
                    hover:shadow-[0_15px_30px_rgba(30,58,138,0.3)]
                    hover:-translate-y-1 transition-all duration-300
                  "
                >
                  Checkout Now
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>  );
};

export default CartPage;
