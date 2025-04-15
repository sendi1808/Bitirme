import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  registrationNo: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @IsString()
  hospitalId?: string;
} 