"use client";
import { DashboardSidebar } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { formatCategoryName, convertCategoryNameToURLFriendly } from "../../../../../utils/categoryFormating";

interface DashboardSingleCategoryProps {
  params: Promise<{ id: number }>;
}

const DashboardSingleCategory = (props: DashboardSingleCategoryProps) => {
  // Next.js 15 unwrapping
  const resolvedParams = use(props.params);
  const id = resolvedParams.id;
  
  const [categoryInput, setCategoryInput] = useState<{ name: string }>({ name: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://electronic-website-backend.onrender.com/api/categories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryInput({ name: data?.name || "" });
      });
  }, [id]);

  const deleteCategory = async () => {
    if (!confirm("CRITICAL: Deleting this category will purge all linked products. Proceed?")) return;

    const requestOptions = { method: "DELETE" };
    fetch(`https://electronic-website-backend.onrender.com/api/categories/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Category and associated assets purged");
          router.push("/admin/categories");
        } else {
          throw Error();
        }
      })
      .catch(() => toast.error("System failed to delete category"));
  };

  const updateCategory = async () => {
    if (categoryInput.name.trim().length === 0) {
      toast.error("Category label cannot be empty");
      return;
    }

    setIsUpdating(true);
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: convertCategoryNameToURLFriendly(categoryInput.name),
      }),
    };

    fetch(`https://electronic-website-backend.onrender.com/api/categories/${id}`, requestOptions)
      .then((res) => res.ok ? toast.success("Taxonomy updated") : toast.error("Sync error"))
      .finally(() => setIsUpdating(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col">
        <DashboardSidebar />

        <div className="flex-1 p-6 xl:p-12">
          {/* Header Card */}
          <header className="mb-10 p-8 rounded-[32px] bg-white/30 backdrop-blur-xl border border-white/60 shadow-xl flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Category</h1>
              <p className="text-slate-500 font-mono text-xs mt-1 uppercase tracking-widest">ID: {id}</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Config Panel */}
            <div className="lg:col-span-2">
              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-8 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Label Management
                </h2>
                
                <div className="flex flex-col gap-2 w-full max-w-lg">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Visible Name</span>
                  <input
                    type="text"
                    className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-4 text-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm font-medium"
                    value={formatCategoryName(categoryInput.name)}
                    onChange={(e) => setCategoryInput({ ...categoryInput, name: e.target.value })}
                  />
                  <p className="text-[10px] text-slate-400 font-medium ml-1 mt-1 italic">
                    Note: System will automatically convert this to a URL-friendly slug.
                  </p>
                </div>
              </section>
            </div>

            {/* Action Sidebar */}
            <div className="space-y-6">
              <section className="bg-[#1e3a8a] text-white rounded-[32px] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl" />
                
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-300 mb-6">Database Actions</h3>

                <div className="space-y-4 relative z-10">
                  <button
                    disabled={isUpdating}
                    onClick={updateCategory}
                    className="w-full py-4 bg-white text-blue-900 rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                  >
                    {isUpdating ? "Syncing..." : "Update Node"}
                  </button>
                  <button
                    onClick={deleteCategory}
                    className="w-full py-4 bg-transparent border border-red-400/30 text-red-300 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest transition-all"
                  >
                    Delete Category
                  </button>
                </div>
              </section>
              
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                  </div>
                  <p className="text-[11px] text-red-900 font-bold uppercase leading-relaxed tracking-tight">
                    Warning: Deleting this category triggers a cascade deletion of all associated products in the database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;