import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  create(report: Partial<Report>): Observable<Report> {
    return this.http.post<Report>(`${this.apiUrl}/reports`, report);
  }

  findAll(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports`);
  }

  findOne(id: string): Observable<Report> {
    return this.http.get<Report>(`${this.apiUrl}/reports/${id}`);
  }

  findByPatient(patientId: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/patient/${patientId}`);
  }

  update(id: string, report: Partial<Report>): Observable<Report> {
    return this.http.patch<Report>(`${this.apiUrl}/reports/${id}`, report);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reports/${id}`);
  }
} 