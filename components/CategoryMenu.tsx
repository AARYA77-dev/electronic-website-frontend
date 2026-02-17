import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import { categoryMenuList } from "@/lib/utils";

const CategoryMenu = () => {
  return (
    <div className="relative py-20 overflow-hidden
      bg-gradient-to-b from-[#dae2f8] to-[#d6e0ff]
    ">

      {/* Soft Right Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 
        w-[700px] h-[700px] bg-white/40 blur-[140px] rounded-full opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold 
          text-[#24325f] tracking-wider mb-16">
          BROWSE CATEGORIES
        </h2>

        {/* Grid */}
        <div className="
          grid 
          grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-5
          gap-10
        ">
          {categoryMenuList.map((item) => (
            <CategoryItem
              key={item.id}
              title={item.title}
              href={item.href}
            >
              <Image
                src={item.src}
                width={140}
                height={140}
                alt={item.title}
                className="object-contain"
              />
            </CategoryItem>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CategoryMenu;
