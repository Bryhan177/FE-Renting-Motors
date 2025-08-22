import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../../shared/interfaces/empleados';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from '../../../shared/interfaces/usuario';
import { UsuariosService } from '../../../service/usuarios.service';
import { HttpClientModule } from '@angular/common/http';

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

  nuevoUsuario: Usuario = {
    nombre: '',
    apellido: '',
    email: '',
    cedula: 0,
    telefono: '',
    rol: 'cliente',
    activo: true
  };
  constructor(private usuariosService: UsuariosService){}

  ngOnInit() {
    this.cargarUsuarios();
  }
  cargarUsuarios(){
    this.usuariosService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
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
      rol: 'cliente',
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
      rol: 'cliente',
      activo: true
    };
    this.modoEdicion = false;
    this.usuarioEditando = null;
  }
}
