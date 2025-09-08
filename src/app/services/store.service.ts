import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import baserUrl from './helper';  // Asume que tienes una configuración de URL base.
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getStores(): Observable<Store[]> {
  return this.httpClient.get<Store[]>(`${baserUrl}/stores`).pipe(
    map(stores => stores.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveStores(): Observable<Store[]> {
  return this.httpClient.get<Store[]>(`${baserUrl}/stores`).pipe(
    map(stores => stores.filter(store => store.enabled))
  );
}


  getStoreById(id: number): Observable<Store> {
    return this.httpClient.get<Store>(`${baserUrl}/stores/${id}`);
  }

  createStore(store: Store): Observable<Store> {
    return this.httpClient.post<Store>(`${baserUrl}/stores`, store);
  }

  updateStore(id: number, store: Store): Observable<Store> {
    return this.httpClient.put<Store>(`${baserUrl}/stores/${id}`, store);
  }

  deleteStore(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/stores/${id}`);
  }
}
