import { MarketData } from './MarketData';

export class Coin {
  id: number;
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  fullyDilutedValuation?: number;
  totalVolume: number;
  high24h: number;
  low24h: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  circulatingSupply: number;
  totalSupply?: number;
  maxSupply?: number;
  ath?: number;
  athDate?: Date;
  atl?: number;
  atlDate?: Date;
  lastUpdated: Date;
  marketData?: MarketData[];

  constructor(data?: Partial<Coin>) {
    if (data) {
      this.id = data.id;
      this.coinId = data.coinId;
      this.symbol = data.symbol;
      this.name = data.name;
      this.image = data.image;
      this.currentPrice = data.currentPrice;
      this.marketCap = data.marketCap;
      this.marketCapRank = data.marketCapRank;
      this.fullyDilutedValuation = data.fullyDilutedValuation;
      this.totalVolume = data.totalVolume;
      this.high24h = data.high24h;
      this.low24h = data.low24h;
      this.priceChange24h = data.priceChange24h;
      this.priceChangePercentage24h = data.priceChangePercentage24h;
      this.circulatingSupply = data.circulatingSupply;
      this.totalSupply = data.totalSupply;
      this.maxSupply = data.maxSupply;
      this.ath = data.ath;
      this.athDate = data.athDate;
      this.atl = data.atl;
      this.atlDate = data.atlDate;
      this.lastUpdated = data.lastUpdated;
      this.marketData = data.marketData;
    }
  }
}
