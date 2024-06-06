import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { Validation } from '../../utils/constants/user-validation';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'cc-portfolio',
  standalone: true,
  imports: [CommonModule, NavbarComponent, LoadingSpinnerComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
})
export class PortfolioComponent implements OnInit {
  public userId: number;
  public portfolio: any[] = [];
  public loading: boolean = false;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['userId'];
    this.getPortfolio();
  }

  getPortfolio() {
    this.loading = true;
    setTimeout(() => {
      this.transactionService.fetchPortfolio(this.userId).subscribe({
        next: (response: any) => {
          this.portfolio = response;
          this.loading = false;
        },
        error: () => {
          this.notificationService.error(
            Validation.coin.fetchPortfolioError,
            5000
          );
        },
      });
    }, 1000);
  }
}
