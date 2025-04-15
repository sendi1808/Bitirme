import { Response } from 'express';
import { ImagingService } from './imaging.service';
import { CreateImagingDto } from './dto/create-imaging.dto';
import { UpdateImagingDto } from './dto/update-imaging.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
export declare class ImagingController {
    private readonly imagingService;
    constructor(imagingService: ImagingService);
    create(createImagingDto: CreateImagingDto): Promise<import("./entities/imaging.entity").Imaging>;
    findAll(): Promise<import("./entities/imaging.entity").Imaging[]>;
    findPendingDiagnosis(): Promise<import("./entities/imaging.entity").Imaging[]>;
    findByPatient(patientId: string): Promise<import("./entities/imaging.entity").Imaging[]>;
    findOne(id: string): Promise<import("./entities/imaging.entity").Imaging>;
    update(id: string, updateImagingDto: UpdateImagingDto): Promise<import("./entities/imaging.entity").Imaging>;
    updateDiagnosis(id: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<import("./entities/imaging.entity").Imaging>;
    remove(id: string): Promise<void>;
    generateReport(id: string, res: Response): Promise<void>;
}
