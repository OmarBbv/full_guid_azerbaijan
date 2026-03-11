import { MapPin, Info, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Metadata } from "next";

const REGIONS_DATA: Record<string, {
  name: string;
  azName: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  attractions: Array<{ name: string; type: string }>;
}> = {
  baku: {
    name: "Baku",
    azName: "Bakı",
    description: "Azərbaycandır paytaxtı Bakı şəhəri Xəzər dənizinin sahilində yerləşir. Qədim mərkəzindən tutmuş müasır binaları ilə Bakı contrast xətti keçmiş və gələcəyi bir arada gətirən unikal şəhərdir.",
    highlights: [
      "Ateş dağları - qəbil olan təbiət hadisəsi",
      "Bakirə qişlağı - qədim mədəniyyət",
      "Bak Bayil - müasır memarlıq",
      "Heydar Əliyev Mərkəzi - mimar zəka",
    ],
    imageUrl: "https://images.unsplash.com/photo-1606775791264-b333a5cf05cc?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "İçərişəhər", type: "Tarixi yer" },
      { name: "Cuma Məscidi", type: "Dini yer" },
      { name: "Şirvanşahlar Sarayı", type: "Tarixi qalası" },
      { name: "Birinci Məsində Cami", type: "Memarlıq" },
    ]
  },
  sheki: {
    name: "Sheki",
    azName: "Şəki",
    description: "Şəki, Azərbaycandır qədim şəhərləridir birəsi olaraq, Qafqaz təhsili ilə məşhurdu. Ipəksilk tiqində əhəmiyyətli rol oynamışdı.",
    highlights: [
      "Khan Sarayı - XVIII əsr memarlığı",
      "Kələbəkdən bağlanmış xanlar",
      "Şəki txuma ətraf",
      "Qədim bazarlar",
    ],
    imageUrl: "https://images.unsplash.com/photo-1570664207332-90f0100316b5?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Khan Sarayı", type: "Saray" },
      { name: "Şəki bazarı", type: "Bazaar" },
      { name: "Q Məscidi", type: "Dini yer" },
    ]
  },
  qabala: {
    name: "Qabala",
    azName: "Qəbələ",
    description: "Qəbələ Azərbaycandır coğrafi mərkəzi hesab olunur. Qafqaz dağlarında yerləşən bu şəhər təbiət gözəlliyilə məşhurdu.",
    highlights: [
      "Qafqaz dağları",
      "Tepe gözəlləri",
      "Türizmə aid istirahətlər",
      "Xalça sənəti",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Baki dağları", type: "Təbiət" },
      { name: "Qobustanlı qızırğu", type: "Turist mərkəzi" },
    ]
  },
  quba: {
    name: "Quba",
    azName: "Quba",
    description: "Quba İblis dağlarına yaxın yerləşən, çayların dərinliyinə batıq, yəşil şəhərdir. Burada məşə sağlığı mühüm roldadır.",
    highlights: [
      "Qırmızı kənd",
      "Dağları ləngər",
      "Su bağlanmış şəhər",
      "Qədim mədəniyyi",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Qırmızı kənd", type: "Sakinləmə" },
    ]
  },
  terter: {
    name: "Terter",
    azName: "Tərtər",
    description: "Tərtər Azərbaycandır Qafqaz bölgəsində yerləşən tarixi şəhərdir. Dörd meydanı ilə məşhurdu və mədəniyyət irsinin sayğacı sayılır.",
    highlights: [
      "Dördiyas Camiası",
      "Tərtər Qalaları",
      "Dörd meydanı",
      "Tarixi bazarlar",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Dördiyas Camiası", type: "Dini yer" },
      { name: "Tərtər Qalaları", type: "Tarixi yer" },
    ]
  },
  shamakhi: {
    name: "Shamakhi",
    azName: "Şamaxı",
    description: "Şamaxı qədim pəhləvi şəhərlərindən biri olub, ticari tiqində mühüm rol oynamşdı.",
    highlights: [
      "Juma Məscidi",
      "Fırlangan qalaları",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Cuma Məscidi", type: "Dini yer" },
    ]
  },
  lankaran: {
    name: "Lankaran",
    azName: "Lənkəran",
    description: "Lənkəran Xəzər dənizinin cənub sahilində yerləşən tropikal iqlimə sahib şəhərdir.",
    highlights: [
      "Dəniz səhili",
      "Çay əkinçliyi",
      "Tropik təbiət",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Dəniz sahili", type: "Təbiət" },
    ]
  },
  ganja: {
    name: "Ganja",
    azName: "Gəncə",
    description: "Gəncə Azərbaycandır ikinci ən böyük şəhəridir. Məişət mədəniyyəti ilə məşhurdu.",
    highlights: [
      "Şah Qasım Qubadı Məscidi",
      "Nizami heykəli",
      "Qədim bağlamaçılıq",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Şah Qasım Məscidi", type: "Dini yer" },
    ]
  },
  nakhchivan: {
    name: "Nakhchivan",
    azName: "Naxçıvan",
    description: "Naxçıvan Azərbaycandır enklyavi, Türkiyə ilə sərhəd təqsir edən qədim vilayətdir.",
    highlights: [
      "Qədim saray",
      "Məzar kompleksi",
      "Cənub Qafqazı",
    ],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    attractions: [
      { name: "Alatəpə", type: "Tarixi yer" },
    ]
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = REGIONS_DATA[slug];

  if (!region) {
    return {
      title: "Bölgə Tapılmadı",
      description: "Axtardığınız bölgə mövcud deyildir",
    };
  }

  return {
    title: `${region.azName} - Azərbaycandır Bölgələri`,
    description: region.description,
    openGraph: {
      title: `${region.azName} - Azərbaycandır Bölgələri`,
      description: region.description,
      images: [region.imageUrl],
    },
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const region = REGIONS_DATA[slug];

  if (!region) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <h1 className="text-2xl font-bold">Bölgə tapılmadı</h1>
        <p className="text-muted-foreground">İstədiyiniz bölgə mövcud deyildir</p>
        <Link href="/mekanlar" className="text-primary hover:underline">
          Bütün məkanlara qayıt
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16" style={{ height: "100dvh", minHeight: 680 }}>
        {/* Background Overlay */}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 35%, transparent 60%, rgba(0,0,0,0.7) 100%)" }} />

        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={region.imageUrl}
            alt={region.azName}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.5)" }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pt-16">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white shadow-xl border border-white/20">
            <MapPin className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-6 drop-shadow-2xl">
            {region.azName}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-md max-w-3xl">
            {region.description}
          </p>
        </div>
      </section>

      {/* Info Section */}
      <section className="px-6 max-w-6xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nədir {region.azName}?</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {region.description}
            </p>
            
            {/* Highlights */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Əsas Cəlbedicilikləri:</h3>
              {region.highlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <ArrowRight className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions */}
          <div className="bg-muted rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Cəlbedeni Məkanlar</h3>
            <div className="space-y-4">
              {region.attractions.map((attraction, idx) => (
                <Link
                  key={idx}
                  href="/mekanlar"
                  className="block p-4 bg-background rounded-lg hover:border-primary border-2 border-transparent transition-colors group"
                >
                  <h4 className="font-semibold group-hover:text-primary transition-colors">
                    {attraction.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{attraction.type}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-12 border border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Burada qalmaq istəyirsiniz?</h2>
          <p className="text-muted-foreground mb-8">
            {region.azName} regionundakı otellər, hostellər və restoranları kəşf edin
          </p>
          <Link
            href={`/mekanlar?region=${slug.toLowerCase()}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Məkanları Kəşf Et <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
