import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Moto } from '../shared/interfaces/moto';
import { Usuario } from '../shared/interfaces/usuario';
import { Estadisticas } from '../shared/interfaces/pago';

@Injectable({
  providedIn: 'root'
})
export class MotosService {
  private apiUrl = 'http://localhost:3000/motos';

  constructor(private http: HttpClient) { }

  getMotos(): Observable<Moto[]> {
    return this.http.get<Moto[]>(this.apiUrl);
  }

  getMoto(id: string): Observable<Moto> {
    return this.http.get<Moto>(`${this.apiUrl}/${id}`);
  }

  createMoto(moto: Omit<Moto, '_id'>): Observable<Moto> {
    return this.http.post<Moto>(this.apiUrl, moto);
  }

  updateMoto(id: string, moto: Partial<Moto>): Observable<Moto> {
    return this.http.patch<Moto>(`${this.apiUrl}/${id}`, moto);
  }

  deleteMoto(id: string): Observable<Moto> {
    return this.http.delete<Moto>(`${this.apiUrl}/${id}`);
  }

  // Métodos para gestión de conductores
  asignarConductor(motoId: string, conductorId: string): Observable<Moto> {
    return this.http.patch<Moto>(`${this.apiUrl}/${motoId}/asignar-conductor/${conductorId}`, {});
  }

  removerConductor(motoId: string): Observable<Moto> {
    return this.http.patch<Moto>(`${this.apiUrl}/${motoId}/remover-conductor`, {});
  }

  getMotosByConductor(conductorId: string): Observable<Moto[]> {
    return this.http.get<Moto[]>(`${this.apiUrl}/conductor/${conductorId}`);
  }

  getConductoresDisponibles(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/conductores/disponibles`);
  }

  // Métodos para pagos y estadísticas
  generarPagosSemanales(semana: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/generar-pagos/${semana}`, {});
  }

  getEstadisticas(): Observable<Estadisticas> {
    return this.http.get<Estadisticas>(`${this.apiUrl}/estadisticas/general`);
  }
}

