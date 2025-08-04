import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import e from 'express';

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
  role: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (!this.role) {
      this.error = 'Por favor, seleccione un rol';
      return;
    }

    if (
      this.role === 'admin' &&
      this.email === 'admin@gmail.com' &&
      this.password === 'admin123'
    ) {
      this.router.navigate(['dashboard']);
    } else if (
      this.role === 'empleado' &&
      this.email === 'empleado@gmail.com' &&
      this.password === 'empleado123'
    ) {
      this.router.navigate(['motos']);
    } else if (this.role === 'asesor') {
      this.error = 'Acceso de asesor en proceso';
    } else {
      this.error = 'Credenciales inválidas';
    }
  }
  goToRegister() {
    this.router.navigate(['register']);
  }
}
