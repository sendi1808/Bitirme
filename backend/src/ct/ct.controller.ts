import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CTService } from './ct.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiTags('CT')
@Controller('ct')
@UseGuards(JwtAuthGuard)
export class CTController {
  constructor(private readonly ctService: CTService) {}

  @Post('upload/:patientId')
  @ApiOperation({ summary: 'CT görüntüsü yükle' })
  @ApiResponse({ status: 201, description: 'Görüntü başarıyla yüklendi' })
  @ApiResponse({ status: 400, description: 'Geçersiz dosya formatı' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        patientId: {
          type: 'string',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: any,
    @Param('patientId') patientId: string
  ) {
    // Dosyayı kaydet ve DTO oluştur
    const filePath = `/uploads/ct/${patientId}/${Date.now()}-${file.originalname}`;
    
    // Dosya kaydetme işlemi (multer veya başka bir araç ile)
    // multer S3 ya da benzeri bir çözüm ile dosya kaydedilebilir
    
    const createCTScanDto = {
      patientId,
      doctorId: '1', // Bu değer JWT'den veya başka bir kaynaktan alınmalı
      scanDate: new Date().toISOString(),
      imageUrl: filePath,
      diagnosis: file.diagnosis || '',
      notes: file.notes || ''
    };
    
    return this.ctService.create(createCTScanDto);
  }

  @Get()
  findAll() {
    return this.ctService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctService.findOne(id);
  }

  @Get('patient/:patientId')
  findByPatient(@Param('patientId') patientId: string) {
    return this.ctService.findByPatientId(patientId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ctService.remove(id);
  }
} 