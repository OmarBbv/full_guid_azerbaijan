import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { GuidePage } from "@/types/guide-page";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export function useGuidePages(params?: { language?: string; active?: boolean }) {
  return useQuery({
    queryKey: ["guide-pages", params],
    queryFn: async () => {
      const response = await axios.get<GuidePage[]>(`${API_URL}/guide-pages`, {
        params: {
          ...params,
          active: params?.active ?? true,
        },
      });
      return response.data;
    },
  });
}

export function useGuidePageBySlug(slug: string, language: string) {
  return useQuery({
    queryKey: ["guide-page", slug, language],
    queryFn: async () => {
      const response = await axios.get<GuidePage>(
        `${API_URL}/guide-pages/slug/${slug}`,
        { params: { language } }
      );
      return response.data;
    },
    enabled: !!slug,
  });
}
