import axios from "axios";
import { GuidePage } from "@/types/guide-page";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

export const guidePageService = {
  async getAll(params?: { language?: string; active?: boolean }) {
    const response = await axios.get<GuidePage[]>(`${API_URL}/guide-pages`, {
      params: {
        ...params,
        active: params?.active ?? true,
      },
    });
    return response.data;
  },

  async getBySlug(slug: string, language = "az") {
    const response = await axios.get<GuidePage>(
      `${API_URL}/guide-pages/slug/${slug}`,
      {
        params: { language },
      }
    );
    return response.data;
  },

  async getById(id: string) {
    const response = await axios.get<GuidePage>(`${API_URL}/guide-pages/${id}`);
    return response.data;
  },
};
