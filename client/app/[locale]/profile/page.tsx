"use client";

import { useUser, useUpdateProfile } from "@/hooks/use-user";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { User, Mail, Save, Loader2, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import { toast } from "sonner";

export default function ProfilePage() {
  const t = useTranslations("Profile");
  const { data: user, isLoading } = useUser();
  const updateProfile = useUpdateProfile();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      await updateProfile.mutateAsync({
        id: user.id,
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      });
      toast.success(t("success_message"));
    } catch (error) {
      toast.error(t("error_message"));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0c14]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0c14] py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Ana səhifəyə qayıt</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
              {t("title")}
            </h1>
            <p className="text-white/50 text-lg">
              {t("subtitle")}
            </p>
          </div>
          <div 
            className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-2xl"
            style={{ 
              background: "linear-gradient(135deg, #3b9cf5, #6f5cf6)",
              boxShadow: "0 20px 40px rgba(59, 156, 245, 0.25)"
            }}
          >
            <User size={36} className="text-white" />
          </div>
        </div>

        {/* Profile Card */}
        <div 
          className="rounded-[32px] overflow-hidden p-8 md:p-10"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            backdropFilter: "blur(40px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)"
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* First Name */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest pl-1">
                  {t("first_name")}
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all text-[15px] font-medium"
                    placeholder="Adınız"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest pl-1">
                  {t("last_name")}
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20 group-focus-within:text-blue-400 transition-colors" />
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all text-[15px] font-medium"
                    placeholder="Soyadınız"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest pl-1">
                  {t("email")}
                </label>
                <div className="relative group opacity-60">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20" />
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white/50 cursor-not-allowed text-[15px] font-medium"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-2.5">
                <label className="text-[13px] font-bold text-white/40 uppercase tracking-widest pl-1">
                   {t("role")}
                </label>
                <div className="relative group opacity-60">
                  <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-white/20" />
                  <input
                    type="text"
                    value={user.role === 'admin' ? 'Administrator' : 'İstifadəçi'}
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white/50 cursor-not-allowed text-[15px] font-medium uppercase tracking-wider"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 mt-10">
              <button
                type="submit"
                disabled={updateProfile.isPending}
                className="w-full md:w-auto px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white font-bold text-[15px] flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
              >
                {updateProfile.isPending ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t("saving")}</span>
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    <span>{t("save_changes")}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
