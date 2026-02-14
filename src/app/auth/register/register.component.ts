import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  nuevoUsuario: any = {
    nombre: '',
    apellido: '',
    email: '',
    cedula: 0,
    telefono: '',
    rol: 'usuario',
    activo: true,
    password: '',
    confirmPassword: ''
  }
  constructor(private usuariosService: UsuariosService, private router: Router) { }

  agregarUsuario() {
    // Validaciones básicas
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

    // Validar cédula numérica y positiva
    const cedulaNum = Number(this.nuevoUsuario.cedula);
    if (!cedulaNum || Number.isNaN(cedulaNum) || cedulaNum <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Cédula inválida',
        text: 'Ingresa una cédula válida (número positivo).',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (!this.nuevoUsuario.password || this.nuevoUsuario.password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 8 caracteres.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    if (this.nuevoUsuario.password !== this.nuevoUsuario.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Verifica que ambos campos de contraseña sean iguales.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const payload = {
      nombre: this.nuevoUsuario.nombre,
      apellido: this.nuevoUsuario.apellido,
      email: this.nuevoUsuario.email,
      cedula: cedulaNum,
      telefono: this.nuevoUsuario.telefono,
      rol: this.nuevoUsuario.rol,
      activo: this.nuevoUsuario.activo,
      password: this.nuevoUsuario.password,
    };

    this.usuariosService.createUsuario(payload).subscribe(
      (usuario) => {
        console.log('Usuario creado:', usuario);
        this.nuevoUsuario = {
          nombre: '',
          apellido: '',
          email: '',
          cedula: 0,
          telefono: '',
          rol: 'usuario',
          activo: true,
          password: '',
          confirmPassword: ''
        };
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado',
          text: 'El usuario ha sido creado exitosamente.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: '#22C55E',
          color: 'white',
        }).then(() => {
          // Redirección basada en el rol
          switch(usuario.rol) {
            case 'administrador':
            case 'asesor':
              this.router.navigate(['/dashboard']);
              break;
            case 'empleado':
              this.router.navigate(['/empleados']);
              break;
            default:
              this.router.navigate(['/']); // Usuario normal a home
              break;
          }
        });
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'No se pudo crear el usuario',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
        });
      }
    );
  }



  goToLogin() {
    window.location.href = '/login';
  }
}
