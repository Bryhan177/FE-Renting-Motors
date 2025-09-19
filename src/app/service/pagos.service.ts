import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago, CreatePagoPayload } from '../shared/interfaces/pago';

@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private apiUrl = 'http://localhost:3000/pagos';

  constructor(private http: HttpClient) { }

  getPagos(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl);
  }

  getPago(id: string): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`);
  }

  createPago(pago: CreatePagoPayload): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago);
  }

  updatePago(id: string, pago: Partial<Pago>): Observable<Pago> {
    return this.http.patch<Pago>(`${this.apiUrl}/${id}`, pago);
  }

  deletePago(id: string): Observable<Pago> {
    return this.http.delete<Pago>(`${this.apiUrl}/${id}`);
  }

  // Métodos específicos para el negocio
  getPagosByConductor(conductorId: string): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/conductor/${conductorId}`);
  }

  getPagosBySemana(semana: string): Observable<Pago[]> {
    return this.http.get<Pago[]>(`${this.apiUrl}/semana/${semana}`);
  }

  getTotalSemanal(semana: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/semana/${semana}/total`);
  }

  marcarComoPagado(id: string): Observable<Pago> {
    return this.http.patch<Pago>(`${this.apiUrl}/${id}/pagar`, {});
  }
}
