export interface AboutPage {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  sections: Array<{ title: string; content: string }> | null;
  image_url: string | null;
  language: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type CreateAboutPageDto = Omit<AboutPage, 'id' | 'created_at' | 'updated_at'>;
export type UpdateAboutPageDto = Partial<CreateAboutPageDto>;
