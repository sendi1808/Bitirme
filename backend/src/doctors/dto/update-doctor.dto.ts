import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  registrationNo?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  hospitalId?: string;
} 