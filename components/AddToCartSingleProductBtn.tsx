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
      className="btn w-[200px] text-lg border border-tertiary border-1 font-normal bg-tertiary text-secondary hover:bg-secondary hover:text-tertiary hover:border-secondary hover:scale-110 transition-all uppercase ease-in max-[500px]:w-full"
    >
      Add to cart
    </button>
  );
};

export default AddToCartSingleProductBtn;
