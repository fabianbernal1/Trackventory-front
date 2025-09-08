import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../models/productCategory';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${baserUrl}/categories`;

  constructor(private httpClient: HttpClient) { }

  // Obtener todas las categorías ordenadas: habilitadas primero
  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.apiUrl).pipe(
      map(categories => categories.sort((a, b) => {
        return (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1;
      }))
    );
  }

  // Obtener solo categorías activas (enabled = true)
  getActiveCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(this.apiUrl).pipe(
      map(categories => categories.filter(cat => cat.enabled))
    );
  }

  // Obtener una categoría por ID
  getCategoryById(id: number): Observable<ProductCategory> {
    return this.httpClient.get<ProductCategory>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva categoría
  createCategory(category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.post<ProductCategory>(this.apiUrl, category);
  }

  // Actualizar una categoría existente
  updateCategory(id: number, category: ProductCategory): Observable<ProductCategory> {
    return this.httpClient.put<ProductCategory>(`${this.apiUrl}/${id}`, category);
  }

  // Eliminar una categoría por ID
  deleteCategory(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
