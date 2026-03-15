import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity('about_pages')
@Index(['slug', 'language'], { unique: true })
@Index(['language'])
@Index(['is_active'])
export class AboutPage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  subtitle: string | null;

  @Column({ type: 'varchar', length: 255 })
  slug: string;


  @Column({ type: 'jsonb', nullable: true })
  sections: Array<{ title: string; content: string }> | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image_url: string | null;


  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'int', default: 0 })
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
