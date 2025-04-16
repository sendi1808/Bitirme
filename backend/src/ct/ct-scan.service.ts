import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CTScan } from './schemas/ct-scan.schema';
import { CreateCTScanDto } from './dto/create-ct-scan.dto';

@Injectable()
export class CTScanService {
  constructor(
    @InjectModel(CTScan.name) private ctScanModel: Model<CTScan>
  ) {}

  async create(createCTScanDto: CreateCTScanDto): Promise<CTScan> {
    const createdCTScan = new this.ctScanModel(createCTScanDto);
    return createdCTScan.save();
  }

  async findAllByPatient(patientId: string): Promise<CTScan[]> {
    return this.ctScanModel.find({ patientId }).exec();
  }

  async findOne(id: string): Promise<CTScan> {
    return this.ctScanModel.findById(id).exec();
  }

  async remove(id: string): Promise<CTScan> {
    return this.ctScanModel.findByIdAndDelete(id).exec();
  }
} 