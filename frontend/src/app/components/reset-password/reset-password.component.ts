import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.resetForm = this.fb.group({
      sicilNo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';

      const { sicilNo, email } = this.resetForm.value;

      try {
        const success = await this.authService.requestPasswordReset(sicilNo, email);
        if (success) {
          this.successMessage = 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        } else {
          this.errorMessage = 'Şifre sıfırlama isteği gönderilirken bir hata oluştu.';
        }
      } catch (error: any) {
        this.errorMessage = error.message || 'Şifre sıfırlama isteği gönderilirken bir hata oluştu.';
      } finally {
        this.isLoading = false;
      }
    }
  }
} 