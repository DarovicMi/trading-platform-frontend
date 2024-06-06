export class Transaction {
  id: number;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
  timestamp: Date;
  userId: number;
  coinId: number;
}
