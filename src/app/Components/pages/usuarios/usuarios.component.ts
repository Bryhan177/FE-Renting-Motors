import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../shared/interfaces/empleados';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../../shared/interfaces/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { PagosService } from '../../../service/pagos.service';
import { MotosService } from '../../../service/motos.service';
import { HttpClientModule } from '@angular/common/http';
import { Pago, Estadisticas } from '../../../shared/interfaces/pago';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
})
export class UsuariosComponent implements OnInit{
  mostrarModal: boolean = false;
  empleadoEditando: Empleado | null = null;
  modoEdicion = false;
  empleadoSeleccionado: Empleado | null = null;
  usuarioEditando: Usuario | null = null;
  mostrarPagos = false;
  usuarios: Usuario[] = []
  conductores: Usuario[] = [];
  pagos: Pago[] = [];
  estadisticas: Estadisticas | null = null;
  semanaSeleccionada: string = this.obtenerSemanaActual();
  vistaReportes = false;
  conductoresAsignados: Set<string> = new Set();

  nuevoUsuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    cedula: 0,
    telefono: '',
    rol: 'empleado',
    activo: true
  };
  constructor(
    private usuariosService: UsuariosService,
    private pagosService: PagosService,
    private motosService: MotosService
  ){}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
        this.cargarEstadoAsignacion();
      },
      error: (error) => {
        console.error('Error al cargar usuarios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los usuarios',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  cargarEstadoAsignacion(): void {
    this.motosService.getMotos().subscribe({
      next: (motos) => {
        // Crear un Set con los IDs de conductores asignados
        this.conductoresAsignados = new Set(
          motos
            .filter(moto => moto.conductorId)
            .map(moto => {
              const conductorId = moto.conductorId as any;
              if (typeof conductorId === 'string') {
                return conductorId;
              } else if (conductorId && conductorId._id) {
                return conductorId._id;
              }
              return '';
            })
            .filter(id => id !== '')
        );
      },
      error: (error) => {
        console.error('Error al cargar estado de asignación:', error);
      }
    });
  }

  editarUsuario(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioEditando = { ...usuario };
    this.nuevoUsuario = { ...usuario };
    this.mostrarModal = true;
  }

  abrirModal() {
    this.mostrarModal = true;
    this.nuevoUsuario = {
      nombre: '',
      apellido: '',
      email: '',
      cedula: 0,
      telefono: '',
      rol: 'empleado',
      activo: true
    };
    this.modoEdicion = false;
    this.usuarioEditando = null;
  }

  agregarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.apellido || !this.nuevoUsuario.email || !this.nuevoUsuario.telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Campos requeridos incompletos',
        text: 'Por favor completa todos los campos obligatorios',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1800,
        background: '#FF4136',
        color: 'white',
      });
      return;
    }

    if (this.modoEdicion && this.usuarioEditando) {
      // Actualizar usuario
      this.usuariosService.updateUsuario(this.usuarioEditando._id!, this.nuevoUsuario).subscribe({
        next: (usuario) => {
          const index = this.usuarios.findIndex(u => u._id === usuario._id);
          if (index !== -1) {
            this.usuarios[index] = usuario;
          }
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1300,
            background: '#22C55E',
            color: 'white',
          });
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo actualizar el usuario',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    } else {
      // Crear nuevo usuario
      this.usuariosService.createUsuario(this.nuevoUsuario).subscribe({
        next: (usuario) => {
          this.usuarios.push(usuario);
          Swal.fire({
            icon: 'success',
            title: 'Usuario agregado',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1300,
            background: '#22C55E',
            color: 'white',
          });
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo crear el usuario',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    }
  }

  eliminarUsuario(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.deleteUsuario(id).subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter(u => u._id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Usuario eliminado',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1300,
              background: '#22C55E',
              color: 'white',
            });
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo eliminar el usuario',
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
            });
          }
        });
      }
    });
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoUsuario = {
      nombre: '',
      apellido: '',
      email: '',
      cedula: 0,
      telefono: '',
      rol: 'empleado',
      activo: true
    };
    this.modoEdicion = false;
    this.usuarioEditando = null;
  }

  // Métodos para reportes
  obtenerSemanaActual(): string {
    const date = new Date();
    const inicio = new Date(date.getFullYear(), 0, 1);
    const dias = Math.floor((date.getTime() - inicio.getTime()) / (24 * 60 * 60 * 1000));
    const semana = Math.ceil((dias + inicio.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${semana.toString().padStart(2, '0')}`;
  }

  toggleVistaReportes(): void {
    this.vistaReportes = !this.vistaReportes;
    if (this.vistaReportes) {
      this.cargarDatosReportes();
    }
  }

  cargarDatosReportes(): void {
    // Cargar conductores (empleados)
    this.conductores = this.usuarios.filter(u => u.rol === 'empleado');

    // Refrescar estado de asignación
    this.cargarEstadoAsignacion();

    // Cargar pagos de la semana seleccionada
    this.pagosService.getPagosBySemana(this.semanaSeleccionada).subscribe({
      next: (pagos) => {
        this.pagos = pagos;
      },
      error: (error) => {
        console.error('Error cargando pagos:', error);
      }
    });

    // Cargar estadísticas
    this.motosService.getEstadisticas().subscribe({
      next: (estadisticas) => {
        this.estadisticas = estadisticas;
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
      }
    });
  }

  cambiarSemana(): void {
    if (this.vistaReportes) {
      this.cargarDatosReportes();
    }
  }

  // Métodos para calcular métricas de reportes
  getTotalIngresosSemana(): number {
    return this.pagos
      .filter(pago => pago.pagado)
      .reduce((total, pago) => total + pago.monto, 0);
  }

  getConductoresConPagos(): Usuario[] {
    const conductoresIds = [...new Set(this.pagos.map(p => p.conductorId))];
    return this.conductores.filter(c => conductoresIds.includes(c._id!));
  }

  getPagosPorConductor(conductorId: string): Pago[] {
    return this.pagos.filter(p => p.conductorId === conductorId);
  }

  getIngresosPorConductor(conductorId: string): number {
    return this.getPagosPorConductor(conductorId)
      .filter(p => p.pagado)
      .reduce((total, pago) => total + pago.monto, 0);
  }

  getConductoresAlDia(): Usuario[] {
    return this.conductores.filter(conductor => {
      const pagosConductor = this.getPagosPorConductor(conductor._id!);
      return pagosConductor.length > 0 && pagosConductor.every(p => p.pagado);
    });
  }

  getConductoresPendientes(): Usuario[] {
    return this.conductores.filter(conductor => {
      const pagosConductor = this.getPagosPorConductor(conductor._id!);
      return pagosConductor.length > 0 && pagosConductor.some(p => !p.pagado);
    });
  }

  // Métodos auxiliares para el template
  conductorEstaAlDia(conductorId: string): boolean {
    return this.getConductoresAlDia().some(c => c._id === conductorId);
  }

  getEstadoConductorClass(conductorId: string): string {
    return this.conductorEstaAlDia(conductorId) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getEstadoConductorTexto(conductorId: string): string {
    return this.conductorEstaAlDia(conductorId) ? 'Al día' : 'Pendiente';
  }

  // Método para verificar si un conductor tiene moto asignada
  conductorTieneMotoAsignada(conductorId: string): boolean {
    return this.conductoresAsignados.has(conductorId);
  }

  // Método para obtener el texto del estado de asignación
  getEstadoAsignacionTexto(conductorId: string): string {
    return this.conductorTieneMotoAsignada(conductorId) ? 'Asignado' : 'Disponible';
  }

  // Método para obtener la clase CSS del estado de asignación
  getEstadoAsignacionClass(conductorId: string): string {
    return this.conductorTieneMotoAsignada(conductorId)
      ? 'bg-blue-100 text-blue-800'
      : 'bg-green-100 text-green-800';
  }
}
