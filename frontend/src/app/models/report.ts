export interface Report {
  id: string;
  patientId: string;
  date: Date;
  diagnosis: string;
  imageUrl: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
} 