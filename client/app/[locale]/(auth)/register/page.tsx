"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Chrome, Facebook, Github, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", terms: false });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">Yeni Hesab</h1>
        <p className="text-muted-foreground text-sm font-medium">Azərbaycanın sehrini bizimlə kəşf edin</p>
      </div>

      {/* Register Card */}
      <div className="bg-card/50 backdrop-blur-3xl p-8 md:p-12 rounded-[50px] border border-border/60 shadow-2xl shadow-primary/5">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Ad və Soyad</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Omar Babayev"
                  className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all text-sm font-bold"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">E-poçt</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  placeholder="nümunə@mail.com"
                  className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all text-sm font-bold"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2 col-span-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">Şifrə</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-12 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-8 focus:ring-primary/5 transition-all text-sm font-bold"
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

          <div className="flex items-start gap-3 pl-1 pt-2">
            <div
              className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${formData.terms ? 'bg-primary border-primary text-white shadow-lg' : 'border-border/60 bg-muted/40 hover:border-primary/40'}`}
              onClick={() => setFormData({ ...formData, terms: !formData.terms })}
            >
              {formData.terms && <CheckCircle2 size={12} />}
            </div>
            <p className="text-xs font-medium text-muted-foreground leading-relaxed">
              Hesab yaradaraq{" "}
              <Link href="/terms" className="text-primary font-bold hover:underline">Şərtlər və Qaydalar</Link> ilə razılaşırsınız.
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4.5 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none mt-4"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Qeydiyyatı Tamamla <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            <span className="bg-card px-4">sosial hesablar</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <button className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center"><Chrome size={20} /></button>
          <button className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center text-blue-600"><Facebook size={20} /></button>
          <button className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center"><Github size={20} /></button>
        </div>
      </div>

      <p className="text-center mt-10 text-muted-foreground text-sm font-medium">
        Artıq hesabınız var?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Daxil olun
        </Link>
      </p>
    </div>
  );
}
