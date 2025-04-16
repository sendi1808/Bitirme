export interface Report {
  id: number;
  patientId: number;
  doctorId: number;
  reportDate: Date;
  diagnosis: string;
  notes: string;
  imageUrl?: string;
} 