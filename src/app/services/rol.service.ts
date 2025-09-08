import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol'; // Ajusta la ruta si es necesario
import baserUrl from './helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Rol[]> {
  return this.httpClient.get<Rol[]>(`${baserUrl}/roles`).pipe(
    map(roles => roles.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveRoles(): Observable<Rol[]> {
  return this.httpClient.get<Rol[]>(`${baserUrl}/roles`).pipe(
    map(roles => roles.filter(rol => rol.enabled))
  );
}


  // Obtener un rol por ID
  getRolById(id: number): Observable<Rol> {
    return this.httpClient.get<Rol>(`${baserUrl}/roles/${id}`);
  }

  // Crear un nuevo rol
  createRol(rol: Rol): Observable<Rol> {
    return this.httpClient.post<Rol>(`${baserUrl}/roles`, rol);
  }

  // Actualizar un rol existente
  updateRol(id: number, rol: Rol): Observable<Rol> {
    return this.httpClient.put<Rol>(`${baserUrl}/roles/${id}`, rol);
  }

  // Eliminar un rol por ID
  deleteRol(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/roles/${id}`);
  }
}
