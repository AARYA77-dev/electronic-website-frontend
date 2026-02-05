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
import React, { useEffect, useRef, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";

import CartElement from "./CartElement";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
// import NotificationElement from "./NotifictionElement";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };
    console.log(session,"checking",pathname.startsWith("/admin") === true)
  // getting all wishlist items by user id
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
  const dropdownRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (e:any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <header className="bg-white">
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <div className="h-32 bg-white flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto">
          <Link href="/">
            <Image src="/logo v1 red.png" width={300} height={300} alt="singitronic logo" className="relative right-5 max-[1023px]:w-56 active:animate-pop " />
          </Link>
          <SearchInput />
          <div className="flex gap-x-10">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
            {/* <NotificationElement/> */}
            <div ref={dropdownRef} className="dropdown dropdown-end ">
              <div onClick={() => setOpen(!open)} role="button" className="mt-[12%] w-10">
                <FaUser className="text-2xl text-black active:animate-pop " />
              </div>
              {open && session?.user && <ul
                className="dropdown-content z-[1] active:animate-pop menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link onClick={() => setOpen(false)} href="/Yourorders">
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link onClick={() => setOpen(false)} href="/Userprofile">Profile</Link>
                </li>
                <li onClick={handleLogout}>
                  <a href="#" onClick={() => setOpen(false)}>Logout</a>
                </li>
              </ul>}
              {open && !session && (
                <ul className="absolute right-0 mt-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                  <li>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Register
                    </Link>
                  </li>

                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* {pathname.startsWith("/admin") === false && !session && (
        <div className="h-32 bg-white flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image src="/logo v1 red.png" width={300} height={300} alt="singitronic logo" className="relative right-5 max-[1023px]:w-56" />
          </Link>
          <SearchInput />
          <div className="flex gap-x-10">
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
            <div ref={dropdownRef} className={`dropdown dropdown-end ${open ? "dropdown-open" : ""}`}>
              <div onClick={() => setOpen(!open)} role="button" className="mt-[12%] w-10">
                 <Image
                  src="/randomuser.jpg"
                  alt="random profile photo"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full"
                /> 
                <FaUser className="text-2xl text-black" />
              </div>
              {open && (
                <ul className="absolute right-0 mt-2 z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">

                  <li>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Login
                    </Link>
                  </li>

                  <li>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Register
                    </Link>
                  </li>

                </ul>
              )}
            </div>
          </div>
        </div>
      )} */}

      {pathname.startsWith("/admin") === true && (
        <div className="flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10  max-w-screen-2xl mx-auto max-[400px]:px-5">
          <Link href="/">
            <Image
              src="/logo v1.png"
              width={130}
              height={130}
              alt="singitronic logo"
              className="w-56 h-auto"
            />
          </Link>
          <div className="flex gap-x-5 items-center">
            <div ref={dropdownRef} className="dropdown dropdown-end">
              <div onClick={() => setOpen(!open)} role="button" className="w-10 active:animate-pop">
                <FaUser className="text-2xl text-black" />
              </div>
             {open && <ul
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link onClick={() => setOpen(false)} href="/admin">Dashboard</Link>
                </li>

                <li onClick={() => {
                  setOpen(false);
                  handleLogout();
                }} >
                  <a href="#">Logout</a>
                </li>
              </ul>}
            </div>
          </div>

        </div>

      )}
    </header>
  );
};

export default Header;
