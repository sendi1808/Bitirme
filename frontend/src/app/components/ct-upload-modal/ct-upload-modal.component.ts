import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Patient, Report } from '../../services/patient.service';
import { CTService } from '../../services/ct.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-ct-upload-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './ct-upload-modal.component.html',
  styleUrls: ['./ct-upload-modal.component.css']
})
export class CTUploadModalComponent {
  @Input() patient!: Patient;
  @Output() closeModal = new EventEmitter<void>();
  @Output() uploadComplete = new EventEmitter<Report>();

  uploadForm: FormGroup;
  isUploading = false;
  imagePreview: string | null = null;
  huValue: number | null = null;
  csaValue: number | null = null;
  isAnalyzing = false;

  constructor(
    private fb: FormBuilder,
    private ctService: CTService
  ) {
    this.uploadForm = this.fb.group({
      file: ['', Validators.required],
      diagnosis: ['', Validators.required],
      notes: ['']
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadForm.patchValue({ file });
      
      // DICOM dosyası dışındaki görüntüler için önizleme oluştur
      if (!file.name.endsWith('.dcm') && !file.type.includes('dicom')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        // DICOM dosyası için özel bir ikon göster
        this.imagePreview = 'assets/dicom-icon.png';
      }
    }
  }

  async analyzeCT(): Promise<void> {
    if (!this.uploadForm.get('file')?.value) {
      return;
    }

    this.isAnalyzing = true;
    try {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')?.value);
      
      const result = await firstValueFrom(this.ctService.analyzeCT(formData));
      if (result) {
        this.huValue = result.huValue;
        this.csaValue = result.csaValue;
        
        // Ölçüm sonuçlarına dayalı teşhis tavsiyesi
        let diagnosisSuggestion = '';
        
        if (this.huValue !== null) {
          diagnosisSuggestion += `HU Değeri: ${this.huValue}. `;
          
          if (this.huValue < -30) {
            diagnosisSuggestion += 'Düşük HU değeri yağ infiltrasyonunu gösterebilir. ';
          } else if (this.huValue > 50) {
            diagnosisSuggestion += 'Yüksek HU değeri fibrozis veya inflamasyonu gösterebilir. ';
          }
        }
        
        if (this.csaValue !== null) {
          diagnosisSuggestion += `CSA: ${this.csaValue} cm². `;
          
          if (this.csaValue < 70) {
            diagnosisSuggestion += 'Düşük CSA değeri sarkopeni riskini gösterebilir.';
          }
        }
        
        this.uploadForm.patchValue({ 
          diagnosis: diagnosisSuggestion 
        });
      }
    } catch (error) {
      console.error('CT analiz hatası:', error);
    } finally {
      this.isAnalyzing = false;
    }
  }

  async upload(): Promise<void> {
    if (this.uploadForm.invalid) {
      return;
    }

    this.isUploading = true;
    try {
      const formData = new FormData();
      formData.append('file', this.uploadForm.get('file')?.value);
      formData.append('patientId', this.patient.id);
      formData.append('diagnosis', this.uploadForm.get('diagnosis')?.value);
      formData.append('notes', this.uploadForm.get('notes')?.value || '');
      
      if (this.huValue !== null) {
        formData.append('huValue', this.huValue.toString());
      }
      
      if (this.csaValue !== null) {
        formData.append('csaValue', this.csaValue.toString());
      }
      
      const result = await firstValueFrom(this.ctService.uploadCT(formData));
      
      // Yeni rapor nesnesini oluştur
      const newReport: Report = {
        id: result.id,
        patientId: this.patient.id,
        date: new Date(),
        diagnosis: this.uploadForm.get('diagnosis')?.value,
        imageUrl: result.imageUrl,
        notes: this.uploadForm.get('notes')?.value || '',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.uploadComplete.emit(newReport);
      this.closeModal.emit();
    } catch (error) {
      console.error('CT yükleme hatası:', error);
    } finally {
      this.isUploading = false;
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
} 