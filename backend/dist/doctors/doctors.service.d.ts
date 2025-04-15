import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
export declare class DoctorsService {
    private doctorsRepository;
    constructor(doctorsRepository: Repository<Doctor>);
    findByRegistrationNo(registrationNo: string): Promise<Doctor>;
    findByEmail(email: string): Promise<Doctor>;
    update(id: string, updateData: Partial<Doctor>): Promise<Doctor>;
    findOne(id: string): Promise<Doctor>;
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(): Promise<Doctor[]>;
    remove(id: string): Promise<void>;
}
