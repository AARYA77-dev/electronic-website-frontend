import Image from "next/image";
import React from "react";
import Link from "next/link";

const Hero = () => {
  const slides = [
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/watch for banner.png",
      link: "/product/10",
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/laptop_2.png",
      link: "/product/11",
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/headphones_1.png",
      link: "/product/9",
    },
    {
      title: "THE PRODUCT OF THE FUTURE",
      image: "/smart_phone_3.png",
      link: "/product/1",
    },
  ];

  return (
    /* Main wrapper preserved as requested */
    <div className="wrapper w-full min-h-[600px] md:min-h-[650px] lg:min-h-[700px] bg-gradient-to-b from-[#dae2f8] to-[#d6e0ff]">
      {slides.map((slide, index) => (
        <div
          key={index}
          /* item class preserved, bg-primary replaced with modern gradient and glass feel */
          className={`item item${index + 1} relative overflow-hidden min-h-[600px] md:min-h-[650px] lg:min-h-[700px] flex items-center`}
        >
          {/* Subtle background glow effect matching the image style */}
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid 
            grid-cols-1 
            lg:grid-cols-2 
            items-center 
            max-w-screen-2xl 
            mx-auto 
            px-6 
            md:px-12
            gap-10 
            h-full
            relative
            z-10
          ">
            {/* Text Section */}
            <div className="flex flex-col gap-y-6 order-2 lg:order-1 items-center lg:items-start text-center lg:text-left">
              <h1 className="
                text-4xl 
                sm:text-5xl 
                md:text-6xl 
                lg:text-7xl 
                text-[#1e3a8a] 
                font-bold
                leading-tight
              ">
                {slide.title}
              </h1>

              <p className="text-slate-600 text-sm sm:text-base md:text-xl max-w-xl font-light leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
              </p>

              {/* Glassmorphic Buttons */}
              <div className="flex flex-row gap-4 mt-4">
                <Link
                  href={slide.link}
                  className="
                    bg-gradient-to-r from-[#1e3a8a] to-[#3b82f6] 
                    rounded-full 
                    text-white 
                    font-bold 
                    px-10 py-3.5 
                    text-sm md:text-base
                    shadow-[0_10px_20px_rgba(30,58,138,0.25)]
                    hover:shadow-[0_15px_30px_rgba(30,58,138,0.35)]
                    hover:-translate-y-0.5
                    transition-all 
                    duration-300
                  "
                >
                  BUY NOW
                </Link>

                <button className="
                  bg-white/40 
                  backdrop-blur-md 
                  border border-white/60 
                  text-[#1e3a8a] 
                  rounded-full 
                  font-bold 
                  px-10 py-3.5 
                  text-sm md:text-base
                  hover:bg-white/60 
                  hover:-translate-y-0.5
                  transition-all 
                  duration-300
                ">
                  LEARN MORE
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative">
                {/* Image Halo effect */}
                <div className="absolute inset-0 bg-blue-300/30 blur-3xl rounded-full scale-75" />
                <Image
                  src={slide.image}
                  width={600}
                  height={600}
                  alt="product"
                  className="
                    relative
                    w-[280px]
                    sm:w-[350px]
                    md:w-[450px]
                    lg:w-[550px]
                    h-auto
                    object-contain
                    drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                  "
                />
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default Hero;