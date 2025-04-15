export declare enum UserRole {
    ADMIN = "admin",
    DOCTOR = "doctor",
    PATIENT = "patient"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    isEmailVerified: boolean;
    isPasswordChanged: boolean;
    firstName: string;
    lastName: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
    sicilNo: string;
}
