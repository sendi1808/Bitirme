export interface Patient {
  id: string;
  tcNo: string;
  name: string;
  surname: string;
  birthDate: Date;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodType?: string;
  height?: number;
  weight?: number;
  allergies?: string;
  chronicDiseases?: string;
  reports?: Report[];
}

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