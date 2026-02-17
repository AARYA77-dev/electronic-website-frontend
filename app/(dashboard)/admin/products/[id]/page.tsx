"use client";
import { DashboardSidebar } from "@/components";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  convertCategoryNameToURLFriendly as convertSlugToURLFriendly,
  formatCategoryName,
} from "../../../../../utils/categoryFormating";
import { nanoid } from "nanoid";

interface DashboardProductDetailsProps {
  params: Promise<{ id: number }>; // 2. Update type to Promise
}

const DashboardProductDetails = (props: DashboardProductDetailsProps) => {
const resolvedParams = use(props.params);
  const id = resolvedParams.id;  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();
  const [otherImages, setOtherImages] = useState<OtherImages[]>([]);
  const router = useRouter();

  const deleteProduct = async () => {
    const requestOptions = { method: "DELETE" };
    fetch(`https://electronic-website-backend.onrender.com/api/products/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("Product deleted successfully");
          router.push("/admin/products");
        } else if (response.status === 400) {
          toast.error("Cannot delete: Product is linked to existing orders.");
        } else {
          throw Error();
        }
      })
      .catch(() => toast.error("Error while deleting product"));
  };

  const updateProduct = async () => {
    if (!product?.title || !product?.slug || !product?.price) {
      toast.error("Required fields are missing");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    };
    fetch(`https://electronic-website-backend.onrender.com/api/products/${id}`, requestOptions)
      .then((res) => (res.ok ? toast.success("Product updated") : toast.error("Update failed")))
      .catch(() => toast.error("Network error during update"));
  };

  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);
    try {
      const res = await fetch("https://electronic-website-backend.onrender.com/api/main-image", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) toast.error("Upload unsuccessful");
    } catch (err) {
      toast.error("Upload error");
    }
  };

  const fetchProductData = async () => {
    fetch(`https://electronic-website-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    const imagesData = await fetch(`https://electronic-website-backend.onrender.com/api/images/${id}`, { cache: "no-store" });
    const images = await imagesData.json();
    setOtherImages(images);
  };

  const fetchCategories = async () => {
    fetch(`https://electronic-website-backend.onrender.com/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
    fetchProductData();
  }, [id]);

  const GlassInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</span>
      <input
        type={type}
        className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
        value={value || ""}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col">
        <DashboardSidebar />

        <div className="flex-1 p-6 xl:p-12">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Edit Product</h1>
            <p className="text-slate-500 font-medium">Configure product parameters and visual assets.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary Details */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> General Info
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassInput label="Product Name" value={product?.title} onChange={(e: any) => setProduct({ ...product!, title: e.target.value })} />
                  <GlassInput label="Slug ID" value={product?.slug} onChange={(e: any) => setProduct({ ...product!, slug: convertSlugToURLFriendly(e.target.value) })} />
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Description</span>
                    <textarea
                      className="w-full mt-2 bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl p-5 text-slate-900 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                      value={product?.description}
                      onChange={(e) => setProduct({ ...product!, description: e.target.value })}
                    />
                  </div>
                </div>
              </section>

              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Logistics
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <GlassInput label="Price (INR)" type="number" value={product?.price} onChange={(e: any) => setProduct({ ...product!, price: Number(e.target.value) })} />
                  <GlassInput label="Quantity" type="number" value={product?.quantity} onChange={(e: any) => setProduct({ ...product!, quantity: Number(e.target.value) })} />
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Category</span>
                    <select
                      className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-3 text-slate-900 focus:outline-none transition-all"
                      value={product?.categoryId}
                      onChange={(e) => setProduct({ ...product!, categoryId: e.target.value })}
                    >
                      {categories?.map((c) => (
                        <option key={c.id} value={c.id}>{formatCategoryName(c.name)}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
            </div>

            {/* Visual Assets Side-panel */}
            <div className="space-y-8">
              <section className="bg-[#1e3a8a] text-white rounded-[32px] p-8 shadow-2xl border border-white/10">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-300 mb-6">Visual Core</h2>
                <div className="relative group rounded-2xl overflow-hidden bg-white/10 border border-white/20 aspect-square mb-6">
                  {product?.mainImage && (
                    <Image src={`/` + product?.mainImage} alt="Main" fill className="object-contain p-4" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadFile(file);
                          setProduct({ ...product!, mainImage: file.name });
                        }
                      }}
                    />
                    <span className="text-xs font-black uppercase tracking-widest">Swap Image</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {otherImages.map((img) => (
                    <div key={nanoid()} className="relative aspect-square rounded-lg border border-white/10 overflow-hidden opacity-50">
                      <Image src={`/${img.image}`} alt="Gallery" fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Action Hub */}
              <section className="flex flex-col gap-4">
                <button
                  onClick={updateProduct}
                  className="w-full py-5 bg-[#1e3a8a] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all"
                >
                  Apply Changes
                </button>
                <button
                  onClick={deleteProduct}
                  className="w-full py-5 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete Product
                </button>
                <p className="text-[10px] text-slate-400 font-bold uppercase text-center mt-2 leading-relaxed">
                  Warning: Purging requires 0 linked records in the Order-Product matrix.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProductDetails;