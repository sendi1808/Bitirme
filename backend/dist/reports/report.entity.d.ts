import { Patient } from '../patients/patient.entity';
import { CTScan } from '../ct/ct-scan.entity';
export declare class Report {
    id: string;
    patientId: string;
    imageId: string;
    csaCm2: number;
    huValue: number;
    diagnosis: string;
    notes: string;
    createdAt: Date;
    patient: Patient;
    ctScan: CTScan;
}
