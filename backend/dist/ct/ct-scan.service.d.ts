import { Model } from 'mongoose';
import { CTScan } from './schemas/ct-scan.schema';
import { CreateCTScanDto } from './dto/create-ct-scan.dto';
export declare class CTScanService {
    private ctScanModel;
    constructor(ctScanModel: Model<CTScan>);
    create(createCTScanDto: CreateCTScanDto): Promise<CTScan>;
    findAllByPatient(patientId: string): Promise<CTScan[]>;
    findOne(id: string): Promise<CTScan>;
    remove(id: string): Promise<CTScan>;
}
