import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { Place } from '../../places/entities/place.entity';

// ─── Enums ────────────────────────────────────────────────────────────────────

export enum CuisineType {
  AZERBAIJANI = 'AZERBAIJANI',
  TURKISH = 'TURKISH',
  EUROPEAN = 'EUROPEAN',
  ITALIAN = 'ITALIAN',
  SEAFOOD = 'SEAFOOD',
  ASIAN = 'ASIAN',
  GEORGIAN = 'GEORGIAN',
  MIXED = 'MIXED',
  OTHER = 'OTHER',
}

export enum DiningStyle {
  CASUAL = 'CASUAL',
  FINE_DINING = 'FINE_DINING',
  CAFE = 'CAFE',
  FAST_FOOD = 'FAST_FOOD',
  BUFFET = 'BUFFET',
  MUSEUM_STYLE = 'MUSEUM_STYLE',
}

export enum PriceRange {
  BUDGET = 'BUDGET',    // $   — 5–15 AZN/nəfər
  MID = 'MID',       // $$  — 15–40 AZN/nəfər
  UPSCALE = 'UPSCALE',   // $$$ — 40–100 AZN/nəfər
  LUXURY = 'LUXURY',    // $$$$ — 100+ AZN/nəfər
}

// ─── Entity ───────────────────────────────────────────────────────────────────

/**
 * Restaurant — 1-to-1 extension of Place.
 * Contact is handled purely via WhatsApp (whatsapp_number on Place).
 * No reservation table — users are directed straight to WhatsApp.
 */
@Entity('restaurants')
@Index(['place_id'], { unique: true })
@Index(['cuisine_type'])
@Index(['dining_style'])
@Index(['price_range'])
export class Restaurant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  place_id: string;

  @OneToOne(() => Place, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'place_id' })
  place: Place;

  // ─── Cuisine & Style ──────────────────────────────────────────────────────

  @Column({ type: 'enum', enum: CuisineType, default: CuisineType.AZERBAIJANI })
  cuisine_type: CuisineType;

  /** Signature dishes e.g. ["Piti", "Dushbara", "Kabablar"] */
  @Column({ type: 'simple-array', nullable: true })
  specialties: string[] | null;

  @Column({ type: 'enum', enum: DiningStyle, default: DiningStyle.CASUAL })
  dining_style: DiningStyle;

  @Column({ type: 'enum', enum: PriceRange, default: PriceRange.MID })
  price_range: PriceRange;

  /** Average check per person in AZN — shown on frontend cards */
  @Column({ type: 'int', nullable: true })
  avg_bill_per_person_azn: number | null;

  // ─── Capacity ─────────────────────────────────────────────────────────────

  @Column({ type: 'int', nullable: true })
  seating_capacity: number | null;

  // ─── Menu ─────────────────────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 500, nullable: true })
  menu_pdf_url: string | null;

  @Column({ type: 'jsonb', nullable: true })
  menu_images: string[] | null;

  // ─── Amenities (boolean flags — fast filtering) ───────────────────────────

  @Column({ type: 'boolean', default: false })
  has_wifi: boolean;

  @Column({ type: 'boolean', default: false })
  has_parking: boolean;

  @Column({ type: 'boolean', default: false })
  has_outdoor_seating: boolean;

  @Column({ type: 'boolean', default: false })
  has_live_music: boolean;

  @Column({ type: 'boolean', default: false })
  is_halal_certified: boolean;

  @Column({ type: 'boolean', default: false })
  is_vegetarian_friendly: boolean;

  @Column({ type: 'boolean', default: false })
  has_private_rooms: boolean;

  @Column({ type: 'boolean', default: false })
  accepts_cards: boolean;

  // ─── Timestamps ───────────────────────────────────────────────────────────

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
