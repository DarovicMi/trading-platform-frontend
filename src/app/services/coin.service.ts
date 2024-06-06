import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Coin } from '../entities/Coin';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  fetchCoins() {
    return this.http.get<Coin[]>(`${this.apiUrl}/api/market/coins`);
  }

  fetchCoinById(coinId: string) {
    return this.http.get<Coin>(`${this.apiUrl}/api/market/coins/${coinId}`);
  }

  fetchMarketDataByCoinId(coinId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/api/market/coins/market-data/${coinId}`
    );
  }

  updateCoins() {
    return this.http.post(`${this.apiUrl}/api/market/add-coins`, {});
  }

  updateMarketData(coinId: string, days: string) {
    const params = new HttpParams().set('coinId', coinId).set('days', days);
    return this.http.post(
      `${this.apiUrl}/api/market/coins/add-market-data`,
      {},
      { params }
    );
  }
}
