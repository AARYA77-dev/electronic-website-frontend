// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryItem title={title} href={href} ><Image /></CategoryItem>
// Input parameters: CategoryItemProps interface
// Output: Category icon, category name and link to the category
// *********************

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
    flex 
    flex-col 
    items-center 
    gap-y-2 
    cursor-pointer
    bg-secondary 
    border-2 
    border-secondary 
    text-tertiary 
    rounded-[24px] md:rounded-[34px]
    py-4 
    md:py-5
    px-4
    hover:bg-tertiary 
    hover:text-secondary
    transition-all 
    duration-300
    active:animate-pop
  "
>
  {children}

  <h3 className="font-semibold text-sm sm:text-lg md:text-xl text-center">
    {title}
  </h3>
</Link>

  );
};

export default CategoryItem;
