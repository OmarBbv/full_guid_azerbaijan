import { Place } from "@/types/place";
import un_photo_1448375240586_882707db888b_31728d34 from "@/assets/unsplash/photo-1448375240586-882707db888b_31728d34.jpg";
import un_photo_1464822759023_fed622ff2c3b_31728d34 from "@/assets/unsplash/photo-1464822759023-fed622ff2c3b_31728d34.jpg";
import un_photo_1472396961693_142e6e269027_31728d34 from "@/assets/unsplash/photo-1472396961693-142e6e269027_31728d34.jpg";
import un_photo_1506905925346_21bda4d32df4_31728d34 from "@/assets/unsplash/photo-1506905925346-21bda4d32df4_31728d34.jpg";
import un_photo_1534067783941_51c9c23ecefd_31728d34 from "@/assets/unsplash/photo-1534067783941-51c9c23ecefd_31728d34.jpg";
import un_photo_1542273917363_3b1817f69a2d_31728d34 from "@/assets/unsplash/photo-1542273917363-3b1817f69a2d_31728d34.jpg";
import un_photo_1558981408_db0ecd8a1ee4_31728d34 from "@/assets/unsplash/photo-1558981408-db0ecd8a1ee4_31728d34.jpg";
import un_photo_1472396961693_142e6e269027_32cc0056 from "@/assets/unsplash/photo-1472396961693-142e6e269027_32cc0056.jpg";
import un_photo_1534067783941_51c9c23ecefd_261adc91 from "@/assets/unsplash/photo-1534067783941-51c9c23ecefd_261adc91.jpg";

export const PLACES: any[] = [
  {
    id: "1",
    title: "Yanar Dağ",
    city: "Abşeron",
    type: "Təbiət",
    average_rating: 4.8,
    review_count: 9200,
    thumbnail: un_photo_1506905925346_21bda4d32df4_31728d34,
    accent_color: "#f5a623",
    is_featured: true,
    short_description: "Abşeron yarımadasında sönməyən təbii yanğınları ilə məşhur olan əfsanəvi yer.",
    slug: "yanar-dag",
    subtitle: "Nadir fenomen",
    images: []
  },
  {
    id: "2",
    title: "İçərişəhər",
    city: "Bakı",
    type: "Tarix",
    average_rating: 4.9,
    review_count: 18600,
    thumbnail: un_photo_1534067783941_51c9c23ecefd_261adc91,
    accent_color: "#3b9cf5",
    is_featured: true,
    short_description: "Bakının ən qədim hissəsi, UNESCO-nun Ümumdünya İrsi Siyahısına daxil edilmiş memarlıq qoruğu.",
    slug: "iceri-seher",
    subtitle: "UNESCO mirası",
    images: []
  },
  {
    id: "3",
    title: "Qax Meşəsi",
    city: "Qax",
    type: "Dağlar",
    average_rating: 4.7,
    review_count: 4300,
    thumbnail: un_photo_1448375240586_882707db888b_31728d34,
    accent_color: "#4dd9ac",
    is_featured: true,
    short_description: "Böyük Qafqazın cənub yamaclarında zəngin faunası və şəlalələri ilə seçilən təbii cənnət.",
    slug: "qax-mesesi",
    subtitle: "Trekkinq cənnəti",
    images: []
  }
];

