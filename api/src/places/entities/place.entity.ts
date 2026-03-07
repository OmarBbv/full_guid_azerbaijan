import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { PlaceImage } from 'src/places/entities/place-image.entity';
import { PlaceReview } from 'src/places/entities/place-review.entity';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum PlaceStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
}

export enum PlaceType {
  RESTAURANT = 'RESTAURANT',
  HOTEL = 'HOTEL',
  HOSTEL = 'HOSTEL',
  LANDMARK = 'LANDMARK',
  NATURE = 'NATURE',
  ENTERTAINMENT = 'ENTERTAINMENT',
  MUSEUM = 'MUSEUM',
  OTHER = 'OTHER',
}

// ─── Value objects ────────────────────────────────────────────────────────────

export interface WorkingHoursEntry {
  open: string;
  close: string;
  closed?: boolean;
}

export interface WorkingHours {
  monday?: WorkingHoursEntry;
  tuesday?: WorkingHoursEntry;
  wednesday?: WorkingHoursEntry;
  thursday?: WorkingHoursEntry;
  friday?: WorkingHoursEntry;
  saturday?: WorkingHoursEntry;
  sunday?: WorkingHoursEntry;
  /** Human-readable e.g. "10:00 - 23:00" shown on the frontend */
  display?: string;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
}

// ─── Entity ───────────────────────────────────────────────────────────────────

@Entity('places')
@Index(['slug', 'language'], { unique: true })
@Index(['status'])
@Index(['type'])
@Index(['is_featured'])
@Index(['language'])
export class Place {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ─── Core Info ────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  @Column({ type: 'text' })
  short_description: string;

  @Column({ type: 'text', nullable: true })
  detailed_description: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  accent_color: string | null;

  @Column({ type: 'enum', enum: PlaceType, default: PlaceType.OTHER })
  type: PlaceType;

  @Column({ type: 'enum', enum: PlaceStatus, default: PlaceStatus.PENDING })
  status: PlaceStatus;

  // ─── WhatsApp CTA (primary contact — no reservation system) ──────────────

  /**
   * WhatsApp phone number in international format WITHOUT "+" e.g. "994501234567"
   * The frontend builds the link as: https://wa.me/{whatsapp_number}?text={message}
   */
  @Column({ type: 'varchar', length: 50 })
  whatsapp_number: string;

  /**
   * Pre-filled message template.
   * Supports placeholders: {name} → replaced with place title on frontend.
   * Example: "Salam, {name} haqqında məlumat almaq istəyirəm."
   */
  @Column({ type: 'text', nullable: true })
  whatsapp_message_template: string | null;

  // ─── Secondary Contact ────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone_number: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website_url: string | null;

  // ─── Location ─────────────────────────────────────────────────────────────

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  district: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  latitude: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 7, nullable: true })
  longitude: number | null;

  // ─── Media ────────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  video_url: string | null;

  @OneToMany('PlaceImage', 'place', { cascade: true, eager: false })
  images: PlaceImage[];

  @OneToMany('PlaceReview', 'place', { cascade: true, eager: false })
  reviews: PlaceReview[];

  // ─── Operation ────────────────────────────────────────────────────────────

  @Column({ type: 'jsonb', nullable: true })
  working_hours: WorkingHours | null;

  @Column({ type: 'jsonb', nullable: true })
  social_media: SocialMedia | null;

  @Column({ type: 'simple-array', nullable: true })
  features: string[] | null;

  // ─── SEO ──────────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 255, nullable: true })
  meta_title: string | null;

  @Column({ type: 'text', nullable: true })
  meta_description: string | null;

  // ─── Stats ────────────────────────────────────────────────────────────────

  @Column({ type: 'int', default: 0 })
  view_count: number;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'boolean', default: false })
  show_in_hero: boolean;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  average_rating: number;

  @Column({ type: 'int', default: 0 })
  review_count: number;

  // ─── Timestamps ───────────────────────────────────────────────────────────

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
