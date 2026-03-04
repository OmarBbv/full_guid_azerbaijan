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

export enum HotelStarRating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export enum HotelType {
  HOTEL = 'HOTEL',
  BOUTIQUE = 'BOUTIQUE',
  RESORT = 'RESORT',
  VILLA = 'VILLA',
  APARTMENT = 'APARTMENT',
}

export enum BoardType {
  ROOM_ONLY = 'ROOM_ONLY',
  BED_BREAKFAST = 'BED_BREAKFAST',
  HALF_BOARD = 'HALF_BOARD',
  FULL_BOARD = 'FULL_BOARD',
  ALL_INCLUSIVE = 'ALL_INCLUSIVE',
}

// ─── Entity ───────────────────────────────────────────────────────────────────

/**
 * Hotel — 1-to-1 extension of Place.
 * Bookings: WhatsApp only (whatsapp_number on Place). No reservation system.
 */
@Entity('hotels')
@Index(['place_id'], { unique: true })
@Index(['star_rating'])
@Index(['hotel_type'])
@Index(['price_from_azn'])
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  place_id: string;

  @OneToOne(() => Place, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'place_id' })
  place: Place;

  // ─── Classification ───────────────────────────────────────────────────────

  @Column({ type: 'smallint', default: 3 })
  star_rating: number;

  @Column({ type: 'enum', enum: HotelType, default: HotelType.HOTEL })
  hotel_type: HotelType;

  // ─── Pricing (AZN / night) ────────────────────────────────────────────────

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price_from_azn: number | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price_to_azn: number | null;

  @Column({ type: 'simple-array', nullable: true })
  available_board_types: string[] | null;

  // ─── Capacity & Timing ────────────────────────────────────────────────────

  @Column({ type: 'int', nullable: true })
  total_rooms: number | null;

  @Column({ type: 'int', nullable: true })
  total_floors: number | null;

  @Column({ type: 'varchar', length: 10, default: '14:00' })
  check_in_time: string;

  @Column({ type: 'varchar', length: 10, default: '12:00' })
  check_out_time: string;

  /** Days before arrival free cancellation applies (0 = non-refundable) */
  @Column({ type: 'int', default: 0 })
  free_cancellation_days: number;

  // ─── Amenities ────────────────────────────────────────────────────────────

  @Column({ type: 'boolean', default: false })
  has_wifi: boolean;

  @Column({ type: 'boolean', default: false })
  has_parking: boolean;

  @Column({ type: 'boolean', default: false })
  has_pool: boolean;

  @Column({ type: 'boolean', default: false })
  has_spa: boolean;

  @Column({ type: 'boolean', default: false })
  has_gym: boolean;

  @Column({ type: 'boolean', default: false })
  has_restaurant: boolean;

  @Column({ type: 'boolean', default: false })
  has_room_service: boolean;

  @Column({ type: 'boolean', default: false })
  has_airport_transfer: boolean;

  @Column({ type: 'boolean', default: false })
  has_butler_service: boolean;

  @Column({ type: 'boolean', default: false })
  has_concierge: boolean;

  @Column({ type: 'boolean', default: false })
  pets_allowed: boolean;

  @Column({ type: 'boolean', default: false })
  accepts_cards: boolean;

  /** Views from the property e.g. ["Xəzər dənizi", "Şəhər panoraması"] */
  @Column({ type: 'simple-array', nullable: true })
  views: string[] | null;

  // ─── Timestamps ───────────────────────────────────────────────────────────

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
