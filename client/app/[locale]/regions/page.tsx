import { MapPin, ChevronRight, Image as ImageIcon } from "lucide-react";
import { Link } from "@/i18n/routing";
import { regionService } from "@/services/api/region.service";

export default async function RegionsPage() {
  const regions = await regionService.getRegions();

  return (
    <div className="bg-background pb-20">
      {/* Hero Header */}
      <section className="relative w-full overflow-hidden mb-16 py-32 px-6" style={{ background: "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)" }}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-2xl">
              <MapPin className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 drop-shadow-lg">
            Azərbaycanın Regionları
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Qafqaz dağlarından tutmuş Xəzər dənizinin sahilinədək, ölkəmizin hər bir guşəsini bizimlə kəşf edin
          </p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        {regions.length === 0 ? (
          <div className="text-center py-20 bg-muted rounded-3xl">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg">Hələ ki, heç bir region əlavə edilməyib.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region) => (
              <Link
                key={region.id}
                href={`/regions/${region.id}`}
                className="group bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="aspect-[16/10] bg-muted overflow-hidden relative">
                  {region.image_url ? (
                    <img 
                      src={region.image_url} 
                      alt={region.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary shadow-sm">
                    {region.region || 'Azərbaycan'}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                    {region.name}
                    <ChevronRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </h3>
                  <p className="text-muted-foreground mt-4 line-clamp-3 leading-relaxed text-sm">
                    {region.description || `${region.name} haqqında ətraflı məlumat tezliklə əlavə olunacaq.`}
                  </p>
                  
                  <div className="mt-auto pt-6 flex flex-wrap gap-2">
                    {region.highlights?.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] bg-muted px-2 py-1 rounded-md text-muted-foreground font-medium">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
