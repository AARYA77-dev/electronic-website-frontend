// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (Glassmorphism update)
// *********************

import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer 
      className="relative overflow-hidden bg-gradient-to-b from-[#eff3ff] to-[#dae2f8] border-t border-white/40" 
      aria-labelledby="footer-heading"
    >
      {/* Decorative background glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div>
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-20 pb-12">
          
          {/* Main Glass Container */}
          <div className="
            relative
            bg-white/30 
            backdrop-blur-xl 
            border border-white/60 
            rounded-[40px] 
            p-8 md:p-12
            shadow-[0_8px_32px_0_rgba(31,38,135,0.05)]
            xl:grid xl:grid-cols-3 xl:gap-12
          ">
            
            {/* Logo and Brand Info */}
            <div className="flex flex-col gap-6">
              <Image
                src="/logo v1 red.png"
                alt="Singitronic logo"
                width={200}
                height={50}
                className="h-auto w-auto drop-shadow-sm"
              />
              <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
                Revolutionizing your tech experience with the products of the future. Quality, innovation, and style in every click.
              </p>
            </div>

            {/* Navigation Links Grid */}
            <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a8a]">
                    Sale
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.sale.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-slate-700 hover:text-blue-600 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a8a]">
                    About Us
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.about.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-slate-700 hover:text-blue-600 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a8a]">
                    Buying
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.buy.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-slate-700 hover:text-blue-600 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#1e3a8a]">
                    Support
                  </h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {navigation.help.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-slate-700 hover:text-blue-600 transition-colors duration-200"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Section */}
          <div className="mt-12 border-t border-slate-200/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs leading-5 text-slate-500">
              &copy; 2026 Singitronic Inc. All rights reserved.
            </p>
            <div className="flex gap-6">
               {/* Example Social icons or legal links */}
               <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</a>
               <a href="#" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;