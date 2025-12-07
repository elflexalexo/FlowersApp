import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UploadAvatarDto } from './dto/upload-avatar.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<any>;
    login(loginDto: LoginDto): Promise<any>;
    getProfile(req: any): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        phone: any;
        createdAt: any;
    }>;
    updateProfile(req: any, body: UpdateProfileDto): Promise<{
        id: any;
        email: any;
        firstName: any;
        lastName: any;
        phone: any;
        createdAt: any;
    }>;
    changePassword(req: any, body: ChangePasswordDto): Promise<{
        success: boolean;
    }>;
    uploadAvatar(req: any, body: UploadAvatarDto): Promise<{
        path: string;
        publicUrl: string | null;
    }>;
    validateToken(body: {
        token: string;
    }): Promise<any>;
}
//# sourceMappingURL=auth.controller.d.ts.map