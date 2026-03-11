import { Injectable, NotFoundException } from '@nestjs/common';

export interface Region {
  id: string;
  slug: string;
  name: string;
  azName: string;
  description: string;
  azDescription: string;
  imageUrl: string;
  highlights: string[];
  attractions: Array<{ name: string; type: string }>;
  coordinates?: { lat: number; lng: number };
}

@Injectable()
export class RegionsService {
  private regions: Region[] = [
    {
      id: '1',
      slug: 'baku',
      name: 'Baku',
      azName: 'Bakı',
      description:
        'The capital city of Azerbaijan, located on the shores of the Caspian Sea. Baku is a unique city that combines ancient heritage with modern architecture.',
      azDescription:
        'Azərbaycandır paytaxtı Bakı şəhəri Xəzər dənizinin sahilində yerləşir. Qədim mərkəzindən tutmuş müasır binaları ilə Bakı contrast xətti keçmiş və gələcəyi bir arada gətirən unikal şəhərdir.',
      imageUrl:
        'https://images.unsplash.com/photo-1606775791264-b333a5cf05cc?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Ateshgah (Fire Temple)',
        'Bakiroi Castle',
        'Modern Baku Boulevard',
        'Heydar Aliyev Center',
      ],
      attractions: [
        { name: 'Icherisheher', type: 'Historic site' },
        { name: 'Friday Mosque', type: 'Religious site' },
        { name: 'Shirvanshahs Palace', type: 'Historical fortress' },
      ],
      coordinates: { lat: 40.3855, lng: 49.883 },
    },
    {
      id: '2',
      slug: 'sheki',
      name: 'Sheki',
      azName: 'Şəki',
      description:
        'An ancient city known for its role in the Silk Road. Sheki is famous for its architectural heritage and traditional crafts.',
      azDescription:
        'Şəki, Azərbaycandır qədim şəhərlərində birəsi olaraq, Qafqaz təhsilində əhəmiyyətli rol oynamşdı. İpəksilk tiqində əhəmiyyətli rola sahib idi.',
      imageUrl:
        'https://images.unsplash.com/photo-1570664207332-90f0100316b5?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Khan Palace from 18th century',
        'Sheki Bazaar',
        'Ancient caravansaries',
        'Traditional crafts',
      ],
      attractions: [
        { name: 'Khan Palace', type: 'Palace' },
        { name: 'Sheki Bazaar', type: 'Marketplace' },
      ],
      coordinates: { lat: 41.1968, lng: 47.5147 },
    },
    {
      id: '3',
      slug: 'qabala',
      name: 'Qabala',
      azName: 'Qəbələ',
      description:
        'Considered the geographical center of Azerbaijan. Qabala is surrounded by the Caucasus Mountains and known for its natural beauty.',
      azDescription:
        'Qəbələ Azərbaycandır coğrafi mərkəzi hesab olunur. Qafqaz dağlarında yerləşən bu şəhər təbiət gözəlliyilə məşhurdu.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Caucasus Mountains',
        'Mountain resorts',
        'Traditional carpet weaving',
        'Alpine forests',
      ],
      attractions: [
        { name: 'Cable Car', type: 'Tourist attraction' },
        { name: 'Mountain Resorts', type: 'Accommodation' },
      ],
      coordinates: { lat: 40.9129, lng: 48.6564 },
    },
    {
      id: '4',
      slug: 'quba',
      name: 'Quba',
      azName: 'Quba',
      description:
        'A green city nestled in the mountains near the Demiryol River. Quba is known for its lush landscapes and Jewish heritage.',
      azDescription:
        'Quba İblis dağlarına yaxın yerləşən, çayların dərinliyinə batıq, yəşil şəhərdir. Burada məşə sağlığı mühüm roldadır.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Red Village',
        'Mountain scenery',
        'Jewish heritage sites',
        'Local crafts',
      ],
      attractions: [{ name: 'Red Village', type: 'Settlement' }],
      coordinates: { lat: 41.374, lng: 48.511 },
    },
    {
      id: '4b',
      slug: 'terter',
      name: 'Terter',
      azName: 'Tərtər',
      description:
        'A historic city in the Caucasus region with significant cultural heritage. Known for its Four Bazaars and architectural landmarks.',
      azDescription:
        'Tərtər Azərbaycandır Qafqaz bölgəsində yerləşən tarixi şəhərdir. Dörd meydanı ilə məşhurdu və mədəniyyət irsinin sayğacı sayılır.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Four Bazaars',
        'Historic fortresses',
        'Medieval architecture',
        'Cultural heritage sites',
      ],
      attractions: [
        { name: 'Dördiyas Mosque', type: 'Religious site' },
        { name: 'Terter Fortresses', type: 'Historical site' },
      ],
      coordinates: { lat: 40.669, lng: 47.384 },
    },
    {
      id: '6',
      slug: 'shamakhi',
      name: 'Shamakhi',
      azName: 'Şamaxı',
      description:
        'An ancient city that played an important role in medieval trade routes. Shamakhi is famous for its historic mosques and fortifications.',
      azDescription:
        'Şamaxı qədim pəhləvi şəhərlərindən biri olub, ticari tiqində mühüm rol oynamşdı.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Juma Mosque',
        'Ancient fortresses',
        'Historical bazaars',
        'Mountain views',
      ],
      attractions: [{ name: 'Juma Mosque', type: 'Religious site' }],
      coordinates: { lat: 40.6131, lng: 48.6264 },
    },
    {
      id: '7',
      slug: 'lankaran',
      name: 'Lankaran',
      azName: 'Lənkəran',
      description:
        'Located on the southern shores of the Caspian Sea with a subtropical climate. Lankaran is known for its tea plantations and tropical nature.',
      azDescription:
        'Lənkəran Xəzər dənizinin cənub sahilində yerləşən tropikal iqlimə sahib şəhərdir.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Caspian Sea beaches',
        'Tea plantations',
        'Tropical forests',
        'Lankaran Lighthouse',
      ],
      attractions: [{ name: 'Caspian Beach', type: 'Natural site' }],
      coordinates: { lat: 38.7499, lng: 48.851 },
    },
    {
      id: '8',
      slug: 'ganja',
      name: 'Ganja',
      azName: 'Gəncə',
      description:
        'The second largest city in Azerbaijan, known for its cultural heritage and the birthplace of the famous poet Nizami. Ganja is a major cultural center.',
      azDescription:
        'Gəncə Azərbaycandır ikinci ən böyük şəhəridir. Məişət mədəniyyəti ilə məşhurdu.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Nizami Statue',
        'Shah Qassim Mosque',
        'Ganja Fortress',
        'Cultural museums',
      ],
      attractions: [
        { name: 'Shah Qassim Mosque', type: 'Religious site' },
        { name: 'Nizami Museum', type: 'Cultural site' },
      ],
      coordinates: { lat: 40.6829, lng: 46.3619 },
    },
    {
      id: '9',
      slug: 'nakhchivan',
      name: 'Nakhchivan',
      azName: 'Naxçıvan',
      description:
        'An autonomous republic of Azerbaijan, an enclave surrounded by Turkey, Iran, and Armenia. Nakhchivan is known for its unique history and ancient sites.',
      azDescription:
        'Naxçıvan Azərbaycandır enklyavi, Türkiyə ilə sərhəd təqsir edən qədim vilayətdir.',
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      highlights: [
        'Ancient palace ruins',
        'Mausoleum complex',
        'South Caucasus views',
        'Historic monuments',
      ],
      attractions: [{ name: 'Alatepe', type: 'Historical site' }],
      coordinates: { lat: 39.2075, lng: 45.4864 },
    },
  ];

  findAll(): Region[] {
    return this.regions;
  }

  findBySlug(slug: string): Region {
    const region = this.regions.find((r) => r.slug === slug);
    if (!region) {
      throw new NotFoundException(`Region with slug "${slug}" not found`);
    }
    return region;
  }
}
