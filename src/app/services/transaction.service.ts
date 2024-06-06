import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../entities/Transaction';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private API_URL = environment.API_URL;

  constructor(private http: HttpClient) {}

  buyCryptoCurrency(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/api/transaction/buy`, {
      transaction,
    });
  }

  sellCryptoCurrency(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.API_URL}/api/transaction/sell`, {
      transaction,
    });
  }

  getUserCoinBalance(
    userId: number,
    coinId: number
  ): Observable<{ coinBalance: number }> {
    return this.http.post<{ coinBalance: number }>(
      `${this.API_URL}/api/transaction/user/coin/balance`,
      { userId, coinId }
    );
  }

  fetchPortfolio(userId: number) {
    return this.http.get(`${this.API_URL}/api/transaction/portfolio/${userId}`);
  }
  fetchTransactionReport(userId: number): Observable<any> {
    return this.http.get(
      `${this.API_URL}/api/transaction/transactions/${userId}`
    );
  }
}
