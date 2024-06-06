import { TransactionService } from './../../services/transaction.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { NavbarComponent } from '../../components/layout/navbar/navbar.component';
import { FooterComponent } from '../../components/layout/footer/footer.component';
@Component({
  selector: 'cc-transaction-report',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './transaction-report.component.html',
  styleUrl: './transaction-report.component.scss',
})
export class TransactionReportComponent implements OnInit {
  public transactions: any[] = [];
  public loading: boolean = false;
  public userId: number;

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.params['userId'];
    this.getTransactionReport();
  }

  getTransactionReport() {
    this.loading = true;
    setTimeout(() => {
      this.transactionService.fetchTransactionReport(this.userId).subscribe({
        next: (transactions) => {
          this.transactions = transactions;
          this.loading = false;
        },
        error: () => {
          this.notificationService.error('Failed to load transactions', 5000);
          this.loading = false;
        },
      });
    }, 2000);
  }
}
