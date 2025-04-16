import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <a [routerLink]="['/doctor-dashboard']">SPİNOVA</a>
      </div>
      
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item" [routerLink]="['/doctor-dashboard']">
            Hasta Arşivi
          </a>
        </div>
        
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary" [routerLink]="['/my-account']">
                Hesabım
              </a>
              <button class="button is-light" (click)="logout()">
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
    }

    .navbar-brand a {
      color: inherit;
      text-decoration: none;
    }

    .navbar-menu {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .navbar-start {
      display: flex;
      gap: 1rem;
    }

    .navbar-end {
      display: flex;
      gap: 1rem;
    }

    .navbar-item {
      color: #4a4a4a;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .navbar-item:hover {
      background-color: #f5f5f5;
    }

    .button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s;
    }

    .button.is-primary {
      background-color: #3498db;
      color: white;
    }

    .button.is-primary:hover {
      background-color: #2980b9;
    }

    .button.is-light {
      background-color: #f5f5f5;
      color: #363636;
    }

    .button.is-light:hover {
      background-color: #e8e8e8;
    }
  `]
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 