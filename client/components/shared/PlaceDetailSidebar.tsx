"use client";

import {
  MapPin, Clock, Globe, Phone, Mail,
  Instagram, Youtube, Facebook,
} from "lucide-react";
import { Place } from "@/types/place";
import AdBannerComponent from "./AdBanner";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.98-1.404A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.952 7.952 0 01-4.077-1.117l-.292-.174-3.03.854.849-3.095-.19-.302A7.952 7.952 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z" />
    </svg>
  );
}

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.87a8.22 8.22 0 004.82 1.55V7c-.36 0-.71-.04-1.05-.11z" />
    </svg>
  );
}

interface Props {
  place: Place;
}

export default function PlaceDetailSidebar({ place }: Props) {
  const whatsappNum = place.whatsapp_number || (place as any).whatsapp;
  const phoneNum = place.phone_number || (place as any).phone;

  const whatsappUrl = whatsappNum
    ? `https://wa.me/${whatsappNum.replace(/[^0-9+]/g, '')}${place.whatsapp_message_template
      ? `?text=${encodeURIComponent(
        place.whatsapp_message_template.replace("{name}", place.title)
      )}`
      : ""
    }`
    : null;

  const mapsUrl =
    place.google_maps_url
      ? place.google_maps_url
      : place.address
        ? `https://maps.google.com/?q=${encodeURIComponent(place.address + ", Azerbaijan")}`
        : null;

  const social = place.social_media;

  return (
    <div
      className="bg-card border border-border/10 rounded-[2rem] p-8 shadow-xl sticky top-28 space-y-6"
    >
      {/* Address */}
      {(place.address || place.city) && (
        <div className="flex items-start gap-4">
          <div className="bg-secondary p-3 rounded-2xl shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Ünvan</p>
            <p className="font-semibold text-sm leading-relaxed">
              {place.address || place.city || "Məlumat yoxdur"}
            </p>
          </div>
        </div>
      )}

      {/* Working hours */}
      {place.working_hours && (
        <div className="flex items-start gap-4">
          <div className="bg-secondary p-3 rounded-2xl shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">İş Saatları</p>
            <p className="font-semibold text-sm">
              {place.working_hours.display || "Məlumat yoxdur"}
            </p>
          </div>
        </div>
      )}

      {phoneNum && (
        <div className="flex items-start gap-4">
          <div className="bg-secondary p-3 rounded-2xl shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Telefon</p>
            <a
              href={`tel:${phoneNum}`}
              className="font-semibold text-sm text-primary hover:underline"
            >
              {phoneNum}
            </a>
          </div>
        </div>
      )}

      {/* Website */}
      {place.website_url && (
        <div className="flex items-start gap-4">
          <div className="bg-secondary p-3 rounded-2xl shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Veb Sayt</p>
            <a
              href={place.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sm text-primary hover:underline truncate block max-w-[180px]"
            >
              {place.website_url.replace(/^https?:\/\//, "")}
            </a>
          </div>
        </div>
      )}

      {/* Email */}
      {place.email && (
        <div className="flex items-start gap-4">
          <div className="bg-secondary p-3 rounded-2xl shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold mb-1">E-mail</p>
            <a
              href={`mailto:${place.email}`}
              className="font-semibold text-sm text-primary hover:underline"
            >
              {place.email}
            </a>
          </div>
        </div>
      )}

      {/* Social Media */}
      {social && (social.instagram || social.facebook || social.youtube || social.tiktok) && (
        <div>
          <p className="text-xs text-muted-foreground uppercase font-bold mb-3">Sosial Media</p>
          <div className="flex items-center gap-3 flex-wrap">
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
                  color: "#fff",
                }}
              >
                <Instagram size={18} />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "#1877F2", color: "#fff" }}
              >
                <Facebook size={18} />
              </a>
            )}
            {social.youtube && (
              <a
                href={social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "#FF0000", color: "#fff" }}
              >
                <Youtube size={18} />
              </a>
            )}
            {social.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "#010101", color: "#fff" }}
              >
                <TikTokIcon size={18} />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="space-y-3 pt-2">
        {/* WhatsApp CTA */}
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-base text-white transition-all hover:opacity-90 active:scale-95 shadow-lg"
            style={{ background: "#25D366", boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}
          >
            <WhatsAppIcon size={22} />
            WhatsApp ilə Yaz
          </a>
        )}

        {/* Map CTA */}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-base transition-all hover:opacity-90 active:scale-95 shadow-lg"
            style={{ boxShadow: "0 8px 24px rgba(30,58,138,0.25)" }}
          >
            <MapPin className="w-5 h-5" />
            Xəritədə Göstər
          </a>
        )}

        {/* Fallback if no whatsapp/map */}
        {!whatsappUrl && !mapsUrl && (
          <button
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary text-primary-foreground rounded-2xl font-black text-base hover:opacity-90 active:scale-95 transition-all shadow-lg"
          >
            <MapPin className="w-5 h-5" />
            Xəritədə Yol Tap
          </button>
        )}
      </div>

      <AdBannerComponent position="mekan_sidebar" className="mt-6" />
    </div>
  );
}
