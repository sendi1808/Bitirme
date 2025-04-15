import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private users;
    create(createUserDto: CreateUserDto): {
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        role: string;
        sicilNo: string;
        id: string;
    };
    findAll(): any[];
    findOne(id: string): any;
    findByEmail(email: string): any;
    update(id: string, updateUserDto: UpdateUserDto): any;
    remove(id: string): any;
    updatePassword(id: string, password: string): any;
}
