import { Repository } from 'typeorm';
import { Imaging } from './entities/imaging.entity';
import { CreateImagingDto } from './dto/create-imaging.dto';
import { UpdateImagingDto } from './dto/update-imaging.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';
export declare class ImagingService {
    private imagingRepository;
    constructor(imagingRepository: Repository<Imaging>);
    create(createImagingDto: CreateImagingDto): Promise<Imaging>;
    findAll(): Promise<Imaging[]>;
    findPendingDiagnosis(): Promise<Imaging[]>;
    findOne(id: string): Promise<Imaging>;
    update(id: string, updateImagingDto: UpdateImagingDto): Promise<Imaging>;
    updateDiagnosis(id: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<Imaging>;
    remove(id: string): Promise<void>;
    generateReport(imaging: Imaging): Promise<Buffer>;
}
