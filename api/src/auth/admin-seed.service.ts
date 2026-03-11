import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';

@Injectable()
export class AdminSeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onApplicationBootstrap() {
    const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@fullguide.az';
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'Admin@2025!';

    const existing = await this.userRepository.findOne({
      where: { email: adminEmail },
    });

    if (existing) {
      // Ensure the existing user is an admin
      if (existing.role !== UserRole.ADMIN) {
        await this.userRepository.update(existing.id, { role: UserRole.ADMIN });
        this.logger.log(`Admin rolu verildi: ${adminEmail}`);
      }
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const admin = this.userRepository.create({
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
    });

    await this.userRepository.save(admin);
    this.logger.log(`Admin hesabı yaradıldı: ${adminEmail}`);
  }
}
