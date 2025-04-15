import { IsString, IsNotEmpty, IsEmail, IsOptional, IsDate, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @ApiProperty({ example: 'Ahmet', description: 'Hastanın adı' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Yılmaz', description: 'Hastanın soyadı' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '12345678901', description: 'T.C. Kimlik Numarası' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{11}$/, { message: 'TC Kimlik Numarası 11 haneli olmalıdır' })
  tcId: string;

  @ApiProperty({ example: '1990-01-01', description: 'Doğum tarihi' })
  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @ApiProperty({ example: 'Erkek', description: 'Cinsiyet' })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: '05551112233', description: 'Telefon numarası' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'hasta@ornek.com', description: 'E-posta adresi' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'İstanbul, Türkiye', description: 'Adres' })
  @IsString()
  @IsOptional()
  address?: string;
} 