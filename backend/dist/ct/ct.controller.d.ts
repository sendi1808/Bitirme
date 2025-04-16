import { CTService } from './ct.service';
export declare class CTController {
    private readonly ctService;
    constructor(ctService: CTService);
    uploadFile(file: any, patientId: string): Promise<{
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
    findByPatient(patientId: string): Promise<{
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
