// entities/category.entity.ts
import { Venue } from "src/venue/entities/venue.entity";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index
} from "typeorm";

@Entity('category')
@Index(['language'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  icon: string;

  @Column({ type: 'varchar', length: 10, default: 'az' })
  language: string;

  // ========== ALT KATEGORİ İLİŞKİSİ ==========

  @Column({ nullable: true })
  parentId: number | null;            // null = ana kategori

  @ManyToOne(() => Category, (category) => category.children, {
    onDelete: 'CASCADE',              // parent silinirse children da silinir
    nullable: true,
  })
  @JoinColumn({ name: 'parentId' })
  parent: Category;

  @OneToMany(() => Category, (category) => category.parent)
  children: Category[];

  // Derinlik seviyesi (opsiyonel ama faydalı)
  @Column({ type: 'int', default: 0 })
  depth: number;                      // 0 = ana, 1 = alt, 2 = alt-alt

  // Sıralama (opsiyonel)
  @Column({ type: 'int', default: 0 })
  sortOrder: number;

  // =============================================

  @OneToMany(() => Venue, (venue) => venue.category)
  venues: Venue[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}