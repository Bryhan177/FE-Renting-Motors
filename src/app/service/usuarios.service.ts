import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario, CreateUsuarioPayload } from '../shared/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
private apiUrl = 'http://localhost:3000/usuarios';

constructor(private http: HttpClient){}

getUsuarios(): Observable<Usuario[]>{
  return this.http.get<Usuario[]>(this.apiUrl)
}
getUsuario(id: string): Observable<Usuario> {
  return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
}

// Crear un nuevo usuario
createUsuario(usuario: CreateUsuarioPayload): Observable<Usuario> {
  return this.http.post<Usuario>(this.apiUrl, usuario);
}

// Actualizar un usuario
updateUsuario(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
  return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, usuario);
}

// Eliminar un usuario
deleteUsuario(id: string): Observable<Usuario> {
  return this.http.delete<Usuario>(`${this.apiUrl}/${id}`);
}
}
