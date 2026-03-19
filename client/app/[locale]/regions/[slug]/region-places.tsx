'use client';

import * as React from 'react';
import { Link } from '@/i18n/routing';
import {
  MapPin, ArrowRight, Star, ChevronDown, Ticket,
  Building2, Utensils, Hotel, Landmark, Trees,
} from 'lucide-react';
import { Place } from '@/types/place';

interface RegionPlacesProps {
  places: Place[];
  regionName: string;
}

const TYPE_META: Record<string, { label: string; icon: React.ReactNode; color: string; activeClass: string }> = {
  RESTAURANT: {
    label: 'Restoran',
    icon: <Utensils className="w-3.5 h-3.5" />,
    color: 'bg-orange-500/10 text-orange-600 border-orange-200',
    activeClass: 'bg-orange-500 text-white border-orange-500',
  },
  HOTEL: {
    label: 'Otel',
    icon: <Hotel className="w-3.5 h-3.5" />,
    color: 'bg-blue-500/10 text-blue-600 border-blue-200',
    activeClass: 'bg-blue-500 text-white border-blue-500',
  },
  HOSTEL: {
    label: 'Hostel',
    icon: <Building2 className="w-3.5 h-3.5" />,
    color: 'bg-green-500/10 text-green-600 border-green-200',
    activeClass: 'bg-green-600 text-white border-green-600',
  },
  LANDMARK: {
    label: 'Tarixi Yer',
    icon: <Landmark className="w-3.5 h-3.5" />,
    color: 'bg-purple-500/10 text-purple-600 border-purple-200',
    activeClass: 'bg-purple-600 text-white border-purple-600',
  },
  NATURE: {
    label: 'Təbiət',
    icon: <Trees className="w-3.5 h-3.5" />,
    color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    activeClass: 'bg-emerald-600 text-white border-emerald-600',
  },
  MUSEUM: {
    label: 'Muzey',
    icon: <Landmark className="w-3.5 h-3.5" />,
    color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200',
    activeClass: 'bg-yellow-500 text-white border-yellow-500',
  },
  VENUE: {
    label: 'Əyləncə Məkanı',
    icon: <Ticket className="w-3.5 h-3.5" />,
    color: 'bg-pink-500/10 text-pink-600 border-pink-200',
    activeClass: 'bg-pink-600 text-white border-pink-600',
  },
};

function placeTypeUrl(type: string | undefined): string {
  switch (type) {
    case 'RESTAURANT': return 'places/restaurants';
    case 'HOTEL': return 'places/hotels';
    case 'HOSTEL': return 'places/hostels';
    case 'VENUE': return 'mekanlar';
    default: return 'places/landmarks';
  }
}

export function RegionPlaces({ places, regionName }: RegionPlacesProps) {
  const [activeFilter, setActiveFilter] = React.useState<string>('ALL');
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (places.length === 0) return null;

  const availableTypes = Array.from(new Set(places.map((p) => p.type).filter(Boolean))) as string[];

  const filtered = activeFilter === 'ALL'
    ? places
    : places.filter((p) => p.type === activeFilter);

  const activeMeta = activeFilter !== 'ALL' ? TYPE_META[activeFilter] : null;
  const activeLabel = activeMeta ? activeMeta.label : 'Hamısı';

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 text-primary font-bold uppercase text-xs mb-3">
            <MapPin className="w-4 h-4" />
            <span>{regionName} regionundakı yerlər</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-4xl md:text-5xl font-black">
                Bu Regionda{' '}
                <span className="text-primary">{filtered.length}</span>{' '}
                Məkan
              </h2>
              <p className="text-muted-foreground mt-2 text-lg">
                {regionName} şəhərindəki bütün restoran, otel, hostel, görməli yer
              </p>
            </div>

            {/* Right side: custom dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all min-w-[160px] justify-between"
              >
                <span className="flex items-center gap-2">
                  {activeMeta ? activeMeta.icon : <MapPin className="w-3.5 h-3.5" />}
                  {activeLabel}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* All option */}
                  <button
                    onClick={() => { setActiveFilter('ALL'); setDropdownOpen(false); }}
                    className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors ${activeFilter === 'ALL'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted text-foreground'
                      }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      Hamısı
                    </span>
                    <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full">
                      {places.length}
                    </span>
                  </button>

                  {availableTypes.map((type) => {
                    const meta = TYPE_META[type] || {
                      label: type,
                      icon: <Ticket className="w-3.5 h-3.5" />,
                      color: 'bg-primary/10 text-primary border-primary/20',
                      activeClass: 'bg-primary text-primary-foreground',
                    };
                    const count = places.filter((p) => p.type === type).length;
                    const isActive = activeFilter === type;

                    return (
                      <button
                        key={type}
                        onClick={() => { setActiveFilter(type); setDropdownOpen(false); }}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors border-t border-border/50 ${isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-foreground'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          {meta.icon}
                          {meta.label}
                        </span>
                        <span className="text-xs bg-muted/30 px-2 py-0.5 rounded-full">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>



        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 text-muted-foreground opacity-40" />
            </div>
            <p className="text-muted-foreground text-lg font-medium">
              Bu kateqoriyada məkan tapılmadı
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((place) => {
            const meta = TYPE_META[place.type || ''] || {
              label: place.type || 'Digər',
              icon: <Ticket className="w-3 h-3" />,
              color: 'bg-primary/10 text-primary border-primary/20',
              activeClass: '',
            };
            const rating =
              typeof place.average_rating === 'number'
                ? place.average_rating
                : parseFloat(place.average_rating as string) || 0;
            const href = (place as any).is_venue
              ? `/mekanlar/${place.slug || place.id}`
              : `/${placeTypeUrl(place.type)}/${place.slug || place.id}`;

            return (
              <Link
                key={place.id}
                href={href}
                className="group block bg-card border border-border/50 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-muted">
                  {place.thumbnail ? (
                    <img
                      src={place.thumbnail}
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <MapPin className="w-10 h-10 text-muted-foreground opacity-30" />
                    </div>
                  )}
                  <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm ${meta.color}`}>
                    {meta.icon}
                    {meta.label}
                  </div>
                  {rating > 0 && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-full text-xs font-bold">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {rating.toFixed(1)}
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors line-clamp-1">
                    {place.title}
                  </h3>
                  {place.short_description && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                      {place.short_description}
                    </p>
                  )}
                  {place.address && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 shrink-0" />
                      <span className="line-clamp-1">{place.address}</span>
                    </div>
                  )}
                </div>

                <div className="px-5 pb-5">
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {place.review_count > 0 ? `${place.review_count} rəy` : 'Yeni'}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
