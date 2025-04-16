import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>
  ) {}

  async findOne(id: string): Promise<Patient> {
    return this.patientsRepository.findOne({ where: { id } });
  }

  async findByTcId(tcId: string): Promise<Patient> {
    return this.patientsRepository.findOne({ where: { tcId } });
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientsRepository.create(createPatientDto);
    return this.patientsRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientsRepository.find();
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.patientsRepository.update(id, updatePatientDto);
    return this.patientsRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.patientsRepository.delete(id);
  }
}
