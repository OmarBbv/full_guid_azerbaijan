export type CategoryLanguage = 'az' | 'en' | 'ru' | 'tr' | 'ar' | 'hi';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  language: CategoryLanguage;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  icon?: string;
  language?: CategoryLanguage;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
