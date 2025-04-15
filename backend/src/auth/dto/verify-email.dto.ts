import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ description: 'E-posta doğrulama token' })
  @IsString()
  @IsNotEmpty()
  token: string;
} 