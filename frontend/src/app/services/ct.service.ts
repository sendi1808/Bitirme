import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CTService {
  private apiUrl = 'http://localhost:8080/api/ct';

  constructor(private http: HttpClient) {}

  uploadCT(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/ct/upload`, formData);
  }

  analyzeCT(formData: FormData): Observable<{
    huValue: number;
    csaValue: number;
    diagnosis?: string;
  }> {
    return this.http.post<{
      huValue: number;
      csaValue: number;
      diagnosis?: string;
    }>(`${this.apiUrl}/ct/analyze`, formData);
  }

  getCTById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ct/${id}`);
  }

  getPatientCT(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ct/patient/${patientId}`);
  }

  generateReport(ctId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/ct/${ctId}/report`, {
      responseType: 'blob'
    });
  }

  deleteCT(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ct/${id}`);
  }
} 