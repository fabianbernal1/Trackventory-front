import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/sale';
import { SaleDetail } from '../models/saleDetail';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(private http: HttpClient) {}

  // Método para obtener todas las ventas
  getAllSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${baserUrl}/all`);
  }

  // Método para obtener una venta por ID
  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${baserUrl}/${id}`);
  }

  // Método para obtener los detalles de una venta específica
  getSaleDetailsBySaleId(id: number): Observable<SaleDetail[]> {
    return this.http.get<SaleDetail[]>(`${baserUrl}/${id}/details`);
  }

  // Método para guardar o actualizar una venta
  saveSale(saleDetails: SaleDetail[]): Observable<Sale> {
    return this.http.post<Sale>(`${baserUrl}/save`, saleDetails);
  }  

  // Método para eliminar una venta por ID
  deleteSale(id: number): Observable<void> {
    return this.http.delete<void>(`${baserUrl}/delete/${id}`);
  }
}
