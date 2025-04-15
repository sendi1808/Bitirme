import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Spinova API Çalışıyor! Hoş geldiniz!';
  }
} 