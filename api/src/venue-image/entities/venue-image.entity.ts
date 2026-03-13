import { Venue } from "src/venue/entities/venue.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from "typeorm";

@Entity('venue_images')
export class VenueImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  url: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  alt: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @ManyToOne(() => Venue, (venue) => venue.images, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venueId' })
  venue: Venue;

  @Column()
  venueId: number;

  @CreateDateColumn()
  createdAt: Date;
}