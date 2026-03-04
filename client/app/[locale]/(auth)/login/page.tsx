"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Github, Chrome, Facebook, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Xoş Gəldiniz!</h1>
        <p className="text-muted-foreground text-sm font-medium">Full Guide hesabınıza daxil olun</p>
      </div>

      {/* Login Card */}
      <div className="bg-card/50 backdrop-blur-3xl p-8 md:p-10 rounded-[40px] border border-border shadow-2xl shadow-primary/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">E-poçt</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="nümunə@mail.com"
                  className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Şifrə</label>
                <Link href="/auth/forgot" className="text-xs font-bold text-primary hover:underline">Unutmusunuz?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-12 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Daxil Ol <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/60"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <span className="bg-card px-4">və ya sosial şəbəkə ilə</span>
          </div>
        </div>

        {/* Social Auth */}
        <div className="grid grid-cols-3 gap-4">
          <button className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
            <Chrome size={20} className="text-foreground" />
          </button>
          <button className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
            <Facebook size={20} className="text-blue-600" />
          </button>
          <button className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
            <Github size={20} className="text-foreground" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-center mt-10 text-muted-foreground text-sm font-medium">
        Hesabınız yoxdur?{" "}
        <Link href="/register" className="text-primary font-bold hover:underline">
          Qeydiyyatdan keçin
        </Link>
      </p>
    </div>
  );
}
