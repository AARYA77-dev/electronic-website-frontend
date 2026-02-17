"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

const DashboardCreateNewUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const addNewUser = async () => {
    if (userInput.email.length > 3 && userInput.role.length > 0 && userInput.password.length > 0) {
      if (!isValidEmailAddressFormat(userInput.email)) {
        toast.error("Invalid identity format (Email)");
        return;
      }

      if (userInput.password.length < 8) {
        toast.error("Security risk: Password too short");
        return;
      }

      setLoading(true);
      const requestOptions = {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      };

      try {
        const response = await fetch(`https://electronic-website-backend.onrender.com/api/users`, requestOptions);
        if (response.status === 201) {
          toast.success("Identity provisioned successfully");
          setUserInput({ email: "", password: "", role: "user" });
        } else {
          throw new Error();
        }
      } catch (error) {
        toast.error("Protocol failure: User creation error");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("All credentials required");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col h-screen overflow-hidden">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col p-6 xl:p-12 items-center justify-center">
          {/* Identity Card */}
          <div className="w-full max-w-xl bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[40px] shadow-2xl p-10 xl:p-14">
            
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_#2563eb]" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Access Management</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">
                Provision User
              </h1>
            </header>

            <div className="space-y-8">
              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Corporate Email</label>
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="bg-white/50 border border-white rounded-[20px] px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-800"
                  value={userInput.email}
                  onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                />
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
                <input
                  type="password"
                  placeholder="Min. 8 characters"
                  className="bg-white/50 border border-white rounded-[20px] px-6 py-4 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-800"
                  value={userInput.password}
                  onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
                />
              </div>

              {/* Role Selector */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Permission Level</label>
                <div className="grid grid-cols-2 gap-4">
                  {['user', 'admin'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setUserInput({ ...userInput, role })}
                      className={`
                        py-4 rounded-[20px] text-[11px] font-black uppercase tracking-widest transition-all border
                        ${userInput.role === role 
                          ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20" 
                          : "bg-white/50 text-slate-400 border-white hover:border-slate-200"}
                      `}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                disabled={loading}
                onClick={addNewUser}
                className="w-full mt-6 bg-blue-600 text-white rounded-[24px] py-6 font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  "Add user"
                )}
              </button>
            </div>
          </div>
          
          {/* Subtext */}
          <p className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Identity provisioned on the Global Electronic Core
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCreateNewUser;