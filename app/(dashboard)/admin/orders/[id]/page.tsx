"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat, isValidNameOrLastname, isValidPhoneFormat } from "@/lib/utils";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";

interface AdminSingleOrderProps {
  params: Promise<{ id: string }>;
}

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

const AdminSingleOrder = (props: AdminSingleOrderProps) => {
  const resolvedParams = use(props.params);
  const id = resolvedParams.id;

  const [loading, setLoading] = useState(false);
  const [dloading, setDLoading] = useState(false);
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>();
  const [order, setOrder] = useState<Order>({
    id: "", adress: "", apartment: "", company: "", dateTime: "", email: "",
    lastname: "", name: "", phone: "", postalCode: "", city: "", country: "",
    orderNotice: "", status: "processing", total: 0,
  });

  console.log(order)

  const router = useRouter();

  useEffect(() => {
    const fetchOrderData = async () => {
      const response = await fetch(`https://electronic-website-backend.onrender.com/api/orders/orderDetails/${id}`);
      const data: Order = await response.json();
      console.log(data)
      setOrder(data);
    };

    const fetchOrderProducts = async () => {
      const response = await fetch(`https://electronic-website-backend.onrender.com/api/order-product/${id}`);
      const data: OrderProduct[] = await response.json();
      setOrderProducts(data);
    };

    if (id) {
      fetchOrderData();
      fetchOrderProducts();
    }
  }, [id]);

  const updateOrder = async () => {
    setLoading(true);
    // ... validation logic remains same as your original ...
    if (!isValidNameOrLastname(order.name) || !isValidEmailAddressFormat(order.email)) {
        setLoading(false);
        return;
    }

    fetch(`https://electronic-website-backend.onrender.com/api/orders/${order?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) toast.success("Logistics Updated");
      })
      .catch(() => {
        setLoading(false);
        toast.error("Network Error");
      });
  };

  const deleteOrder = async () => {
    setDLoading(true);
    const requestOptions = { method: "DELETE" };
    await fetch(`https://electronic-website-backend.onrender.com/api/order-product/${order?.id}`, requestOptions);
    await fetch(`https://electronic-website-backend.onrender.com/api/orders/${order?.id}`, requestOptions);
    setDLoading(false);
    toast.success("Record Purged");
    router.push("/admin/orders");
  };

  const GlassInput = ({ label, value, onChange, type = "text" }: any) => (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</span>
      <input
        type={type}
        className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
        value={value || ""}
        onChange={onChange}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col">
        <DashboardSidebar />

        <div className="flex-1 p-6 xl:p-12">
          {/* Header Card */}
          <div className="mb-8 p-8 rounded-[32px] bg-white/30 backdrop-blur-xl border border-white/60 shadow-xl flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Order Processing</h1>
              <p className="text-slate-500 font-mono text-xs mt-1">UUID: {order?.id}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Status</span>
               <select
                className="bg-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl border-none outline-none cursor-pointer"
                value={order?.status}
                onChange={(e) => setOrder({ ...order, status: e.target.value as any })}
              >
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Client & Shipping */}
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Recipient Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <GlassInput label="First Name" value={order.name} onChange={(e:any) => setOrder({...order, name: e.target.value})} />
                  <GlassInput label="Last Name" value={order.lastname} onChange={(e:any) => setOrder({...order, lastname: e.target.value})} />
                  <div className="md:col-span-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Phone Link</span>
                    <PhoneInput
                      value={order.phone}
                      onChange={(phone) => setOrder({ ...order, phone })}
                      defaultCountry="in"
                      inputClassName="!w-full !bg-white/40 !backdrop-blur-md !border-white/60 !rounded-2xl !py-6 !text-sm"
                    />
                  </div>
                  <GlassInput label="Secure Email" value={order.email} onChange={(e:any) => setOrder({...order, email: e.target.value})} />
                  <GlassInput label="Corporate" value={order.company} onChange={(e:any) => setOrder({...order, company: e.target.value})} />
                </div>
              </section>

              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-6 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Transit Map
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <GlassInput label="Street Address" value={order.adress} onChange={(e:any) => setOrder({...order, adress: e.target.value})} />
                  <GlassInput label="Suite / Apt" value={order.apartment} onChange={(e:any) => setOrder({...order, apartment: e.target.value})} />
                  <GlassInput label="City" value={order.city} onChange={(e:any) => setOrder({...order, city: e.target.value})} />
                  <div className="grid grid-cols-2 gap-4">
                    <GlassInput label="Country" value={order.country} onChange={(e:any) => setOrder({...order, country: e.target.value})} />
                    <GlassInput label="Zip" type="number" value={order.postalCode} onChange={(e:any) => setOrder({...order, postalCode: e.target.value})} />
                  </div>
                </div>
              </section>
            </div>

            {/* Right: Items & Summary */}
            <div className="space-y-8">
              <section className="bg-[#1e3a8a] text-white rounded-[32px] p-8 shadow-2xl border border-white/10 overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl" />
                <h2 className="relative z-10 text-sm font-black uppercase tracking-[0.3em] text-blue-300 mb-6">Order Manifest</h2>
                <div className="relative z-10 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {orderProducts?.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/10">
                      <Image
                        src={item.product.mainImage ? `/${item.product.mainImage}` : "/product_placeholder.jpg"}
                        alt="item" width={40} height={40} className="rounded-lg bg-white p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold truncate">{item.product.title}</p>
                        <p className="text-[10px] text-blue-300 font-mono">₹{item.product.price} x {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                        <span>Base Total</span>
                        <span>₹{order.total}</span>
                    </div>
                    <div className="flex justify-between text-xl font-black tracking-tighter">
                        <span>TOTAL</span>
                        <span>₹{order.total + (order.total / 5) + 5}</span>
                    </div>
                </div>
              </section>

              <div className="flex flex-col gap-3">
                <button
                  disabled={loading}
                  onClick={updateOrder}
                  className="w-full py-4 bg-white text-blue-900 border border-blue-100 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-blue-50 transition-all flex justify-center"
                >
                  {loading ? <span className="animate-spin h-5 w-5 border-2 border-blue-900 border-t-transparent rounded-full" /> : "Update"}
                </button>
                <button
                  disabled={dloading}
                  onClick={deleteOrder}
                  className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                >
                  Delete Record
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSingleOrder;