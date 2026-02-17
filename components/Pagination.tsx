// *********************
// Role of the component: Pagination for navigating the shop page
// Name of the component: Pagination.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (Glassmorphism update)
// *********************

"use client";
import { usePaginationStore } from "@/app/_zustand/paginationStore";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Pagination = () => {
  const { page, incrementPage, decrementPage } = usePaginationStore();

  return (
    <div className="flex justify-center py-16">
      <div className="
        flex items-center gap-2 
        p-2 
        bg-white/40 
        backdrop-blur-xl 
        border border-white/60 
        rounded-full 
        shadow-[0_8px_32px_rgba(31,38,135,0.07)]
      ">
        {/* Previous Button */}
        <button
          className="
            w-12 h-12 
            flex items-center justify-center 
            rounded-full 
            text-slate-600 
            bg-white/50 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            duration-300
            disabled:opacity-30
            disabled:hover:bg-white/50
            disabled:hover:text-slate-600
          "
          onClick={() => decrementPage()}
          disabled={page === 1}
        >
          <FaChevronLeft className="text-sm" />
        </button>

        {/* Page Indicator */}
        <div className="px-6 py-2">
          <span className="text-sm font-bold tracking-widest text-slate-500 uppercase mr-2">
            Page
          </span>
          <span className="
            inline-flex items-center justify-center 
            w-10 h-10 
            rounded-full 
            bg-[#1e3a8a] 
            text-white 
            font-bold 
            text-lg
            shadow-[0_4px_12px_rgba(30,58,138,0.3)]
          ">
            {page}
          </span>
        </div>

        {/* Next Button */}
        <button
          className="
            w-12 h-12 
            flex items-center justify-center 
            rounded-full 
            text-slate-600 
            bg-white/50 
            hover:bg-[#1e3a8a] 
            hover:text-white 
            transition-all 
            duration-300
          "
          onClick={() => incrementPage()}
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;