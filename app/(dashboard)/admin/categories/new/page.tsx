"use client";
import { DashboardSidebar } from "@/components";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";

const DashboardNewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const addNewCategory = () => {
    if (categoryInput.name.length > 0) {
      setLoading(true);
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: convertCategoryNameToURLFriendly(categoryInput.name),
        }),
      };

      fetch(`https://electronic-website-backend.onrender.com/api/categories`, requestOptions)
        .then((response) => {
          if (response.status === 201) return response.json();
          throw Error("Error");
        })
        .then(() => {
          toast.success("Taxonomy updated successfully");
          setCategoryInput({ name: "" });
        })
        .catch(() => toast.error("System error during classification"))
        .finally(() => setLoading(false));
    } else {
      toast.error("Input required for system entry");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col h-screen overflow-hidden">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col p-6 xl:p-12 justify-center items-center">
          {/* Centralized Glass Card */}
          <div className="w-full max-w-2xl bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[48px] p-10 xl:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
            
            <header className="mb-12 text-center">
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter mt-2">
                New Category
              </h1>
              <p className="text-slate-500 font-medium mt-4">Define a new category for your product.</p>
            </header>

            <div className="space-y-10">
              {/* Input Group */}
              <div className="relative group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 absolute -top-3 left-6 bg-white px-2 z-10">
                  Category Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. smart phone"
                  className="w-full bg-white/50 border-2 border-slate-100 rounded-3xl px-8 py-6 text-xl font-bold text-slate-800 outline-none transition-all focus:border-blue-500 focus:bg-white focus:shadow-[0_0_20px_rgba(59,130,246,0.1)] placeholder:text-slate-300"
                  value={categoryInput.name}
                  onChange={(e) => setCategoryInput({ ...categoryInput, name: e.target.value })}
                />
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={loading}
                className="w-full mt-6 bg-blue-600 text-white rounded-[24px] py-6 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                onClick={addNewCategory}
              >
                <span className="relative z-10 text-xs font-black uppercase tracking-[0.3em]">
                  {loading ? "Proccesing..." : "Add Category"}
                </span>
              </button>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -z-10" />
        </div>
      </div>
    </div>
  );
};

export default DashboardNewCategoryPage;