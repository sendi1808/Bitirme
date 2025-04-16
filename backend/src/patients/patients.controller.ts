import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('patients')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni hasta oluştur' })
  @ApiResponse({ status: 201, description: 'Hasta başarıyla oluşturuldu.' })
  @ApiResponse({ status: 400, description: 'Geçersiz giriş verileri' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Tüm hastaları listele' })
  @ApiResponse({ status: 200, description: 'Hastaların listesi başarıyla alındı.' })
  findAll() {
    return this.patientsService.findAll();
  }

  @Get('tc/:tcId')
  @ApiOperation({ summary: 'TC Kimlik Numarasına göre hasta bul' })
  @ApiResponse({ status: 200, description: 'Hasta başarıyla bulundu.' })
  @ApiResponse({ status: 404, description: 'Hasta bulunamadı' })
  findByTcId(@Param('tcId') tcId: string) {
    return this.patientsService.findByTcId(tcId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID ile hasta bul' })
  @ApiResponse({ status: 200, description: 'Hasta başarıyla bulundu.' })
  @ApiResponse({ status: 404, description: 'Hasta bulunamadı' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Hastayı güncelle' })
  @ApiResponse({ status: 200, description: 'Hasta başarıyla güncellendi.' })
  @ApiResponse({ status: 404, description: 'Hasta bulunamadı' })
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hastayı sil' })
  @ApiResponse({ status: 200, description: 'Hasta başarıyla silindi.' })
  @ApiResponse({ status: 404, description: 'Hasta bulunamadı' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(id);
  }
}
