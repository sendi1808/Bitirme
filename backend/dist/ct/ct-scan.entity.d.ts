import { Patient } from '../patients/entities/patient.entity';
export declare class CTScan {
    id: string;
    patientId: string;
    patient: Patient;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    diagnosis: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
