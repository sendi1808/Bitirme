import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsService } from '../../services/reports.service';
import { ImagesService } from '../../services/images.service';
import { Patient, Report } from '../../services/patient.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-image-upload-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './image-upload-modal.component.html',
  styleUrls: ['./image-upload-modal.component.css']
})
export class ImageUploadModalComponent {
  @Input() patient!: Patient;
  @Output() closeModal = new EventEmitter<void>();
  @Output() uploadComplete = new EventEmitter<Report>();

  uploadForm: FormGroup;
  previewUrl: string | null = null;
  isCTUpload: boolean = false;
  isAnalyzing: boolean = false;
  imagePreview: string | null = null;
  analysisResult: string | null = null;

  constructor(
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private imagesService: ImagesService
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
      
      // Dosya önizlemesi oluştur
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      // Dosya tipini kontrol et
      this.isCTUpload = file.type === 'application/dicom' || file.name.endsWith('.dcm');
    }
  }

  async analyzeImage(): Promise<void> {
    if (this.uploadForm.valid && this.imagePreview) {
      this.isAnalyzing = true;
      try {
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('file')?.value);
        formData.append('patientTcNo', this.patient.tcNo);

        // Burada görüntü analizi yapılacak
        const result = await firstValueFrom(this.imagesService.analyze(formData));
        this.analysisResult = result.diagnosis;
        this.uploadForm.patchValue({ diagnosis: result.diagnosis });
      } catch (error) {
        console.error('Analiz hatası:', error);
        this.analysisResult = 'Görüntü analizi sırasında bir hata oluştu.';
      } finally {
        this.isAnalyzing = false;
      }
    }
  }

  async saveReport(): Promise<void> {
    if (this.uploadForm.valid && this.imagePreview) {
      try {
        const formData = new FormData();
        formData.append('file', this.uploadForm.get('file')?.value);
        formData.append('diagnosis', this.uploadForm.get('diagnosis')?.value);
        formData.append('notes', this.uploadForm.get('notes')?.value || '');
        formData.append('patientTcNo', this.patient.tcNo);

        const result = await firstValueFrom(this.imagesService.upload(formData));
        
        // Yeni raporu oluştur
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
        this.onClose();
      } catch (error) {
        console.error('Rapor kaydetme hatası:', error);
      }
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
} 