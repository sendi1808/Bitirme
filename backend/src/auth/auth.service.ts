import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { Doctor, Patient, Admin, Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    private prisma: PrismaService
  ) {}

  async validateUser(sicilNo: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.doctor.findUnique({
        where: { registrationNo: sicilNo }
      });

      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      console.error('Validate user error:', error);
      return null;
    }
  }

  async login(loginDto: LoginDto) {
    const { sicilNo, password } = loginDto;
    const user = await this.validateUser(sicilNo, password);

    if (!user) {
      throw new UnauthorizedException('Geçersiz sicil numarası veya şifre');
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

  async updatePassword(userId: string, newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    try {
      await this.prisma.doctor.update({
        where: { id: userId },
        data: {
          password: hashedPassword
        }
      });
      return true;
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      return false;
    }
  }

  async updateEmail(doctorId: string, email: string): Promise<boolean> {
    try {
      await this.prisma.doctor.update({
        where: { id: doctorId },
        data: {
          email: email
        }
      });
      return true;
    } catch (error) {
      console.error('E-posta güncelleme hatası:', error);
      return false;
    }
  }

  async findUserByEmail(email: string): Promise<{ id: string; type: 'doctor' | 'patient' | 'admin'; email: string } | null> {
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

  async updateUserPassword(userId: string, userType: 'doctor' | 'patient' | 'admin', newPassword: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
      if (userType === 'doctor') {
        await this.prisma.doctor.update({
          where: { id: userId },
          data: {
            password: hashedPassword
          }
        });
      } else if (userType === 'patient') {
        // Patient modelinde artık doğrudan password alanı var
        await this.prisma.patient.update({
          where: { id: userId },
          data: {
            password: hashedPassword
          }
        });
      } else if (userType === 'admin') {
        await this.prisma.admin.update({
          where: { id: userId },
          data: {
            password: hashedPassword
          }
        });
      }
      return true;
    } catch (error) {
      console.error('Şifre güncelleme hatası:', error);
      return false;
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
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
      } else if (user.type === 'patient') {
        // Patient modelinde artık doğrudan isEmailVerified alanı var
        await this.prisma.patient.update({
          where: { id: user.id },
          data: {
            isEmailVerified: true
          }
        });
      }

      return true;
    } catch (error) {
      console.error('E-posta doğrulama hatası:', error);
      return false;
    }
  }

  async updateDoctorEmail(registrationNo: string, email: string): Promise<boolean> {
    try {
      await this.prisma.doctor.update({
        where: { registrationNo },
        data: {
          email,
          isEmailVerified: false
        }
      });
      return true;
    } catch (error) {
      console.error('E-posta güncelleme hatası:', error);
      return false;
    }
  }

  async requestPasswordReset(requestPasswordResetDto: RequestPasswordResetDto): Promise<void> {
    const { email } = requestPasswordResetDto;
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 saat

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

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      throw new BadRequestException('Geçersiz veya süresi dolmuş token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.updateUserPassword(resetToken.userId, resetToken.userType as 'doctor' | 'patient' | 'admin', hashedPassword);
    await this.prisma.passwordResetToken.delete({
      where: { token }
    });
  }

  async updateCredentials(registrationNo: string, updateCredentialsDto: UpdateCredentialsDto): Promise<any> {
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
} 