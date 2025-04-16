import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="verification-container">
      <div class="verification-card">
        <div class="status-icon" [class.success]="isSuccess" [class.error]="!isSuccess">
          <i class="fas" [class.fa-check-circle]="isSuccess" [class.fa-times-circle]="!isSuccess"></i>
        </div>
        
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        
        <button class="action-btn" (click)="navigateToLogin()">
          Giriş Sayfasına Dön
        </button>
      </div>
    </div>
  `,
  styles: [`
    .verification-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 20px;
    }

    .verification-card {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    .status-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    .status-icon.success {
      color: #28a745;
    }

    .status-icon.error {
      color: #dc3545;
    }

    h2 {
      color: #333;
      margin-bottom: 15px;
    }

    p {
      color: #666;
      margin-bottom: 25px;
    }

    .action-btn {
      padding: 12px 24px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .action-btn:hover {
      background-color: #0056b3;
    }
  `]
})
export class EmailVerificationComponent implements OnInit {
  isSuccess = false;
  title = 'E-posta Doğrulanıyor...';
  message = 'Lütfen bekleyin...';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.showError('Geçersiz doğrulama bağlantısı');
      return;
    }

    try {
      const success = await this.authService.verifyEmail(token);
      
      if (success) {
        this.showSuccess();
      } else {
        this.showError('E-posta doğrulaması başarısız oldu');
      }
    } catch (error) {
      this.showError('Bir hata oluştu');
    }
  }

  private showSuccess() {
    this.isSuccess = true;
    this.title = 'E-posta Doğrulandı!';
    this.message = 'E-posta adresiniz başarıyla doğrulandı. Şimdi giriş yapabilirsiniz.';
  }

  private showError(message: string) {
    this.isSuccess = false;
    this.title = 'Hata!';
    this.message = message;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
} 