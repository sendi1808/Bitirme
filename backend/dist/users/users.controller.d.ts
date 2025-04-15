import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, updateUserDto: UpdateUserDto): any;
    remove(id: string): any;
}
