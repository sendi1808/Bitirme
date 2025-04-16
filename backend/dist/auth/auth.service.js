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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
const crypto = require("crypto");
let AuthService = class AuthService {
    constructor(jwtService, configService, mailService, prisma) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.prisma = prisma;
    }
    async validateUser(sicilNo, password) {
        try {
            const user = await this.prisma.doctor.findUnique({
                where: { registrationNo: sicilNo }
            });
            if (user && await bcrypt.compare(password, user.password)) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        catch (error) {
            console.error('Validate user error:', error);
            return null;
        }
    }
    async login(loginDto) {
        const { sicilNo, password } = loginDto;
        const user = await this.validateUser(sicilNo, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Geçersiz sicil numarası veya şifre');
        }
        const payload = {
            sub: user.id,
            username: user.registrationNo,
            registrationNo: user.registrationNo,
            email: user.email
        };
        return {
            token: this.jwtService.sign(payload),
            username: user.registrationNo,
            email: user.email,
            isFirstLogin: !user.isPasswordChanged,
            isEmailVerified: user.isEmailVerified
        };
    }
    async updatePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        try {
            await this.prisma.doctor.update({
                where: { id: userId },
                data: {
                    password: hashedPassword
                }
            });
            return true;
        }
        catch (error) {
            console.error('Şifre güncelleme hatası:', error);
            return false;
        }
    }
    async updateEmail(doctorId, email) {
        try {
            await this.prisma.doctor.update({
                where: { id: doctorId },
                data: {
                    email: email
                }
            });
            return true;
        }
        catch (error) {
            console.error('E-posta güncelleme hatası:', error);
            return false;
        }
    }
    async findUserByEmail(email) {
        const doctor = await this.prisma.doctor.findFirst({ where: { email } });
        if (doctor) {
            return { id: doctor.id, type: 'doctor', email: doctor.email };
        }
        const patient = await this.prisma.patient.findFirst({ where: { email } });
        if (patient) {
            return { id: patient.id, type: 'patient', email: patient.email };
        }
        const admin = await this.prisma.admin.findFirst({ where: { email } });
        if (admin) {
            return { id: admin.id, type: 'admin', email: admin.email };
        }
        return null;
    }
    async updateUserPassword(userId, userType, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        try {
            if (userType === 'doctor') {
                await this.prisma.doctor.update({
                    where: { id: userId },
                    data: {
                        password: hashedPassword
                    }
                });
            }
            else if (userType === 'patient') {
                await this.prisma.patient.update({
                    where: { id: userId },
                    data: {
                        password: hashedPassword
                    }
                });
            }
            else if (userType === 'admin') {
                await this.prisma.admin.update({
                    where: { id: userId },
                    data: {
                        password: hashedPassword
                    }
                });
            }
            return true;
        }
        catch (error) {
            console.error('Şifre güncelleme hatası:', error);
            return false;
        }
    }
    async verifyEmail(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.findUserByEmail(decoded.email);
            if (!user) {
                return false;
            }
            if (user.type === 'doctor') {
                await this.prisma.doctor.update({
                    where: { id: user.id },
                    data: {
                        isEmailVerified: true
                    }
                });
            }
            else if (user.type === 'patient') {
                await this.prisma.patient.update({
                    where: { id: user.id },
                    data: {
                        isEmailVerified: true
                    }
                });
            }
            return true;
        }
        catch (error) {
            console.error('E-posta doğrulama hatası:', error);
            return false;
        }
    }
    async updateDoctorEmail(registrationNo, email) {
        try {
            await this.prisma.doctor.update({
                where: { registrationNo },
                data: {
                    email,
                    isEmailVerified: false
                }
            });
            return true;
        }
        catch (error) {
            console.error('E-posta güncelleme hatası:', error);
            return false;
        }
    }
    async requestPasswordReset(requestPasswordResetDto) {
        const { email } = requestPasswordResetDto;
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new common_1.NotFoundException('Kullanıcı bulunamadı');
        }
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date(Date.now() + 3600000);
        await this.prisma.passwordResetToken.create({
            data: {
                token,
                expiresAt,
                userId: user.id,
                userType: user.type
            }
        });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
        await this.mailService.sendPasswordResetEmail(user.email, resetUrl);
    }
    async resetPassword(resetPasswordDto) {
        const { token, newPassword } = resetPasswordDto;
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token }
        });
        if (!resetToken || resetToken.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Geçersiz veya süresi dolmuş token');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.updateUserPassword(resetToken.userId, resetToken.userType, hashedPassword);
        await this.prisma.passwordResetToken.delete({
            where: { token }
        });
    }
    async updateCredentials(registrationNo, updateCredentialsDto) {
        const { email, newPassword } = updateCredentialsDto;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.doctor.update({
            where: { registrationNo },
            data: {
                email,
                password: hashedPassword
            }
        });
        return { success: true, message: 'Bilgiler başarıyla güncellendi' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map