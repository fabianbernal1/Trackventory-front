import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { TransactionOrigins } from '../models/transactionOrigins';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionOriginsService {

  constructor(private httpClient: HttpClient) {}

  getTransactionOrigins(): Observable<TransactionOrigins[]> {
  return this.httpClient.get<TransactionOrigins[]>(`${baserUrl}/transactionOrigins`).pipe(
    map(origins => origins.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveTransactionOrigins(): Observable<TransactionOrigins[]> {
  return this.httpClient.get<TransactionOrigins[]>(`${baserUrl}/transactionOrigins`).pipe(
    map(origins => origins.filter(origin => origin.enabled))
  );
}


  // Obtener un origen de transacción por ID
  getTransactionOriginById(id: number): Observable<TransactionOrigins> {
    return this.httpClient.get<TransactionOrigins>(`${baserUrl}/transactionOrigins/${id}`);
  }

  // Crear un nuevo origen de transacción
  createTransactionOrigin(transactionOrigin: TransactionOrigins): Observable<TransactionOrigins> {
    return this.httpClient.post<TransactionOrigins>(`${baserUrl}/transactionOrigins`, transactionOrigin);
  }

  // Actualizar un origen de transacción existente
  updateTransactionOrigin(id: number, transactionOrigin: TransactionOrigins): Observable<TransactionOrigins> {
    return this.httpClient.put<TransactionOrigins>(`${baserUrl}/transactionOrigins/${id}`, transactionOrigin);
  }

  // Eliminar un origen de transacción por ID
  deleteTransactionOrigin(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/transactionOrigins/${id}`);
  }
}
