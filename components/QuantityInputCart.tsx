// *********************
// Role of the component: Quantity input for incrementing and decrementing product quantity on the cart page
// Name of the component: QuantityInputCart.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <QuantityInputCart product={product} />
// Input parameters: { product: ProductInCart }
// Output: one number input and two buttons
// *********************

"use client";
import { ProductInCart, useProductStore } from "@/app/_zustand/store";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const QuantityInputCart = ({ product ,userId} : { product: ProductInCart, userId?: any }) => {
  const [quantityCount, setQuantityCount] = useState<number>(product.amount);
  const { updateCartAmount, calculateTotals } = useProductStore();
  const debouncedUpdate = useMemo(
    () =>
      debounce((newQuantity: number) => {
         if (!userId) return;
        fetch(
          "https://electronic-website-backend.onrender.com/api/cart",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              userId,
              productId:product.id,
              quantity: newQuantity }),
          }
        );
      }, 1000),
    [product.id, userId]
  );

 const handleQuantityChange = (actionName: string): void => {
    let newQuantity = quantityCount;

    if (actionName === "plus") {
      newQuantity = quantityCount + 1;
    }

    if (actionName === "minus" && quantityCount > 1) {
      newQuantity = quantityCount - 1;
    }

    setQuantityCount(newQuantity);
    updateCartAmount(product.id, newQuantity);
    calculateTotals();
    if(userId){
      debouncedUpdate(newQuantity);
    }
  };

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        {" "}
        Quantity{" "}
      </label>

      <div className="flex items-center justify-center rounded border border-gray-200 w-32">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityInputCart;
