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
    <div className="flex flex-col gap-2">
      <label htmlFor="Quantity" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
        Quantity
      </label>

      <div className="
        flex items-center 
        bg-white/50 
        backdrop-blur-sm 
        border border-white/80 
        rounded-2xl 
        w-fit 
        overflow-hidden 
        shadow-sm
      ">
        {/* Minus Button */}
        <button
          type="button"
          className="
            size-10 
            flex items-center justify-center 
            text-slate-600 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            active:scale-90
          "
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus className="text-xs" />
        </button>

        {/* Quantity Display */}
        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="
            h-10 w-12 
            bg-transparent 
            text-center 
            font-bold 
            text-[#1e3a8a] 
            text-sm 
            outline-none
            pointer-events-none
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none
          "
        />

        {/* Plus Button */}
        <button
          type="button"
          className="
            size-10 
            flex items-center justify-center 
            text-slate-600 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            active:scale-90
          "
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default QuantityInputCart;