export const MOCK_RESTAURANTS: any[] = [
  {
    id: "r1",
    title: "Şirvanşah Muzey Restoranı",
    city: "Bakı",
    type: "Restoran",
    average_rating: 4.9,
    review_count: 1200,
    thumbnail: un_photo_1558981408_db0ecd8a1ee4_31728d34, // Replace with appropriate photo if available
    accent_color: "#e63946",
    is_featured: true,
    short_description: "Tarixi ab-hava və milli Azərbaycan mətbəxinin mükəmməl harmoniyası.",
    slug: "shirvanshah-museum-restaurant",
    subtitle: "Milli Mətbəx",
    images: []
  },
  {
    id: "r2",
    title: "Sumakh",
    city: "Bakı",
    type: "Restoran",
    average_rating: 4.8,
    review_count: 850,
    thumbnail: un_photo_1542273917363_3b1817f69a2d_31728d34,
    accent_color: "#e63946",
    is_featured: false,
    short_description: "Müasir toxunuşlarla ənənəvi Azərbaycan dadları.",
    slug: "sumakh",
    subtitle: "Premium",
    images: []
  },
  {
    id: "r3",
    title: "Çələbi Xanın Restoranı",
    city: "Şəki",
    type: "Restoran",
    average_rating: 4.7,
    review_count: 530,
    thumbnail: un_photo_1464822759023_fed622ff2c3b_31728d34,
    accent_color: "#e63946",
    is_featured: true,
    short_description: "Məşhur Şəki pitisi və yerli ləzzətləri dada biləcəyiniz məkan.",
    slug: "chelebi-khan-restaurant",
    subtitle: "Yerli Dadlar",
    images: []
  }
];

export const MOCK_HOTELS: any[] = [
  {
    id: "h1",
    title: "Fairmont Baku",
    city: "Bakı",
    type: "Otel",
    average_rating: 4.9,
    review_count: 3200,
    thumbnail: un_photo_1506905925346_21bda4d32df4_31728d34,
    accent_color: "#1d3557",
    is_featured: true,
    short_description: "Alov qüllələrində yerləşən 5 ulduzlu lüks otel.",
    slug: "fairmont-baku",
    subtitle: "5 Ulduz",
    images: []
  },
  {
    id: "h2",
    title: "Marxal Resort & Spa",
    city: "Şəki",
    type: "Otel",
    average_rating: 4.8,
    review_count: 1100,
    thumbnail: un_photo_1448375240586_882707db888b_31728d34,
    accent_color: "#1d3557",
    is_featured: true,
    short_description: "Dağların qoynunda lüks istirahət mərkəzi.",
    slug: "marxal-resort",
    subtitle: "Resort",
    images: []
  },
  {
    id: "h3",
    title: "Chenot Palace Gabala",
    city: "Qəbələ",
    type: "Otel",
    average_rating: 4.9,
    review_count: 650,
    thumbnail: un_photo_1534067783941_51c9c23ecefd_31728d34,
    accent_color: "#1d3557",
    is_featured: false,
    short_description: "Sağlamlıq və spa xidmətləri təklif edən premium otel.",
    slug: "chenot-palace",
    subtitle: "Spa & Wellness",
    images: []
  }
];

export const MOCK_HOSTELS: any[] = [
  {
    id: "ho1",
    title: "Sahil Hostel & Hotel",
    city: "Bakı",
    type: "Hostel",
    average_rating: 4.8,
    review_count: 1400,
    thumbnail: un_photo_1472396961693_142e6e269027_32cc0056,
    accent_color: "#f4a261",
    is_featured: true,
    short_description: "Şəhərin mərkəzində münasib qiymətli və komfortlu konaklama.",
    slug: "sahil-hostel",
    subtitle: "Bakı Mərkəzi",
    images: []
  },
  {
    id: "ho2",
    title: "White City Hostel",
    city: "Bakı",
    type: "Hostel",
    average_rating: 4.6,
    review_count: 450,
    thumbnail: un_photo_1534067783941_51c9c23ecefd_261adc91,
    accent_color: "#f4a261",
    is_featured: false,
    short_description: "Səliqəli və rahat büdcəli hostel.",
    slug: "white-city-hostel",
    subtitle: "Büdcə Dostu",
    images: []
  },
  {
    id: "ho3",
    title: "Sheki Hostelland",
    city: "Şəki",
    type: "Hostel",
    average_rating: 4.7,
    review_count: 320,
    thumbnail: un_photo_1472396961693_142e6e269027_31728d34,
    accent_color: "#f4a261",
    is_featured: true,
    short_description: "Şəkinin tarixi mühitində səmimi hostel təcrübəsi.",
    slug: "sheki-hostelland",
    subtitle: "Tarixi Şəhər",
    images: []
  }
];
