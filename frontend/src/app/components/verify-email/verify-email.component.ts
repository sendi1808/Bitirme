import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <div class="verify-card">
        <h2>E-posta Doğrulama</h2>
        <p>E-posta adresinize bir doğrulama bağlantısı gönderdik. Lütfen gelen kutunuzu kontrol edin.</p>
        
        <div class="info-box">
          <p><strong>Not:</strong> Doğrulama e-postası birkaç dakika içinde gelmezse, spam klasörünüzü kontrol edin.</p>
        </div>

        <div class="actions">
          <button (click)="resendVerification()" class="resend-btn">Tekrar Gönder</button>
          <button (click)="logout()" class="logout-btn">Çıkış Yap</button>
        </div>

        <!-- Test için geçici doğrulama butonu -->
        <button (click)="verifyForTesting()" class="verify-btn">
          Test: E-postayı Doğrula
        </button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .verify-card {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h2 {
      margin-bottom: 1rem;
      color: #333;
    }

    p {
      margin-bottom: 1.5rem;
      color: #666;
    }

    .info-box {
      background-color: #e8f4fd;
      padding: 1rem;
      border-radius: 4px;
      margin-bottom: 1.5rem;
    }

    .info-box p {
      margin: 0;
      color: #0056b3;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
      flex: 1;
    }

    .resend-btn {
      background-color: #6c757d;
      color: white;
    }

    .resend-btn:hover {
      background-color: #5a6268;
    }

    .logout-btn {
      background-color: #dc3545;
      color: white;
    }

    .logout-btn:hover {
      background-color: #c82333;
    }

    .verify-btn {
      background-color: #28a745;
      color: white;
      width: 100%;
    }

    .verify-btn:hover {
      background-color: #218838;
    }
  `]
})
export class VerifyEmailComponent implements OnInit {
  errorMessage: string = '';
  isVerifying: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn() || !this.authService.needsEmailVerification()) {
      this.router.navigate(['/login']);
    }
  }

  resendVerification(): void {
    // Normalde burada e-posta doğrulama bağlantısı tekrar gönderilir
    alert('Doğrulama e-postası tekrar gönderildi.');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Test için geçici doğrulama metodu
  async verifyForTesting(): Promise<void> {
    try {
      const success = await this.authService.verifyEmail('test-token');
      if (success) {
        this.router.navigate(['/doctor-dashboard']);
      } else {
        this.errorMessage = 'E-posta doğrulaması başarısız oldu';
      }
    } catch (error) {
      this.errorMessage = 'Bir hata oluştu';
    }
  }
} 