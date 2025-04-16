import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async createPasswordResetToken(data: { token: string; expiresAt: Date; userId: string; userType: string }) {
    return this.passwordResetToken.create({ data });
  }

  async findPasswordResetToken(token: string) {
    return this.passwordResetToken.findUnique({ where: { token } });
  }

  async deletePasswordResetToken(token: string) {
    await this.passwordResetToken.delete({ where: { token } });
  }
} 