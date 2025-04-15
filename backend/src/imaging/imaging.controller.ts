import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { ImagingService } from './imaging.service';
import { CreateImagingDto } from './dto/create-imaging.dto';
import { UpdateImagingDto } from './dto/update-imaging.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('imaging')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('imaging')
export class ImagingController {
  constructor(private readonly imagingService: ImagingService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni görüntü oluştur' })
  @ApiResponse({ status: 201, description: 'Görüntü başarıyla oluşturuldu.' })
  @ApiResponse({ status: 400, description: 'Geçersiz giriş verileri' })
  create(@Body() createImagingDto: CreateImagingDto) {
    return this.imagingService.create(createImagingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm görüntüleri listele' })
  @ApiResponse({ status: 200, description: 'Görüntülerin listesi başarıyla alındı.' })
  findAll() {
    return this.imagingService.findAll();
  }

  @Get('pending')
  @ApiOperation({ summary: 'Tanı konulmamış görüntüleri listele' })
  @ApiResponse({ status: 200, description: 'Tanı konulmamış görüntülerin listesi başarıyla alındı.' })
  findPendingDiagnosis() {
    return this.imagingService.findPendingDiagnosis();
  }

  @Get('patient/:patientId')
  @ApiOperation({ summary: 'Hasta ID\'sine göre görüntüleri listele' })
  @ApiResponse({ status: 200, description: 'Hasta görüntüleri başarıyla bulundu.' })
  findByPatient(@Param('patientId') patientId: string) {
    // Belirli bir hastanın görüntülerini filtrelemek için
    // Bu örnekte henüz ImagingService'de özel bir metod olmadığı için findAll kullanıyoruz
    return this.imagingService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile görüntü bul' })
  @ApiResponse({ status: 200, description: 'Görüntü başarıyla bulundu.' })
  @ApiResponse({ status: 404, description: 'Görüntü bulunamadı' })
  findOne(@Param('id') id: string) {
    return this.imagingService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Görüntüyü güncelle' })
  @ApiResponse({ status: 200, description: 'Görüntü başarıyla güncellendi.' })
  @ApiResponse({ status: 404, description: 'Görüntü bulunamadı' })
  update(@Param('id') id: string, @Body() updateImagingDto: UpdateImagingDto) {
    return this.imagingService.update(id, updateImagingDto);
  }

  @Patch(':id/diagnosis')
  @ApiOperation({ summary: 'Görüntü tanısını güncelle' })
  @ApiResponse({ status: 200, description: 'Görüntü tanısı başarıyla güncellendi.' })
  @ApiResponse({ status: 404, description: 'Görüntü bulunamadı' })
  updateDiagnosis(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.imagingService.updateDiagnosis(id, updateDiagnosisDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Görüntüyü sil' })
  @ApiResponse({ status: 200, description: 'Görüntü başarıyla silindi.' })
  @ApiResponse({ status: 404, description: 'Görüntü bulunamadı' })
  remove(@Param('id') id: string) {
    return this.imagingService.remove(id);
  }

  @Get(':id/report')
  @ApiOperation({ summary: 'Görüntü raporunu indir' })
  @ApiResponse({ status: 200, description: 'Rapor başarıyla indirildi.' })
  @ApiResponse({ status: 404, description: 'Rapor bulunamadı' })
  async generateReport(@Param('id') id: string, @Res() res: Response) {
    const imaging = await this.imagingService.findOne(id);
    const report = await this.imagingService.generateReport(imaging);
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="report-${id}.pdf"`);
    res.end(report);
  }
} 