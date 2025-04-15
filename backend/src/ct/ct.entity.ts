import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('cts')
export class CT {
  @PrimaryGeneratedColumn('uuid')
  ctId: string;

  @Column()
  date: Date;

  @Column()
  filePath: string;

  @Column()
  fileFormat: string;

  @Column()
  patientAge: number;

  @ManyToOne(() => Patient, patient => patient.cts)
  @JoinColumn()
  patient: Patient;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 