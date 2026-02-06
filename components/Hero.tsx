// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {

  const slides = [
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/watch for banner.png",
      link: "/product/10"
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/laptop_2.png",
      link: "/product/11"
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/headphones_1.png",
      link: "/product/6"
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/smart_phone_3.png",
      link: "/product/1"
    }
  ];

  return (
    <div className="wrapper w-full min-h-[600px] md:min-h-[650px] lg:min-h-[700px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`item item${index + 1} bg-primary min-h-[600px] md:min-h-[650px] lg:min-h-[700px]`}
        >
          <div className="grid 
        grid-cols-1 
        lg:grid-cols-3 
        items-center 
        max-w-screen-2xl 
        mx-auto 
        px-6 
        py-12 
        gap-10 
        h-full
      ">

            {/* Text Section */}
            <div className="flex flex-col gap-y-5 order-2 lg:order-1 lg:col-span-2">

              <h1 className="
            text-3xl 
            sm:text-4xl 
            md:text-5xl 
            lg:text-6xl 
            text-white 
            font-bold
          ">
                {slide.title}
              </h1>

              <p className="text-white text-sm sm:text-base md:text-lg max-w-xl">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">

                <Link
                  href={slide.link}
                  className="bg-secondary rounded-full border-2 border-primary text-tertiary font-bold px-8 py-3 text-center hover:bg-tertiary hover:text-secondary transition"
                >
                  BUY NOW
                </Link>

                <button className="bg-secondary border-2 border-primary text-tertiary rounded-full font-bold px-8 py-3 hover:bg-tertiary hover:text-secondary transition">
                  LEARN MORE
                </button>

              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center order-1 lg:order-2">
              <Image
                src={slide.image}
                width={400}
                height={400}
                alt="product"
                className="
              w-[220px]
              sm:w-[260px]
              md:w-[320px]
              lg:w-[380px]
              h-auto
            "
              />
            </div>

          </div>
        </div>
      ))}

    </div>

  );
};

export default Hero;
