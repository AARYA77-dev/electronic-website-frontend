"use client";
import { DashboardSidebar } from "@/components";
import { nanoid } from "nanoid";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const DashboardUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://electronic-website-backend.onrender.com/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-blue-50">
      <div className="max-w-screen-2xl mx-auto flex max-xl:flex-col h-screen overflow-hidden">
        <DashboardSidebar />
        
        <div className="flex-1 flex flex-col p-6 xl:p-12 overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-10 bg-white/30 backdrop-blur-xl border border-white/60 p-8 rounded-[32px] shadow-xl">
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter">User Directory</h1>
              <p className="text-slate-500 font-medium mt-1">Manage system access and account privileges.</p>
            </div>
            <Link href="/admin/users/new">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Add New User
              </button>
            </Link>
          </div>

          {/* Table Container */}
          <div className="flex-1 bg-white/30 backdrop-blur-xl border border-white/60 rounded-[32px] shadow-xl overflow-hidden flex flex-col">
            <div className="overflow-auto custom-scrollbar h-full">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-100/50 backdrop-blur-md">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60">ID</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60">Credentials</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60">Permission Level</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 border-b border-white/60 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/40">
                  {users.map((user) => (
                    <tr key={nanoid()} className="group hover:bg-white/40 transition-colors">
                      <td className="px-8 py-5">
                        <span className="font-mono text-[10px] text-slate-400">USR-{user?.id.toString().slice(-5)}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-base">{user?.email}</span>
                          {/* <span className="text-[10px] text-blue-500 font-bold uppercase tracking-tighter italic">Identity Verified</span> */}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`
                          inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border
                          ${user?.role === 'admin' 
                            ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' 
                            : 'bg-blue-500/10 text-blue-600 border-blue-500/20'}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-2 ${user?.role === 'admin' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                          {user?.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <Link
                          href={`/admin/users/${user?.id}`}
                          className="inline-flex items-center justify-center 
                        px-4 py-2 
                        bg-[#1e3a8a] text-white
                        text-[10px] font-black uppercase tracking-widest
                        rounded-xl shadow-lg shadow-blue-900/10
                        hover:scale-105 active:scale-95
                        transition-all duration-300"
                        >
                          Edit Profile
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center py-24 text-slate-400">
                  <p className="font-black uppercase tracking-[0.3em] text-xs">Access List Empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;