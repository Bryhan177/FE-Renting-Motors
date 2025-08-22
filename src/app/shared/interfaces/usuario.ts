export interface Usuario {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: number;
  telefono: string;
  rol: 'admin' | 'cliente' | 'empleado';
  activo: boolean;
  createdAt?: Date;
  updatedAt?: boolean;
}
