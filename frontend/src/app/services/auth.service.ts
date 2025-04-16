import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable, timeout } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { tap } from 'rxjs/operators';
import { User } from './user.service';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private currentDoctorSubject = new BehaviorSubject<Doctor | null>(null);
  currentDoctor$ = this.currentDoctorSubject.asObservable();

  private tokenKey = 'auth_token';
  private firstLoginKey = 'isFirstLogin';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.loadCurrentUser();
      }

      const storedDoctor = localStorage.getItem('currentDoctor');
      if (storedDoctor) {
        this.currentDoctorSubject.next(JSON.parse(storedDoctor));
      }
    }
  }

  private getLocalStorage(): Storage | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage;
    }
    return null;
  }

  private loadCurrentUser(): void {
    this.http.get<User>(`${this.apiUrl}/users/me`).subscribe(
      user => this.currentUserSubject.next(user),
      () => this.currentUserSubject.next(null)
    );
  }

  async login(sicilNo: string, password: string): Promise<void> {
    try {
      console.log('Login isteği gönderiliyor:', { sicilNo });
      
      const response = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/login`, {
          sicilNo,
          password
        }).pipe(
          tap({
            error: (error) => {
              console.error('Login error:', error);
              if (error.status === 401) {
                throw new Error('Geçersiz sicil numarası veya şifre');
              } else if (error.status === 0) {
                throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
              } else {
                throw new Error(error.error?.message || 'Giriş yapılırken bir hata oluştu');
              }
            }
          })
        )
      );

      console.log('Login cevabı:', response);

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        await this.handleDoctorLogin(response.doctor);
        
        // İlk giriş ise şifre değiştirme sayfasına yönlendir
        if (response.isFirstLogin) {
          await this.router.navigate(['/set-password']);
        } 
        // E-posta doğrulanmamışsa e-posta doğrulama sayfasına yönlendir
        else if (!response.isEmailVerified) {
          await this.router.navigate(['/verify-email']);
        } 
        // Normal giriş - doktor sayfasına yönlendir
        else {
          await this.router.navigate(['/doctor-dashboard']);
        }
      } else {
        throw new Error('Giriş başarısız');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  logout(): void {
    const storage = this.getLocalStorage();
    if (storage) {
      storage.removeItem(this.tokenKey);
      storage.removeItem('currentDoctor');
    }
    this.currentDoctorSubject.next(null);
  }

  isAuthenticated(): boolean {
    const storage = this.getLocalStorage();
    return storage ? !!storage.getItem(this.tokenKey) : false;
  }

  getToken(): string | null {
    const storage = this.getLocalStorage();
    return storage ? storage.getItem(this.tokenKey) : null;
  }

  isFirstLogin(): boolean {
    const storage = this.getLocalStorage();
    return storage ? storage.getItem(this.firstLoginKey) === 'true' : false;
  }

  async updateCredentials(email: string, newPassword: string): Promise<boolean> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(
          `${this.apiUrl}/update-credentials`,
          { email, newPassword },
          { headers: this.getAuthHeaders() }
        ).pipe(
          timeout(30000), // 30 saniye timeout
          tap({
            error: (error) => {
              console.error('Credentials update error:', error);
              if (error.status === 401) {
                throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
              } else if (error.status === 0) {
                throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
              } else {
                throw new Error(error.error?.message || 'Bilgiler güncellenirken bir hata oluştu');
              }
            }
          })
        )
      );
      
      if (response?.success) {
        const storage = this.getLocalStorage();
        if (storage) {
          // Doktor bilgilerini güncelle
          const currentDoctor = this.currentDoctorSubject.value;
          if (currentDoctor) {
            const updatedDoctor = {
              ...currentDoctor,
              email: email,
              isPasswordChanged: true,
              password: newPassword
            };
            storage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
            this.currentDoctorSubject.next(updatedDoctor);
          }
          
          // İlk giriş durumunu güncelle
          storage.setItem(this.firstLoginKey, 'false');
        }
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Bilgiler güncelleme hatası:', error);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<boolean> {
    try {
      const response = await this.http.post<{ success: boolean }>(
        `${this.apiUrl}/verify-email`,
        { token }
      ).toPromise();
      
      return response?.success || false;
    } catch (error) {
      console.error('Email doğrulama hatası:', error);
      return false;
    }
  }

  async updatePassword(newPassword: string): Promise<boolean> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(
          `${this.apiUrl}/update-password`,
          { newPassword },
          { headers: this.getAuthHeaders() }
        ).pipe(
          timeout(30000), // 30 saniye timeout
          tap({
            error: (error) => {
              console.error('Password update error:', error);
              if (error.status === 401) {
                throw new Error('Oturum süresi doldu. Lütfen tekrar giriş yapın.');
              } else if (error.status === 0) {
                throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
              } else {
                throw new Error(error.error?.message || 'Şifre güncellenirken bir hata oluştu');
              }
            }
          })
        )
      );
      
      if (response?.success) {
        const storage = this.getLocalStorage();
        if (storage) {
          // Doktor bilgilerini güncelle
          const currentDoctor = this.currentDoctorSubject.value;
          if (currentDoctor) {
            const updatedDoctor = {
              ...currentDoctor,
              isPasswordChanged: true,
              password: newPassword
            };
            storage.setItem('currentDoctor', JSON.stringify(updatedDoctor));
            this.currentDoctorSubject.next(updatedDoctor);
          }
          
          // İlk giriş durumunu güncelle
          storage.setItem(this.firstLoginKey, 'false');
        }
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Şifre güncelleme hatası:', error);
      throw error;
    }
  }

  needsPasswordChange(): boolean {
    const currentDoctor = this.currentDoctorSubject.value;
    return currentDoctor ? !currentDoctor.isPasswordChanged : false;
  }

  needsEmailVerification(): boolean {
    const currentDoctor = this.currentDoctorSubject.value;
    return currentDoctor ? !currentDoctor.isEmailVerified : false;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCurrentDoctor(): Doctor | null {
    return this.currentDoctorSubject.value;
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`
    };
  }

  async requestPasswordReset(sicilNo: string, email: string): Promise<boolean> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/request-password-reset`, {
          sicilNo,
          email
        })
      );
      
      return response?.success || false;
    } catch (error: any) {
      console.error('Password reset request error:', error);
      if (error.status === 404) {
        throw new Error('Sicil numarası veya e-posta adresi bulunamadı.');
      } else if (error.status === 0) {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        throw new Error(error.error?.message || 'Şifre sıfırlama isteği gönderilirken bir hata oluştu.');
      }
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
      const response: any = await firstValueFrom(
        this.http.post(`${this.apiUrl}/reset-password`, {
          token,
          newPassword
        })
      );
      
      return response?.success || false;
    } catch (error: any) {
      console.error('Password reset error:', error);
      if (error.status === 400) {
        throw new Error('Geçersiz veya süresi dolmuş token.');
      } else if (error.status === 0) {
        throw new Error('Sunucuya bağlanılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        throw new Error(error.error?.message || 'Şifre güncellenirken bir hata oluştu.');
      }
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  private async handleDoctorLogin(response: any): Promise<void> {
    const doctor: Doctor = {
      id: response.id,
      name: response.name,
      surname: response.surname,
      tcNo: response.tcNo,
      sicilNo: response.sicilNo,
      email: response.email,
      password: response.password,
      isEmailVerified: response.isEmailVerified,
      isPasswordChanged: response.isPasswordChanged,
      specialty: response.specialty,
      phone: response.phone,
      address: response.address
    };

    this.currentDoctorSubject.next(doctor);
    localStorage.setItem('currentDoctor', JSON.stringify(doctor));
  }

  resetPasswordConfirm(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password-confirm`, {
      token,
      newPassword
    });
  }
} 