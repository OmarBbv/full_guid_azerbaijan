export interface Place {
  id: number;
  name: string;
  region: string;
  category: string;
  rating: number;
  reviews: string;
  img: string;
  tag: string;
  accent: string;
  badge: string;
  description?: string;
  features?: string[];
  gallery?: string[];
}
