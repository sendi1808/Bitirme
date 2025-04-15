import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { CTScan } from '../ct/ct-scan.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  patientId: string;

  @Column()
  imageId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  csaCm2: number;

  @Column('decimal', { precision: 10, scale: 2 })
  huValue: number;

  @Column()
  diagnosis: string;

  @Column('text', { nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Patient)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @ManyToOne(() => CTScan)
  @JoinColumn({ name: 'imageId' })
  ctScan: CTScan;
} 