import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CT } from '../ct/ct.entity';
import { Report } from '../reports/report.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  patientId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  gender: string;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column()
  birthday: Date;

  @Column({ unique: true })
  identificationNumber: string;

  @OneToMany(() => CT, ct => ct.patient)
  cts: CT[];

  @OneToMany(() => Report, report => report.patient)
  reports: Report[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 