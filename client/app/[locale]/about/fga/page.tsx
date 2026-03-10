"use client";

import Image from "next/image";

import { Info, Globe, Shield, Sparkles } from 'lucide-react';
import un_photo_1541746972996_4e0b0f43e02a_24bb943f from "@/assets/unsplash/photo-1541746972996-4e0b0f43e02a_24bb943f.jpg";

export default function FGAPage() {
  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={un_photo_1541746972996_4e0b0f43e02a_24bb943f}
            alt="FGA About"
            fill
            className="object-cover"
            style={{ filter: "brightness(0.5) saturate(1.1)" }}
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 shadow-xl border border-white/10">
            <Info className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            FGA Haqqında
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md">
            Full Guide Azerbaijan (FGA) - Ölkəmizi fərqli bucaqlardan kəşf etmək istəyənlər üçün vahid rəqəmsal bələdçi şəbəkəsi.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Globe className="text-primary w-8 h-8" />
            Məqsədimiz Nədir?
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Biz Azərbaycana səyahət edən hər kəsin, o cümlədən turistlərin, biznes ziyarətçilərinin və yerli sakinlərin ehtiyac duyduğu bütün məlumatları bir platformada toplayırıq. Missiyamız mürəkkəb informasiyaları asan və anlaşıqlı formata çevirərək rəqəmsal, müasir və qərəzsiz bir xidmət təqdim etməkdir.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl">
              <Shield className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Güvən və Təhlükəsizlik</h3>
              <p className="text-muted-foreground">İstifadəçilərimizin tövsiyə etdiyimiz məkanları güvənərək ziyarət etməsi üçün məlumatları daim audittən keçiririk.</p>
            </div>
            <div className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-3xl">
              <Sparkles className="w-10 h-10 text-purple-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">İntuitiv Axtarış</h3>
              <p className="text-muted-foreground">Ən optimal filtrasiya bazası və yaxın gələcəkdə AI (Süni İntellekt) əsaslı axtarışlar sayəsində seçimlərinizə tez çatın.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
