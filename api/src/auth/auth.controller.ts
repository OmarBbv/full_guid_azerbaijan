import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ─── Register (creates user + sends OTP) ─────────────────────────────────
  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  // ─── Step 1: validate credentials → send OTP ─────────────────────────────
  @Post('login/request-otp')
  async requestOtp(@Body() body: { email: string; password: string }) {
    return this.authService.requestOtp(body.email, body.password);
  }

  // ─── Step 2: submit OTP → receive JWT ─────────────────────────────────────
  @Post('login/verify-otp')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyOtp(body.email, body.otp);
  }

  // ─── Admin direct login (no OTP) ──────────────────────────────────────────
  @Post('admin/login')
  async adminLogin(@Body() body: { email: string; password: string }) {
    return this.authService.adminLogin(body.email, body.password);
  }

  // ─── Profile (JWT protected) ──────────────────────────────────────────────
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  // ─── Google OAuth ─────────────────────────────────────────────────────────
  @UseGuards(GoogleOAuthGuard)
  @Get('google')
  async googleAuth() {
    // Guard redirects to Google
  }

  @UseGuards(GoogleOAuthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const authResult = await this.authService.login(req.user);
    return res.redirect(
      `http://localhost:3333/az/login?token=${authResult.access_token}`,
    );
  }
}
