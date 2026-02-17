"use client";
import React from "react";
import { MdDashboard, MdCategory } from "react-icons/md";
import { FaTable, FaRegUser, FaGear, FaBagShopping } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: <MdDashboard /> },
    { label: "Orders", href: "/admin/orders", icon: <FaBagShopping /> },
    { label: "Products", href: "/admin/products", icon: <FaTable /> },
    { label: "Categories", href: "/admin/categories", icon: <MdCategory /> },
    { label: "Users", href: "/admin/users", icon: <FaRegUser /> },
  ];

  return (
    <div className="
      xl:w-[350px] h-fit 
      bg-gradient-to-b from-blue-400 to-indigo-500 backdrop-blur-2xl 
      rounded-[32px] border border-white/10 
      p-4 shadow-2xl 
      max-xl:w-full max-xl:flex max-xl:overflow-x-auto max-xl:gap-2
    ">

      <nav className="flex flex-col gap-2 max-xl:flex-row max-xl:w-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} className="w-full">
              <div className={`
                group flex items-center gap-x-4 px-6 py-4 rounded-2xl
                transition-all duration-300 ease-out
                ${isActive 
                  ? "bg-white/10 text-white border border-white/20 shadow-lg shadow-black/10" 
                  : "text-blue-100/60 hover:bg-white/5 hover:text-white"
                }
              `}>
                <span className={`
                  text-2xl transition-transform duration-300 
                  group-hover:scale-110 group-active:scale-95
                  ${isActive ? "text-blue-400" : "text-inherit"}
                `}>
                  {item.icon}
                </span>
                <span className="text-sm font-black uppercase tracking-[0.15em]">
                  {item.label}
                </span>
                
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_10px_#60a5fa]" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Utility (Optional) */}
      <div className="hidden xl:block mt-10 px-6 py-6 border-t border-white/5">
        <div className="flex items-center gap-3 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600" />
          <div className="text-[10px] font-bold text-white uppercase tracking-widest">
            System Online
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;