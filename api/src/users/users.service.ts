import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (existing) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepository.create(data);
    if (user.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, attrs: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (attrs.password) {
      const salt = await bcrypt.genSalt(10);
      attrs.password = await bcrypt.hash(attrs.password, salt);
    }
    // Convert undefined to null so TypeORM clears nullable columns
    const sanitized: any = {};
    for (const key of Object.keys(attrs)) {
      sanitized[key] =
        (attrs as any)[key] === undefined ? null : (attrs as any)[key];
    }
    Object.assign(user, sanitized);
    return this.userRepository.save(user);
  }
}
