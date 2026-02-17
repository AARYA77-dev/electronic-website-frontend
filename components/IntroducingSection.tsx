import Link from "next/link";

const IntroducingSection = () => {
  return (
    <div className="relative py-20 bg-gradient-to-b from-[#dae2f8] to-[#d6a4a4] md:to-[#d6e0ff] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/40 blur-[120px] rounded-full opacity-60"></div>

      {/* Main Glass Container */}
      <div className="relative max-w-6xl mx-auto px-6">

        <div className="
          rounded-[40px]
          border border-white/40
          bg-white/10
          backdrop-blur-xl
          p-10 md:p-16
          shadow-xl
        ">

          <div className="flex flex-col gap-6 text-left max-w-2xl">

            {/* Heading */}
            <h2 className="
              text-3xl 
              sm:text-4xl 
              md:text-5xl 
              lg:text-6xl 
              font-extrabold 
              text-[#24325f]
              tracking-wide
            ">
              INTRODUCING SINGITRONIC
            </h2>

            {/* Subtitle */}
            <div className="space-y-3 text-[#33406b] text-lg md:text-xl font-medium">

              <p>Buy the latest electronics.</p>
              <p>The best electronics for tech lovers.</p>

            </div>

            {/* Button */}
            <Link
              href="/shop"
              className="
                mt-6
                w-fit
                bg-gradient-to-r from-[#3b5998] to-[#2563eb]
                text-white
                px-8
                py-3
                rounded-full
                font-semibold
          text-center 
          uppercase 
          text-xs 
          sm:text-sm 
          tracking-wider
          shadow-md 
          hover:shadow-lg
          hover:opacity-90
          transform active:scale-95
          transition-all
              "
            >
              SHOP NOW
            </Link>

          </div>
        </div>
      </div>

      {/* Bottom Light Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/40 to-transparent"></div>

    </div>
  );
};

export default IntroducingSection;
