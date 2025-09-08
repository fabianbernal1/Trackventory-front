import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Color } from '../models/color'; // Ajusta la ruta si es necesario
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient: HttpClient) { }


  // Obtener todos los colores ordenados: habilitados primero
  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(`${baserUrl}/colors`).pipe(
      map(colors => colors.sort((a, b) => {
        return (a.enabled === b.enabled) ? 0 : a.enabled ? -1 : 1;
      }))
    );
  }

  // Obtener solo los colores activos (enabled = true)
  getActiveColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(`${baserUrl}/colors`).pipe(
      map(colors => colors.filter(color => color.enabled))
    );
  }


  // Obtener un color por nombre
  getColorById(id: number): Observable<Color> {
    return this.httpClient.get<Color>(`${baserUrl}/colors/${id}`);
  }

  // Crear un nuevo color
  createColor(color: Color): Observable<Color> {
    return this.httpClient.post<Color>(`${baserUrl}/colors`, color);
  }

  // Actualizar un color existente
  updateColor(id: number, color: Color): Observable<Color> {
    return this.httpClient.put<Color>(`${baserUrl}/colors/${id}`, color);
  }

  // Eliminar un color por id
  deleteColor(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${baserUrl}/colors/${id}`);
  }
}
