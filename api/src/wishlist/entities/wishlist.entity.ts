import { Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Unique, Column } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('wishlist')
@Unique(['userId', 'targetId', 'targetType'])
export class Wishlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @Column()
  targetId: string;

  @Column()
  targetType: string; // e.g., 'PLACE', 'BLOG', 'CITY'

  @CreateDateColumn()
  createdAt: Date;
}
