import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile'; // Ajusta la ruta si es necesario
import baserUrl from './helper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfiles(): Observable<Profile[]> {
  return this.httpClient.get<Profile[]>(`${baserUrl}/profiles`).pipe(
    map(profiles => profiles.sort((a, b) => (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1))
  );
}

getActiveProfiles(): Observable<Profile[]> {
  return this.httpClient.get<Profile[]>(`${baserUrl}/profiles`).pipe(
    map(profiles => profiles.filter(profile => profile.enabled))
  );
}


  // Obtener un perfil por ID
  getProfileById(id: number): Observable<Profile> {
    return this.httpClient.get<Profile>(`${baserUrl}/profiles/${id}`);
  }

  // Crear un nuevo perfil
  createProfile(profile: Profile): Observable<Profile> {
    return this.httpClient.post<Profile>(`${baserUrl}/profiles`, profile);
  }

  // Actualizar un perfil existente
  updateProfile(id: number, profile: Profile): Observable<Profile> {
    return this.httpClient.put<Profile>(`${baserUrl}/profiles/${id}`, profile);
  }

  // Eliminar un perfil por ID
  deleteProfile(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/profiles/${id}`);
  }
}
