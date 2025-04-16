import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-add-patient-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Yeni Hasta Ekle</h2>
          <button class="close-btn" (click)="closeModal()">&times;</button>
        </div>

        <form [formGroup]="patientForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="tcNo">TC Kimlik No</label>
            <input type="text" id="tcNo" formControlName="tcNo">
            <div class="error" *ngIf="patientForm.get('tcNo')?.invalid && patientForm.get('tcNo')?.touched">
              TC Kimlik No 11 haneli olmalıdır
            </div>
          </div>

          <div class="form-group">
            <label for="name">Ad</label>
            <input type="text" id="name" formControlName="name">
            <div class="error" *ngIf="patientForm.get('name')?.invalid && patientForm.get('name')?.touched">
              Ad alanı zorunludur
            </div>
          </div>

          <div class="form-group">
            <label for="surname">Soyad</label>
            <input type="text" id="surname" formControlName="surname">
            <div class="error" *ngIf="patientForm.get('surname')?.invalid && patientForm.get('surname')?.touched">
              Soyad alanı zorunludur
            </div>
          </div>

          <div class="form-group">
            <label for="birthDate">Doğum Tarihi</label>
            <input type="date" id="birthDate" formControlName="birthDate">
            <div class="error" *ngIf="patientForm.get('birthDate')?.invalid && patientForm.get('birthDate')?.touched">
              Doğum tarihi zorunludur
            </div>
          </div>

          <div class="form-group">
            <label for="gender">Cinsiyet</label>
            <select id="gender" formControlName="gender">
              <option value="Erkek">Erkek</option>
              <option value="Kadın">Kadın</option>
            </select>
          </div>

          <div class="form-group">
            <label for="phone">Telefon</label>
            <input type="tel" id="phone" formControlName="phone">
          </div>

          <div class="form-group">
            <label for="email">E-posta</label>
            <input type="email" id="email" formControlName="email">
            <div class="error" *ngIf="patientForm.get('email')?.invalid && patientForm.get('email')?.touched">
              Geçerli bir e-posta adresi giriniz
            </div>
          </div>

          <div class="form-group">
            <label for="address">Adres</label>
            <textarea id="address" formControlName="address"></textarea>
          </div>

          <div class="form-group">
            <label for="bloodType">Kan Grubu</label>
            <select id="bloodType" formControlName="bloodType">
              <option value="">Seçiniz</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="0+">0+</option>
              <option value="0-">0-</option>
            </select>
          </div>

          <div class="form-group">
            <label for="height">Boy (cm)</label>
            <input type="number" id="height" formControlName="height" min="50" max="250">
            <div class="error" *ngIf="patientForm.get('height')?.invalid && patientForm.get('height')?.touched">
              Boy 50-250 cm arası olmalıdır
            </div>
          </div>

          <div class="form-group">
            <label for="weight">Kilo (kg)</label>
            <input type="number" id="weight" formControlName="weight" min="20" max="300">
            <div class="error" *ngIf="patientForm.get('weight')?.invalid && patientForm.get('weight')?.touched">
              Kilo 20-300 kg arası olmalıdır
            </div>
          </div>

          <div class="form-group">
            <label for="allergies">Alerjiler</label>
            <textarea id="allergies" formControlName="allergies"></textarea>
          </div>

          <div class="form-group">
            <label for="chronicDiseases">Kronik Hastalıklar</label>
            <textarea id="chronicDiseases" formControlName="chronicDiseases"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" (click)="closeModal()">İptal</button>
            <button type="submit" [disabled]="patientForm.invalid || isSubmitting">
              {{isSubmitting ? 'Ekleniyor...' : 'Hasta Ekle'}}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    .form-group textarea {
      min-height: 100px;
      resize: vertical;
    }

    .error {
      color: #f44336;
      font-size: 14px;
      margin-top: 5px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .form-actions button {
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }

    .form-actions button[type="button"] {
      background-color: #f44336;
      color: white;
    }

    .form-actions button[type="submit"] {
      background-color: #4CAF50;
      color: white;
    }

    .form-actions button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class AddPatientModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() patientAdded = new EventEmitter<Patient>();
  
  patientForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.fb.group({
      tcNo: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['Erkek', Validators.required],
      phone: [''],
      email: ['', [Validators.email]],
      address: [''],
      bloodType: [''],
      height: [''],
      weight: [''],
      allergies: [''],
      chronicDiseases: ['']
    });
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  async onSubmit(): Promise<void> {
    if (this.patientForm.valid) {
      this.isSubmitting = true;
      try {
        const newPatient: Patient = {
          ...this.patientForm.value,
          birthDate: new Date(this.patientForm.value.birthDate),
          reports: []
        };
        
        await this.patientService.addPatient(newPatient).toPromise();
        this.patientAdded.emit(newPatient);
        this.closeModal();
      } catch (error) {
        console.error('Hasta ekleme hatası:', error);
        alert('Hasta eklenirken bir hata oluştu');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
} 