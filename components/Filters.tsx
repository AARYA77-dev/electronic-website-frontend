"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSortStore } from "@/app/_zustand/sortStore";
import { usePaginationStore } from "@/app/_zustand/paginationStore";

interface InputCategory {
  inStock: { text: string, isChecked: boolean },
  outOfStock: { text: string, isChecked: boolean },
  priceFilter: { text: string, value: number },
  ratingFilter: { text: string, value: number },
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const { page } = usePaginationStore();
  const { sortBy } = useSortStore();

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 3000 },
    ratingFilter: { text: "rating", value: 0 },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page]);

  return (
    <div className="
      sticky top-28
      w-full 
      p-6 
      rounded-[32px] 
      bg-white/40 
      backdrop-blur-xl 
      border border-white/60 
      shadow-[0_8px_32px_rgba(31,38,135,0.05)]
    ">
      <h3 className="text-2xl font-bold text-[#1e3a8a] mb-6 tracking-tight">Filters</h3>
      
      {/* Availability Section */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-3">Availability</h4>
        <div className="flex flex-col gap-y-3">
          <label className="group cursor-pointer flex items-center transition-all">
            <input
              type="checkbox"
              checked={inputCategory.inStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  inStock: { ...inputCategory.inStock, isChecked: !inputCategory.inStock.isChecked },
                })
              }
              className="checkbox checkbox-primary border-slate-300 bg-white/50"
            />
            <span className="ml-3 text-slate-700 group-hover:text-[#1e3a8a] transition-colors font-medium">In stock</span>
          </label>

          <label className="group cursor-pointer flex items-center transition-all">
            <input
              type="checkbox"
              checked={inputCategory.outOfStock.isChecked}
              onChange={() =>
                setInputCategory({
                  ...inputCategory,
                  outOfStock: { ...inputCategory.outOfStock, isChecked: !inputCategory.outOfStock.isChecked },
                })
              }
              className="checkbox checkbox-primary border-slate-300 bg-white/50"
            />
            <span className="ml-3 text-slate-700 group-hover:text-[#1e3a8a] transition-colors font-medium">Out of stock</span>
          </label>
        </div>
      </div>

      <div className="h-[1px] bg-white/60 my-8 shadow-sm"></div>

      {/* Price Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Price</h4>
          <span className="text-[#1e3a8a] font-bold text-sm bg-white/60 px-2 py-1 rounded-lg border border-white/80">
            ${inputCategory.priceFilter.value}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={3000}
          step={10}
          value={inputCategory.priceFilter.value}
          className="range range-xs range-primary accent-[#1e3a8a]"
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              priceFilter: { ...inputCategory.priceFilter, value: Number(e.target.value) },
            })
          }
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
          <span>$0</span>
          <span>$3000</span>
        </div>
      </div>

      <div className="h-[1px] bg-white/60 my-8 shadow-sm"></div>

      {/* Rating Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-end mb-2">
          <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500">Minimum Rating</h4>
          <span className="text-[#1e3a8a] font-bold text-sm bg-white/60 px-2 py-1 rounded-lg border border-white/80">
            {inputCategory.ratingFilter.value}★
          </span>
        </div>
        <input
          type="range"
          min={0}
          max="5"
          step="1"
          value={inputCategory.ratingFilter.value}
          onChange={(e) =>
            setInputCategory({
              ...inputCategory,
              ratingFilter: { ...inputCategory.ratingFilter, value: Number(e.target.value) },
            })
          }
          className="range range-xs range-primary accent-[#1e3a8a]"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      {/* Clear Button Placeholder for Modern UX */}
      <button 
        onClick={() => setInputCategory({
          inStock: { text: "instock", isChecked: true },
          outOfStock: { text: "outofstock", isChecked: true },
          priceFilter: { text: "price", value: 3000 },
          ratingFilter: { text: "rating", value: 0 },
        })}
        className="w-full mt-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-blue-800 transition-all border border-slate-200"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;