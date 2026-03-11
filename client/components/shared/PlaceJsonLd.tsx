import { Place } from '@/types/place';

interface Props {
  place: Place;
  type?: 'TouristAttraction' | 'Restaurant' | 'Hotel' | 'Hostel';
}

export default function PlaceJsonLd({ place, type = 'TouristAttraction' }: Props) {
  const images = place.images?.map(img =>
    img.url ? img.url.replace('localhost', '127.0.0.1') : ''
  ).filter(Boolean) || [];

  if (images.length === 0 && place.thumbnail) {
    images.push(place.thumbnail.replace('localhost', '127.0.0.1'));
  }

  const data = {
    "@context": "https://schema.org",
    "@type": type,
    "name": place.meta_title || place.title,
    "description": place.meta_description || place.short_description,
    "image": images,
    "url": place.website_url || undefined,
    "telephone": place.phone_number || place.whatsapp_number || undefined,
    "address": place.address || place.city ? {
      "@type": "PostalAddress",
      "streetAddress": place.address || undefined,
      "addressLocality": place.city || undefined,
      "addressCountry": "AZ"
    } : undefined,
    "geo": place.latitude && place.longitude ? {
      "@type": "GeoCoordinates",
      "latitude": place.latitude,
      "longitude": place.longitude
    } : undefined
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
