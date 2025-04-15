import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    create(createReportDto: CreateReportDto): Promise<{
        date: Date;
        id: string;
        patientId: string;
        imageUrl: string;
        diagnosis: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        ctScanId: string | null;
    }>;
    findAll(): Promise<({
        patient: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            height: number | null;
            name: string;
            email: string | null;
            password: string | null;
            userId: string;
            surname: string;
            isEmailVerified: boolean;
            tcNo: string;
            birthDate: Date;
            gender: string;
            phone: string;
            address: string;
            bloodType: string | null;
            weight: number | null;
            allergies: string | null;
            chronicDiseases: string | null;
        };
        doctor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            password: string;
            userId: string;
            surname: string;
            registrationNo: string;
            hospital: string;
            isEmailVerified: boolean;
            isPasswordChanged: boolean;
        };
        ctScan: {
            id: string;
            patientId: string;
            createdAt: Date;
            updatedAt: Date;
            filePath: string;
            uploadedAt: Date;
            sliceInfo: string | null;
        };
    } & {
        date: Date;
        id: string;
        patientId: string;
        imageUrl: string;
        diagnosis: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        ctScanId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        patient: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            height: number | null;
            name: string;
            email: string | null;
            password: string | null;
            userId: string;
            surname: string;
            isEmailVerified: boolean;
            tcNo: string;
            birthDate: Date;
            gender: string;
            phone: string;
            address: string;
            bloodType: string | null;
            weight: number | null;
            allergies: string | null;
            chronicDiseases: string | null;
        };
        doctor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            password: string;
            userId: string;
            surname: string;
            registrationNo: string;
            hospital: string;
            isEmailVerified: boolean;
            isPasswordChanged: boolean;
        };
        ctScan: {
            id: string;
            patientId: string;
            createdAt: Date;
            updatedAt: Date;
            filePath: string;
            uploadedAt: Date;
            sliceInfo: string | null;
        };
    } & {
        date: Date;
        id: string;
        patientId: string;
        imageUrl: string;
        diagnosis: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        ctScanId: string | null;
    }>;
    findByPatient(patientId: string): Promise<({
        patient: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            doctorId: string;
            height: number | null;
            name: string;
            email: string | null;
            password: string | null;
            userId: string;
            surname: string;
            isEmailVerified: boolean;
            tcNo: string;
            birthDate: Date;
            gender: string;
            phone: string;
            address: string;
            bloodType: string | null;
            weight: number | null;
            allergies: string | null;
            chronicDiseases: string | null;
        };
        doctor: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string | null;
            password: string;
            userId: string;
            surname: string;
            registrationNo: string;
            hospital: string;
            isEmailVerified: boolean;
            isPasswordChanged: boolean;
        };
        ctScan: {
            id: string;
            patientId: string;
            createdAt: Date;
            updatedAt: Date;
            filePath: string;
            uploadedAt: Date;
            sliceInfo: string | null;
        };
    } & {
        date: Date;
        id: string;
        patientId: string;
        imageUrl: string;
        diagnosis: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        ctScanId: string | null;
    })[]>;
    remove(id: string): Promise<{
        date: Date;
        id: string;
        patientId: string;
        imageUrl: string;
        diagnosis: string;
        createdAt: Date;
        updatedAt: Date;
        doctorId: string;
        ctScanId: string | null;
    }>;
}
