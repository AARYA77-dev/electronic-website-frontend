// *********************
// Role of the component: Quantity input for incrementing and decrementing product quantity on the single product page
// Name of the component: QuantityInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <QuantityInput quantityCount={quantityCount} setQuantityCount={setQuantityCount} />
// Input parameters: QuantityInputProps interface
// Output: one number input and two buttons
// *********************

"use client";

import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

interface QuantityInputProps {
  quantityCount: number;
  setQuantityCount: React.Dispatch<React.SetStateAction<number>>;
}

const QuantityInput = ({quantityCount, setQuantityCount} : QuantityInputProps) => {


  const handleQuantityChange = (actionName: string): void => {
    if (actionName === "plus") {
      setQuantityCount(quantityCount + 1);
    } else if (actionName === "minus" && quantityCount !== 1) {
      setQuantityCount(quantityCount - 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="Quantity" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Quantity: </label>

      <div className=" flex items-center 
        bg-white/50 
        backdrop-blur-sm 
        border border-white/80 
        rounded-2xl 
        w-fit 
        overflow-hidden 
        shadow-sm">
        <button
          type="button"
          className=" size-10 
            flex items-center justify-center 
            text-slate-600 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            active:scale-90"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus className="text-xs" />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className=" h-10 w-12 
            bg-transparent 
            text-center 
            font-bold 
            text-[#1e3a8a] 
            text-sm 
            outline-none
            pointer-events-none
            [appearance:textfield]
            [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="size-10 
            flex items-center justify-center 
            text-slate-600 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            active:scale-90"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
