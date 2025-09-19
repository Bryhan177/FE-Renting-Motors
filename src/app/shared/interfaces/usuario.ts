export interface Usuario {
  _id?: string;
  nombre: string;
  apellido: string;
  email: string;
  cedula: number;
  telefono: string;
  rol: 'administrador' | 'asesor' | 'empleado';
  activo: boolean;
  createdAt?: Date;
  updatedAt?: boolean;
}

// Payload para creación de usuario (permite contraseña opcional)
export type CreateUsuarioPayload = Omit<Usuario, '_id' | 'createdAt' | 'updatedAt'> & {
  password?: string;
};
