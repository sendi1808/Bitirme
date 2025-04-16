import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-set-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="card">
        <h2>Yeni Şifre Belirle</h2>
        <p class="info-text">İlk girişinizde güvenliğiniz için şifrenizi değiştirmeniz gerekmektedir.</p>
        <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="newPassword">Yeni Şifre</label>
            <input 
              type="password" 
              id="newPassword" 
              formControlName="newPassword"
              [class.is-invalid]="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched"
              placeholder="Yeni şifrenizi giriniz"
            >
            <div class="invalid-feedback" *ngIf="passwordForm.get('newPassword')?.invalid && passwordForm.get('newPassword')?.touched">
              Şifre en az 8 karakter olmalıdır
            </div>
          </div>
          
          <div class="form-group">
            <label for="confirmPassword">Şifre Tekrar</label>
            <input 
              type="password" 
              id="confirmPassword" 
              formControlName="confirmPassword"
              [class.is-invalid]="
                (passwordForm.hasError('mismatch') && passwordForm.get('confirmPassword')?.touched) ||
                (passwordForm.get('confirmPassword')?.invalid && passwordForm.get('confirmPassword')?.touched)
              "
              placeholder="Şifrenizi tekrar giriniz"
            >
            <div class="invalid-feedback" *ngIf="passwordForm.hasError('mismatch') && passwordForm.get('confirmPassword')?.touched">
              Şifreler eşleşmiyor
            </div>
          </div>

          <button type="submit" [disabled]="passwordForm.invalid || isSubmitting">
            {{ isSubmitting ? 'Güncelleniyor...' : 'Şifremi Güncelle' }}
          </button>

          <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: var(--spinova-background);
      padding: 1rem;
    }

    .card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      color: var(--spinova-green);
      margin-bottom: 0.5rem;
    }

    .info-text {
      text-align: center;
      color: var(--spinova-gray);
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--spinova-gray);
    }

    input {
      width: 100%;
      padding: 12px;
      border: none;
      border-bottom: 3px solid var(--spinova-gray);
      border-radius: 0;
      background-color: var(--spinova-input-bg);
      outline: none;
      transition: border-color 0.3s;
    }

    input:focus {
      border-bottom-color: var(--spinova-green);
    }

    input.is-invalid {
      border-bottom-color: #dc3545;
    }

    .invalid-feedback {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: var(--spinova-button);
      color: black;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }

    button:hover:not(:disabled) {
      opacity: 0.9;
    }

    button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .error-message {
      color: #dc3545;
      text-align: center;
      margin-top: 1rem;
    }
  `]
})
export class SetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (!this.authService.isAuthenticated() || !this.authService.isFirstLogin()) {
      this.router.navigate(['/login']);
    }
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password === confirmPassword) {
      return null;
    }
    return { mismatch: true };
  }

  async onSubmit() {
    if (this.passwordForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.errorMessage = '';

      try {
        const newPassword = this.passwordForm.get('newPassword')?.value;
        const success = await this.authService.updatePassword(newPassword);

        if (success) {
          alert('Şifreniz başarıyla güncellendi. Yeni şifrenizle tekrar giriş yapmanız gerekmektedir.');
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Şifre güncellenirken bir hata oluştu.';
        }
      } catch (error: any) {
        this.errorMessage = error.message || 'Şifre güncellenirken bir hata oluştu.';
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
