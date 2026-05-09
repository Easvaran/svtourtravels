"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, KeyRound, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error("Invalid response from server");
      }

      if (res.ok && data.success) {
        setStep("otp");
        toast.success("OTP sent to your email!");
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error("Invalid response from server");
      }

      if (res.ok && data.success) {
        toast.success("Verification successful!");
        setStep("reset");
      } else {
        toast.error(data.message || "Invalid OTP");
        setOtp("");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        throw new Error("Invalid response from server");
      }

      if (res.ok && data.success) {
        toast.success("Password updated successfully!");
        router.push("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-6">
            <span className="text-3xl font-black text-primary">SV</span>
            <span className="text-3xl font-black text-gray-900"> TOUR</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            {step === "email" ? "Forgot Password" : step === "otp" ? "Verify OTP" : "Reset Password"}
          </h1>
          <p className="text-gray-500 font-medium">
            {step === "email" 
              ? "Enter your email to receive a verification code." 
              : step === "otp"
                ? `Enter the 6-digit code sent to ${email}`
                : "Enter your new password below."}
          </p>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <AnimatePresence mode="wait">
            {step === "email" ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOTP}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      required
                      type="email"
                      placeholder="admin@svtours.com"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/20 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-gray-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send OTP</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <Link 
                  href="/admin/login" 
                  className="flex items-center justify-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Login</span>
                </Link>
              </motion.form>
            ) : step === "otp" ? (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleVerifyOTP}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">6-Digit OTP</label>
                  <div className="relative group">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                    <input
                      required
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/20 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-gray-900 tracking-[0.5em] text-center"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    />
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify & Login</span>
                      <CheckCircle2 size={20} />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="w-full flex items-center justify-center space-x-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-primary transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Change Email</span>
                </button>
              </motion.form>
            ) : (
              <motion.form
                key="reset-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleResetPassword}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/20 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-gray-900"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative group">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 focus:border-primary/20 focus:bg-white focus:ring-0 outline-none transition-all font-bold text-gray-900"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 hover:bg-blue-700 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Update Password</span>
                      <CheckCircle2 size={20} />
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-8 text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
          SV Tour & Travels • Secure Admin Access
        </p>
      </motion.div>
    </div>
  );
}
