import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) {
    return this.prisma.report.create({
      data: {
        ...createReportDto,
        date: new Date()
      }
    });
  }

  async findAll() {
    return this.prisma.report.findMany({
      include: {
        patient: true,
        doctor: true,
        ctScan: true
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.report.findUnique({
      where: { id },
      include: {
        patient: true,
        doctor: true,
        ctScan: true
      }
    });
  }

  async findByPatient(patientId: string) {
    return this.prisma.report.findMany({
      where: { patientId },
      include: {
        patient: true,
        doctor: true,
        ctScan: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.report.delete({
      where: { id }
    });
  }
} 