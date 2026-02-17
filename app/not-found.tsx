import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-200">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px]" />

      <main className="relative z-10 px-6 lg:px-8">
        <div className="
          max-w-xl mx-auto 
          rounded-[48px] 
          border border-white/60 
          bg-white/30 
          backdrop-blur-2xl 
          p-12 
          shadow-[0_20px_50px_rgba(0,0,0,0.05)] 
          text-center 
          transition-all
        ">
          {/* Futuristic 404 Badge */}
          <div className="inline-block px-6 py-2 rounded-full bg-[#1e3a8a] text-white font-black tracking-[0.3em] text-sm mb-8 shadow-lg shadow-blue-900/20">
            ERROR 404
          </div>

          <h1 className="text-5xl font-black tracking-tight text-[#1e3a8a] sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[#1e3a8a] to-[#1e3a8a]/70">
            Lost in Shop.
          </h1>

          <p className="text-lg leading-8 text-slate-600 font-medium mb-10">
            The page you&apos;re looking for has been decommissioned or moved to a new sector.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/"
              className="
                group relative 
                overflow-hidden 
                rounded-2xl 
                bg-[#1e3a8a] 
                px-8 py-4 
                text-sm font-bold text-white 
                shadow-xl transition-all 
                hover:scale-105 active:scale-95
              "
            >
              <span className="relative z-10">Return to Home</span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>

            <Link 
              href="#" 
              className="
                text-sm font-bold 
                text-[#1e3a8a] 
                uppercase tracking-widest 
                hover:opacity-70 
                transition-opacity 
                flex items-center gap-2
              "
            >
              Contact Support 
              <span className="text-xl" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Subtle decorative text in background */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-slate-900/[0.03] select-none pointer-events-none">
          404
        </div>
      </main>
    </div>
  );
}