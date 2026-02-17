"use client";

// *********************
// Role of the component: Component that displays all orders on admin dashboard page
// Name of the component: AdminOrders.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <AdminOrders />
// Input parameters: No input parameters
// Output: Table with all orders
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Yourorders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
 const { data: session } = useSession();
    const fetchOrders = async (id:string) => {
      const response = await fetch(`https://electronic-website-backend.onrender.com/api/orders/${id}`);
      const data = await response.json();
      setOrders(data);
    };

  const getUserByEmail = async () => {
      if (session?.user?.email) {
  
        fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
          cache: "no-store",
        })
          .then((response) => response.json())
          .then((data) => {
             fetchOrders(data?.id);
          });
      }
    };
  
    useEffect(() => {
      getUserByEmail();
    }, [session?.user?.email]);

  return (
  <div className="xl:ml-5 w-full max-xl:mt-5 pb-10">
      {/* Modern Header */}
      <div className="flex flex-col mb-8 px-4">
        <h1 className="text-4xl font-black text-[#1e3a8a] tracking-tight">
          Order History
        </h1>
        <p className="text-slate-500 font-medium tracking-wide">
          Tracking all processed transactions and deliveries.
        </p>
      </div>

      {/* Glass Table Container */}
      <div className="
        overflow-hidden 
        rounded-[32px] 
        bg-white/30 backdrop-blur-2xl 
        border border-white/60 
        shadow-[0_20px_50px_rgba(0,0,0,0.04)]
      ">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Themed Thead */}
            <thead>
              <tr className="border-b border-white/40 bg-white/40">
                <th className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Reference</th>
                <th className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Customer & Region</th>
                <th className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Delivery Status</th>
                <th className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Subtotal</th>
                <th className="py-6 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Timestamp</th>
                <th className="py-6 text-center px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#1e3a8a]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/20">
              {orders && orders.map((order) => (
                <tr key={order?.id} className="group hover:bg-white/50 transition-all duration-300">
                  {/* Order ID as a badge */}
                  <td className="px-6 py-5">
                    <span className="font-mono text-xs font-bold bg-slate-200/50 px-2 py-1 rounded-lg text-slate-600">
                      #{order?.id.toString().slice(-6)}
                    </span>
                  </td>

                  {/* Name and country with improved layout */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <div className="font-bold text-slate-900">{order?.name}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order?.country}</div>
                    </div>
                  </td>

                  {/* Glass Status Badge */}
                  <td className="px-6 py-5">
                    <span className="
                      inline-flex items-center gap-1.5 px-3 py-1 
                      rounded-full bg-emerald-500/10 text-emerald-600 
                      text-[10px] font-black uppercase tracking-widest
                      border border-emerald-500/20
                    ">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {order?.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-black text-[#1e3a8a] tracking-tighter text-lg">
                      ₹{order?.total}
                    </p>
                  </td>

                  <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                    {new Date(Date.parse(order?.dateTime)).toLocaleDateString()}
                    <span className="block text-[10px] opacity-50">
                       {new Date(Date.parse(order?.dateTime)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>

                  <th className="px-6 py-5 text-right">
                    <Link
                      href={`/Yourorders/${order?.id}`}
                      className="
                        flex items-center justify-center 
                        px-4 py-2 
                        bg-[#1e3a8a] text-white
                        text-[10px] font-black uppercase tracking-widest
                        rounded-xl shadow-lg shadow-blue-900/10
                        hover:scale-105 active:scale-95
                        transition-all duration-300
                      "
                    >
                      View Details
                    </Link>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Yourorders;
