import { Patient } from '../../patients/entities/patient.entity';
import { CTScan } from '../../ct/ct-scan.entity';
export declare class Report {
    id: string;
    patientId: string;
    patient: Patient;
    ctScanId: string;
    ctScan: CTScan;
    date: Date;
    diagnosis: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}
