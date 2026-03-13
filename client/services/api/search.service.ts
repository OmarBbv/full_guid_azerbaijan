import axios from 'axios';

export interface SearchResultItem {
  id: string;
  kind: 'place' | 'venue';
  type: string;
  title: string;
  description: string;
  city: string | null;
  thumbnail: string | null;
  rating: number;
  slug: string;
  language: string;
}

export interface SearchResponse {
  results: SearchResultItem[];
  total: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

export const searchService = {
  async search(params: {
    q?: string;
    city?: string;
    type?: string;
    language?: string;
    limit?: number;
  }): Promise<SearchResponse> {
    const query = new URLSearchParams();
    if (params.q)        query.set('q', params.q);
    if (params.city)     query.set('city', params.city);
    if (params.type)     query.set('type', params.type);
    if (params.language) query.set('language', params.language);
    if (params.limit)    query.set('limit', String(params.limit));

    const { data } = await axios.get<SearchResponse>(
      `${API_BASE}/search?${query.toString()}`
    );
    return data;
  },
};
