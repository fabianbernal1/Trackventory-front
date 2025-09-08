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

  // Crear usuario
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${baserUrl}/users/`, user);
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


  // Obtener usuario por username
  getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${baserUrl}/users/${username}`);
  }

  // Actualizar usuario (por ID)
  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${baserUrl}/users/${id}`, user);
  }

  // Eliminar usuario (por ID)
  deleteUser(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/users/${id}`);
  }

  // Validar token
  validateToken(): Observable<any> {
    return this.httpClient.get<any>(`${baserUrl}/users/validate-token`);
  }
}
