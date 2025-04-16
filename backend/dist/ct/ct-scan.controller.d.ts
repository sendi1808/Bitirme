import { CTScanService } from './ct-scan.service';
import { CreateCTScanDto } from './dto/create-ct-scan.dto';
export declare class CTScanController {
    private readonly ctScanService;
    constructor(ctScanService: CTScanService);
    create(createCTScanDto: CreateCTScanDto): Promise<import("./schemas/ct-scan.schema").CTScan>;
    findAllByPatient(patientId: string): Promise<import("./schemas/ct-scan.schema").CTScan[]>;
    findOne(id: string): Promise<import("./schemas/ct-scan.schema").CTScan>;
    remove(id: string): Promise<import("./schemas/ct-scan.schema").CTScan>;
}
