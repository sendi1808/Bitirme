import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CTScanController } from './ct-scan.controller';
import { CTScanService } from './ct-scan.service';
import { CTScan, CTScanSchema } from './schemas/ct-scan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CTScan.name, schema: CTScanSchema }])
  ],
  controllers: [CTScanController],
  providers: [CTScanService],
  exports: [CTScanService]
})
export class CTScanModule {} 