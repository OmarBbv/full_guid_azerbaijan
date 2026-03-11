import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('MAIL_PORT', 587),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    const fromName = this.configService.get<string>(
      'MAIL_FROM_NAME',
      'FullGuide Azerbaijan',
    );
    const fromEmail = this.configService.get<string>(
      'MAIL_USER',
      'noreply@fullguide.az',
    );

    await this.transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: email,
      subject: 'FullGuide – Giriş Kodu (OTP)',
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; background: #0f1219; border-radius: 18px; overflow: hidden; border: 1px solid rgba(255,255,255,0.07);">
          <div style="background: linear-gradient(135deg, #3b9cf5, #6f5cf6); padding: 36px 40px; text-align: center;">
            <h1 style="color: white; font-size: 26px; margin: 0; letter-spacing: -0.5px;">FullGuide Azerbaijan</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px;">Azərbaycanın ən gözəl yerinə bələdçi</p>
          </div>
          <div style="padding: 40px; text-align: center;">
            <p style="color: #9ca3af; font-size: 15px; margin: 0 0 24px;">Hesabınıza daxil olmaq üçün aşağıdakı kodu istifadə edin:</p>
            <div style="background: rgba(59,156,245,0.1); border: 2px solid rgba(59,156,245,0.3); border-radius: 14px; padding: 24px; margin: 0 auto 24px; display: inline-block;">
              <span style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #3b9cf5; font-family: monospace;">${otp}</span>
            </div>
            <p style="color: #6b7280; font-size: 13px; margin: 0;">Bu kod <strong style="color: #9ca3af;">10 dəqiqə</strong> keçərlidir.</p>
            <p style="color: #6b7280; font-size: 13px; margin: 8px 0 0;">Əgər siz bu sorğunu göndərməmisinizsə, bu emaili nəzərə almayın.</p>
          </div>
          <div style="border-top: 1px solid rgba(255,255,255,0.06); padding: 20px 40px; text-align: center;">
            <p style="color: #4b5563; font-size: 12px; margin: 0;">© 2026 FullGuide Azerbaijan. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      `,
    });

    this.logger.log(`OTP sent to ${email}`);
  }
}
