import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Moto {
  _id?: string;
  marca: string;
  modelo: string;
  placa: string;
  estado: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
}
