import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
export declare class AuthService {
    private jwtService;
    private configService;
    private mailService;
    private prisma;
    constructor(jwtService: JwtService, configService: ConfigService, mailService: MailService, prisma: PrismaService);
    validateUser(sicilNo: string, password: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        username: any;
        email: any;
        isFirstLogin: boolean;
        isEmailVerified: any;
    }>;
    updatePassword(userId: string, newPassword: string): Promise<boolean>;
    updateEmail(doctorId: string, email: string): Promise<boolean>;
    findUserByEmail(email: string): Promise<{
        id: string;
        type: 'doctor' | 'patient' | 'admin';
        email: string;
    } | null>;
    updateUserPassword(userId: string, userType: 'doctor' | 'patient' | 'admin', newPassword: string): Promise<boolean>;
    verifyEmail(token: string): Promise<boolean>;
    updateDoctorEmail(registrationNo: string, email: string): Promise<boolean>;
    requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    updateCredentials(registrationNo: string, updateCredentialsDto: UpdateCredentialsDto): Promise<any>;
}
