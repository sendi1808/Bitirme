import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:4200'}/reset-password?token=${resetToken}`;

    console.log(`[Email] Şifre sıfırlama e-postası gönderildi: ${email}, URL: ${resetUrl}`);

    // Geliştirme ortamında gerçekten e-posta göndermeyi pas geçebiliriz
    if (this.configService.get('NODE_ENV') === 'production') {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Şifre Sıfırlama',
        html: `
          <h1>Şifre Sıfırlama İsteği</h1>
          <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
          <a href="${resetUrl}">Şifremi Sıfırla</a>
          <p>Bu bağlantı 1 saat sonra geçerliliğini yitirecektir.</p>
        `,
      });
    }
  }

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:4200'}/email-verification?token=${token}`;

    console.log(`[Email] Doğrulama e-postası gönderildi: ${email}, URL: ${verificationUrl}`);

    // Geliştirme ortamında gerçekten e-posta göndermeyi pas geçebiliriz
    if (this.configService.get('NODE_ENV') === 'production') {
      await this.mailerService.sendMail({
        to: email,
        subject: 'E-posta Adresinizi Doğrulayın',
        html: `
          <h1>Hoş Geldiniz!</h1>
          <p>E-posta adresinizi doğrulamak için aşağıdaki bağlantıya tıklayın:</p>
          <a href="${verificationUrl}" style="
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
          ">E-posta Adresimi Doğrula</a>
          <p>Bu bağlantı 24 saat içinde geçerliliğini yitirecektir.</p>
          <p>Eğer bu işlemi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın.</p>
        `,
      });
    }
  }
} 