import { Color } from "./color";
import { Product } from "./product";

export interface ProductVariation {
    variationId: string;
    color: Color;
    product: Product;
    enabled: boolean;
  }