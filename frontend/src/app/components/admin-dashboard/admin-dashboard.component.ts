import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
  }

  async loadData(): Promise<void> {
    try {
      this.isLoading = true;
      this.doctors = await this.adminService.getDoctors();
      this.patients = await this.adminService.getPatients();
      this.appointments = await this.adminService.getAppointments();
    } catch (error: any) {
      this.errorMessage = error.message || 'Veriler yüklenirken bir hata oluştu';
    } finally {
      this.isLoading = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
} 