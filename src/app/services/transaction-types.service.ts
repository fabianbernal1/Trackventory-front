import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { TransactionTypes } from '../models/transactionTypes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypesService {

  constructor(private httpClient: HttpClient) { }

  getTransactionTypes(): Observable<TransactionTypes[]> {
  return this.httpClient.get<TransactionTypes[]>(`${baserUrl}/transactionTypes`).pipe(
    map(types => types.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveTransactionTypes(): Observable<TransactionTypes[]> {
  return this.httpClient.get<TransactionTypes[]>(`${baserUrl}/transactionTypes`).pipe(
    map(types => types.filter(type => type.enabled))
  );
}


  // Obtener un tipo de transacción por ID
  getTransactionTypeById(id: number): Observable<TransactionTypes> {
    return this.httpClient.get<TransactionTypes>(`${baserUrl}/transactionTypes/${id}`);
  }

  // Crear un nuevo tipo de transacción
  createTransactionType(transactionType: TransactionTypes): Observable<TransactionTypes> {
    return this.httpClient.post<TransactionTypes>(`${baserUrl}/transactionTypes`, transactionType);
  }

  // Actualizar un tipo de transacción existente
  updateTransactionType(id: number, transactionType: TransactionTypes): Observable<TransactionTypes> {
    return this.httpClient.put<TransactionTypes>(`${baserUrl}/transactionTypes/${id}`, transactionType);
  }

  // Eliminar un tipo de transacción por ID
  deleteTransactionType(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/transactionTypes/${id}`);
  }
}
