import { Controller, Post, Body, HttpException, HttpStatus, Request, UseGuards, HttpCode, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Kullanıcı girişi' })
  @ApiResponse({ status: 200, description: 'Giriş başarılı' })
  @ApiResponse({ status: 401, description: 'Geçersiz kimlik bilgileri' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('update-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Şifre güncelleme' })
  @ApiResponse({ status: 200, description: 'Şifre başarıyla güncellendi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  async updatePassword(@Request() req, @Body('newPassword') newPassword: string) {
    try {
      const userId = req.user.sub;
      const result = await this.authService.updatePassword(userId, newPassword);
      
      return {
        success: result,
        message: result ? 'Şifre başarıyla güncellendi' : 'Şifre güncellenirken bir hata oluştu'
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify-email')
  @ApiOperation({ summary: 'E-posta doğrulama' })
  @ApiResponse({ status: 200, description: 'E-posta başarıyla doğrulandı' })
  @ApiResponse({ status: 400, description: 'Geçersiz token' })
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Body('token') token: string) {
    const result = await this.authService.verifyEmail(token);
    if (!result) {
      throw new UnauthorizedException('E-posta doğrulama başarısız');
    }
    return { message: 'E-posta başarıyla doğrulandı' };
  }

  @Post('update-credentials')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Kullanıcı bilgilerini güncelleme' })
  @ApiResponse({ status: 200, description: 'Kullanıcı bilgileri başarıyla güncellendi' })
  @ApiResponse({ status: 401, description: 'Yetkisiz erişim' })
  @HttpCode(HttpStatus.OK)
  async updateCredentials(@Body() updateCredentialsDto: UpdateCredentialsDto, @Req() req) {
    return this.authService.updateCredentials(req.user.sicilNo, updateCredentialsDto);
  }

  @Post('request-password-reset')
  @ApiOperation({ summary: 'Şifre sıfırlama isteği gönder' })
  @ApiResponse({ status: 200, description: 'Şifre sıfırlama e-postası gönderildi' })
  @ApiResponse({ status: 404, description: 'Kullanıcı bulunamadı' })
  @ApiResponse({ status: 400, description: 'Geçersiz e-posta adresi' })
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto): Promise<void> {
    await this.authService.requestPasswordReset(requestPasswordResetDto);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Şifreyi sıfırla' })
  @ApiResponse({ status: 200, description: 'Şifre başarıyla sıfırlandı' })
  @ApiResponse({ status: 400, description: 'Geçersiz veya süresi dolmuş token' })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    await this.authService.resetPassword(resetPasswordDto);
  }
} 