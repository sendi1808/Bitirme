import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.loadCurrentUser();
    }
  }

  private loadCurrentUser(): void {
    this.http.get<any>(`${this.apiUrl}/users/me`).subscribe(
      user => this.currentUserSubject.next(user),
      () => this.currentUserSubject.next(null)
    );
  }

  login(sicilNo: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { sicilNo, password }).pipe(
      tap(response => {
        if (response?.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);

          if (response.isFirstLogin) {
            this.router.navigate(['/set-password']);
          } else {
            this.router.navigate(['/doctor-dashboard']);
          }
        }
      })
    );
  }

  setPassword(password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/set-password`, { password, email });
  }

  forgotPassword(sicilNo: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/forgot-password`, { sicilNo, email });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
