import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from './helper';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  createUser(user: User, password: string|null): Observable<User> {
    const payload = { user, password };
    return this.httpClient.post<User>(`${baserUrl}/users/`, payload);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${baserUrl}/users`).pipe(
      map(users => users.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
    );
  }

  getActiveUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${baserUrl}/users`).pipe(
      map(users => users.filter(user => user.enabled))
    );
  }


  // Obtener usuario por id
  getUserById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${baserUrl}/users/${id}`);
  }

  // Obtener usuario por username
  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${baserUrl}/users/username/${username}`);
  }

  updateUser(id: string, user: User, password?: string): Observable<User> {
    const payload = { user, password };
    return this.httpClient.put<User>(`${baserUrl}/users/${id}`, payload);
  }

  // Eliminar usuario (por ID)
  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/users/${id}`);
  }

  // Validar token
  validateToken(): Observable<any> {
    return this.httpClient.get<any>(`${baserUrl}/users/validate-token`);
  }

  updatePassword(username: string): Observable<User> {
    return this.httpClient.put<User>(`${baserUrl}/users/UpdatePassword/${username}`, {});
  }

}
