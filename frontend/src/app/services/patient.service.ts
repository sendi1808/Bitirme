import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';
import { Report } from '../models/report.model';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:8080/api/patients';
  private patientsSubject = new BehaviorSubject<Patient[]>([]);
  patients$ = this.patientsSubject.asObservable();
  private patients: Patient[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.loadPatients();
  }

  private getAuthHeaders() {
    const token = this.authService.getToken();
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  getPatient(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  getPatientByTcNo(tcNo: string): Patient | undefined {
    return this.patients.find(patient => patient.tcNo === tcNo);
  }

  loadPatients(): void {
    const doctor = this.authService.getCurrentDoctor();
    if (doctor) {
      this.http.get<Patient[]>(`${this.apiUrl}/doctor/${doctor.id}`, {
        headers: this.getAuthHeaders()
      }).subscribe(
        patients => this.patientsSubject.next(patients),
        error => console.error('Hastalar yüklenirken hata:', error)
      );
    }
  }

  addPatient(patient: Patient): Observable<Patient> {
    this.patients.push(patient);
    return of(patient);
  }

  updatePatient(id: number, patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiUrl}/${id}`, patient);
  }

  deletePatient(tcNo: string): Observable<void> {
    const index = this.patients.findIndex(patient => patient.tcNo === tcNo);
    if (index !== -1) {
      this.patients.splice(index, 1);
      return of(undefined);
    }
    throw new Error('Hasta bulunamadı');
  }

  addReport(patientId: number, report: Omit<Report, 'id' | 'patientId' | 'doctorId'>): Observable<Report> {
    const doctor = this.authService.getCurrentDoctor();
    if (!doctor) {
      throw new Error('Doktor bilgisi bulunamadı');
    }

    const newReport = {
      ...report,
      patientId,
      doctorId: doctor.id
    };

    return this.http.post<Report>(`${this.apiUrl}/${patientId}/reports`, newReport, {
      headers: this.getAuthHeaders()
    });
  }

  getPatientReports(patientId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.apiUrl}/${patientId}/reports`, {
      headers: this.getAuthHeaders()
    });
  }
} 