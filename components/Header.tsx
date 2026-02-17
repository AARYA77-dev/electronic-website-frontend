// *********************
// Role of the component: Header component
// Name of the component: Header.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Header />
// Input parameters: no input parameters
// Output: Header component
// *********************

"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
// import { FaBell, FaHeart, FaUser } from "react-icons/fa6";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import { FaUser } from "react-icons/fa6";
import { useProductStore } from "@/app/_zustand/store";
// import NotificationElement from "./NotifictionElement";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const { setCart, clearCart, calculateTotals } =
    useProductStore();

  const closeDropdown = () => {
    (document.activeElement as HTMLElement)?.blur();
  };

  const handleLogout = () => {
    closeDropdown();
    setTimeout(() => signOut(), 1000);
    clearCart()
    toast.success("Logout successful!");
  };

  // getting all wishlist and cart items by user id
  const getCartByUserId = async (id: string) => {
    const response = await fetch(`https://electronic-website-backend.onrender.com/api/cart/${id}`, {
      cache: "no-store",
    });
    const cart = await response.json();
    const productArray: {
      id: string;
      title: string;
      price: number;
      image: string;
      slug: string;
      stockAvailabillity: number;
      quantity: 1
      // quantityCount: number;
      amount: number;
    }[] = [];

    Array.isArray(cart) && cart.map((item: any) => productArray.push({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
      quantity: item?.product?.quantity,
      // quantityCount: item?.product?.quantityCount,
      amount: item?.quantity,
    }));
    setCart(productArray);
    calculateTotals();
  };

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
      slug: string
      stockAvailabillity: number;
      quantity: number;
    }[] = [];

    wishlist.map((item: any) => productArray.push({
      id: item?.product?.id,
      title: item?.product?.title,
      price: item?.product?.price,
      image: item?.product?.mainImage,
      slug: item?.product?.slug,
      stockAvailabillity: item?.product?.inStock,
      quantity: item?.product?.quantity
    }));

    setWishlist(productArray);
  };

  // getting user by email so I can get his user id
  const getUserByEmail = async () => {
    if (session?.user?.email) {

      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          getWishlistByUserId(data?.id);
          getCartByUserId(data?.id);
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="sticky top-0 z-[100] w-full">
      {/* Top bar with a slight transparency */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <HeaderTop />
      </div>

      {!pathname.startsWith("/admin") && (
        <div className="
          /* Glassmorphism Effect */
          bg-white/40 
          backdrop-blur-lg 
          border-b border-white/40
          shadow-[0_4px_30px_rgba(0,0,0,0.03)]
        ">
          <div className="
            flex flex-col
            px-4 sm:px-8 lg:px-16
            py-4
            max-w-screen-2xl
            mx-auto
            gap-4
          ">
            {/* Desktop Layout */}
            <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full">
              {/* Left Logo */}
              <div className="justify-self-start">
                <Link href="/">
                  <img
                    src="/logo v1 red.png"
                    alt="Singitronic logo"
                    className="w-28 sm:w-36 lg:w-48 h-auto drop-shadow-sm hover:scale-105 transition-transform"
                  />
                </Link>
              </div>

              {/* Center Search - Stylized Glass Container */}
              <div className="hidden lg:block w-full max-w-xl mx-auto">
                <div className="bg-white/50 backdrop-blur-md rounded-full border border-white/60 shadow-inner">
                  <SearchInput />
                </div>
              </div>

              {/* Right Icons */}
              <div className="justify-self-end flex items-center gap-4 sm:gap-6 lg:gap-8">
                <div className="p-2 rounded-full hover:bg-white/60 transition-colors">
                  <HeartElement wishQuantity={wishQuantity} />
                </div>
                <div className="p-2 rounded-full hover:bg-white/60 transition-colors">
                  <CartElement />
                </div>

                {/* User Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/60 border border-white/80 shadow-sm hover:bg-white transition-all cursor-pointer"
                  >
                    <FaUser className="text-xl text-slate-700" />
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-4 z-[10] menu p-3 shadow-2xl bg-white/90 backdrop-blur-xl rounded-2xl w-52 border border-white/60"
                  >
                    {session ? (
                      <>
                        <li className="hover:bg-blue-50 rounded-lg transition-colors">
                          <Link onClick={closeDropdown} href="/Yourorders">Your Orders</Link>
                        </li>
                        <li className="hover:bg-blue-50 rounded-lg transition-colors">
                          <Link onClick={closeDropdown} href="/Userprofile">Profile</Link>
                        </li>
                        <div className="h-[1px] bg-slate-100 my-2" />
                        <li className="hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                          <button onClick={handleLogout}>Logout</button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="hover:bg-blue-50 rounded-lg transition-colors">
                          <Link onClick={closeDropdown} href="/login">Login</Link>
                        </li>
                        <li className="hover:bg-blue-50 rounded-lg transition-colors">
                          <Link onClick={closeDropdown} href="/register">Register</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Mobile Search Row */}
            <div className="w-full lg:hidden bg-white/40 backdrop-blur-md rounded-xl border border-white/60">
              <SearchInput />
            </div>
          </div>
        </div>
      )}

      {/* Admin Header Logic simplified for brevity, following similar glass patterns */}
      {pathname.startsWith("/admin") && (
        <div className="bg-white/60 backdrop-blur-md border-b border-white/40">
        <div
          className="
          flex
          justify-between
          items-center
          px-4 sm:px-8 lg:px-16
          h-20 sm:h-24 lg:h-32
          max-w-screen-2xl
          mx-auto
        "
        >

          <Link href="/">
            <Image
              src="/logo v1.png"
              width={130}
              height={130}
              alt="Singitronic logo"
              className="w-40 sm:w-48 lg:w-56 h-auto"
            />
          </Link>

          <div className="flex items-center gap-5">

            <div className="dropdown dropdown-end">

              <div
                tabIndex={0}
                role="button"
                aria-label="Admin menu"
                className="w-10 flex items-center justify-center cursor-pointer"
              >
                <FaUser className="text-2xl text-black active:animate-pop" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link onClick={closeDropdown} href="/admin">
                    Dashboard
                  </Link>
                </li>

                <li>
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>

            </div>

          </div>
        </div>
        </div>
      )}
    </header>  );
}
export default Header;
