import { User } from '../../users/entities/user.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
export declare class Patient {
    id: string;
    tcId: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    gender: string;
    phone: string;
    email: string;
    address: string;
    bloodType: string;
    height: number;
    weight: number;
    allergies: string;
    chronicDiseases: string;
    user: User;
    doctor: Doctor;
}
