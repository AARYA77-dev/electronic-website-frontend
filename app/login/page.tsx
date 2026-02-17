"use client";
import { CustomButton, SectionTitle } from "@/components";
import { isValidEmailAddressFormat } from "@/lib/utils";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session, status: sessionStatus } = useSession();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isValidEmailAddressFormat(email)) {
      toast.error("Format Error: Invalid Email");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Security Error: Weak Credentials");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid Authentication Credentials");
      toast.error("Access Denied");
    } else {
      toast.success("Identity Verified");
    }
  };

  return (
    <div className="min-h-screen  relative overflow-hidden flex flex-col">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <SectionTitle title="Login" path="Home | Login" />

      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-8 relative z-10">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          {/* Main Glass Card */}
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 px-8 py-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[40px] sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@mail.com"
                  className="block w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="block w-full rounded-2xl border-white/10 bg-white/5 py-4 px-6 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-blue-400 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/20"
                  />
                  <label htmlFor="remember-me" className="ml-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Keep Active
                  </label>
                </div>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">
                  Reset Key?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Login
              </button>
            </form>

            {/* Divider */}
              <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  className="flex w-full items-center border border-gray-300 justify-center gap-3 rounded-md bg-white px-3 py-1.5 text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <FcGoogle />
                  <span className="text-sm font-semibold leading-6">
                    Google
                  </span>
                </button>

                <button
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-semibold leading-6">
                    GitHub
                  </span>
                </button>
              </div>
              <p className="text-red-600 text-center text-[16px] my-4">
                {error && error}
              </p>
            </div>

            {error && (
              <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-red-500 animate-bounce">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;