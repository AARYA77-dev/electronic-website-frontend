"use client";
import { SectionTitle } from "@/components";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { useProductStore } from "../_zustand/store";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { isValidEmailAddressFormat, isValidNameOrLastname, isValidPhoneFormat } from "@/lib/utils";
import { useSession } from 'next-auth/react';
// _app.tsx or _document.tsx (inside <Head>)
import Head from "next/head";
import { POST } from "../api/create-order/route";

declare global {
  interface Window {
    Razorpay: any;
  }
}


const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [disablePayNowbtn, setDisablePayNowbtn] = useState(false);
  const { data: session, status } = useSession();
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);

  const [user, setUser] = useState({
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
    id: ""
  });

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      fetch(`https://electronic-website-backend.onrender.com/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          // (data?.id);
          setUser(data)
        });
    }
  };


  const handleClearCart = (userId: string) => {
    fetch(`https://electronic-website-backend.onrender.com/api/cart/${userId}`, { method: "DELETE" })
      .then((res) => {
        console.log(res, "checking")
        if (!res.ok) {
          throw new Error("Failed to clear cart");
        }
      })
      .catch((err) => {
        console.error(err)
      })
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);



  const [checkoutForm, setCheckoutForm] = useState({
    name: "",
    lastname: "",
    phone: "",
    email: "",
    company: "",
    adress: "",
    apartment: "",
    city: "",
    country: "",
    postalCode: "",
    orderNotice: "",
  });
  const { products, total, clearCart, buyNow } = useProductStore();
  const router = useRouter();

  const buyingItems = buyNow.length === 1 ? buyNow : products
  const totalBuyingItems = buyNow.length === 1 ? buyNow[0].price : total
  const handlePayment = async () => {
    if (loading) return;
    setLoading(true);

    // ✅ Step 1: Validate all fields
    if (
      checkoutForm.name.length > 0 &&
      checkoutForm.lastname.length > 0 &&
      checkoutForm.phone.length > 0 &&
      checkoutForm.email.length > 0 &&
      checkoutForm.company.length > 0 &&
      checkoutForm.adress.length > 0 &&
      checkoutForm.apartment.length > 0 &&
      checkoutForm.city.length > 0 &&
      checkoutForm.country.length > 0 &&
      checkoutForm.postalCode.length > 0
    ) {
      if (!isValidNameOrLastname(checkoutForm.name)) {
        toast.error("You entered invalid format for name");
        setLoading(false);
        return;
      }

      if (!isValidNameOrLastname(checkoutForm.lastname)) {
        toast.error("You entered invalid format for lastname");
        setLoading(false);
        return;
      }

      if (!isValidEmailAddressFormat(checkoutForm.email)) {
        toast.error("You entered invalid format for email address");
        setLoading(false);
        return;
      }

      if (!isValidPhoneFormat(checkoutForm.phone)) {
        toast.error("You entered invalid format for phone number");
        setLoading(false);
        return;
      }

      const outOfStockProducts: string[] = [];

      for (let i = 0; i < buyingItems.length; i++) {
        const stockCheck = await fetch("/api/check-stock", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId: buyingItems[i].id,
            quantity: buyingItems[i].amount,
          }),
        });

        const stockData = await stockCheck.json();

        if (!stockCheck.ok) {
          outOfStockProducts.push(buyingItems[i].title || `Product ID: ${buyingItems[i].id}`);
        }
      }

      if (outOfStockProducts.length > 0) {
        toast.error(`Out of stock: ${outOfStockProducts.join(", ")}`);
        setLoading(false);
        return;
      }

      const tax = totalBuyingItems / 5;
      const shipping = 5;
      const finalAmount = Math.round(totalBuyingItems + tax + shipping)

      // ✅ Step 2: Create Razorpay Order
      try {
        const orderRes = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: finalAmount }),
        });
        setDisablePayNowbtn(true)
        const orderData = await orderRes.json();
        if (!orderRes.ok)
          throw new Error(orderData.error || "Failed to create Razorpay order");

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.finalAmount,
          currency: "INR",
          name: "Singitronic",
          description: "Product Purchase",
          image: "/logo v1 red.png",
          order_id: orderData.id,
          handler: async function (response: any) {
            // ✅ Payment successful — create order
            try {
              const orderRes = await fetch("https://electronic-website-backend.onrender.com/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name: checkoutForm.name,
                  lastname: checkoutForm.lastname,
                  phone: checkoutForm.phone,
                  email: checkoutForm.email,
                  company: checkoutForm.company,
                  adress: checkoutForm.adress,
                  apartment: checkoutForm.apartment,
                  postalCode: checkoutForm.postalCode,
                  status: "processing",
                  total: finalAmount,
                  city: checkoutForm.city,
                  country: checkoutForm.country,
                  orderNotice: checkoutForm.orderNotice,
                  productId: buyingItems[0].id,
                  quantity: buyingItems[0].amount,
                  userId: user.id,
                }),
              });

              if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.error || "Order save failed");
              }

              const savedOrder = await orderRes.json();
              const orderId = savedOrder.id;

              for (let i = 0; i < buyingItems.length; i++) {
                await addOrderProduct(orderId, buyingItems[i].id, buyingItems[i].amount);
              }

              setCheckoutForm({
                name: "",
                lastname: "",
                phone: "",
                email: "",
                company: "",
                adress: "",
                apartment: "",
                city: "",
                country: "",
                postalCode: "",
                orderNotice: "",
              });

              if (buyNow.length !== 1) {
                clearCart();
                if (user.id) {
                  handleClearCart(user.id);
                }
              }
              toast.success("Order placed successfully!");
              router.push("/");
            } catch (err: any) {
              setDisablePayNowbtn(false);
              toast.error("Payment successful, but order saving failed.");
              console.error(err.message);
            }
          },
          prefill: {
            name: checkoutForm.name,
            email: checkoutForm.email,
            contact: checkoutForm.phone,
          },
          notes: {
            address: checkoutForm.adress,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on("payment.failed", function (response: any) {
          toast.error("Payment failed. Please try again.");
          console.error(response.error);
        });
      } catch (error: any) {
        setDisablePayNowbtn(false);
        toast.error(`Error: ${error.message}`);
      }
    } else {
      setDisablePayNowbtn(false);
      toast.error("Please fill all required fields");
    }
    setLoading(false);
  };


  // ✅ Helper to save product-order relationship
  const addOrderProduct = async (
    orderId: string,
    productId: string,
    productQuantity: number
  ) => {
    await fetch("https://electronic-website-backend.onrender.com/api/order-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerOrderId: orderId,
        productId: productId,
        quantity: productQuantity,
      }),
    });
  };

  useEffect(() => {
    if (buyingItems.length === 0) {
      toast.error("You don't have items in your cart");
      router.push("/cart");
    }
  }, []);

  const inputClasses = "block w-full rounded-xl border-white/40 bg-white/30 backdrop-blur-md px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm focus:border-[#1e3a8a] focus:ring-[#1e3a8a] transition-all sm:text-sm";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 pb-20">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <SectionTitle title="Checkout" path="Home | Cart | Checkout" />

      <main className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-12">

          {/* Left Side: Form */}
          <div className="lg:col-span-7">
            <form className="space-y-8">
              {/* Contact Card */}
              <div className="rounded-3xl border border-white/60 bg-white/40 p-8 backdrop-blur-xl shadow-xl">
                <h2 className="text-xl font-bold text-[#1e3a8a] mb-6 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#1e3a8a]"></span>
                  Contact Information
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">First Name</label>
                    <input
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Last Name</label>
                    <input
                      value={checkoutForm.lastname}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, lastname: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Phone Number</label>
                    <PhoneInput
                      value={checkoutForm.phone}
                      defaultCountry="in"
                      onChange={(phone) => setCheckoutForm({ ...checkoutForm, phone })}
                      inputClassName={inputClasses}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Email Address</label>
                    <input
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      type="email"
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Card */}
              <div className="rounded-3xl border border-white/60 bg-white/40 p-8 backdrop-blur-xl shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-[#1e3a8a] flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#1e3a8a]"></span>
                    Shipping Details
                  </h2>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary checkbox-sm border-white/80 bg-white/50"
                      checked={useDefaultAddress}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setUseDefaultAddress(isChecked);
                        if (isChecked) {
                          setCheckoutForm(prev => ({ ...prev, adress: user.address, apartment: user.apartment, city: user.city, postalCode: user.postalCode, country: user.country }));
                        } else {
                          setCheckoutForm(prev => ({ ...prev, adress: "", apartment: "", city: "", postalCode: "", country: "" }));
                        }
                      }}
                    />
                    <span className="text-xs font-bold text-slate-500 group-hover:text-[#1e3a8a] transition-colors">USE SAVED</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Address</label>
                    <input
                      value={checkoutForm.adress}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, adress: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">City</label>
                    <input
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Postal Code</label>
                    <input
                      value={checkoutForm.postalCode}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Appartment</label>
                    <input
                      value={checkoutForm.apartment}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, apartment: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Country</label>
                    <input
                      value={checkoutForm.country}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, country: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Company</label>
                    <input
                      value={checkoutForm.company}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, company: e.target.value })}
                      type="text"
                      className={inputClasses}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1 mb-2 block">Order Notes</label>
                    <textarea
                      value={checkoutForm.orderNotice}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, orderNotice: e.target.value })}
                      rows={3}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side: Summary Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 rounded-3xl border border-white/60 bg-[#1e3a8a]/90 p-8 backdrop-blur-xl shadow-2xl text-white">
              <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

              <ul className="divide-y divide-white/10 overflow-auto max-h-[40vh] pr-2 custom-scrollbar">
                {buyingItems.map((product) => (
                  <li key={product?.id} className="flex items-center space-x-4 py-6">
                    <div className="relative h-20 w-20 flex-none overflow-hidden rounded-2xl border border-white/20">
                      <Image
                        src={product?.image ? `/${product?.image}` : "/product_placeholder.jpg"}
                        alt={product?.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-auto">
                      <h3 className="font-semibold text-sm line-clamp-1">{product?.title}</h3>
                      <p className="text-white/60 text-xs">Qty: {product?.amount}</p>
                    </div>
                    <p className="font-bold text-white">₹{product?.price}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between text-sm text-white/70">
                  <span>Subtotal</span>
                  <span>₹{totalBuyingItems}</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Shipping</span>
                  <span>₹5</span>
                </div>
                <div className="flex justify-between text-sm text-white/70">
                  <span>Taxes (20%)</span>
                  <span>₹{Math.round(totalBuyingItems / 5)}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-4">
                  <span className="text-xl font-bold">Total Amount</span>
                  <span className="text-2xl font-black text-white">
                    ₹{totalBuyingItems === 0 ? 0 : Math.round(totalBuyingItems + totalBuyingItems / 5 + 5)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayment}
                disabled={loading || disablePayNowbtn}
                className="mt-8 w-full rounded-2xl bg-white px-8 py-4 text-lg font-black text-[#1e3a8a] shadow-lg transition-all hover:bg-slate-100 active:scale-95 disabled:opacity-50"
              >
                {loading ? <span className="loading loading-spinner"></span> : "Complete Payment"}
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;