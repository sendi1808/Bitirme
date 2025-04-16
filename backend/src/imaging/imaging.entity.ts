import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';

@Entity('imaging')
export class Imaging {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  imageUrl: string;

  @Column({ type: 'text', nullable: true })
  diagnosis: string;

  @Column({ nullable: true })
  diagnosisDate: Date;

  @Column({ default: false })
  isDiagnosed: boolean;

  @Column({ nullable: true })
  doctorId: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'enum', enum: ['XRay', 'MRI', 'CT', 'Other'], default: 'Other' })
  imageType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 