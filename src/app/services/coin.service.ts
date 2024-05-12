import { HttpClient } from '@angular/common/http';
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
}
