import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      sicilNo: ['', [Validators.required]],
      password: ['', [Validators.required]],
      kvkkAccepted: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    // Eğer kullanıcı zaten giriş yapmışsa çıkış yaptır
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const { sicilNo, password } = this.loginForm.value;
        await this.authService.login(sicilNo, password);
        // Yönlendirme authService içinde yapılıyor
      } catch (error: any) {
        this.errorMessage = error.message || 'Giriş yapılırken bir hata oluştu';
      } finally {
        this.isLoading = false;
      }
    }
  }
}
