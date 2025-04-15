import { Patient } from '../../patients/entities/patient.entity';
export declare class Imaging {
    id: string;
    patientId: string;
    patient: Patient;
    date: Date;
    type: string;
    imageUrl: string;
    diagnosis: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
