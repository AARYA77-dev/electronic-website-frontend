"use client";
import 'react-international-phone/style.css';
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description: string;
    manufacturer: string;
    inStock: number;
    categoryId: string;
  };
}

// Refined Info Component with Glass Style
const Info = ({ label, value, highlight = false }: { label: string; value: any, highlight?: boolean }) => (
  <div className="flex flex-col gap-1">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
      {label}
    </p>
    <p className={`font-bold tracking-tight ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>
      {value || "-"}
    </p>
  </div>
);

const YourOrderDetails = () => {
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>();
  const [order, setOrder] = useState<Order>({
    id: "", adress: "", apartment: "", company: "", dateTime: "", email: "",
    lastname: "", name: "", phone: "", postalCode: "", city: "", country: "",
    orderNotice: "", status: "processing", total: 0,
  });
  
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(`https://electronic-website-backend.onrender.com/api/orders/orderDetails/${params?.id}`);
      const data: Order = await response.json();
      setOrder(data);
    };

    const fetchOrderProducts = async () => {
      const response = await fetch(`https://electronic-website-backend.onrender.com/api/order-product/${params?.id}`);
      const data: OrderProduct[] = await response.json();
      setOrderProducts(data);
    };

    fetchOrderData();
    fetchOrderProducts();
  }, [params?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP HEADER GLASS CARD */}
        <div className="mb-8 p-8 rounded-[32px] bg-white/30 backdrop-blur-xl border border-white/60 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Order Manifesto</h1>
            <p className="text-slate-500 font-mono text-sm mt-1 flex items-center gap-2">
              REF: <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">#{order?.id}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">{order?.status}</span>
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-8">
          {/* LEFT COLUMN */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* LOGISTICS GRID */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* CUSTOMER PROFILE */}
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-lg">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Identity
                </h2>
                <div className="grid grid-cols-2 gap-y-6">
                  <Info label="Recipient" value={`${order?.name} ${order?.lastname}`} />
                  <Info label="Phone Number" value={order?.phone} />
                  <div className="col-span-2">
                    <Info label="Email" value={order?.email} />
                  </div>
                </div>
              </div>

              {/* DESTINATION */}
              <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-lg">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Destination
                </h2>
                <div className="grid grid-cols-2 gap-y-6">
                  <div className="col-span-2">
                    <Info label="Address" value={`${order?.adress}, ${order?.apartment}`} />
                  </div>
                  <Info label="City" value={`${order?.city}, ${order?.country}`} />
                  <Info label="Postal Code" value={order?.postalCode} />
                </div>
              </div>
            </div>

            {/* PRODUCT MANIFEST */}
            <div className="bg-white/40 backdrop-blur-md rounded-[32px] p-8 border border-white/60 shadow-lg">
               <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-8 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" />Items
               </h2>
               <div className="space-y-6">
                  {orderProducts?.map((item) => (
                    <div key={item?.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-white/40 transition-all border border-transparent hover:border-white/40">
                      <div className="flex items-center gap-6">
                        <div className="relative w-20 h-20 bg-white rounded-xl border border-white p-2 shadow-inner group-hover:scale-105 transition-transform">
                          <Image
                            src={item?.product?.mainImage ? `/${item?.product?.mainImage}` : "/product_placeholder.jpg"}
                            alt={item?.product?.title}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div>
                          <Link href={`/product/${item?.product?.slug}`} className="font-black text-slate-900 hover:text-blue-600 block transition-colors">
                            {item?.product?.title}
                          </Link>
                          <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-tighter">
                            UNIT COST: ₹{item?.product?.price} <span className="mx-2">/</span> QTY: {item?.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-slate-900">₹{item?.product?.price * item?.quantity}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="xl:col-span-1">
            <div className="sticky top-10 bg-[#1e3a8a] text-white rounded-[32px] p-8 shadow-2xl border border-white/20 overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/20 rounded-full blur-3xl" />
              
              <h2 className="relative z-10 text-xl font-black uppercase tracking-widest mb-8 text-blue-200">Order Summery</h2>
              
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between text-sm opacity-80">
                  <span className="font-medium">Sub-Level Total</span>
                  <span className="font-mono">₹{Math.ceil(order?.total / 1.2 - 5)}</span>
                </div>
                <div className="flex justify-between text-sm opacity-80">
                  <span className="font-medium">System Tax (20%)</span>
                  <span className="font-mono">₹{Math.ceil((order?.total / 1.2 - 5) / 5)}</span>
                </div>
                <div className="flex justify-between text-sm opacity-80 pb-4 border-b border-white/10">
                  <span className="font-medium">Logistics Fee</span>
                  <span className="font-mono">₹5</span>
                </div>
                
                <div className="flex justify-between items-end pt-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Net Payable</p>
                    <p className="text-4xl font-black tracking-tighter mt-1">₹{order?.total}</p>
                  </div>
                  <div className="text-[10px] font-mono opacity-50 mb-2">CURRENCY: INR</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default YourOrderDetails;