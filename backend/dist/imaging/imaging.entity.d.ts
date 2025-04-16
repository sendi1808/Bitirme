import { Patient } from '../patients/patient.entity';
export declare class Imaging {
    id: string;
    patientId: string;
    patient: Patient;
    imageUrl: string;
    diagnosis: string;
    diagnosisDate: Date;
    isDiagnosed: boolean;
    doctorId: string;
    notes: string;
    imageType: string;
    createdAt: Date;
    updatedAt: Date;
}
