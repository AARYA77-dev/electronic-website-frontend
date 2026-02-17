// *********************
// Role of the component: SortBy
// Name of the component: SortBy.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (Glassmorphism update)
// *********************

"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";
import { FaArrowDownWideShort } from "react-icons/fa6";

const SortBy = () => {
  const { sortBy, changeSortBy } = useSortStore();

  return (
    <div className="flex items-center gap-x-4 max-lg:flex-col max-lg:w-full max-lg:items-start group">
      {/* Icon and Label */}
      <div className="flex items-center gap-2 text-slate-500 mb-1 lg:mb-0">
        <FaArrowDownWideShort className="text-lg text-[#1e3a8a]" />
        <h3 className="text-sm font-bold uppercase tracking-widest">Sort by:</h3>
      </div>
      
      <div className="relative max-lg:w-full">
        <select
          defaultValue={sortBy}
          onChange={(e) => changeSortBy(e.target.value)}
          className="
            appearance-none
            cursor-pointer
            /* Glassmorphism Effect */
            bg-white/40 
            backdrop-blur-md 
            border border-white/60 
            text-slate-700 
            font-semibold
            text-sm
            py-2.5 
            pl-4 
            pr-10 
            rounded-2xl 
            w-48
            max-lg:w-full
            shadow-[0_4px_12px_rgba(31,38,135,0.03)]
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-400/50
            hover:bg-white/60
            transition-all
            duration-300
          "
          name="sort"
        >
          <option value="defaultSort" className="bg-white">Default</option>
          <option value="titleAsc" className="bg-white">Sort A-Z</option>
          <option value="titleDesc" className="bg-white">Sort Z-A</option>
          <option value="lowPrice" className="bg-white">Lowest Price</option>
          <option value="highPrice" className="bg-white">Highest Price</option>
        </select>
        
      </div>
    </div>
  );
};

export default SortBy;