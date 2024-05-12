export class MarketData {
  id: number;
  price: number;
  timestamp: number;

  constructor(data?: Partial<MarketData>) {
    if (data) {
      this.id = data.id;
      this.price = data.price;
      this.timestamp = data.timestamp;
    }
  }
}
