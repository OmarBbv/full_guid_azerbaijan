import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AdPosition {
  HERO_ALTI = 'hero_alti',         // Ana səhifə — hero-dan sonra
  ORTA_BANNER = 'orta_banner',     // Ana səhifə — məzmunun ortasında
  KATEQORIYA_UST = 'kateqoriya_ust', // Kateqoriya/məkanlar səhifəsi yuxarısı
  MEKAN_SIDEBAR = 'mekan_sidebar', // Yer detalı yan paneli
}

@Entity('ad_banners')
export class AdBanner {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column({
    type: 'enum',
    enum: AdPosition,
    default: AdPosition.HERO_ALTI,
  })
  position: AdPosition;

  @Column({ name: 'image_url', type: 'text' })
  image_url: string;

  @Column({ name: 'redirect_url', type: 'text', nullable: true })
  redirect_url: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
