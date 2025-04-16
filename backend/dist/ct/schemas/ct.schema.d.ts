import { Document } from 'mongoose';
export type CTScanDocument = CTScan & Document;
export declare class CTScan {
    patientId: string;
    fileName: string;
    filePath: string;
    fileSize: number;
    fileType: string;
    sliceInfo?: {
        width: number;
        height: number;
        depth: number;
        spacing: number[];
        origin: number[];
        direction: number[];
    };
}
export declare const CTScanSchema: import("mongoose").Schema<CTScan, import("mongoose").Model<CTScan, any, any, any, Document<unknown, any, CTScan> & CTScan & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CTScan, Document<unknown, {}, import("mongoose").FlatRecord<CTScan>> & import("mongoose").FlatRecord<CTScan> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
