"use client";
import { DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { formatCategoryName } from "../../../../utils/categoryFormating";

const DashboardCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://electronic-website-backend.onrender.com/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col h-screen overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col p-6 xl:p-12 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10 bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-xl">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Category</h1>
            </div>
            <Link href="/admin/categories/new">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Add New Category
              </button>
            </Link>
          </div>

          {/* Table Container */}
          <div className="flex-1 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-xl overflow-hidden flex flex-col">
            <div className="overflow-auto custom-scrollbar h-full">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-100/50 backdrop-blur-md">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60">Category Label</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60 ">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {categories.map((category: Category) => (
                    <tr key={nanoid()} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="font-bold text-slate-800 text-base">
                            {formatCategoryName(category?.name)}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Link
                          href={`/admin/categories/${category?.id}`}
                          className="inline-flex items-center justify-center 
                        px-4 py-2 
                        bg-[#1e3a8a] text-white
                        text-[10px] font-black uppercase tracking-widest
                        rounded-xl shadow-lg shadow-blue-900/10
                        hover:scale-105 active:scale-95
                        transition-all duration-300"
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {categories.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
                  </svg>
                  <p className="font-bold uppercase tracking-widest text-xs">No Nodes Found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCategory;