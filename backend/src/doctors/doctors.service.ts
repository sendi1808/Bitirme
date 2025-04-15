import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>
  ) {}

  async findByRegistrationNo(registrationNo: string): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { registrationNo } });
  }

  async findByEmail(email: string): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { email } });
  }

  async update(id: string, updateData: Partial<Doctor>): Promise<Doctor> {
    await this.doctorsRepository.update(id, updateData);
    return this.doctorsRepository.findOne({ where: { id } });
  }

  async findOne(id: string): Promise<Doctor> {
    return this.doctorsRepository.findOne({ where: { id } });
  }

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return await this.doctorsRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorsRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.doctorsRepository.delete(id);
  }
} 