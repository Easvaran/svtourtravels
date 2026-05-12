"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Login successful! Welcome back.");
        router.push("/admin");
      } else {
        const error = await res.json();
        toast.error(error.error || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden font-poppins">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00bcd4]/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-block mb-4"
          >
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-2xl">
              <span className="text-4xl font-bold bg-gradient-to-r from-[#00bcd4] to-blue-400 bg-clip-text text-transparent">SV</span>
              <span className="text-4xl font-bold text-white ml-2">TOUR</span>
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Access</h1>
          <p className="text-slate-400 font-medium">Enter your secure credentials below</p>
        </div>

        <div className="bg-white/5 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00bcd4] to-transparent opacity-50" />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Username or Email</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#00bcd4]/5 rounded-2xl blur-xl group-focus-within:bg-[#00bcd4]/10 transition-all" />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00bcd4] transition-colors z-10" size={20} />
                <input
                  required
                  type="text"
                  placeholder="admin or email@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:border-[#00bcd4]/30 focus:bg-white/10 focus:ring-0 outline-none transition-all font-semibold text-white placeholder:text-slate-600 relative z-10"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-[#00bcd4]/5 rounded-2xl blur-xl group-focus-within:bg-[#00bcd4]/10 transition-all" />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#00bcd4] transition-colors z-10" size={20} />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 focus:border-[#00bcd4]/30 focus:bg-white/10 focus:ring-0 outline-none transition-all font-semibold text-white placeholder:text-slate-600 relative z-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link 
                href="/forgot-password" 
                className="text-[11px] font-bold text-[#00bcd4] uppercase tracking-widest hover:text-blue-400 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-[#00bcd4] hover:bg-[#0097a7] text-white font-bold py-5 rounded-2xl flex items-center justify-center space-x-3 transition-all hover:shadow-[0_20px_50px_rgba(0,188,212,0.3)] hover:-translate-y-1 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-[#00bcd4]/20"
            >
              {loading ? (
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-slate-500 text-[11px] font-bold uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} SV Tour & Travels • Secure Portal
        </p>
      </motion.div>
    </div>
  );
}
