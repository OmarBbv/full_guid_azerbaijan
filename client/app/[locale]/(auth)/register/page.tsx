"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { authService } from "@/services/api/auth.service";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Chrome,
  Facebook,
  Github,
  CheckCircle2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", terms: false });
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.terms) {
      setError("Şərtlər və qaydalarla razılaşmalısınız");
      return;
    }
    setIsLoading(true);
    try {
      await authService.register({
        firstName: formData.name.split(" ")[0],
        lastName: formData.name.split(" ").slice(1).join(" "),
        email: formData.email,
        password: formData.password,
      });
      setStep("otp");
    } catch {
      setError("Xəta baş verdi! E-poçt artıq istifadədə ola bilər.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const data = await authService.verifyOtp(formData.email, otp);
      localStorage.setItem("access_token", data.access_token);
      window.dispatchEvent(new Event("auth_status_changed"));
      router.push("/");
    } catch {
      setError("OTP kodu yanlışdır və ya vaxtı keçib.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      await authService.requestOtp(formData.email, formData.password);
    } catch {
      setError("Kod göndərilərkən xəta baş verdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">
          {step === "form" ? "Yeni Hesab" : "Doğrulama Kodu"}
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          {step === "form"
            ? "Azərbaycanın sehrini bizimlə kəşf edin"
            : `${formData.email} ünvanına 6 rəqəmli kod göndərdik`}
        </p>
      </div>

      {/* Card */}
      <div className="bg-card/50 backdrop-blur-3xl p-8 md:p-12 rounded-[50px] border border-border/60 shadow-2xl shadow-primary/5">
        {error && (
          <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-3 rounded-2xl">
            ⚠️ {error}
          </div>
        )}

        {step === "otp" ? (
          <form onSubmit={handleOtp} className="space-y-6">
            <div className="flex justify-center mb-2">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3b9cf5, #6f5cf6)" }}
              >
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                Doğrulama Kodu
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                required
                placeholder="_ _ _ _ _ _"
                className="w-full text-center tracking-[0.5em] text-2xl font-black bg-muted/40 border border-border/50 rounded-2xl py-5 px-4 text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              />
              <p className="text-center text-xs text-muted-foreground pt-1">
                Kod 10 dəqiqə keçərlidir
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading || otp.length < 6}
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <><ShieldCheck size={18} /> Təsdiqlə</>
              )}
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => { setStep("form"); setOtp(""); setError(""); }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                ← Geri qayıt
              </button>
              <button
                type="button"
                onClick={handleResend}
                disabled={isLoading}
                className="flex items-center gap-1.5 text-xs text-primary hover:underline font-bold disabled:opacity-50"
              >
                <RefreshCw size={12} /> Yenidən göndər
              </button>
            </div>
          </form>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">
                    Ad və Soyad
                  </label>
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

                {/* Email */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">
                    E-poçt
                  </label>
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

                {/* Password */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">
                    Şifrə
                  </label>
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
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer transition-all ${formData.terms
                      ? "bg-primary border-primary text-white shadow-lg"
                      : "border-border/60 bg-muted/40 hover:border-primary/40"
                    }`}
                  onClick={() => setFormData({ ...formData, terms: !formData.terms })}
                >
                  {formData.terms && <CheckCircle2 size={12} />}
                </div>
                <p className="text-xs font-medium text-muted-foreground leading-relaxed">
                  Hesab yaradaraq{" "}
                  <Link href="/terms" className="text-primary font-bold hover:underline">
                    Şərtlər və Qaydalar
                  </Link>{" "}
                  ilə razılaşırsınız.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none mt-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Qeydiyyatı Tamamla{" "}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="bg-card px-4">sosial hesablar</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-5">
              <a
                href="http://localhost:5555/auth/google"
                className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center"
              >
                <Chrome size={20} />
              </a>
              <button className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center text-blue-600">
                <Facebook size={20} />
              </button>
              <button className="h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 flex items-center justify-center">
                <Github size={20} />
              </button>
            </div>
          </>
        )}
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
