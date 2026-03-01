# TEXNİKİ TAPŞIRIQ

**Layihə:** Full Guide Azerbaijan (FGA)
**Domenlər:** fullguideazerbaijan.az/fullguideazerbaijan.com
**Platforma növü:** Turizm yönümlü rəqəmsal bələdçi platforması
**Texnologiyalar:** Backend - NestJS | Frontend - Next.js

---

## 1. Layihənin Məqsədi
Full Guide Azerbaijan (FGA) xarici vətəndaşlar (turistlər, biznes ziyarətçiləri və Azərbaycanda yaşayan əcnəbilər) üçün Azərbaycan üzrə strukturlaşdırılmış, filtrasiya olunan və çoxdilli rəqəmsal bələdçi platformadır.
Platforma ilkin mərhələdə məlumatlandırıcı və istiqamətləndirici funksiyanı daşıyır. Gələcək mərhələlərdə rezervasiya, AI əsaslı tövsiyə sistemi və ödəniş modulu inteqrasiya edilə bilər.

## 2. Əsas Bölmələr (Struktur)

### 1. Başlanğıc (Getting Started)
* Azərbaycan / Bakı haqqında ümumi məlumat
* Hava limanı ilə bağlı məlumat və istiqamətləndirmə

### 2. Şəhərdaxili Hərəkət (Getting Around)
* Taksi xidmətləri
* İctimai nəqliyyat

### 3. Görməli Yerlər (Places)
* Tarixi və turistik məkanlar (Landmarks)

### 4. Qida və İçkilər (Food & Drink)
* Restoranlar

### 5. Yerləşmə (Accommodation)
* Otellər
* Hostellər

### 6. Platforma Haqqında (About the Platform)
* FGA haqqında
* Platformanın prinsipləri
* Şəffaflıq və fəaliyyət çərçivəsi

## 3. Texniki Arxitektura

### Backend - NestJS
* REST API arxitekturası
* Modul əsaslı struktur
* Scalable və genişlənə bilən sistem
* Role-based admin idarəetməsi
* Gələcək AI və payment modullarına uyğun struktur

### Frontend - Next.js
* SSR (Server-Side Rendering)
* SEO optimizasiyası üçün uyğun struktur
* Çoxdilli dəstək (i18n)
* Dinamik şəhər və filtrasiya mexanizmi
* Mobile-first yanaşma
* Yüksək performans və Core Web Vitals uyğunluğu

## 4. Çoxdilli Sistem
Dillər: İngilis, Rus, Türk, Ərəb, Hind və Azərbaycan dili.
* Hər dil üçün ayrıca URL strukturu (/en/,/ru/, və s.)
* Admin paneldən ayrıca dil kontentinin idarəsi
* Hreflang strukturu
* SEO uyğun meta məlumatlar hər dil üçün ayrıca

## 5. Şəhər Filtrləmə Sistemi (Core Feature)

### 5.1 Cities Panel (Ana səhifə)
* Ana səhifədə xüsusi Cities Panel yerləşdiriləcək
* İstifadəçi bir və ya bir neçə şəhər seçə bilər
* Seçilmiş şəhərə uyğun kontent avtomatik filtr olunur
* Digər şəhərlər vizual olaraq arxa plana keçirilir

### 5.2 Subsection-Level Filtering
* İstifadəçi əvvəl şəhər seçibsə digər şəhərlər göstərilmir
* 'Show other cities' adlı toggle mexanizmi olacaq
* Aktiv edilərsə checkmark siyahı açılır
* Power users üçün müqayisə imkanı

## 6. Axtarış Sistemi
Ana səhifədə 2-field search sistemi olacaq:
1. What are you looking for? (məsələn: taxi, restaurant)
2. Where are you looking for? (şəhər seçimi)
* Auto-suggestion sistemi
* Kateqoriya + şəhər əsaslı filtrasiya

## 7. Obyekt Səhifə Strukturu
Hər obyekt üçün aşağıdakılar olacaq:
* Başlıq
* Şəhər
* Kateqoriya / Alt kateqoriya
* Şəkillər
* Qısa və ətraflı təsvir
* Ünvan və interaktiv xəritə
* Əlaqə məlumatı
* WhatsApp yönləndirmə düyməsi
* İş saatları
* Sosial media linkləri
* SEO meta məlumat
* Structured data (schema markup)

## 8. İnteraktiv Xəritə Modulu
* Şəhər üzrə filtrasiya
* Marker əsaslı göstərim
* Klik zamanı mini preview pəncərə
* Google Maps və ya alternativ API inteqrasiyası

## 9. Admin Panel
* Kateqoriya və alt kateqoriya əlavə etmə
* Şəhər əlavə etmə
* Obyekt əlavə etmə və redaktə
* Blog idarəetməsi
* Reklam sahələrinin idarəsi
* Çoxdilli kontent idarəetməsi
* SEO meta idarəetməsi
* Statistika paneli (trafik, baxış sayı, populyar bölmələr, axtarış sorğuları)

## 10. Kontakt və Feedback
* WhatsApp yönləndirmə
* Google review yönləndirmə və ya inteqrasiya

## 11. Reklam Modulu
* Banner sahələri (Ana səhifə, Kateqoriya səhifəsi, Obyekt səhifəsi)
* Admin paneldən idarə edilə bilən
* Hal-hazırda monetizasiya və ödəniş sistemi aktiv deyil
* Gələcək mərhələdə əlavə edilə bilər

## 12. Mobil və Performans
* Mobile-first dizayn
* Tam responsiv struktur
* Sürətli yüklənmə və optimizasiya
* Core Web Vitals uyğunluğu

## 13. Login / User Account sistemi

## 14. Gələcək İnkişaf Planı
* AI Assistant
* AI Trip Planner
* Booking və rezervasiya sistemi
* Payment modulu
* Behaviour-based recommendation engine
* Partner profilləri (gələcək mərhələdə aktiv edilə bilər)

## 15. SEO və Təhlükəsizlik
* SEO-friendly URL strukturu
* Schema.org markup
* Open Graph tagləri
* Sitemap.xml və Robots.txt
* SSL sertifikatı
* Role-based giriş sistemi
* Server səviyyəsində təhlükəsizlik tədbirləri
