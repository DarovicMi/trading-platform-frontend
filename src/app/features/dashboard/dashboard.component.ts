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
  ],
  providers: [AuthService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private coinService: CoinService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.authService.getLoggedInStatus().subscribe({
      next: (loggedIn: boolean) => {
        this.isLoggedIn = loggedIn;
      },
      error: (error: any) => {
        console.error('Failed to check login status:', error);
      },
    });
  }
}
