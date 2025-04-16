import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Şifre sıfırlama tokenı' })
  @IsString()
  token: string;

  @ApiProperty({ description: 'Yeni şifre', example: 'YeniSifre123' })
  @IsString()
  @MinLength(8, { message: 'Şifre en az 8 karakter olmalıdır' })
  newPassword: string;
} 