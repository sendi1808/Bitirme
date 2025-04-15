import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    createPasswordResetToken(data: {
        token: string;
        expiresAt: Date;
        userId: string;
        userType: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        userId: string;
        userType: string;
    }>;
    findPasswordResetToken(token: string): Promise<{
        id: string;
        createdAt: Date;
        token: string;
        expiresAt: Date;
        userId: string;
        userType: string;
    }>;
    deletePasswordResetToken(token: string): Promise<void>;
}
