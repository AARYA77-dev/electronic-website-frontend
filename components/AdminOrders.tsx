"use client";

// *********************
// Role: Administrative Master Order Log
// Developer: Aleksandar Kuzmanovic (Refined by Gemini)
// Version: 1.1
// *********************

import React, { useEffect, useState } from "react";
import Link from "next/link";

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://electronic-website-backend.onrender.com/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Order sync failure", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="xl:ml-5 w-full max-xl:mt-5 pb-10">
      {/* Dynamic Header */}
      <div className="flex flex-col mb-10 px-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
         Orders
        </h1>
        <p className="text-slate-500 font-medium mt-1 uppercase text-[10px] tracking-[0.2em]">
          Real-time Order
        </p>
      </div>

      {/* Glass Terminal Container */}
      <div className="
        overflow-hidden 
        rounded-[32px] 
        bg-white/30 backdrop-blur-xl 
        border border-white/60 
        shadow-[0_20px_50px_rgba(0,0,0,0.06)]
      ">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            {/* Themed Thead */}
            <thead>
              <tr className="border-b border-white/40 bg-slate-100/50">
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-left">
                  Reference
                </th>
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-left">
                  Customer Entity
                </th>
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-left">
                  Delivery Status
                </th>
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-left">
                  Net Value
                </th>
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-left">
                  Timeline
                </th>
                <th className="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-blue-900 text-right">
                  System Access
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/30">
              {orders.map((order) => (
                <tr key={order?.id} className="group hover:bg-white/60 transition-all duration-300">
                  {/* Order ID Badge */}
                  <td className="px-8 py-6">
                    <span className="font-mono text-[11px] font-black bg-white/50 border border-white/80 px-3 py-1.5 rounded-xl text-blue-900 shadow-sm">
                      #ID-{order?.id.toString().slice(-6).toUpperCase()}
                    </span>
                  </td>

                  {/* Customer Details */}
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-800 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
                        {order?.name}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {order?.country}
                      </span>
                    </div>
                  </td>

                  {/* Status Protocol */}
                  <td className="px-8 py-6">
                    <span className="
                      inline-flex items-center gap-2 px-4 py-1.5 
                      rounded-2xl bg-white/40 text-emerald-700 
                      text-[10px] font-black uppercase tracking-widest
                      border border-white shadow-sm
                    ">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                      {order?.status}
                    </span>
                  </td>

                  {/* Total */}
                  <td className="px-8 py-6 text-left">
                    <p className="font-black text-slate-900 tracking-tighter text-lg italic">
                      ₹{order?.total.toLocaleString()}
                    </p>
                  </td>

                  {/* Timestamp */}
                  <td className="px-8 py-6">
                    <div className="text-xs font-bold text-slate-600">
                      {new Date(Date.parse(order?.dateTime)).toLocaleDateString('en-GB', { 
                        day: '2-digit', month: 'short', year: 'numeric' 
                      })}
                      <span className="block text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                        {new Date(Date.parse(order?.dateTime)).toLocaleTimeString([], { 
                          hour: '2-digit', minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="px-8 py-6 text-right">
                    <Link
                      href={`/admin/orders/${order?.id}`}
                      className="
                        inline-flex items-center justify-center 
                        px-4 py-2 
                        bg-[#1e3a8a] text-white
                        text-[10px] font-black uppercase tracking-widest
                        rounded-xl shadow-lg shadow-blue-900/10
                        hover:scale-105 active:scale-95
                        transition-all duration-300
                      "
                    >
                      Edit Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && (
            <div className="py-20 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Synchronizing Master Log...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;