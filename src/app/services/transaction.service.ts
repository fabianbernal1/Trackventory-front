import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transactions } from '../models/trasanctions';
import { TransactionDetails } from '../models/transactionDetails';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/transactions';

  constructor(private http: HttpClient) { }

  getAllTransactions(): Observable<Transactions[]> {
  return this.http.get<Transactions[]>(`${this.baseUrl}/all`).pipe(
    map(transactions => transactions.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveTransactions(): Observable<Transactions[]> {
  return this.http.get<Transactions[]>(`${this.baseUrl}/all`).pipe(
    map(transactions => transactions.filter(tx => tx.enabled))
  );
}


  // Obtener una transacción por ID
  getTransactionById(id: number): Observable<Transactions> {
    return this.http.get<Transactions>(`${this.baseUrl}/${id}`);
  }

  // Obtener los detalles de una transacción específica
  getTransactionDetailsByTransactionId(id: number): Observable<TransactionDetails[]> {
    return this.http.get<TransactionDetails[]>(`${this.baseUrl}/${id}/details`);
  }

  saveTransaction(
    transactionDetails: TransactionDetails[],
    buyerId: string,
    sellerId: string,
    transactionType: number,
    transactionOrigin: number,
    transactionDate?: Date | null
  ): Observable<Transactions> {
    let params = new HttpParams()
      .set('buyerId', buyerId.toString())
      .set('sellerId', sellerId.toString())
      .set('transactionType', transactionType.toString())
      .set('transactionOrigin', transactionOrigin.toString());

    if (transactionDate) {
      const dateObj = new Date(transactionDate);
      const formattedDate = dateObj.toISOString().slice(0, 16); 
      params = params.set('transactionDate', formattedDate);
    }

    return this.http.post<Transactions>(`${this.baseUrl}/save`, transactionDetails, { params });
  }

  // Obtener transacciones por tipo de transacción
  getTransactionsByType(transactionTypeId: number): Observable<Transactions[]> {
    const params = new HttpParams().set('transactionTypeId', transactionTypeId.toString());
    return this.http.get<Transactions[]>(`${this.baseUrl}/by-type`, { params });
  }

  // Eliminar una transacción por ID
  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
