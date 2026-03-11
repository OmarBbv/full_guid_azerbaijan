"use client";

import { useState, useEffect } from "react";
import { Link, useRouter } from "@/i18n/routing";
import { authService } from "@/services/api/auth.service";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  Facebook,
  Github,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

type Step = "credentials" | "otp";

export default function LoginPage() {
  const [step, setStep] = useState<Step>("credentials");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Already logged in → go home
    if (localStorage.getItem("access_token") && !searchParams.get("token")) {
      router.push("/");
      return;
    }
    // Google OAuth callback with token
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("access_token", token);
      window.dispatchEvent(new Event("auth_status_changed"));
      router.push("/");
    }
  }, [searchParams, router]);

  // ─── Step 1: validate credentials + trigger OTP ──────────────────────────
  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await authService.requestOtp(formData.email, formData.password);
      setStep("otp");
    } catch {
      setError("E-poçt və ya şifrə yanlışdır.");
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Step 2: submit OTP → get JWT ──────────────────────────────────────
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

  // ─── Resend OTP ──────────────────────────────────────────────────────────
  const handleResend = async () => {
    setError("");
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
    <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-foreground mb-3 tracking-tight">
          {step === "credentials" ? "Xoş Gəldiniz!" : "Doğrulama Kodu"}
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          {step === "credentials"
            ? "Full Guide hesabınıza daxil olun"
            : `${formData.email} ünvanına 6 rəqəmli kod göndərdik`}
        </p>
      </div>

      {/* Card */}
      <div className="bg-card/50 backdrop-blur-3xl p-8 md:p-10 rounded-[40px] border border-border shadow-2xl shadow-primary/5">
        {error && (
          <div className="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium px-4 py-3 rounded-2xl">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* ── Step 1: Credentials ── */}
        {step === "credentials" && (
          <form onSubmit={handleCredentials} className="space-y-6">
            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
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
                    className="w-full bg-muted/40 border border-border/50 rounded-2xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Şifrə
                  </label>
                  <Link href="/auth/forgot" className="text-xs font-bold text-primary hover:underline">
                    Unutmusunuz?
                  </Link>
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
                  Davam Et <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        )}

        {/* ── Step 2: OTP ── */}
        {step === "otp" && (
          <form onSubmit={handleOtp} className="space-y-6">
            <div className="flex justify-center mb-2">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #3b9cf5, #6f5cf6)" }}
              >
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* OTP input */}
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
              className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Təsdiqlə <ShieldCheck size={18} />
                </>
              )}
            </button>

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => { setStep("credentials"); setOtp(""); setError(""); }}
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
        )}

        {/* Divider — only on credentials step */}
        {step === "credentials" && (
          <>
            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                <span className="bg-card px-4">və ya sosial şəbəkə ilə</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <a
                href="http://localhost:5555/auth/google"
                className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <Chrome size={20} className="text-foreground" />
              </a>
              <button className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
                <Facebook size={20} className="text-blue-600" />
              </button>
              <button className="flex items-center justify-center h-14 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted/50 transition-colors">
                <Github size={20} className="text-foreground" />
              </button>
            </div>
          </>
        )}
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
