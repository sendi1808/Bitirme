import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-test-connection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="test-container">
      <h2>Backend Bağlantı Testi</h2>
      
      <div class="test-section">
        <h3>Backend URL: {{ environment.apiUrl }}</h3>
        <button (click)="testConnection()" [disabled]="isTesting">
          {{ isTesting ? 'Test Ediliyor...' : 'Bağlantıyı Test Et' }}
        </button>
      </div>

      <div *ngIf="testResult" class="result-section">
        <h3>Test Sonucu:</h3>
        <pre>{{ testResult | json }}</pre>
      </div>

      <div *ngIf="error" class="error-section">
        <h3>Hata:</h3>
        <pre>{{ error }}</pre>
      </div>
    </div>
  `,
  styles: [`
    .test-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
    }

    .test-section {
      margin-bottom: 2rem;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .result-section, .error-section {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 4px;
    }

    .result-section {
      background-color: #e8f5e9;
      border: 1px solid #4caf50;
    }

    .error-section {
      background-color: #ffebee;
      border: 1px solid #f44336;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `]
})
export class TestConnectionComponent implements OnInit {
  environment = environment;
  isTesting = false;
  testResult: any = null;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.testConnection();
  }

  async testConnection() {
    this.isTesting = true;
    this.testResult = null;
    this.error = null;

    try {
      // Backend'in çalışıp çalışmadığını kontrol et
      const response = await this.http.post(`${environment.apiUrl}/auth/login`, {
        username: '12345678901',
        password: 'test123'
      }, {
        observe: 'response'
      }).toPromise();

      if (response) {
        this.testResult = {
          status: 'success',
          message: 'Backend bağlantısı başarılı ve kullanıcı doğrulandı',
          statusCode: response.status,
          statusText: response.statusText,
          response: response.body
        };
      }
    } catch (error: any) {
      if (error.status === 401) {
        this.testResult = {
          status: 'success',
          message: 'Backend çalışıyor ve login endpoint\'i erişilebilir',
          statusCode: error.status,
          statusText: 'Geçersiz kimlik bilgileri (kullanıcı adı veya şifre hatalı)'
        };
      } else if (error.status === 404) {
        this.error = 'Backend çalışıyor fakat login endpoint\'i bulunamadı. Backend kodunu kontrol edin.';
      } else if (error.status === 0) {
        this.error = 'Backend\'e bağlanılamıyor. Backend\'in çalıştığından emin olun.';
      } else {
        this.testResult = {
          status: 'success',
          message: 'Backend çalışıyor',
          statusCode: error.status,
          statusText: error.statusText
        };
      }
      console.error('Backend bağlantı hatası:', error);
    } finally {
      this.isTesting = false;
    }
  }
} 