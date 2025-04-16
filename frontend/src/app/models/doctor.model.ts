export interface Doctor {
  id: number;
  name: string;
  surname: string;
  tcNo: string;
  sicilNo: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  isPasswordChanged: boolean;
  specialty: string;
  phone: string;
  address: string;
} 