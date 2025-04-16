"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async sendPasswordResetEmail(email, resetToken) {
        const resetUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:4200'}/reset-password?token=${resetToken}`;
        console.log(`[Email] Şifre sıfırlama e-postası gönderildi: ${email}, URL: ${resetUrl}`);
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
    async sendVerificationEmail(email, token) {
        const verificationUrl = `${this.configService.get('FRONTEND_URL') || 'http://localhost:4200'}/email-verification?token=${token}`;
        console.log(`[Email] Doğrulama e-postası gönderildi: ${email}, URL: ${verificationUrl}`);
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
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map