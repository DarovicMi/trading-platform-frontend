import { Component, OnInit, HostListener } from '@angular/core';
import { CoinService } from '../../../services/coin.service';
import { Coin } from '../../../entities/Coin';
import { ChartConfiguration, Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cc-coin-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './coin-chart.component.html',
  styleUrl: './coin-chart.component.scss',
})
export class CoinChartComponent implements OnInit {
  public chart: Chart | null = null;
  public coins: Coin[] = [];
  public visibleCoins: Coin[] = [];
  public currentIndex: number = 10;

  constructor(private coinService: CoinService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.fetchAndBuildChart();
  }

  private fetchAndBuildChart(): void {
    this.coinService.fetchCoins().subscribe({
      next: (coins) => {
        this.coins = coins;
        this.visibleCoins = this.coins.slice(0, 10);
        if (coins.length) {
          this.buildChart(coins);
        }
      },
      error: (error) => console.error('Error fetching coin data:', error),
    });
  }

  loadMore(): void {
    if (this.currentIndex < this.coins.length) {
      let nextChunk = this.coins.slice(
        this.currentIndex,
        this.currentIndex + 10
      );
      this.visibleCoins = [...this.visibleCoins, ...nextChunk];
      this.currentIndex += 10;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.buildChart(this.coins);
  }

  private buildChart(coins: Coin[]): void {
    const screenWidth = window.innerWidth;
    const step = screenWidth > 768 ? 1 : 3;

    const filteredCoins = coins.filter((_, index) => index % step === 0);
    const labels = filteredCoins.map((coin) => coin.name);
    const data = filteredCoins.map((coin) => coin.currentPrice);
    const ctx = (
      document.getElementById('coinChartCanvas') as HTMLCanvasElement
    ).getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, 'rgba(75, 192, 192, 0.8)');
    gradientFill.addColorStop(1, 'rgba(75, 192, 192, 0.1)');

    const chartConfig: ChartConfiguration<'line', number[], string> = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Current Price',
            data: data,
            fill: true,
            backgroundColor: gradientFill,
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
            grid: {
              color: 'rgba(200, 200, 200, 0.2)',
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              autoSkip: false,
              callback: function (val, index) {
                return index % 4 === 0
                  ? this.getLabelForValue(val as number)
                  : '';
              },
              autoSkipPadding: 50,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'rgb(75, 192, 192)',
            },
          },
          tooltip: {
            backgroundColor: 'rgba(0 ,0, 0, 0.7)',
            titleColor: 'white',
            bodyColor: 'white',
            bodySpacing: 5,
            padding: 10,
          },
        },
      },
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, chartConfig);
  }
}
