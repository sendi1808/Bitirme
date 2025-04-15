import { IsString, IsNotEmpty, IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InitialLoginDto {
  @ApiProperty({ example: 'TEMP123', description: 'Geçici şifre' })
  @IsString()
  @IsNotEmpty()
  temporaryPassword: string;

  @ApiProperty({ example: 'doktor@example.com', description: 'E-posta adresi' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Yeni123!', description: 'Yeni şifre' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'Şifre en az 8 karakter uzunluğunda olmalı ve en az bir büyük harf, bir küçük harf, bir rakam ve bir özel karakter içermelidir',
  })
  newPassword: string;
} 