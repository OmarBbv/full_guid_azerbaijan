import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // ─── Helper ───────────────────────────────────────────────────────────────
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private stripPassword(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, otpCode, otpExpiresAt, ...result } = user;
    return result;
  }

  // ─── Standard login flow: validate credentials, then send OTP ─────────────
  async requestOtp(email: string, pass: string): Promise<{ message: string }> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('E-poçt və ya şifrə yanlışdır');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('E-poçt və ya şifrə yanlışdır');
    }

    const otp = this.generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    await this.usersService.update(user.id, {
      otpCode: otp,
      otpExpiresAt: expiresAt,
    });

    await this.mailService.sendOtp(email, otp);

    return { message: 'OTP kodu e-poçtunuza göndərildi' };
  }

  // ─── Verify OTP and issue JWT ─────────────────────────────────────────────
  async verifyOtp(email: string, otp: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.otpCode || !user.otpExpiresAt) {
      throw new BadRequestException('OTP tapılmadı, yenidən cəhd edin');
    }

    if (user.otpCode !== otp) {
      throw new BadRequestException('OTP kodu yanlışdır');
    }

    if (new Date() > user.otpExpiresAt) {
      throw new BadRequestException('OTP kodunun vaxtı keçib');
    }

    // Clear OTP after use
    await this.usersService.update(user.id, {
      otpCode: undefined,
      otpExpiresAt: undefined,
    });

    return this.login(this.stripPassword(user));
  }

  // ─── Issue JWT ────────────────────────────────────────────────────────────
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  // ─── Admin direct login (no OTP) ──────────────────────────────────────────
  async adminLogin(email: string, pass: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user || !user.password) {
      throw new UnauthorizedException('E-poçt və ya şifrə yanlışdır');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Admin icazəniz yoxdur');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('E-poçt və ya şifrə yanlışdır');
    }

    return this.login(this.stripPassword(user));
  }

  // ─── Register → send OTP immediately ─────────────────────────────────────
  async register(data: any): Promise<{ message: string }> {
    try {
      await this.usersService.create(data);
      // After register, send OTP just like login
      return this.requestOtp(data.email, data.password);
    } catch (e) {
      if (e instanceof ConflictException) {
        throw new ConflictException('Bu e-poçt artıq istifadədədir');
      }
      throw e;
    }
  }

  // ─── Google OAuth → no OTP needed ────────────────────────────────────────
  async validateOAuthLogin(profile: any): Promise<any> {
    let user = await this.usersService.findOneByEmail(profile.email);

    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        googleId: profile.googleId,
      });
    } else if (!user.googleId) {
      user = await this.usersService.update(user.id, {
        googleId: profile.googleId,
      });
    }

    return this.stripPassword(user);
  }

  // ─── Used by LocalStrategy (still kept for passport pipeline) ─────────────
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user || !user.password) return null;
    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) return this.stripPassword(user);
    return null;
  }
}
