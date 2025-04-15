import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendPasswordResetEmail(email: string, resetToken: string): Promise<void>;
    sendVerificationEmail(email: string, token: string): Promise<void>;
}
