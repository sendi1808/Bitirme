import { Module } from '@nestjs/common';
import { CTService } from './ct.service';
import { CTController } from './ct.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    PrismaModule
  ],
  controllers: [CTController],
  providers: [CTService],
  exports: [CTService]
})
export class CTModule {} 