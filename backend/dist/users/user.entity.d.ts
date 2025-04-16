import { Doctor } from '../doctors/entities/doctor.entity';
export declare class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;
    doctor: Doctor;
    createdAt: Date;
    updatedAt: Date;
}
