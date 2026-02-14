import { Injectable } from '@angular/core';
import { Observable, from, map, switchMap, throwError } from 'rxjs';
import { Usuario, CreateUsuarioPayload } from '../shared/interfaces/usuario';
import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor() {}

  private mapUsuario(usuario: any): Usuario {
    return { ...usuario, _id: usuario.id };
  }

  getUsuarios(): Observable<Usuario[]> {
    return from(supabase.from('usuarios').select('*')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data || []).map(u => this.mapUsuario(u));
      })
    );
  }

  getUsuario(id: string): Observable<Usuario> {
    return from(supabase.from('usuarios').select('*').eq('id', id).single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapUsuario(data);
      })
    );
  }

  // Crear un nuevo usuario
  createUsuario(usuario: CreateUsuarioPayload): Observable<Usuario> {
    const { password, ...payload } = usuario;

    if (!password) {
      return throwError(() => new Error('La contraseña es requerida para el registro.'));
    }

    // 1. Crear usuario en Auth
    return from(supabase.auth.signUp({
      email: payload.email,
      password: password,
      options: {
        data: {
          nombre: payload.nombre,
          apellido: payload.apellido,
          // Guardamos datos extra en metadata también por si acaso, 
          // aunque la fuente de verdad será la tabla usuarios.
        }
      }
    })).pipe(
      switchMap(({ data: authData, error: authError }) => {
        if (authError) {
          return throwError(() => new Error(authError.message));
        }
        if (!authData.user) {
           return throwError(() => new Error('No se pudo crear el usuario en Auth.'));
        }

        // 2. Insertar perfil en tabla usuarios vinculando con ID de Auth
        const userProfile = {
          id: authData.user.id, // ID from Auth
          nombre: payload.nombre,
          apellido: payload.apellido,
          email: payload.email,
          cedula: payload.cedula,
          telefono: payload.telefono,
          rol: payload.rol, // Asegurate que RLS permita esto o hazlo con service_role si es necesario. 
                            // Como es registro público, RLS debe permitir INSERT a public.usuarios para el usuario autenticado, 
                            // o permitir INSERT anonimo.
                            // Si RLS bloquea, fallará. Asumiremos por ahora que RLS permite o no está activo (como vi en list_tables: rls_enabled: false).
          activo: payload.activo
        };
        
        return from(supabase.from('usuarios').insert(userProfile).select().single());
      }),
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapUsuario(data);
      })
    );
  }

  // Actualizar un usuario
  updateUsuario(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
    const payload: any = { ...usuario };
    delete payload._id;
    delete payload.password; // Ignorar password en update de perfil por ahora

    return from(supabase.from('usuarios').update(payload).eq('id', id).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapUsuario(data);
      })
    );
  }

  // Login de usuario
  login(password: string, email: string) {
    return from(supabase.auth.signInWithPassword({
      email,
      password,
    })).pipe(
      switchMap(({ data, error }) => {
        if (error) throw error;
        if (!data.user) throw new Error('No se encontró el usuario');
        
        // Obtener datos del perfil del usuario
        return this.getUsuario(data.user.id).pipe(
            map(usuario => ({ ...usuario, authData: data })) 
        );
      })
    );
  }

  // Eliminar un usuario
  deleteUsuario(id: string): Observable<Usuario> {
    return from(supabase.from('usuarios').delete().eq('id', id).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapUsuario(data);
      })
    );
  }
}
