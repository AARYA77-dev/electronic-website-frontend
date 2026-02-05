// *********************
// Role of the component: Product item component 
// Name of the component: ProductItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <ProductItem product={product} color={color} />
// Input parameters: { product: Product; color: string; }
// Output: Product item component that contains product image, title, link to the single product page, price, button...
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
    <div className="flex flex-col justify-between items-center gap-y-2 w-full bg-white rounded-[20px] md:rounded-[30px] shadow-[0_8px_20px_rgba(0,0,0,0.20)] transition-all duration-300 hover:shadow-lg hover:scale-105 p-2 sm:p-3 md:p-4">

  <Link href={`/product/${product.slug}`} className="w-full flex justify-center">

    <Image
      src={
        product.mainImage
          ? `/${product.mainImage}`
          : "/product_placeholder.jpg"
      }
      width={300}
      height={250}
      alt={product.title}
      className="
        w-full 
        h-[140px] 
        sm:h-[160px] 
        md:h-[200px] 
        object-contain
      "
    />

  </Link>

  {/* Title */}
  <Link
    href={`/product/${product.slug}`}
    className="
      text-sm 
      sm:text-base 
      md:text-lg 
      text-black 
      font-semibold 
      text-center
      line-clamp-2
    "
  >
    {product.title}
  </Link>

  {/* Price */}
  <p className="text-sm sm:text-base md:text-lg font-semibold">
    ₹{product.price}
  </p>

  <ProductItemRating productRating={product.rating} />

  {/* Button */}
  <Link
    href={`/product/${product.slug}`}
    className="
      w-full 
      text-center 
      rounded-[20px] 
      md:rounded-[34px]
      text-tertiary 
      uppercase 
      bg-secondary 
      border-2 
      border-secondary 
      py-1.5 
      sm:py-2
      text-xs 
      sm:text-sm 
      md:text-base 
      font-bold 
      shadow-sm 
      hover:text-secondary 
      hover:bg-tertiary 
      active:animate-pop
    "
  >
    View Product
  </Link>

</div>

  );
};

export default ProductItem;
