import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordConfirmComponent } from './components/reset-password-confirm/reset-password-confirm.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { 
    path: 'set-password', 
    loadChildren: () => import('./components/set-password/set-password.module').then(m => m.SetPasswordModule)
  },
  { 
    path: 'verify-email', 
    loadChildren: () => import('./components/verify-email/verify-email.module').then(m => m.VerifyEmailModule)
  },
  { 
    path: 'doctor-dashboard', 
    loadChildren: () => import('./components/doctor-dashboard/doctor-dashboard.module').then(m => m.DoctorDashboardModule),
    canActivate: [AuthGuard],
    data: { layout: true }
  },
  { 
    path: 'patient-dashboard', 
    loadChildren: () => import('./components/patient-dashboard/patient-dashboard.module').then(m => m.PatientDashboardModule),
    canActivate: [AuthGuard],
    data: { layout: true }
  },
  { 
    path: 'admin-dashboard', 
    loadChildren: () => import('./components/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule),
    canActivate: [AuthGuard],
    data: { layout: true }
  },
  {
    path: 'reset-password-confirm',
    component: ResetPasswordConfirmComponent
  },
  {
    path: 'my-account',
    loadChildren: () => import('./components/my-account/my-account.module').then(m => m.MyAccountModule),
    canActivate: [AuthGuard],
    data: { layout: true }
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
