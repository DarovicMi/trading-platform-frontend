import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { EmailActivationComponent } from './features/email-activation/email-activation.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'CashCraft - Dashboard',
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent, title: 'CashCraft - Sign Up' },
  {
    path: 'activate',
    component: EmailActivationComponent,
    title: 'CashCraft - Account Activation',
  },
  { path: 'login', component: LoginComponent, title: 'CashCraft - Login' },
];
