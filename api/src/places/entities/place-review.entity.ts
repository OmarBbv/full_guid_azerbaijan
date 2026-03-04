import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Place } from './place.entity';

export enum ReviewSource {
  SITE = 'SITE', // Review left on our own platform
  GOOGLE = 'GOOGLE', // Imported from Google Maps
  TRIPADVISOR = 'TRIPADVISOR',
}

@Entity('place_reviews')
@Index(['place_id'])
@Index(['rating'])
@Index(['is_approved'])
export class PlaceReview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  place_id: string;

  @ManyToOne(() => Place, (place) => place.reviews, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({ name: 'place_id' })
  place: Place;

  @Column({ type: 'varchar', length: 100 })
  reviewer_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reviewer_avatar: string | null;

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number; // 1.0 – 5.0

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column({
    type: 'enum',
    enum: ReviewSource,
    default: ReviewSource.SITE,
  })
  source: ReviewSource;

  @Column({ type: 'boolean', default: false })
  is_approved: boolean;

  @CreateDateColumn()
  created_at: Date;
}
