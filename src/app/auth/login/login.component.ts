import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../service/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';


  constructor(private router: Router, private usuariosService: UsuariosService) {}

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Por favor, ingrese correo y contraseña';
      return;
    }

    this.usuariosService.login(this.password, this.email).subscribe({
      next: (usuario) => {
        // Redirección basada en el rol obtenido de la base de datos
        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: `Has iniciado sesión como ${usuario.nombre}`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
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
      error: (err) => {
        console.error('Error en login:', err);
        this.error = 'Credenciales inválidas o error en el sistema';
        Swal.fire({
          icon: 'error',
          title: 'Error de inicio de sesión',
          text: err.message || 'No se pudo iniciar sesión',
          timer: 3000
        });
      }
    });
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
  goHome() {
    this.router.navigate(['']);
  }
}
