import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import baserUrl from './helper'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Product[]> {
  return this.httpClient.get<Product[]>(`${baserUrl}/products`).pipe(
    map(products => products.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveProducts(): Observable<Product[]> {
  return this.httpClient.get<Product[]>(`${baserUrl}/products`).pipe(
    map(products => products.filter(product => product.enabled))
  );
}


  getProductById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${baserUrl}/products/${productId}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(`${baserUrl}/products`, product);
  }

  updateProduct(productId: string, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${baserUrl}/products/${productId}`, product);
  }

  deleteProduct(productId: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/products/${productId}`);
  }

  getFilteredProducts(
    productId?: string,
    name?: string,
    purchasePrice?: number,
    salePrice?: number,
    categoryId?: string
  ): Observable<Product[]> {
    let params = new HttpParams();

    if (productId) params = params.set('productId', productId);
    if (name) params = params.set('name', name);
    if (purchasePrice !== undefined && purchasePrice !== null) {
      params = params.set('purchasePrice', purchasePrice.toString());
    }
    if (salePrice !== undefined && salePrice !== null) {
      params = params.set('salePrice', salePrice.toString());
    }
    if (categoryId) params = params.set('categoryId', categoryId);

    return this.httpClient.get<Product[]>(`${baserUrl}/products`, { params });
  }
}
