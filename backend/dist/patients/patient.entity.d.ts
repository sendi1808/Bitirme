import { CT } from '../ct/ct.entity';
import { Report } from '../reports/report.entity';
export declare class Patient {
    patientId: string;
    firstName: string;
    lastName: string;
    gender: string;
    weight: number;
    height: number;
    birthday: Date;
    identificationNumber: string;
    cts: CT[];
    reports: Report[];
    createdAt: Date;
    updatedAt: Date;
}
