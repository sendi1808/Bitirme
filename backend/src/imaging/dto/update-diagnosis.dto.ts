import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDiagnosisDto {
  @ApiProperty({ example: 'Lomber disk hernisi L4-L5', description: 'Tanı' })
  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @ApiProperty({ description: 'Tanı tarihi' })
  @IsDate()
  @IsOptional()
  diagnosisDate?: Date;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Doktor ID' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({ example: 'Hasta şiddetli bel ağrısı şikayeti ile başvurdu', description: 'Notlar', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
} 