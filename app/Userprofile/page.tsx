"use client";
import React from 'react'
import { SectionTitle } from "@/components";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';

const UserProfile = () => {

  const { data: session, status } = useSession();
  const [user, setUser] = useState({
    id:'',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    postalCode: '',
  });

  const handleUpdate = async () => {
    const res = await fetch(`https://electronic-website-backend.onrender.com/api/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (res.ok) {
      toast.success('Updated successfully!');
    } else {
      const errorText = await res.text();
      console.error('Update failed:', errorText);
      toast.error('Update failed!');
    }
  };
  


 
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

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);


const InputField = ({ label, value, name, type = "text", onChange }: any) => (
    <div className="flex flex-col gap-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
        {label}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => setUser({ ...user, [name]: e.target.value })}
        className="
          w-full px-5 py-3 
          bg-white/40 backdrop-blur-md 
          border border-white/60 
          rounded-2xl text-slate-900 
          shadow-[0_4px_10px_rgba(0,0,0,0.02)]
          placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50
          transition-all duration-300
        "
      />
    </div>
  );

  return (
   <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-100">
      <SectionTitle title="Profile" path="Home | Profile" />
      
      <div className="max-w-4xl mx-auto px-5 py-12">
        <div className="
          relative overflow-hidden
          bg-white/30 backdrop-blur-2xl 
          border border-white/60 
          rounded-[40px] 
          p-8 md:p-12 
          shadow-[0_20px_50px_rgba(0,0,0,0.05)]
        ">
          {/* Decorative Background Orb */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <header className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Account Settings
              </h2>
              <p className="text-slate-500 font-medium">Manage your personal information and shipping details.</p>
            </header>

            <form className="space-y-8">
              {/* Personal Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="First Name" name="firstname" value={user.firstname} onChange={setUser} />
                <InputField label="Last Name" name="lastname" value={user.lastname} onChange={setUser} />
                <InputField label="Email Address" name="email" value={user.email} type="email" onChange={setUser} />
                <InputField label="Phone Number" name="phone" value={user.phone} onChange={setUser} />
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />

              {/* Address Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <InputField label="Street Address" name="address" value={user.address} onChange={setUser} />
                </div>
                <InputField label="Apartment / Suite" name="apartment" value={user.apartment} onChange={setUser} />
                <InputField label="City" name="city" value={user.city} onChange={setUser} />
                <InputField label="Country" name="country" value={user.country} onChange={setUser} />
                <InputField label="Postal Code" name="postalCode" value={user.postalCode} onChange={setUser} />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="
                    w-full md:w-auto px-12 py-4
                    bg-[#1e3a8a] text-white
                    text-sm font-black uppercase tracking-widest
                    rounded-2xl shadow-xl shadow-blue-900/20
                    hover:scale-105 active:scale-95
                    transition-all duration-300
                  "
                >
                  Update Base Records
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
