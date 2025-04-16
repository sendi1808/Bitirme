export interface Patient {
  id: number;
  tcNo: string;
  name: string;
  surname: string;
  birthDate: string;
  gender: 'Erkek' | 'Kadın';
  phone: string;
  email: string;
  address: string;
  bloodType: string;
  height?: number;
  weight?: number;
  allergies: string;
  chronicDiseases: string;
  reports: Report[];
}

export interface Report {
  id: string;
  date: Date;
  imageUrl: string;
  diagnosis: string;
} 