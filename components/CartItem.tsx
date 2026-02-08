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
import { useProductStore } from "@/app/_zustand/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const CartItem = ({
  id,
  title,
  // price,
  image,
  slug,
  stockAvailabillity,
  quantity
}: ProductInWishlist) => {
  const { data: session, status } = useSession();
  const { removeFromCart, calculateTotals } = useProductStore();
  const router = useRouter();
  const [userId, setUserId] = useState<string>();

  const openProduct = (slug: string): void => {
    router.push(`/cart`);
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

  const deleteItemFromCart = async (productId: string) => {

    if (userId) {
      fetch(`https://electronic-website-backend.onrender.com/api/cart/${userId}/${productId}`, { method: "DELETE" }).then(
        (response) => {
          removeFromCart(productId);
          calculateTotals();
          toast.success("Item removed from your cart");
        }
      );
    } else {
      calculateTotals();
      removeFromCart(productId);
      toast.success("Item removed from your cart");
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, []);

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      {/* <th
               className="text-black text-sm text-center"
              
             >
               {id}
             </th> */}
      <th onClick={() => openProduct(slug)}>
        <div className="w-12 h-12 mx-auto">
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td onClick={() => openProduct(slug)}
        className="text-black text-sm text-center"     
      >
        {title}
      </td>
      <td onClick={() => openProduct(slug)}
        className="text-black text-sm text-center"
      
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td onClick={() => openProduct(slug)} className="text-black text-sm text-center">{quantity}</td>
      <td>
        <button className="btn btn-xs bg-primary text-white hover:text-primary border border-primary hover:bg-white hover:text-primary text-sm">
          <FaTrash />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromCart(id)}
          >
            remove from the cart
          </span>
        </button>
      </td>
    </tr>
  );
};

export default CartItem;
