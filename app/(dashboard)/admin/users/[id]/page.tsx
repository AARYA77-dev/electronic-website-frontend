"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState, use } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { isValidEmailAddressFormat } from "@/lib/utils";

interface DashboardUserDetailsProps {
  params: Promise<{ id: number }>;
}

const DashboardSingleUserPage = (props: DashboardUserDetailsProps) => {
  // Unwrap params for Next.js 15 compatibility
  const resolvedParams = use(props.params);
  const id = resolvedParams.id;

  const [userInput, setUserInput] = useState<{
    firstname: string;
    email: string;
    newPassword: string;
    role: string;
  }>({
    firstname: "",
    email: "",
    newPassword: "",
    role: "",
  });
  
  const router = useRouter();

  useEffect(() => {
    fetch(`https://electronic-website-backend.onrender.com/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserInput({
          firstname: data?.firstname || "",
          email: data?.email || "",
          newPassword: "",
          role: data?.role || "user",
        });
      });
  }, [id]);

  const deleteUser = async () => {
    const requestOptions = { method: "DELETE" };
    fetch(`https://electronic-website-backend.onrender.com/api/users/${id}`, requestOptions)
      .then((response) => {
        if (response.status === 204) {
          toast.success("User identity purged");
          router.push("/admin/users");
        } else {
          throw Error();
        }
      })
      .catch(() => toast.error("Error purging user record"));
  };

  const updateUser = async () => {
    if (!userInput.email || !userInput.role || !userInput.newPassword) {
      toast.error("All security fields are required");
      return;
    }

    if (!isValidEmailAddressFormat(userInput.email)) {
      toast.error("Invalid email protocol format");
      return;
    }

    if (userInput.newPassword.length < 8) {
      toast.error("Password entropy too low (min 8 chars)");
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userInput.email,
        password: userInput.newPassword,
        role: userInput.role,
      }),
    };

    fetch(`https://electronic-website-backend.onrender.com/api/users/${id}`, requestOptions)
      .then((res) => res.ok ? toast.success("User profile synchronized") : toast.error("Update failed"))
      .catch(() => toast.error("Network communication error"));
  };

  // Reusable Glass Component for this Terminal
  const GlassInput = ({ label, value, onChange, type = "text", placeholder = "" }: any) => (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">{label}</span>
      <input
        type={type}
        autoComplete="new-password"
        className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
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
          {/* Header Section */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-2">
               <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                 {userInput.firstname?.charAt(0) || "U"}
               </div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tighter">User Identity</h1>
            </div>
            <p className="text-slate-500 font-medium">Manage access levels and security credentials for this account.</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Configuration Panel */}
            <div className="lg:col-span-2">
              <section className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] p-8 shadow-xl">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-900 mb-8 flex items-center gap-2">
                  <span className="w-4 h-[2px] bg-blue-900" /> Account Settings
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassInput 
                      label="Full Name" 
                      value={userInput.firstname} 
                      onChange={(e: any) => setUserInput({ ...userInput, firstname: e.target.value })} 
                    />
                    <GlassInput 
                      label="Email Address" 
                      value={userInput.email} 
                      onChange={(e: any) => setUserInput({ ...userInput, email: e.target.value })} 
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <GlassInput 
                      label="Update Password" 
                      type="password"
                      placeholder="Enter new password"
                      value={userInput.newPassword} 
                      onChange={(e: any) => setUserInput({ ...userInput, newPassword: e.target.value })} 
                    />
                    
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Access Role</span>
                      <select
                        className="bg-white/40 backdrop-blur-md border border-white/60 rounded-2xl px-5 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        value={userInput.role}
                        onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
                      >
                        <option value="admin">Administrator</option>
                        <option value="user">Standard User</option>
                      </select>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Action Sidebar */}
            <div className="space-y-6">
              <section className="bg-[#1e3a8a] text-white rounded-[32px] p-8 shadow-2xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <svg width="100" height="100" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                </div>
                
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-300 mb-2">System Status</h3>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm font-bold uppercase tracking-widest">Active Account</span>
                </div>

                <div className="space-y-4 relative z-10">
                  <button
                    onClick={updateUser}
                    className="w-full py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={deleteUser}
                    className="w-full py-4 bg-transparent border border-white/20 hover:bg-red-500 hover:border-red-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all"
                  >
                    Delete User
                  </button>
                </div>
              </section>
              
              <div className="px-4">
                <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed text-center tracking-tight">
                  Security Note: Purging a user will revoke all terminal access immediately. This action is logged.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSingleUserPage;