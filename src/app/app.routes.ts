import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { SignUpComponent } from './features/sign-up/sign-up.component';
import { EmailActivationComponent } from './features/email-activation/email-activation.component';
import { LoginComponent } from './features/login/login.component';
import { CoinComponent } from './features/coin/coin.component';
import { ProfileComponent } from './features/profile/profile.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { PasswordResetComponent } from './features/password-reset/password-reset.component';
import { TransactionReportComponent } from './features/transaction-report/transaction-report.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { AuthGuard } from './guards/auth-guard';
import { NoAuthGuard } from './guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'CashCraft - Dashboard',
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'CashCraft - Sign Up',
  },
  {
    path: 'activate',
    component: EmailActivationComponent,
    title: 'CashCraft - Account Activation',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'CashCraft - Login',
  },
  {
    path: 'coins/:coinId',
    component: CoinComponent,
    title: 'CashCraft - Coin Detail',
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    title: 'CashCraft - User Profile',
    canActivate: [AuthGuard],
  },
  {
    path: 'portfolio/:userId',
    component: PortfolioComponent,
    title: 'CashCraft - Portfolio',
    canActivate: [AuthGuard],
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    title: 'CashCraft - Password Reset',
    canActivate: [NoAuthGuard],
  },
  {
    path: 'transaction-report/:userId',
    component: TransactionReportComponent,
    title: 'CashCraft - Transaction Report',
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];
