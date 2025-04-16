import { User } from '../../users/entities/user.entity';
export declare class Doctor {
    id: string;
    registrationNo: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isEmailVerified: boolean;
    isPasswordChanged: boolean;
    user: User;
}
