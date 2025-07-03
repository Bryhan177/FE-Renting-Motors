import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    // Aquí podrías limpiar el estado de autenticación si lo implementas
    this.router.navigate(['/login']);
  }
  goDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goMotos() {
    this.router.navigate(['/motos']);
  }
  goEmpleados() {
    this.router.navigate(['/empleados']);
  }
  goPagos() {
    this.router.navigate(['/pagos']);
  }
  goHistorial() {
    this.router.navigate(['/historial']);
  }
  goDocumentacion() {
    this.router.navigate(['/documentacion']);
  }
}

