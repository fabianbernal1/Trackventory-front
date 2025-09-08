import { ProductCategory } from "./productCategory";

export interface Product {
  productId: string;       
  name: string;
  purchasePrice: number;   
  salePrice: number;       
  profitMargin: number;    
  enabled: boolean;          
  category: ProductCategory | null;
}
