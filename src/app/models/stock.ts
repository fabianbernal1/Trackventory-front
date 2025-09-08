import { Store } from './store';
import { ProductVariation } from './productVariation';

export interface StockId {
  store: Store;
  variation: ProductVariation;
}

export interface Stock {
  id: StockId; 
  quantity: number;
  enabled: boolean;
}

