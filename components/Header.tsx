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

    cart && cart.map((item: any) => productArray.push({
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
    <header className="bg-white mt-[10px]">

      <HeaderTop />

      {/* ================= USER HEADER ================= */}
      {!pathname.startsWith("/admin") && (
        <div className="
  bg-white
  flex flex-col
  px-4 sm:px-8 lg:px-16
  py-3
  max-w-screen-2xl
  mx-auto
  gap-3
">

          {/* ⭐ Desktop Layout */}
          <div className="grid grid-cols-2 lg:grid-cols-3 items-center w-full">

            {/* Left → Logo */}
            <div className="justify-self-start">
              <Link href="/">
                <img
                  src="/logo v1 red.png"
                  alt="Singitronic logo"
                  className="w-28 sm:w-36 lg:w-56 h-auto"
                />
              </Link>
            </div>

            {/* Center → Search (Perfectly Centered) */}
            <div className="hidden lg:block w-full max-w-xl mx-auto">
              <SearchInput />
            </div>

            {/* Right → Icons */}
            <div className="justify-self-end flex items-center gap-4 sm:gap-6 lg:gap-10">

              <HeartElement wishQuantity={wishQuantity} />
              <CartElement />

              {/* Dropdown */}
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="w-10 mt-[2px] flex items-center justify-center cursor-pointer"
                >
                  <FaUser className="text-2xl text-black active:animate-pop" />
                </div>

                <ul
                  tabIndex={0}
                  className="dropdown-content z-[10] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  {session ? (
                    <>
                      <li>
                        <Link onClick={closeDropdown} href="/Yourorders">
                          Your Orders
                        </Link>
                      </li>

                      <li>
                        <Link onClick={closeDropdown} href="/Userprofile">
                          Profile
                        </Link>
                      </li>

                      <li>
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link onClick={closeDropdown} href="/login">
                          Login
                        </Link>
                      </li>

                      <li>
                        <Link onClick={closeDropdown} href="/register">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>

            </div>

          </div>

          {/* ⭐ Mobile Search Row */}
          <div className="w-full lg:hidden">
            <SearchInput />
          </div>

        </div>


      )}

      {/* ================= ADMIN HEADER ================= */}
      {pathname.startsWith("/admin") && (
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
      )}

    </header>
  );
}
export default Header;
