import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

interface User {
  name: string;
  registry: string;
  email: string;
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  user: User = {
    name: '',
    registry: '',
    email: ''
  };
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  showUpdateForm = false;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.user = {
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        registry: currentUser.username,
        email: currentUser.email
      };
    }
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'Kullanıcı bilgileri alınamadı';
      this.isSubmitting = false;
      return;
    }

    const userData = {
      ...this.user,
      id: currentUser.id
    };

    this.userService.updateUser(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Bilgileriniz başarıyla güncellendi';
        this.authService.setCurrentUser(response);
        this.isSubmitting = false;
        this.showUpdateForm = false;
      },
      error: (error) => {
        this.errorMessage = 'Güncelleme sırasında bir hata oluştu';
        this.isSubmitting = false;
      }
    });
  }
} 