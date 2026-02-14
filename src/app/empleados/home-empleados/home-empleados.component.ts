import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-empleados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-empleados.component.html',
  styleUrl: './home-empleados.component.css'
})
export class HomeEmpleadosComponent {
  empleado = {
    nombre: 'Bryhan Aguilar',
    rol: 'Conductor Senior', // Added role title
    cedula: '1234567890',
    correo: 'bryhan@renthing.com',
    telefono: '3012345678',
    fechaIngreso: '2023-05-01',
    motosAsignadas: 3,
    estado: 'Activo',
    foto: 'https://img.freepik.com/foto-gratis/vista-frontal-joven-feliz-confiado-vistiendo-blusa-roja-sombrero-entregando-pedidos-sobre-fondo-amarillo_179666-35752.jpg?semt=ais_hybrid&w=740&q=80',
    rendimiento: 92, // New metric
    viajesCompletados: 145 // New metric
  };

  stats = [
    { title: 'Motos Asignadas', value: this.empleado.motosAsignadas, icon: '🛵', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Viajes Totales', value: this.empleado.viajesCompletados, icon: '🏁', color: 'text-green-500', bg: 'bg-green-500/10' },
    { title: 'Rendimiento', value: this.empleado.rendimiento + '%', icon: '📈', color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { title: 'Estado', value: this.empleado.estado, icon: 'user', color: 'text-yellow-500', bg: 'bg-yellow-500/10' }
  ];

  actividadesRecientes = [
    { id: 1, tipo: 'Mantenimiento', descripcion: 'Revisión de frenos Moto XYZ-123', fecha: 'Hoy, 10:30 AM', estado: 'Completado' },
    { id: 2, tipo: 'Entrega', descripcion: 'Entrega de vehículo a cliente', fecha: 'Ayer, 04:15 PM', estado: 'Completado' },
    { id: 3, tipo: 'Incidente', descripcion: 'Reporte de rayón en tanque', fecha: '12 Feb, 09:00 AM', estado: 'Pendiente' }
  ];

  constructor(private router: Router) {}

  toggleEstado() {
    this.empleado.estado = this.empleado.estado === 'Activo' ? 'En descanso' : 'Activo';
    // Update local stats view
    this.stats[3].value = this.empleado.estado; 
  }
  goHome() {
    this.router.navigate(['']);
  }
}
