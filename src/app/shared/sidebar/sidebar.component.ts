import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  showSidebar: boolean = false;

  constructor(private router: Router) {}

  logout() {
    // Aquí podrías limpiar el estado de autenticación si lo implementas
    this.router.navigate(['/']);
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
  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}

