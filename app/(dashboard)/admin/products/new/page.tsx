"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddNewProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<{
    title: string;
    price: number;
    manufacturer: string;
    quantity: number;
    inStock: number;
    mainImage: string;
    description: string;
    slug: string;
    categoryId: string;
  }>({
    title: "",
    price: 0,
    manufacturer: "",
    quantity: 0,
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const addProduct = async () => {
    setLoading(true)
    if (
      product.title === "" ||
      product.manufacturer === "" ||
      product.description == "" ||
      product.slug === ""
    ) {
      toast.error("Please enter values in input fields");
      setLoading(false)
      return;
    }

    const requestOptions: any = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`https://electronic-website-backend.onrender.com/api/products`, requestOptions)
      .then((response) => {
        setLoading(false)
        if (response.status === 201) {
          return response.json();
        } else {
          throw Error("There was an error while creating product");
        }
      })
      .then((data) => {
        setLoading(false)
        toast.success("Product added successfully");
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          quantity: 0,
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: "",
        });
      })
      .catch((error) => {
        toast.error("There was an error while creating product");
      });
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch("https://electronic-website-backend.onrender.com/api/main-image", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("File upload unsuccessfull");
      }
    } catch (error) {
      console.error("Error happend while sending request:", error);
    }
  };

  const fetchCategories = async () => {
    fetch(`https://electronic-website-backend.onrender.com/api/categories`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        setProduct({
          title: "",
          price: 0,
          manufacturer: "",
          quantity: 0,
          inStock: 1,
          mainImage: "",
          description: "",
          slug: "",
          categoryId: data[0]?.id,
        });
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col h-screen overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col p-6 xl:p-12 overflow-y-auto custom-scrollbar">
          {/* Header */}
          <div className="flex flex-col mb-10 px-4">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
              Add New Product
            </h1>
           
          </div>

          {/* Form Container */}
          <div className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] shadow-2xl p-8 xl:p-12">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              
              {/* Left Column: Primary Data */}
              <div className="flex flex-col gap-y-8">
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-blue-600"></span> Core Identification
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Product Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Quantum Processor X1"
                        className="bg-white/50 border border-white shadow-sm rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800"
                        value={product?.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">URL Slug</label>
                      <input
                        type="text"
                        className="bg-slate-100/50 border border-slate-200/50 rounded-2xl px-6 py-4 outline-none font-mono text-xs text-blue-600"
                        value={convertSlugToURLFriendly(product?.slug)}
                        onChange={(e) => setProduct({ ...product, slug: convertSlugToURLFriendly(e.target.value) })}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-blue-600"></span> Logistics & Classification
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Category</label>
                      <select
                        className="bg-white/50 border border-white shadow-sm rounded-2xl px-6 py-4 outline-none font-bold text-slate-700"
                        value={product?.categoryId}
                        onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                      >
                        {categories.map((category: any) => (
                          <option key={category?.id} value={category?.id}>{category?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Manufacturer</label>
                      <input
                        type="text"
                        className="bg-white/50 border border-white shadow-sm rounded-2xl px-6 py-4 outline-none font-bold"
                        value={product?.manufacturer}
                        onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Price (INR)</label>
                      <input
                        type="number"
                        className="bg-white/50 border border-white shadow-sm rounded-2xl px-6 py-4 outline-none font-black text-lg text-blue-900"
                        value={product?.price}
                        onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Initial Stock</label>
                      <input
                        type="number"
                        className="bg-white/50 border border-white shadow-sm rounded-2xl px-6 py-4 outline-none font-bold"
                        value={product?.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right Column: Visuals & Narrative */}
              <div className="flex flex-col gap-y-8">
                <section>
                  <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-6 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-blue-600"></span> Visual Documentation
                  </h2>
                  <div className="relative group overflow-hidden bg-slate-100/50 border-2 border-dashed border-slate-300 rounded-[32px] p-8 flex flex-col items-center justify-center transition-all hover:border-blue-400">
                    {product?.mainImage ? (
                      <div className="relative w-full aspect-square max-h-[300px]">
                        <Image
                          fill
                          src={`/` + product?.mainImage}
                          alt="Preview"
                          className="object-contain drop-shadow-2xl"
                        />
                      </div>
                    ) : (
                      <div className="py-12 flex flex-col items-center text-slate-400">
                        <div className="text-4xl mb-4">+</div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Upload Master Image</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e: any) => {
                        uploadFile(e.target.files[0]);
                        setProduct({ ...product, mainImage: e.target.files[0].name });
                      }}
                    />
                  </div>
                </section>

                <section>
                   <div className="flex flex-col gap-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-2">Product Specifications</label>
                      <textarea
                        className="bg-white/50 border border-white shadow-sm rounded-[32px] px-8 py-6 outline-none h-[180px] focus:ring-2 focus:ring-blue-500/20 transition-all font-medium text-slate-700 leading-relaxed"
                        placeholder="Detailed technical breakdown..."
                        value={product?.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                      />
                    </div>
                </section>

                {/* Submit Action */}
                <button
                  onClick={addProduct}
                  disabled={loading}
                  className="w-full mt-6 bg-blue-600 text-white rounded-[24px] py-6 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Add product"
                  )}
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;
