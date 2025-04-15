import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { CTScanService } from './ct-scan.service';
import { CreateCTScanDto } from './dto/create-ct-scan.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ct-scans')
@UseGuards(JwtAuthGuard)
export class CTScanController {
  constructor(private readonly ctScanService: CTScanService) {}

  @Post()
  create(@Body() createCTScanDto: CreateCTScanDto) {
    return this.ctScanService.create(createCTScanDto);
  }

  @Get('patient/:patientId')
  findAllByPatient(@Param('patientId') patientId: string) {
    return this.ctScanService.findAllByPatient(patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ctScanService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ctScanService.remove(id);
  }
} 