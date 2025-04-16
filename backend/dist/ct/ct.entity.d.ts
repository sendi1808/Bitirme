import { Patient } from '../patients/patient.entity';
export declare class CT {
    ctId: string;
    date: Date;
    filePath: string;
    fileFormat: string;
    patientAge: number;
    patient: Patient;
    createdAt: Date;
    updatedAt: Date;
}
