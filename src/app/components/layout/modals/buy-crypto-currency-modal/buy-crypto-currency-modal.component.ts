import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Coin } from '../../../../entities/Coin';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../entities/User';
import { NotificationService } from '../../../../services/notification.service';
import { Validation } from '../../../../utils/constants/user-validation';
import { TransactionService } from '../../../../services/transaction.service';
import { Transaction } from '../../../../entities/Transaction';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'cc-buy-crypto-currency-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  templateUrl: './buy-crypto-currency-modal.component.html',
  styleUrl: './buy-crypto-currency-modal.component.scss',
})
export class BuyCryptoCurrencyModalComponent implements OnInit {
  @Input() coin: Coin;

  isModalOpen: boolean = false;
  amount: number = 1;
  currentUser: User;
  confirmButton: string = 'Confirm';
  loading: boolean = false;
  transaction: Transaction;
  userCoinBalance: number = 0;
  number = Number;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private transactionService: TransactionService
  ) {
    this.transaction = new Transaction();
  }

  ngOnInit(): void {}

  private getCurrentUser() {
    this.userService.getCurrentLoggedInUser().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.transaction.type = 'BUY';
        this.getUserCoinBalance(this.currentUser.id, this.coin.id);
      },
      error: () =>
        this.notificationService.error(Validation.profile.failToGetProfile),
    });
  }

  openModal() {
    this.isModalOpen = true;
    this.getCurrentUser();
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getUserCoinBalance(userId: number, coinId: number) {
    this.transactionService.getUserCoinBalance(userId, coinId).subscribe({
      next: (response) => {
        this.userCoinBalance = response.coinBalance;
      },
      error: () => {
        this.loading = false;
        this.notificationService.error('Error checking coin balance', 5000);
      },
    });
  }
  confirmAction() {
    this.loading = true;
    this.transaction.userId = this.currentUser.id;
    this.transaction.coinId = this.coin.id;

    if (isNaN(this.amount) || this.amount <= 0) {
      this.loading = false;
      this.notificationService.error(Validation.coin.invalidAmount, 5000);
      return;
    }

    this.transaction.amount = this.amount;

    if (
      this.transaction.type === 'BUY' &&
      this.currentUser.balance < this.coin.currentPrice * this.amount
    ) {
      this.loading = false;
      this.notificationService.error(
        'Not enough funds to complete the purchase',
        5000
      );
      return;
    }

    if (this.transaction.type === 'SELL') {
      this.getUserCoinBalance(this.currentUser.id, this.coin.id);
      if (this.userCoinBalance < this.amount) {
        this.loading = false;
        this.notificationService.error(
          Validation.coin.notEnoughFundsError,
          5000
        );
        return;
      }
      this.executeTransaction();
    } else {
      this.executeTransaction();
    }
  }

  executeTransaction() {
    const transactionObservable =
      this.transaction.type === 'BUY'
        ? this.transactionService.buyCryptoCurrency(this.transaction)
        : this.transactionService.sellCryptoCurrency(this.transaction);

    setTimeout(() => {
      transactionObservable.subscribe({
        next: (transaction) => {
          this.transaction = transaction;
          this.loading = false;
          this.updateUserBalance();
          this.notificationService.success(
            Validation.coin.buyOrSellCoinSuccess,
            5000
          );
          this.closeModal();
        },
        error: () => {
          this.loading = false;
          this.notificationService.error(Validation.coin.buyCoinError, 5000);
        },
      });
    }, 2000);
  }

  updateUserBalance() {
    if (this.transaction.type === 'BUY') {
      this.currentUser.balance -= this.coin.currentPrice * this.amount;
    } else {
      this.currentUser.balance += this.coin.currentPrice * this.amount;
    }
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
