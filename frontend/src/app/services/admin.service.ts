import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  async getDoctors(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/doctors`));
      return response as any[];
    } catch (error) {
      console.error('Doktorlar yüklenirken hata:', error);
      throw error;
    }
  }

  async getPatients(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/patients`));
      return response as any[];
    } catch (error) {
      console.error('Hastalar yüklenirken hata:', error);
      throw error;
    }
  }

  async getAppointments(): Promise<any[]> {
    try {
      const response = await firstValueFrom(this.http.get(`${this.apiUrl}/appointments`));
      return response as any[];
    } catch (error) {
      console.error('Randevular yüklenirken hata:', error);
      throw error;
    }
  }

  async createDoctor(doctorData: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/doctors`, doctorData));
      return response;
    } catch (error) {
      console.error('Doktor oluşturulurken hata:', error);
      throw error;
    }
  }

  async updateDoctor(id: number, doctorData: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.put(`${this.apiUrl}/doctors/${id}`, doctorData));
      return response;
    } catch (error) {
      console.error('Doktor güncellenirken hata:', error);
      throw error;
    }
  }

  async deleteDoctor(id: number): Promise<void> {
    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/doctors/${id}`));
    } catch (error) {
      console.error('Doktor silinirken hata:', error);
      throw error;
    }
  }
} 