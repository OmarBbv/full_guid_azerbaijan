export type CategoryLanguage = 'az' | 'en' | 'ru' | 'tr' | 'ar' | 'hi';

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  language: CategoryLanguage;
  parentId?: number | null;
  parent?: Category;
  children?: Category[];
  depth: number;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryDto {
  name: string;
  slug: string;
  icon?: string;
  language?: CategoryLanguage;
  parentId?: number;
  depth?: number;
  sortOrder?: number;
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>;
