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
    <div
      className="
        group
        flex flex-col justify-between items-center gap-y-3 
        w-full 
        h-full
        /* Glassmorphism Background */
        bg-gradient-to-br from-white/70 to-white/30 
        backdrop-blur-md
        border border-white/60
        rounded-[30px] 
        shadow-[0_8px_30px_rgba(0,0,0,0.05)] 
        transition-all duration-300 
        hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] 
        hover:-translate-y-1
        p-5
      "
    >
      <Link href={`/product/${product.id}`} className="w-full flex justify-center py-4">
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
            md:h-[180px] 
            object-contain
            drop-shadow-lg
            group-hover:scale-105
            transition-transform duration-300
          "
        />
      </Link>

      <div className="flex flex-col items-center gap-1 w-full">
        {/* Title */}
        <Link
          href={`/product/${product.id}`}
          className="
            text-base 
            md:text-lg 
            text-slate-800 
            font-medium 
            text-center
            tracking-wide
            line-clamp-2
          "
        >
          {product.title}
        </Link>

        {/* Price / Count - Styled to match the *22 look in image */}
        <p className="text-lg md:text-xl font-medium text-slate-700">
          <span className="text-slate-500 mr-1">₹</span>{product.price}
        </p>

        {/* Rating - Hidden to match image, remove 'hidden' class to show */}
        <div className="">
           <ProductItemRating productRating={product.rating} />
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/product/${product.id}`}
        className="
          w-full 
          text-center 
          rounded-full
          text-white 
          uppercase
          bg-gradient-to-r from-[#3b5998] to-[#2563eb]
          py-3
          px-4
          text-xs 
          sm:text-sm 
          font-bold 
          tracking-wider
          shadow-md 
          hover:shadow-lg
          hover:opacity-90
          transform active:scale-95
          transition-all
          mt-2
        "
      >
        View Product
      </Link>
    </div>
  );
};

export default ProductItem;