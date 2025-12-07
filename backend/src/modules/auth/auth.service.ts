import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SupabaseService } from '../../services/supabase.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private supabaseService: SupabaseService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, firstName, lastName } = registerDto;

    // Check if user already exists
    const supabase = this.supabaseService.getClient();
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    // If no error and user exists, throw duplicate error
    if (!checkError && existingUser) {
      throw new BadRequestException('This email is already registered. Please login instead.');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const { data: newUser, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          first_name: firstName,
          last_name: lastName,
        },
      ])
      .select()
      .single();

    if (error) {
      // Check if it's a unique constraint error
      if (error.code === '23505' || error.message.includes('duplicate')) {
        throw new BadRequestException('This email is already registered. Please login instead.');
      }
      throw new BadRequestException('Failed to create user. Please try again.');
    }

    // Generate token
    const token = this.jwtService.sign({
      sub: newUser.id,
      email: newUser.email,
    });

    return {
      accessToken: token,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    // Find user
    const supabase = this.supabaseService.getClient();
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate token
    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  async validateToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async getProfile(userId: string) {
    const supabase = this.supabaseService.getClient();
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, first_name, last_name, phone, created_at')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      createdAt: user.created_at,
    };
  }

  async updateProfile(userId: string, payload: { firstName?: string; lastName?: string; phone?: string; }) {
    const supabase = this.supabaseService.getClient();

    const updateObj: any = {};
    if (payload.firstName !== undefined) updateObj.first_name = payload.firstName;
    if (payload.lastName !== undefined) updateObj.last_name = payload.lastName;
    if (payload.phone !== undefined) updateObj.phone = payload.phone;

    if (Object.keys(updateObj).length === 0) {
      // Nothing to update
      return this.getProfile(userId);
    }

    const { data: updated, error } = await supabase
      .from('users')
      .update(updateObj)
      .eq('id', userId)
      .select('id, email, first_name, last_name, phone, created_at')
      .single();

    if (error || !updated) {
      throw new BadRequestException('Failed to update profile');
    }

    return {
      id: updated.id,
      email: updated.email,
      firstName: updated.first_name,
      lastName: updated.last_name,
      phone: updated.phone,
      createdAt: updated.created_at,
    };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const supabase = this.supabaseService.getClient();

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      throw new UnauthorizedException('User not found');
    }

    const isValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const newHash = await bcrypt.hash(newPassword, 10);

    const { data: updated, error: updateError } = await supabase
      .from('users')
      .update({ password_hash: newHash })
      .eq('id', userId);

    if (updateError) {
      throw new BadRequestException('Failed to change password');
    }

    return { success: true };
  }

  async uploadAvatar(userId: string, filename: string, contentType: string, base64: string) {
    const supabase = this.supabaseService.getClient();

    // Decode base64
    const buffer = Buffer.from(base64, 'base64');
    const timestamp = Date.now();
    const path = `${userId}/${timestamp}-${filename}`;

    // Upload to Supabase Storage (bucket: avatars)
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, buffer, { contentType, upsert: true });

    if (uploadError) {
      throw new BadRequestException('Failed to upload avatar');
    }

    // Get public URL (may depend on bucket privacy)
    const { data: publicData } = await supabase.storage
      .from('avatars')
      .getPublicUrl(path);

    const publicUrl = publicData?.publicUrl || null;

    // Try to save avatar URL to user record (non-fatal if column absent)
    try {
      await supabase.from('users').update({ avatar_url: publicUrl }).eq('id', userId);
    } catch (err) {
      // ignore
    }

    return { path, publicUrl };
  }
}
