"use client";
import { CustomButton, SectionTitle } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


const RegisterPage = () => {

  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);

  useEffect(() => {
    // chechking if user has already registered redirect to home page
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmpassword.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;
    const apartment = e.target.apartment.value;
    const city = e.target.city.value;
    const country = e.target.country.value;
    const postalCode = e.target.postalCode.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      toast.error("Password is invalid");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords are not equal");
      toast.error("Passwords are not equal");
      return;
    }

    try {
      // sending API request for registering user
      const res = await fetch("https://electronic-website-backend.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
          address,
          phone,
          apartment,
          city,
          country,
          postalCode,
        }),
      });



      if (res.status === 400) {
        toast.error("This email is already registered");
        setError("The email already in use");
      }
      if (res.status === 201) {
        setError("");
        toast.success("Registration successful");
        router.push("/login");
      }
    } catch (error) {
      toast.error("Error, try again");
      setError("Error, try again");
      console.log(error);
    }
  };

  if (sessionStatus === "loading") {
    return <>
      <div className="preloader">
        <svg className="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
            <g className="cart__track" stroke="hsla(0,10%,10%,0.1)">
              <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
              <circle cx="43" cy="111" r="13" />
              <circle cx="102" cy="111" r="13" />
            </g>
            <g className="cart__lines" stroke="currentColor">
              <polyline className="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
              <g className="cart__wheel1" transform="rotate(-90,43,111)">
                <circle className="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g>
              <g className="cart__wheel2" transform="rotate(90,102,111)">
                <circle className="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
              </g>
            </g>
          </g>
        </svg>
        <div className="preloader__text">
          <p className="preloader__msg">Bringing you the goods…</p>
          <p className="preloader__msg preloader__msg--last">This is taking long. Something’s wrong.</p>
        </div>
      </div></>;
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

      <SectionTitle title="Register" path="Home | Register" />

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center mb-10">
          <h2 className="text-4xl font-black  text-black uppercase">
            Create  Account
          </h2>
          <p className="mt-2 text-[10px] font-bold tracking-[0.4em] text-slate-500 uppercase">
            Registration
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          {/* Main Glass Container */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[48px] sm:px-16">
            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="John"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Doe"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email - Full Width */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Electronic Mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Passwords Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Min 8 chars"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute right-4 top-10 text-slate-500 hover:text-blue-400"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmpassword"
                    placeholder="Repeat key"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Logistics Section Header */}
              <div className="pt-4 flex items-center gap-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 whitespace-nowrap">Location</span>
                <div className="h-[1px] w-full bg-white/10" />
              </div>

              {/* Address Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Contact No.</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1..."
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* City/Country Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">City</label>
                  <input
                    type="text"
                    name="city"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black outline-none focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    className="w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-black outline-none focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
                >
                  Sign up
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-center text-[10px] font-black uppercase tracking-widest animate-pulse">
                  {error}
                </p>
              )}
            </form>
          </div>

          <p className="text-center mt-10 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            Already have an active node? <a href="/login" className="text-blue-500 hover:text-blue-400 transition-colors">Authorize Access</a>
          </p>
        </div>
      </div>
    </div>
  );

}

export default RegisterPage;
