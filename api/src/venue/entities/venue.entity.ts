import { Category } from "src/category/entities/category.entity";
import { VenueImage } from "src/venue-image/entities/venue-image.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index
} from "typeorm";

export enum VenueStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  // ──── Əsas ────
  @Column({ type: 'varchar', length: 200, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // ──── Kateqoriya ────
  @ManyToOne(() => Category, (category) => category.venues, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, {
    onDelete: 'SET NULL',
    nullable: true
  })
  @JoinColumn({ name: 'subCategoryId' })
  subCategory: Category;

  @Column({ nullable: true })
  subCategoryId: number;

  // ──── Ünvan ────
  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  googleMapsUrl: string;

  // ──── Əlaqə ────
  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  whatsapp: string;

  @Column({ type: 'varchar', length: 300, nullable: true })
  website: string;

  // ──── İş saatları ────
  @Column({ type: 'json', nullable: true })
  workingHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };

  // ──── Reytinq & Status ────
  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  reviewCount: number;

  @Column({ type: 'enum', enum: VenueStatus, default: VenueStatus.ACTIVE })
  status: VenueStatus;

  // ──── Şəkillər ────
  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail: string;

  @OneToMany(() => VenueImage, (image) => image.venue, { cascade: true })
  images: VenueImage[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}