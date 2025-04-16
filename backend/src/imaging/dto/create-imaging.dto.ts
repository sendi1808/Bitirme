import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, IsBoolean, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum ImageType {
  XRay = 'XRay',
  MRI = 'MRI',
  CT = 'CT',
  Other = 'Other',
}

export class CreateImagingDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Hasta ID' })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: 'https://example.com/image.jpg', description: 'Görüntü URL' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ example: 'XRay', enum: ImageType, description: 'Görüntü tipi' })
  @IsEnum(ImageType)
  @IsNotEmpty()
  imageType: ImageType;

  @ApiProperty({ example: 'Lomber disk hernisi L4-L5', description: 'Tanı', required: false })
  @IsString()
  @IsOptional()
  diagnosis?: string;

  @ApiProperty({ required: false, description: 'Tanı tarihi' })
  @IsDate()
  @IsOptional()
  diagnosisDate?: Date;

  @ApiProperty({ example: false, description: 'Tanı konuldu mu?' })
  @IsBoolean()
  @IsOptional()
  isDiagnosed?: boolean;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000', description: 'Doktor ID', required: false })
  @IsUUID()
  @IsOptional()
  doctorId?: string;

  @ApiProperty({ example: 'Hasta şiddetli bel ağrısı şikayeti ile başvurdu', description: 'Notlar', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
} 