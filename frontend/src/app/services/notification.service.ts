import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();

  showSuccess(message: string): void {
    this.notificationSubject.next({ type: 'success', message });
    setTimeout(() => this.clearNotification(), 3000);
  }

  showError(message: string): void {
    this.notificationSubject.next({ type: 'error', message });
    setTimeout(() => this.clearNotification(), 3000);
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }
} 