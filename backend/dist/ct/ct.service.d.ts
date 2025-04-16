import { CreateCTScanDto } from './dto/create-ct-scan.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class CTService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createCTScanDto: CreateCTScanDto): Promise<{
        id: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
        filePath: string;
        uploadedAt: Date;
        sliceInfo: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
        filePath: string;
        uploadedAt: Date;
        sliceInfo: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
        filePath: string;
        uploadedAt: Date;
        sliceInfo: string | null;
    }>;
    findByPatientId(patientId: string): Promise<{
        id: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
        filePath: string;
        uploadedAt: Date;
        sliceInfo: string | null;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        patientId: string;
        createdAt: Date;
        updatedAt: Date;
        filePath: string;
        uploadedAt: Date;
        sliceInfo: string | null;
    }>;
}
