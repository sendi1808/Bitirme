import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Doctor } from '../../models/doctor.model';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AddPatientModalComponent } from '../add-patient-modal/add-patient-modal.component';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, AddPatientModalComponent],
  template: `
    <div class="doctor-dashboard">
      <div class="header">
        <h1>Doktor Paneli</h1>
        <button class="add-patient-btn" (click)="showAddPatientModal = true">Yeni Hasta Ekle</button>
      </div>

      <div class="content">
        <div class="patients-section">
          <h2>Hastalarım</h2>
          <div class="patients-table">
            <table>
              <thead>
                <tr>
                  <th>TC Kimlik No</th>
                  <th>Ad</th>
                  <th>Soyad</th>
                  <th>Doğum Tarihi</th>
                  <th>Cinsiyet</th>
                  <th>Telefon</th>
                  <th>E-posta</th>
                  <th>Boy (cm)</th>
                  <th>Kilo (kg)</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let patient of patients">
                  <td>
                    <a [routerLink]="['/patient-details', patient.tcNo]" class="tc-link">
                      {{ patient.tcNo }}
                    </a>
                  </td>
                  <td>{{ patient.name }}</td>
                  <td>{{ patient.surname }}</td>
                  <td>{{ patient.birthDate | date:'dd.MM.yyyy' }}</td>
                  <td>{{ patient.gender }}</td>
                  <td>{{ patient.phone }}</td>
                  <td>{{ patient.email }}</td>
                  <td>{{ patient.height }}</td>
                  <td>{{ patient.weight }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <app-add-patient-modal
        *ngIf="showAddPatientModal"
        (closeModalEvent)="showAddPatientModal = false"
        (patientAdded)="onPatientAdded($event)">
      </app-add-patient-modal>
    </div>
  `,
  styles: [`
    .doctor-dashboard {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .add-patient-btn {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .add-patient-btn:hover {
      background-color: #45a049;
    }

    .content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .patients-section {
      margin-bottom: 20px;
    }

    .patients-table {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f5f5f5;
      font-weight: 500;
    }

    tr:hover {
      background-color: #f9f9f9;
    }

    .view-btn {
      background-color: #2196F3;
      color: white;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }

    .view-btn:hover {
      background-color: #1976D2;
    }

    .tc-link {
      color: #2196F3;
      text-decoration: none;
      cursor: pointer;
    }

    .tc-link:hover {
      text-decoration: underline;
    }
  `]
})
export class DoctorDashboardComponent implements OnInit {
  doctor: Doctor | null = null;
  patients: Patient[] = [];
  showAddPatientModal = false;

  constructor(
    private authService: AuthService,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctorData();
    this.loadPatients();
  }

  private loadDoctorData(): void {
    this.doctor = this.authService.getCurrentDoctor();
    if (!this.doctor) {
      this.authService.logout();
    }
  }

  private loadPatients(): void {
    this.patients = this.patientService.getPatients();
  }

  onPatientAdded(patient: Patient): void {
    this.loadPatients();
  }
} 