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

export enum HostelType {
  PARTY_HOSTEL = 'PARTY_HOSTEL', // Əyləncə / sosial
  FAMILY_HOSTEL = 'FAMILY_HOSTEL', // Ailəvi, sakit
  BOUTIQUE_HOSTEL = 'BOUTIQUE_HOSTEL', // Premium xarakter
  BACKPACKER = 'BACKPACKER', // Ən büdcəli
  HISTORIC = 'HISTORIC', // Tarixi binada
}

export enum DormGender {
  MIXED = 'MIXED',
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

// ─── Entity ───────────────────────────────────────────────────────────────────

/**
 * Hostel — extends Place via 1-to-1 relationship.
 *
 * Frontend fields mapped:
 *  - hostel type         → hostel_type
 *  - dorm beds available → dorm_beds_count
 *  - private rooms       → private_rooms_count
 *  - price/night dorm    → dorm_price_from_eur
 *  - price/night private → private_price_from_eur
 *  - lockers             → has_lockers
 *  - common room         → has_common_room
 *  - kitchen             → has_kitchen
 *  - free breakfast      → has_free_breakfast
 *  - bar                 → has_bar
 *  - tours org'd         → organizes_tours
 *  - female-only dorm    → dorm_gender option
 *  - social atmosphere   → social_events (weekly events list)
 *  - security            → has_24h_security, has_cctv
 */
@Entity('hostels')
@Index(['place_id'], { unique: true })
@Index(['hostel_type'])
@Index(['dorm_price_from_eur'])
export class Hostel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', unique: true })
  place_id: string;

  @OneToOne(() => Place, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'place_id' })
  place: Place;

  // ─── Hostel-Specific Info ─────────────────────────────────────────────────

  @Column({ type: 'enum', enum: HostelType, default: HostelType.BACKPACKER })
  hostel_type: HostelType;

  // ─── Capacity & Rooms ─────────────────────────────────────────────────────

  @Column({ type: 'int', nullable: true })
  dorm_beds_count: number | null;

  @Column({ type: 'int', nullable: true })
  private_rooms_count: number | null;

  @Column({ type: 'int', nullable: true })
  max_dorm_size: number | null; // e.g. 8 — max beds in a single dorm room

  @Column({
    type: 'enum',
    enum: DormGender,
    default: DormGender.MIXED,
    nullable: true,
  })
  available_dorm_gender: DormGender | null;

  // ─── Pricing (in EUR — international hostel standard) ─────────────────────

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  dorm_price_from_eur: number | null;

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  private_price_from_eur: number | null;

  // ─── Check-in / Check-out ─────────────────────────────────────────────────

  @Column({ type: 'varchar', length: 10, default: '14:00' })
  check_in_time: string;

  @Column({ type: 'varchar', length: 10, default: '12:00' })
  check_out_time: string;

  // ─── Amenities ───────────────────────────────────────────────────────────

  @Column({ type: 'boolean', default: false })
  has_wifi: boolean;

  @Column({ type: 'boolean', default: false })
  has_kitchen: boolean;

  @Column({ type: 'boolean', default: false })
  has_common_room: boolean;

  @Column({ type: 'boolean', default: false })
  has_lockers: boolean;

  @Column({ type: 'boolean', default: false })
  has_free_breakfast: boolean;

  @Column({ type: 'boolean', default: false })
  has_bar: boolean;

  @Column({ type: 'boolean', default: false })
  has_laundry: boolean;

  @Column({ type: 'boolean', default: false })
  has_luggage_storage: boolean;

  @Column({ type: 'boolean', default: false })
  has_24h_reception: boolean;

  @Column({ type: 'boolean', default: false })
  organizes_tours: boolean;

  // ─── Safety ───────────────────────────────────────────────────────────────

  @Column({ type: 'boolean', default: false })
  has_24h_security: boolean;

  @Column({ type: 'boolean', default: false })
  has_cctv: boolean;

  @Column({ type: 'boolean', default: false })
  has_keycard_access: boolean;

  // ─── Social / Events ──────────────────────────────────────────────────────

  /** Weekly/regular events e.g. ["Film Gecəsi", "City Tur", "Şüşə Kinosu"] */
  @Column({ type: 'simple-array', nullable: true })
  social_events: string[] | null;

  @Column({ type: 'text', nullable: true })
  hostel_vibe: string | null; // Short description of the atmosphere

  // ─── Timestamps ───────────────────────────────────────────────────────────

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
