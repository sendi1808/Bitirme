import { Injectable } from '@nestjs/common';
import { CreateCTScanDto } from './dto/create-ct-scan.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CTService {
  constructor(
    private prisma: PrismaService
  ) {}

  async create(createCTScanDto: CreateCTScanDto) {
    return this.prisma.cTScan.create({
      data: {
        filePath: createCTScanDto.imageUrl,
        patient: {
          connect: { id: createCTScanDto.patientId }
        },
        sliceInfo: '{}', // Default empty JSON
        uploadedAt: new Date(),
      }
    });
  }

  async findAll() {
    return this.prisma.cTScan.findMany();
  }

  async findOne(id: string) {
    return this.prisma.cTScan.findUnique({
      where: { id }
    });
  }

  async findByPatientId(patientId: string) {
    return this.prisma.cTScan.findMany({
      where: { patientId }
    });
  }

  async remove(id: string) {
    return this.prisma.cTScan.delete({
      where: { id }
    });
  }
} 