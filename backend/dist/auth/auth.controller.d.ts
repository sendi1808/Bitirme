import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        token: string;
        username: any;
        email: any;
        isFirstLogin: boolean;
        isEmailVerified: any;
    }>;
    updatePassword(req: any, newPassword: string): Promise<{
        success: boolean;
        message: string;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    updateCredentials(updateCredentialsDto: UpdateCredentialsDto, req: any): Promise<any>;
    requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
}
