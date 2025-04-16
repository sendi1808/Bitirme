import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: '12345678901', description: 'Sicil Numarası' })
  @IsString()
  @IsNotEmpty()
  sicilNo: string;

  @ApiProperty({ example: 'test123', description: 'Kullanıcı parolası' })
  @IsString()
  @IsNotEmpty()
  password: string;
} 