import { Controller, Post, Get, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtGuard } from './guards/jwt.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UploadAvatarDto } from './dto/upload-avatar.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  async getProfile(@Request() req: any) {
    return this.authService.getProfile(req.user.sub);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  async updateProfile(@Request() req: any, @Body() body: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.sub, body as any);
  }

  @Patch('change-password')
  @UseGuards(JwtGuard)
  async changePassword(@Request() req: any, @Body() body: ChangePasswordDto) {
    return this.authService.changePassword(req.user.sub, body.currentPassword, body.newPassword);
  }

  @Post('avatar')
  @UseGuards(JwtGuard)
  async uploadAvatar(@Request() req: any, @Body() body: UploadAvatarDto) {
    return this.authService.uploadAvatar(req.user.sub, body.filename, body.contentType, body.base64);
  }

  @Post('validate')
  async validateToken(@Body() body: { token: string }) {
    return this.authService.validateToken(body.token);
  }
}
