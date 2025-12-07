import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private jwtService;
    private supabaseService;
    constructor(jwtService: JwtService, supabaseService: SupabaseService);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    validateToken(token: string): Promise<any>;
    getProfile(userId: string): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        phone: any;
        createdAt: any;
    }>;
    updateProfile(userId: string, payload: {
        firstName?: string;
        lastName?: string;
        phone?: string;
    }): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        phone: any;
        createdAt: any;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        success: boolean;
    }>;
    uploadAvatar(userId: string, filename: string, contentType: string, base64: string): Promise<{
        path: string;
        publicUrl: string | null;
    }>;
}
export {};
//# sourceMappingURL=auth.service.d.ts.map