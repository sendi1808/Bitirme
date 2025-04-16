import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { DoctorDashboardComponent } from './components/doctor-dashboard/doctor-dashboard.component';
import { PatientDetailsComponent } from './components/patient-details/patient-details.component';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { EmailVerificationComponent } from './components/email-verification/email-verification.component';
import { TestConnectionComponent } from './components/test-connection/test-connection.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SetPasswordComponent } from './components/set-password/set-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'set-password', component: SetPasswordComponent },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [AuthGuard] },
  { path: 'doctor-dashboard', component: DoctorDashboardComponent, canActivate: [AuthGuard] },
  { path: 'patient-details/:tcNo', component: PatientDetailsComponent, canActivate: [AuthGuard] },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'email-verification', component: EmailVerificationComponent },
  { path: 'test-connection', component: TestConnectionComponent },
  { path: '**', redirectTo: '/login' }
];
