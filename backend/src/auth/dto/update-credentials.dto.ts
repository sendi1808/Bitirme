import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCredentialsDto {
  @ApiProperty({
    description: 'Doktorun e-posta adresi',
    example: 'doktor@example.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Doktorun yeni şifresi',
    example: 'yeniSifre123!'
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
} 