import {
  StockAvailabillity,
  UrgencyText,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}
const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  // sending API request for a single product with a given product slug
   const  { id } = await params
  const data = await fetch(
    `https://electronic-website-backend.onrender.com/api/slugs/${id}`, {
    cache: "no-store"
  }
  );
  const product = await data.json();

  // sending API request for more than 1 product image if it exists
  const imagesData = await fetch(
    `https://electronic-website-backend.onrender.com/api/images/${product.id}`
  );
  const images = await imagesData.json();

  if (!product || product.error) {
    notFound();
  }

  return (
  <div className="relative min-h-screen 
   bg-gradient-to-b from-[#dae2f8] to-[#d6e0ff]
    py-20
    overflow-hidden
  ">

    {/* Background Glow */}
    <div className="absolute right-0 top-1/2 -translate-y-1/2 
      w-[700px] h-[700px] bg-white/40 blur-[140px] 
      rounded-full opacity-60" />

    <div className="relative max-w-7xl mx-auto px-6">

      {/* Main Glass Container */}
      <div className="
        rounded-[40px]
        border border-white/40
        bg-white/15
        backdrop-blur-xl
        p-10
        shadow-2xl
      ">

        <div className="flex gap-16 max-lg:flex-col items-start">

          {/* LEFT SIDE - IMAGES */}
          <div className="flex flex-col items-center w-full lg:w-1/2">

            <Image
              src={
                product?.mainImage
                  ? `/${product?.mainImage}`
                  : "/product_placeholder.jpg"
              }
              width={500}
              height={500}
              alt="main image"
              className="object-contain max-h-[400px]"
            />

            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-6 flex-wrap justify-center">
              {images?.map((imageItem: ImageItem) => (
                <div
                  key={imageItem.imageID}
                  className="p-2 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md hover:scale-105 transition"
                >
                  <Image
                    src={`/${imageItem.image}`}
                    width={80}
                    height={80}
                    alt="product image"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE - DETAILS */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2 text-[#24325f]">

            <SingleProductRating rating={product?.rating} />

            <h1 className="text-3xl md:text-4xl font-bold">
              {product?.title}
            </h1>

            <p className="text-2xl font-extrabold text-[#2f4fa5]">
              ₹{product?.price}
            </p>

            <StockAvailabillity
              stock={94}
              inStock={product?.inStock}
              quantity={product?.quantity}
            />

            <SingleProductDynamicFields product={product} />

            {/* Wishlist */}
            <AddToWishlistBtn
              product={product}
              slug={params.productSlug}
            />

            {/* SKU */}
            <p className="text-sm opacity-70">
              SKU: <span className="font-semibold">abccd-18</span>
            </p>

            {/* Share */}
            <div className="flex items-center gap-3">
              <span className="font-medium">Share:</span>
              <div className="flex gap-2 text-2xl">
                <FaSquareFacebook className="hover:scale-110 transition" />
                <FaSquareXTwitter className="hover:scale-110 transition" />
                <FaSquarePinterest className="hover:scale-110 transition" />
              </div>
            </div>

            {/* Payment Icons */}
            <div className="flex gap-3 mt-4 flex-wrap">
              {["visa","mastercard","ae","paypal","dinersclub","discover"].map((icon) => (
                <div
                  key={icon}
                  className="p-2 rounded-lg bg-white/20 border border-white/30 backdrop-blur-md"
                >
                  <Image
                    src={`/${icon}.svg`}
                    width={40}
                    height={40}
                    alt={icon}
                  />
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-20">
        <ProductTabs product={product} />
      </div>

    </div>
  </div>
  );
};

export default SingleProductPage;
