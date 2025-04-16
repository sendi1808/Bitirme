import { IsString, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestPasswordResetDto {
  @ApiProperty({ description: 'Sicil numarası', example: '12345678901' })
  @IsString()
  @Length(11, 11, { message: 'Sicil numarası 11 haneli olmalıdır' })
  sicilNo: string;

  @ApiProperty({ description: 'E-posta adresi', example: 'doktor@example.com' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz' })
  email: string;
} 