import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';
import baserUrl from './helper';  // Importa el helper que contiene la URL base
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private httpClient: HttpClient) { }

  getAllStocks(): Observable<Stock[]> {
  return this.httpClient.get<Stock[]>(`${baserUrl}/stocks`).pipe(
    map(stocks => stocks.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveStocks(): Observable<Stock[]> {
  return this.httpClient.get<Stock[]>(`${baserUrl}/stocks`).pipe(
    map(stocks => stocks.filter(stock => stock.enabled))
  );
}


  // Obtener un stock por tienda y variación (ID compuesto)
  getStockById(storeId: number, variationCode: string): Observable<Stock> {
    return this.httpClient.get<Stock>(`${baserUrl}/stocks/${storeId}/${variationCode}`)
  }


  // Crear un nuevo stock
  createStock(stock: Stock): Observable<Stock> {
    return this.httpClient.post<Stock>(`${baserUrl}/stocks`, stock);
  }

  // Actualizar un stock existente
  updateStock(storeId: number, variationCode: string, stock: Stock): Observable<Stock> {
    return this.httpClient.put<Stock>(`${baserUrl}/stocks/${storeId}/${variationCode}`, stock);
  }


  // Eliminar un stock por tienda y variación (ID compuesto)
  deleteStock(storeId: number, variationCode: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/stocks/${storeId}/${variationCode}`);
  }


  // Obtener stocks por tienda
  getStockByStoreId(storeId: number): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${baserUrl}/stocks/store/${storeId}`).pipe(
    map(stocks => stocks.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
  }

  // Obtener stocks por variación de producto
  getStockByVariationCode(variationCode: string): Observable<Stock[]> {
    return this.httpClient.get<Stock[]>(`${baserUrl}/stocks/variation/${variationCode}`).pipe(
    map(stocks => stocks.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
  }

  // Descargar el reporte de Excel
  downloadExcelReport(): Observable<Blob> {
    return this.httpClient.get(`${baserUrl}/stocks/report`, {
      responseType: 'blob', // Indicamos que el backend devuelve un archivo binario
    });
  }
}
