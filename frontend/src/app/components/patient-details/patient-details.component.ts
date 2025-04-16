import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="patient-details-container">
      <!-- Loading State -->
      <div class="loading-overlay" *ngIf="isLoading">
        <div class="spinner"></div>
        <p>Yükleniyor...</p>
      </div>

      <!-- Error State -->
      <div class="error-message" *ngIf="error">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button class="retry-btn" (click)="retryLoading()">Tekrar Dene</button>
      </div>

      <!-- Main Content -->
      <div class="patient-info" *ngIf="!isLoading && !error">
        <div class="breadcrumb">
          <a [routerLink]="['/doctor-dashboard']">Hasta Listesi</a>
          <span class="separator">/</span>
          <span class="current">Hasta Detayları</span>
        </div>

        <h2>Hasta Bilgileri</h2>
        
        <div class="info-section" *ngIf="!isEditing">
          <div class="info-row">
            <span class="label">TC No:</span>
            <span class="value">{{ patient?.tcNo }}</span>
          </div>
          <div class="info-row">
            <span class="label">Ad:</span>
            <span class="value">{{ patient?.name }}</span>
          </div>
          <div class="info-row">
            <span class="label">Soyad:</span>
            <span class="value">{{ patient?.surname }}</span>
          </div>
          <div class="info-row">
            <span class="label">Doğum Tarihi:</span>
            <span class="value">{{ patient?.birthDate | date:'dd/MM/yyyy' }}</span>
          </div>
          <div class="info-row">
            <span class="label">Cinsiyet:</span>
            <span class="value">{{ patient?.gender }}</span>
          </div>
          <div class="info-row">
            <span class="label">Telefon:</span>
            <span class="value">{{ patient?.phone }}</span>
          </div>
          <div class="info-row">
            <span class="label">E-posta:</span>
            <span class="value">{{ patient?.email }}</span>
          </div>
          
          <div class="action-buttons">
            <button class="edit-btn" (click)="startEditing()" title="Hasta bilgilerini düzenle">
              <i class="fas fa-edit"></i>
              Bilgileri Güncelle
            </button>
            <button class="back-btn" (click)="goBack()" title="Hasta listesine dön">
              <i class="fas fa-arrow-left"></i>
              Geri Dön
            </button>
          </div>
        </div>

        <form *ngIf="isEditing" [formGroup]="patientForm" (ngSubmit)="onSubmit()" class="edit-form">
          <div class="form-group">
            <label for="tcNo">TC No</label>
            <input type="text" id="tcNo" formControlName="tcNo" readonly>
          </div>
          <div class="form-group">
            <label for="name">Ad</label>
            <input type="text" id="name" formControlName="name">
            <div class="error-message" *ngIf="patientForm.get('name')?.invalid && patientForm.get('name')?.touched">
              Ad alanı zorunludur
            </div>
          </div>
          <div class="form-group">
            <label for="surname">Soyad</label>
            <input type="text" id="surname" formControlName="surname">
            <div class="error-message" *ngIf="patientForm.get('surname')?.invalid && patientForm.get('surname')?.touched">
              Soyad alanı zorunludur
            </div>
          </div>
          <div class="form-group">
            <label for="birthDate">Doğum Tarihi</label>
            <input type="date" id="birthDate" formControlName="birthDate">
            <div class="error-message" *ngIf="patientForm.get('birthDate')?.invalid && patientForm.get('birthDate')?.touched">
              Doğum tarihi zorunludur
            </div>
          </div>
          <div class="form-group">
            <label for="gender">Cinsiyet</label>
            <select id="gender" formControlName="gender">
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
            </select>
            <div class="error-message" *ngIf="patientForm.get('gender')?.invalid && patientForm.get('gender')?.touched">
              Cinsiyet seçimi zorunludur
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Telefon</label>
            <input type="tel" id="phone" formControlName="phone">
            <div class="error-message" *ngIf="patientForm.get('phone')?.invalid && patientForm.get('phone')?.touched">
              Geçerli bir telefon numarası giriniz (10 haneli)
            </div>
          </div>
          <div class="form-group">
            <label for="email">E-posta</label>
            <input type="email" id="email" formControlName="email">
            <div class="error-message" *ngIf="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
              Geçerli bir e-posta adresi giriniz
            </div>
          </div>
          
          <div class="form-actions">
            <button type="button" class="cancel-btn" (click)="cancelEditing()" title="Değişiklikleri iptal et">
              <i class="fas fa-times"></i>
              İptal
            </button>
            <button type="submit" [disabled]="patientForm.invalid || isSubmitting" title="Değişiklikleri kaydet">
              <i class="fas fa-save"></i>
              {{ isSubmitting ? 'Kaydediliyor...' : 'Kaydet' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .patient-details-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
      position: relative;
    }

    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.9);
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #029183;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-message {
      background-color: #ffebee;
      color: #c62828;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .retry-btn {
      background-color: #029183;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-left: auto;
    }

    .breadcrumb {
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    .breadcrumb a {
      color: #029183;
      text-decoration: none;
    }

    .breadcrumb .separator {
      margin: 0 0.5rem;
      color: #666;
    }

    .breadcrumb .current {
      color: #666;
    }

    .patient-info {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
    }

    h2 {
      color: var(--spinova-green);
      margin-bottom: 20px;
      text-align: center;
    }

    .info-section {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .info-row {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #eee;
    }

    .label {
      width: 150px;
      font-weight: 600;
      color: var(--spinova-gray);
    }

    .value {
      flex: 1;
    }

    .action-buttons {
      display: flex;
      gap: 10px;
      margin-top: 20px;
      justify-content: center;
    }

    .edit-btn, .back-btn {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .edit-btn {
      background-color: var(--spinova-blue);
      color: white;
    }

    .back-btn {
      background-color: var(--spinova-gray);
      color: white;
    }

    .edit-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    label {
      color: var(--spinova-gray);
      font-weight: 500;
    }

    input, select {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    input[readonly] {
      background-color: #f5f5f5;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .cancel-btn, button[type="submit"] {
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .cancel-btn {
      background-color: #6c757d;
      color: white;
      border: none;
    }

    button[type="submit"] {
      background-color: var(--spinova-green);
      color: white;
      border: none;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .error-message {
      color: #c62828;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }

    @media (max-width: 768px) {
      .patient-details-container {
        padding: 10px;
      }

      .action-buttons {
        flex-direction: column;
      }

      .info-row {
        flex-direction: column;
        gap: 0.5rem;
      }

      .label {
        width: 100%;
      }
    }
  `]
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient | null = null;
  isEditing = false;
  isSubmitting = false;
  isLoading = false;
  error: string | null = null;
  patientForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
    this.patientForm = this.fb.group({
      tcNo: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.loadPatient();
  }

  loadPatient(): void {
    this.isLoading = true;
    this.error = null;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.patientService.getPatient(+id).subscribe({
        next: (patient) => {
          this.patient = patient;
          this.patientForm.patchValue(patient);
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Hasta bilgileri yüklenirken bir hata oluştu.';
          this.isLoading = false;
          console.error('Hasta bilgileri yüklenirken hata oluştu:', error);
        }
      });
    } else {
      this.error = 'Geçersiz hasta ID';
      this.isLoading = false;
    }
  }

  retryLoading(): void {
    this.loadPatient();
  }

  startEditing(): void {
    this.isEditing = true;
  }

  cancelEditing(): void {
    if (this.patientForm.dirty) {
      if (confirm('Yapılan değişiklikler kaydedilmeyecek. Devam etmek istiyor musunuz?')) {
        this.isEditing = false;
        this.patientForm.patchValue(this.patient!);
      }
    } else {
      this.isEditing = false;
    }
  }

  onSubmit(): void {
    if (this.patientForm.valid && this.patient) {
      this.isSubmitting = true;
      const updatedPatient = { ...this.patient, ...this.patientForm.value };

      this.patientService.updatePatient(this.patient.id!, updatedPatient).subscribe({
        next: (patient) => {
          this.patient = patient;
          this.isEditing = false;
          this.isSubmitting = false;
          this.notificationService.showSuccess('Hasta bilgileri başarıyla güncellendi.');
        },
        error: (error) => {
          this.isSubmitting = false;
          this.notificationService.showError('Hasta bilgileri güncellenirken bir hata oluştu.');
          console.error('Hasta güncellenirken hata oluştu:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/doctor-dashboard']);
  }
}