"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NewsletterSection() {
  const t = useTranslations('Home');
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 1200);
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Cinematic BG */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f1f45 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(59,156,245,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(77,217,172,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Floating orbs */}
      <div className="newsletter-orb orb-1" />
      <div className="newsletter-orb orb-2" />
      <div className="newsletter-orb orb-3" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="mb-3">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/70"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            📩 {t('stay_informed')}
          </span>
        </div>

        <h2
          className="font-black leading-tight mb-4 text-white"
          style={{ fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.03em" }}
        >
          {t('azerbaijan_most_beautiful')} <br />
          <span
            style={{
              background: "linear-gradient(135deg, #3b9cf5, #4dd9ac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {t('news_await_you')}
          </span>
        </h2>

        <p className="text-white/55 text-base leading-relaxed mb-10 max-w-lg mx-auto">
          {t('newsletter_desc')}
        </p>

        {sent ? (
          <div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white"
            style={{ background: "rgba(77,217,172,0.2)", border: "1.5px solid rgba(77,217,172,0.4)" }}
          >
            <CheckCircle size={22} className="text-[#4dd9ac]" />
            <span>{t('subscribed_success')}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('email_placeholder')}
                className="w-full px-5 py-4 rounded-2xl text-white placeholder-white/35 text-sm font-medium outline-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(10px)",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = "1.5px solid rgba(59,156,245,0.6)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.11)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = "1.5px solid rgba(255,255,255,0.12)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white text-sm transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 shrink-0"
              style={{
                background: "linear-gradient(135deg, #3b9cf5, #2563eb)",
                boxShadow: "0 8px 24px rgba(59,156,245,0.35)",
              }}
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  {t('subscribe')}
                  <Send size={15} />
                </>
              )}
            </button>
          </form>
        )}

        <p className="text-white/25 text-xs mt-5">
          {t('no_spam')}
        </p>
      </div>

      <style jsx global>{`
        .newsletter-orb {
          position: absolute;
          border-radius: 50%;
          animation: orb-float 6s ease-in-out infinite;
          pointer-events: none;
        }
        .orb-1 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(59,156,245,0.2), transparent 70%);
          top: -80px; left: -80px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(77,217,172,0.2), transparent 70%);
          bottom: -60px; right: 10%;
          animation-delay: 2s;
        }
        .orb-3 {
          width: 150px; height: 150px;
          background: radial-gradient(circle, rgba(245,166,35,0.15), transparent 70%);
          top: 40%; right: -50px;
          animation-delay: 4s;
        }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </section>
  );
}
