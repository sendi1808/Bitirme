import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password-confirm',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss']
})
export class ResetPasswordConfirmComponent implements OnInit {
  newPassword = '';
  confirmPassword = '';
  token = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Şifreler eşleşmiyor';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.resetPasswordConfirm(this.token, this.newPassword).subscribe({
      next: () => {
        this.successMessage = 'Şifreniz başarıyla güncellendi';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        this.errorMessage = 'Şifre güncellenirken bir hata oluştu';
        this.isSubmitting = false;
      }
    });
  }
} 