import { JwtService } from '@nestjs/jwt';
declare const JwtGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtGuard extends JwtGuard_base {
    private jwtService;
    constructor(jwtService: JwtService);
    canActivate(context: any): boolean;
}
export {};
//# sourceMappingURL=jwt.guard.d.ts.map