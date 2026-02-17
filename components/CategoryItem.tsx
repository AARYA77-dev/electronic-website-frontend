import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  children: ReactNode;
  title: string;
  href: string;
}

const CategoryItem = ({ title, children, href }: CategoryItemProps) => {
  return (
    <Link
      href={href}
      className="
        relative
        rounded-[40px]
        border border-white/40
        bg-white/15
        backdrop-blur-xl
        p-6
        flex
        flex-col
        items-center
        text-center
        shadow-lg
        hover:scale-105
        hover:shadow-2xl
        transition-all duration-300
      "
    >

      {/* Product Image */}
      <div className="mb-6 w-[40%]">
        {children}
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-[#24325f]">
        {title}
      </h3>

    </Link>
  );
};

export default CategoryItem;
