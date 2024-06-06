import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { Coin } from '../../entities/Coin';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Chart, registerables, ChartConfiguration } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { subDays, isAfter } from 'date-fns';
import { NotificationService } from '../../services/notification.service';
import { Validation } from '../../utils/constants/user-validation';
import { BuyCryptoCurrencyModalComponent } from '../../components/layout/modals/buy-crypto-currency-modal/buy-crypto-currency-modal.component';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'cc-coin',
  standalone: true,
  imports: [
    CommonModule,
    BuyCryptoCurrencyModalComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './coin.component.html',
  styleUrl: './coin.component.scss',
})
export class CoinComponent implements OnInit {
  public coin: Coin;
  public loading: boolean = true;
  public chart: Chart | null = null;
  public marketData: any[] = [];

  private numberOfDays = '7';

  constructor(
    private coinService: CoinService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const coinId = params['coinId'];
      this.updateMarketData(coinId, this.numberOfDays);
      setTimeout(() => {
        this.fetchCoinById(coinId);
      }, 500);
    });
  }

  private updateMarketData(coinId: string, days: string) {
    this.coinService.updateMarketData(coinId, days).subscribe({
      error: (error) => console.error(error),
    });
  }

  fetchCoinById(coinId: string) {
    this.loading = true;
    this.coinService.fetchCoinById(coinId).subscribe({
      next: (coin) => {
        this.coin = coin;
        this.loading = false;
        setTimeout(() => {
          this.fetchMarketDataByCoinId(this.coin.id);
        }, 200);
      },
      error: () => {
        this.notificationService.error(Validation.coin.failedToFetchCoin);
        this.loading = false;
      },
    });
  }

  fetchMarketDataByCoinId(coinId: number) {
    this.coinService.fetchMarketDataByCoinId(coinId).subscribe({
      next: (data) => {
        this.marketData = data;
        this.buildChart(this.marketData);
      },
      error: () => {
        // this.notificationService.error(Validation.coin.failedToFetchMarketData);
      },
    });
  }

  private filterMarketDataLast7Days(marketData: any[]): any[] {
    const now = new Date();
    const sevenDaysAgo = subDays(now, 7);

    return marketData.filter((data) => {
      const date = new Date(parseInt(data.timestamp));
      return isAfter(date, sevenDaysAgo);
    });
  }

  private buildChart(marketData: any[]): void {
    const ctx = (
      document.getElementById('coinChartCanvas') as HTMLCanvasElement
    ).getContext('2d');

    const last7DaysData = this.filterMarketDataLast7Days(marketData);

    const labels = last7DaysData.map(
      (data) => new Date(parseInt(data.timestamp))
    );
    const data = last7DaysData.map((data) => +data.price);

    const chartConfig: ChartConfiguration<'line', number[], Date> = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Price over last 7 days',
            data: data,
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          tooltip: {
            mode: 'index',
          },
        },
      },
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, chartConfig);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
