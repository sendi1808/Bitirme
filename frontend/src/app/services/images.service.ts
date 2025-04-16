import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Image {
  id: string;
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
}

export interface CreateImageDto {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  create(createImageDto: CreateImageDto): Observable<Image> {
    return this.http.post<Image>(`${this.apiUrl}/images`, createImageDto);
  }

  findOne(id: string): Observable<Image> {
    return this.http.get<Image>(`${this.apiUrl}/images/${id}`);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/images/${id}`);
  }

  upload(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/images/upload`, formData);
  }

  analyze(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/images/analyze`, formData);
  }

  getImage(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/images/${id}`);
  }

  deleteImage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/images/${id}`);
  }
} 