import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blog_posts')
@Index(['slug', 'language'], { unique: true })
@Index(['language'])
@Index(['is_featured'])
@Index(['is_published'])
export class BlogPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  slug: string;

  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  @Column({ type: 'text' })
  excerpt: string;

  @Column({ type: 'text', nullable: true })
  content_html: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  category_label: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  category_color: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  cover_image_url: string | null;

  @Column({ type: 'varchar', length: 120, nullable: true })
  author_name: string | null;

  @Column({ type: 'varchar', length: 500, nullable: true })
  author_avatar_url: string | null;

  @Column({ type: 'int', nullable: true })
  read_time_minutes: number | null;

  @Column({ type: 'timestamptz', nullable: true })
  published_at: Date | null;

  @Column({ type: 'boolean', default: false })
  is_featured: boolean;

  @Column({ type: 'boolean', default: false })
  is_pinned: boolean;

  @Column({ type: 'boolean', default: true })
  is_published: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
