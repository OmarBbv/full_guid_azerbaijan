import { useTranslations } from "next-intl";
import { useCategories } from "./use-categories";

export function useCategoryOptions(locale: string) {
  const t = useTranslations("HeroSearch");
  const { data: categories = [] } = useCategories(locale);

  // Default hardcoded root options
  const root = [
    { value: "", label: t("type_all"), icon: "✨" },
    { value: "landmark", label: t("type_landmark"), icon: "🏛️" },
    { value: "restaurant", label: t("type_restaurant"), icon: "🍴" },
    { value: "hotel", label: t("type_hotel"), icon: "🏨" },
    { value: "hostel", label: t("type_hostel"), icon: "🛌" },
    { value: "venue", label: t("type_venue"), icon: "📍" },
    { value: "nature", label: t("type_nature"), icon: "🌿" },
  ];

  // Map API categories
  const dynamicCategories: any[] = [];
  categories.forEach((cat: any) => {
    // If there is already a root item with the same name, append the category slug to its value
    const existingIndex = root.findIndex((r) => r.label.toLowerCase() === cat.name.toLowerCase());
    if (existingIndex !== -1) {
      if (!root[existingIndex].value.includes(cat.slug)) {
        root[existingIndex].value += `,${cat.slug}`;
      }
    } else {
      dynamicCategories.push({
        value: cat.slug,
        label: cat.name,
        icon: cat.icon || "📍",
      });
    }
  });

  return [...root, ...dynamicCategories];
}
