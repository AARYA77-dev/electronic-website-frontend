// *********************
// Role of the component: products section intended to be on the home page
import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

const ProductsSection = async () => {
  // sending API request for getting all products
  const data = await fetch("https://electronic-website-backend.onrender.com/api/products");
  const products = await data.json();

  return (
    // Outer container with the soft blue gradient background
    <div className="bg-gradient-to-b from-[#dae2f8] to-[#d6a4a4] md:to-[#d6e0ff] min-h-screen py-10">
       {/* Note: I adjusted the gradient above to match the periwinkle/blue vibe. 
           If you want exactly the image, use: from-[#cbd5f7] to-[#eef2ff] */}
      
      <div className="bg-gradient-to-b from-[#cbd5f7] to-[#eff3ff] w-full h-full absolute top-0 left-0 -z-10"></div>

      <div className="relative max-w-screen-2xl mx-auto pt-10 pb-20">
        
        {/* You might need to pass a className or color prop to Heading to make it Dark Blue */}
        <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a] uppercase tracking-wide">
                Feature Products
            </h2>
             {/* If you must use the Component: <Heading title="BROWSE CATEGORIES" /> 
                 Make sure Heading component accepts text-color styles */}
        </div>

        <div className="
          grid 
          grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          gap-6 
          md:gap-8
          px-4 
          md:px-10"
        >
          {products.map((product: Product) => (
            <ProductItem key={product.id} product={product} color="white" />
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProductsSection;
