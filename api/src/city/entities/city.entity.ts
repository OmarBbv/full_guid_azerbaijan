import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('cities')
@Index(['slug', 'language'], { unique: true })
@Index(['is_featured'])
@Index(['is_active'])
@Index(['language'])
export class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ─── Core Info ────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 150 })
  slug: string;

  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  // ─── Media ────────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cover_image_url: string | null;

  @Column({ type: 'simple-array', nullable: true })
  gallery_urls: string[] | null;

  // ─── Location ─────────────────────────────────────────────────────────────

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string | null;

  @Column({ type: 'varchar', length: 10, nullable: true })
  country_code: string | null;

  // ─── Highlights & Attractions ─────────────────────────────────────────────

  @Column({ type: 'simple-array', nullable: true })
  highlights: string[] | null;

  @Column({ type: 'jsonb', nullable: true })
  attractions: Array<{ name: string; type: string }> | null;

  // ─── SEO ──────────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string | null;

  @Column({ type: 'text', nullable: true })
  meta_description: string | null;

  // ─── Stats & Visibility ───────────────────────────────────────────────────

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
