import blog_default from "@/assets/unsplash/baku_fixed.jpg";
import un_photo_1519681393784_d120267933ba_1e93d564 from "@/assets/unsplash/photo-1519681393784-d120267933ba_1e93d564.jpg";

export const MOCK_BLOG_POSTS = [
  {
    id: "m1",
    title: "Bakının gizli sirləri: İçərişəhərdə bir gün",
    slug: "bakinin-gizli-sirleri",
    excerpt: "Paytaxtın qədim küçələrində gizlənmiş tarixi abidələr və maraqlı hekayələr haqqında ətraflı məlumat.",
    cover_image_url: blog_default,
    category_label: "Səyahət",
    category_color: "#3b9cf5",
    published_at: new Date().toISOString(),
    read_time_minutes: 5,
    author_name: "Ayan Əliyeva",
    is_featured: true
  },
  {
    id: "m2",
    title: "Qafqaz dağlarında qış turizmi",
    slug: "qafqaz-daglarinda-qis-turizmi",
    excerpt: "Şahdağ və Tufandağ xizək mərkəzləri haqqında kəşf edilməli ən yaxşı marşrutlar.",
    cover_image_url: un_photo_1519681393784_d120267933ba_1e93d564,
    category_label: "Qış",
    category_color: "#4dd9ac",
    published_at: new Date().toISOString(),
    read_time_minutes: 8,
    author_name: "Rüfət Məmmədov",
    is_featured: false
  }
];
