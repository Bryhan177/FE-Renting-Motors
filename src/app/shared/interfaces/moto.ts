import { Usuario } from './usuario';

export interface Moto {
  _id?: string;
  marca: string;
  modelo: string;
  placa: string;
  precio: number; // Precio de alquiler diario en COP
  estado: 'disponible' | 'en_uso' | 'en_mantenimiento' | 'fuera_servicio';
  conductorId?: string | null; // Conductor asignado
  conductor?: Usuario; // Información del conductor (populate)
  createdAt?: Date;
  updatedAt?: Date;
}

