import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordDto {
  @IsString()
  @IsNotEmpty()
  sicilNo: string;

  @IsString()
  @IsNotEmpty()
  email: string;
} 