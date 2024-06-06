import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoinService } from '../../services/coin.service';
import { CoinChartComponent } from '../../components/shared/coin-chart/coin-chart.component';
import { GuestPageComponent } from '../../components/shared/guest-page/guest-page.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
import { NotificationService } from '../../services/notification.service';
import { Validation } from '../../utils/constants/user-validation';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterModule,
    NavbarComponent,
    HttpClientModule,
    CommonModule,
    CoinChartComponent,
    GuestPageComponent,
    FooterComponent,
    LoadingSpinnerComponent,
  ],
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public isLoggedIn: boolean;
  public loading: boolean = true;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    setTimeout(() => {
      this.loading = true;
      this.authService.getLoggedInStatus().subscribe({
        next: (loggedIn: boolean) => {
          this.loading = false;
          this.isLoggedIn = loggedIn;
        },
        error: () => {
          this.loading = false;
          this.notificationService.error(Validation.login.loginStatusFail);
        },
      });
    }, 750);
  }
}
