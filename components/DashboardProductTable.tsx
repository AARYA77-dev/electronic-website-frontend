"use client";
import { nanoid } from "nanoid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://electronic-website-backend.onrender.com/api/products?mode=admin", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      {/* Terminal Header */}
      <div className="flex justify-between items-center mb-8 bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-xl">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Product</h1>
          <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">Global Stock & Asset Management</p>
        </div>
        <Link href="/admin/products/new">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20 active:scale-95 flex items-center gap-2">
            <span>+</span> Deploy New Product
          </button>
        </Link>
      </div>

      {/* Glass Table Container */}
      <div className="flex-1 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-xl overflow-hidden flex flex-col">
        <div className="overflow-auto custom-scrollbar h-full">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-slate-100/60 backdrop-blur-md">
              <tr className="border-b border-white/60">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Asset</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Stock Protocol</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Valuation</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-white/40">
              {products.map((product) => (
                <tr key={nanoid()} className="group hover:bg-white/40 transition-all duration-200">
                  {/* Product & Manufacturer */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-white">
                        <Image
                          fill
                          src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                          alt={product?.title}
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                          {product?.title}
                        </span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                          {product?.manufacturer}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Stock Availability with Dynamic Progress */}
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-2 min-w-[140px]">
                      <div className="flex justify-between items-center">
                        <span className={`text-[10px] font-black uppercase tracking-tighter ${product?.quantity > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                          {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-500">{product?.quantity} units</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden border border-white/50">
                        <div 
                          className={`h-full transition-all duration-1000 ${product?.quantity > 10 ? 'bg-emerald-500' : 'bg-orange-500'}`}
                          style={{ width: `${Math.min(product?.quantity * 2, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-8 py-5">
                    <span className="font-black text-slate-900 tracking-tighter text-lg">
                      ₹{product?.price.toLocaleString()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="inline-flex items-center justify-center 
                        px-4 py-2 
                        bg-[#1e3a8a] text-white
                        text-[10px] font-black uppercase tracking-widest
                        rounded-xl shadow-lg shadow-blue-900/10
                        hover:scale-105 active:scale-95
                        transition-all duration-300"
                    >
                      Configure
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <div className="w-12 h-12 bg-slate-200 rounded-full mb-4" />
              <div className="h-4 w-48 bg-slate-200 rounded-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardProductTable;