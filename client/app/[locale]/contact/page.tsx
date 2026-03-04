"use client";

import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Instagram, Facebook, Twitter } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add logic for sending message
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/20 overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 border-b border-border/40" style={{ background: "linear-gradient(180deg, var(--muted) 0%, var(--background) 100%)" }}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider">
              <MessageSquare size={16} /> Əlaqə Saxlayın
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight tracking-tight">
              Sualınız var? Bizə <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-500">Yazın</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Azərbaycan səyahətinizlə bağlı hər hansı bir sualınız, təklifiniz və ya əməkdaşlıq fikriniz varsa, bizimlə əlaqə saxlamaqdan çəkinməyin.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left: Contact Information */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
                  <span className="w-8 h-1 bg-primary rounded-full" />
                  Əlaqə Məlumataı
                </h3>

                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-primary/5">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">E-poçt Ünvanı</h4>
                      <p className="text-muted-foreground mb-1">Suallarınız üçün bizə yazın</p>
                      <a href="mailto:info@fullguide.az" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">info@fullguide.az</a>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-primary/5">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Telefon</h4>
                      <p className="text-muted-foreground mb-1">Bazar ertəsi - Cümə, 09:00 - 18:00</p>
                      <a href="tel:+994501234567" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">+994 50 123 45 67</a>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30 group-hover:shadow-primary/5">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Ünvan</h4>
                      <p className="text-muted-foreground mb-1">Baş ofisimiz</p>
                      <p className="text-foreground font-semibold">Bakı şəhəri, Nizami küçəsi 103</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold text-foreground mb-6">Bizi izləyin</h4>
                <div className="flex gap-4">
                  {[
                    { icon: <Instagram size={20} />, label: "Instagram", color: "#E4405F" },
                    { icon: <Facebook size={20} />, label: "Facebook", color: "#1877F2" },
                    { icon: <Twitter size={20} />, label: "Twitter", color: "#1DA1F2" },
                    { icon: <Globe size={20} />, label: "Website", color: "var(--primary)" },
                  ].map((social, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 rounded-xl bg-card border border-border/50 flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:border-transparent hover:text-white"
                      style={{ '--hover-bg': social.color } as any}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = social.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      {social.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Work Hours Card */}
              <div className="p-8 rounded-[2rem] bg-linear-to-br from-primary to-blue-600 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} />
                    <h4 className="font-bold text-lg">İş Saatlarımız</h4>
                  </div>
                  <ul className="space-y-3 opacity-90 text-sm">
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Bazar ertəsi - Cümə:</span>
                      <span className="font-bold">09:00 - 18:00</span>
                    </li>
                    <li className="flex justify-between border-b border-white/10 pb-2">
                      <span>Şənbə:</span>
                      <span className="font-bold">10:00 - 15:00</span>
                    </li>
                    <li className="flex justify-between text-white/60">
                      <span>Bazar:</span>
                      <span className="font-bold">Bağlıdır</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-card border border-border/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] pointer-events-none" />

                <h3 className="text-2xl font-bold text-foreground mb-2">Mesaj Göndərin</h3>
                <p className="text-muted-foreground mb-10">Sizə 24 saat ərzində geri dönüş edəcəyik.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground ml-1">Adınız və Soyadınız</label>
                      <input
                        type="text"
                        placeholder="Məs: Əli Məmmədov"
                        className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border/50 outline-none focus:border-primary/50 focus:bg-card transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-foreground ml-1">E-poçt</label>
                      <input
                        type="email"
                        placeholder="example@mail.com"
                        className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border/50 outline-none focus:border-primary/50 focus:bg-card transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground ml-1">Mövzu</label>
                    <input
                      type="text"
                      placeholder="Nə haqqında yazmaq istəyirsiniz?"
                      className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border/50 outline-none focus:border-primary/50 focus:bg-card transition-all"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground ml-1">Mesajınız</label>
                    <textarea
                      rows={5}
                      placeholder="Mesajınızı buraya daxil edin..."
                      className="w-full px-6 py-4 rounded-2xl bg-muted/50 border border-border/50 outline-none focus:border-primary/50 focus:bg-card transition-all resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 active:scale-95 transition-all group"
                  >
                    Göndər
                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </section>

        {/* Map Section (Placeholder for real map) */}
        <section className="px-6 pb-24 max-w-7xl mx-auto">
          <div className="w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden bg-card border border-border/50 shadow-xl relative group">
            {/* Real map integration would go here (Google Maps / Leaflet) */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-4 animate-bounce">
                  <MapPin size={32} />
                </div>
                <p className="font-bold text-foreground">Xəritədə Baxın</p>
                <p className="text-sm text-muted-foreground">Bakı, Nizami 103</p>
              </div>
            </div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-background/40 to-transparent" />
          </div>
        </section>

      </div>
    </div>
  );
}
