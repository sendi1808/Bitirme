declare enum ImageType {
    XRay = "XRay",
    MRI = "MRI",
    CT = "CT",
    Other = "Other"
}
export declare class CreateImagingDto {
    patientId: string;
    imageUrl: string;
    imageType: ImageType;
    diagnosis?: string;
    diagnosisDate?: Date;
    isDiagnosed?: boolean;
    doctorId?: string;
    notes?: string;
}
export {};
