export enum AdPosition {
  HOMEPAGE_TOP = 'homepage_top',
  HOMEPAGE_SIDE = 'homepage_side',
  CATEGORY_TOP = 'category_top',
  PLACE_SIDEBAR = 'place_sidebar',
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
