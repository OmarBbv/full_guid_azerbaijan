Layihə Analizi: Full Guide Azerbaijan (FGA)
texniki_tapsiriq.md
 faylına əsasən layihənin cari vəziyyətini analiz etdim. Aşağıda hələ tam tamamlanmamış və ya çatışmayan hissələri qeyd edirəm:

1. Ana Səhifə (Frontend)
2-Field Search Sistemi: "Nə axtarırsınız?" və "Harada axtarırsınız?" sahələrindən ibarət axtarış sistemi Hero bölməsində yoxdur.
Cities Panel (Şəhər Filtrləmə): İstifadəçinin bir və ya bir neçə şəhər seçə biləcəyi xüsusi panel və bu seçimlərə əsasən ana səhifə kontentinin avtomatik filtr olunması hələ reallaşdırılmayıb.
Subsection-Level Filtering: Digər şəhərləri göstər/gizlə (Show other cities) toggle mexanizmi çatışmır.
2. İnteraktiv Xəritə
Marker-based Göstərim: Hazırda xəritə bölgə əsaslıdır (region-based). Texniki tapşırığa görə xəritədə obyektlər markerlərlə göstərilməli və klik edildikdə mini preview pəncərəsi açılmalıdır.
Google Maps/MapLibre İnteqrasiyası: Detal səhifələrində obyektin dəqiq ünvanını göstərən interaktiv xəritə modulu çatışmır.
3. Obyekt (Məkan) Səhifələri
WhatsApp Yönləndirmə: Obyekt səhifələrində birbaşa WhatsApp-a yönləndirmə düyməsi hələ yoxdur.
Sosial Media Linkləri: Obyəktin Instagram, Facebook və s. linkləri struktura əlavə olunmayıb.
SEO & Meta: Hər obyekt üçün xüsusi Structured Data (Schema.org markup) hələ tətbiq olunmayıb.
4. Admin Panel
Reklam Modulu: Banner sahələrinin idarə edilməsi (Ana səhifə, Kateqoriya, Obyekt) üçün backend və admin panel hissəsi yoxdur.
Statistika Paneli: Trafik, baxış sayı və populyar axtarış sorğularını göstərən idarəetmə paneli mövcud deyil.
Kateqoriya İdarəetməsi: Yeni kateqoriya və ya alt-kateqoriya əlavə etmək üçün müstəqil interfeys yoxdur.
5. Backend (NestJS)
Ads Module: Reklamların idarə olunması üçün API strukturu tam deyil.
Statistics Module: Analitika məlumatlarını toplayan və adminə ötürən modul çatışmır.
Növbəti Adımlar: Hansı hissədən başlamağımı istərdiniz? Məsələn, ana səhifədəki Search sistemi və ya Cities Panel-dən başlaya bilərik.