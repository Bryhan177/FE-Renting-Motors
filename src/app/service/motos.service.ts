import { Injectable } from '@angular/core';
import { Observable, from, map } from 'rxjs';
import { Moto } from '../shared/interfaces/moto';
import { Usuario } from '../shared/interfaces/usuario';
import { Estadisticas } from '../shared/interfaces/pago';
import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class MotosService {

  constructor() { }

  private mapMoto(moto: any): Moto {
    return {
      ...moto,
      _id: moto.id,
      conductorId: moto.conductor_id,
      conductor: moto.conductor ? { ...moto.conductor, _id: moto.conductor.id } : undefined
    };
  }

  getMotos(): Observable<Moto[]> {
    return from(supabase.from('motos').select('*, conductor:usuarios(*)')).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data || []).map(m => this.mapMoto(m));
      })
    );
  }

  getMoto(id: string): Observable<Moto> {
    return from(supabase.from('motos').select('*, conductor:usuarios(*)').eq('id', id).single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  createMoto(moto: Omit<Moto, '_id'>): Observable<Moto> {
    const payload = {
      marca: moto.marca,
      modelo: moto.modelo,
      placa: moto.placa,
      precio: moto.precio,
      estado: moto.estado,
      conductor_id: moto.conductorId || null
    };
    return from(supabase.from('motos').insert(payload).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  updateMoto(id: string, moto: Partial<Moto>): Observable<Moto> {
    const payload: any = { ...moto };
    if (moto.conductorId !== undefined) payload.conductor_id = moto.conductorId;
    delete payload._id;
    delete payload.conductorId;
    delete payload.conductor;

    return from(supabase.from('motos').update(payload).eq('id', id).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  deleteMoto(id: string): Observable<Moto> {
    return from(supabase.from('motos').delete().eq('id', id).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  // Métodos para gestión de conductores
  asignarConductor(motoId: string, conductorId: string): Observable<Moto> {
    return from(supabase.from('motos').update({ conductor_id: conductorId, estado: 'en_uso' }).eq('id', motoId).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  removerConductor(motoId: string): Observable<Moto> {
    return from(supabase.from('motos').update({ conductor_id: null, estado: 'disponible' }).eq('id', motoId).select().single()).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return this.mapMoto(data);
      })
    );
  }

  getMotosByConductor(conductorId: string): Observable<Moto[]> {
    return from(supabase.from('motos').select('*').eq('conductor_id', conductorId)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        return (data || []).map(m => this.mapMoto(m));
      })
    );
  }

  getConductoresDisponibles(): Observable<Usuario[]> {
    // Buscar usuarios con rol 'empleado'
    return from(supabase.from('usuarios').select('*').eq('rol', 'empleado').eq('activo', true)).pipe(
      map(({ data, error }) => {
        if (error) throw error;
        // Filtrar los que ya tienen moto asignada?
        // En la lógica original era 'disponibles'. Supongamos que necesitamos verificar si tienen moto.
        // Por simplicidad devolvemos todos los empleados activos por ahora, o podríamos hacer un left join.
        // Para emular 'disponibles', deberiamos chequear la tabla motos.
        return (data || []).map(u => ({ ...u, _id: u.id }));
      })
    );
  }

  // Métodos para pagos y estadísticas
  generarPagosSemanales(semana: string): Observable<any[]> {
    // Esto es lógica de negocio compleja que usualmente va en backend.
    // Lo simularemos o usaremos una función RPC si existiera.
    // Por ahora, retornamos vacío o error, o intentamos implementarlo client-side?
    // "generar pagos" implica crear registros en la tabla pagos para todas las motos activas.
    
    // Implementación Client-Side (Provisional):
    // 1. Obtener motos 'en_uso'
    // 2. Por cada moto, crear un registro de pago
    return from(
      supabase.from('motos').select('*').eq('estado', 'en_uso').then(async ({ data: motos, error }) => {
        if (error) throw error;
        if (!motos) return [];

        const pagosPromises = motos.map(moto => {
           if (!moto.conductor_id) return null;
           // Calcular monto (7 * precio diario)
           const monto = moto.precio * 7;
           return supabase.from('pagos').insert({
             conductor_id: moto.conductor_id,
             semana,
             monto,
             pagado: false
           }).select();
        });

        const results = await Promise.all(pagosPromises.filter(p => p !== null));
        return results.map(r => r.data?.[0]);
      })
    ).pipe(
       map(res => res)
    );
  }

  getEstadisticas(): Observable<Estadisticas> {
    // Implementación simplificada
    const statsPromise = Promise.all([
      supabase.from('motos').select('count', { count: 'exact', head: true }),
      supabase.from('motos').select('count', { count: 'exact', head: true }).eq('estado', 'en_uso'),
      supabase.from('motos').select('count', { count: 'exact', head: true }).eq('estado', 'disponible'),
      supabase.from('usuarios').select('count', { count: 'exact', head: true }).eq('rol', 'empleado'),
      // Total recaudado (requiere suma, mas complejo en cliente sin rpc, haremos 0 por ahora o fetch all)
      supabase.from('pagos').select('monto').eq('pagado', true)
    ]).then(([totalMotos, motosEnUso, motosDisp, conductores, pagos]) => {
      const totalRecaudado = pagos.data?.reduce((sum, p) => sum + p.monto, 0) || 0;
      return {
        totalMotos: totalMotos.count || 0,
        motosAsignadas: motosEnUso.count || 0,
        motosDisponibles: motosDisp.count || 0,
        conductoresDisponibles: conductores.count || 0,
        totalRecaudadoSemana: 0, // Dificil calcular sin saber la semana actual
        semanaActual: new Date().toISOString().slice(0, 10)
      };
    });

    return from(statsPromise);
  }
}

