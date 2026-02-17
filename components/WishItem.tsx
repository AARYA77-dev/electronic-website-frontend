// *********************
// Role of the component: Wishlist item component for wishlist page
// Name of the component: WishItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <WishItem id={id} title={title} price={price} image={image} slug={slug} stockAvailabillity={stockAvailabillity} />
// Input parameters: ProductInWishlist interface
// Output: single wishlist item on the wishlist page
// *********************

"use client";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const WishItem = ({
  id,
  title,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const { data: session, status } = useSession();
  const { removeFromWishlist } = useWishlistStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

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

  const deleteItemFromWishlist = async (productId: string) => {

    if (userId) {

      fetch(`https://electronic-website-backend.onrender.com/api/wishlist/${userId}/${productId}`, { method: "DELETE" }).then(
        (response) => {
          removeFromWishlist(productId);
          toast.success("Item removed from your wishlist");
        }
      );
    } else {
      toast.error("You need to be logged in to perform this action");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(id)}>
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(id)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(id)}
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td>
        <button className="flex mx-auto items-center gap-2 px-4 py-2 
        bg-white/10 text-slate-400 
        border border-slate-200/50 
        rounded-xl text-xs font-bold uppercase tracking-wider
        hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200
        transition-all duration-300">
          <FaHeartCrack />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromWishlist(id)}
          >
            remove from the wishlist
          </span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
