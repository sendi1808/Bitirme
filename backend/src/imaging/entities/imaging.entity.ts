import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
export class Imaging {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @Column()
  date: Date;

  @Column()
  type: string;

  @Column()
  imageUrl: string;

  @Column({ nullable: true })
  diagnosis: string;

  @Column({ nullable: true })
  notes: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
} 