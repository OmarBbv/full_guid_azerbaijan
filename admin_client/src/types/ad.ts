export enum AdPosition {
  HERO_ALTI = 'hero_alti',
  ORTA_BANNER = 'orta_banner',
  KATEQORIYA_UST = 'kateqoriya_ust',
  MEKAN_SIDEBAR = 'mekan_sidebar',
}

export interface Ad {
  id: string;
  title: string;
  position: AdPosition;
  image_url: string;
  redirect_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateAdDto {
  title: string;
  position: AdPosition;
  image_url: string;
  redirect_url?: string;
  is_active?: boolean;
}

export interface UpdateAdDto extends Partial<CreateAdDto> {}
