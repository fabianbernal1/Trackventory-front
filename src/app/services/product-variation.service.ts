import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductVariation } from '../models/productVariation';
import baserUrl from './helper'; 

@Injectable({
  providedIn: 'root'
})
export class ProductVariationService {

  constructor(private httpClient: HttpClient) { }

  getProductVariationsByProductReference(reference: string): Observable<ProductVariation[]> {
    return this.httpClient.get<ProductVariation[]>(`${baserUrl}/product-variations/product/${reference}`).pipe(
    map(variations => variations.sort((a, b) => {
      return (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1;
    }))
  );
  }

  // Obtener todas las variaciones de producto ordenadas: habilitadas primero
getProductVariations(): Observable<ProductVariation[]> {
  return this.httpClient.get<ProductVariation[]>(`${baserUrl}/product-variations`).pipe(
    map(variations => variations.sort((a, b) => {
      return (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1;
    }))
  );
}

// Obtener solo las variaciones de producto activas (enabled = true)
getActiveProductVariations(): Observable<ProductVariation[]> {
  return this.httpClient.get<ProductVariation[]>(`${baserUrl}/product-variations`).pipe(
    map(variations => variations.filter(variation => variation.enabled))
  );
}


  createProductVariation(productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.post<ProductVariation>(`${baserUrl}/product-variations`, productVariation);
  }

  updateProductVariation(code: string, productVariation: ProductVariation): Observable<ProductVariation> {
    return this.httpClient.put<ProductVariation>(`${baserUrl}/product-variations/${code}`, productVariation);
  }

  deleteProductVariation(code: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/product-variations/${code}`);
  }
}
