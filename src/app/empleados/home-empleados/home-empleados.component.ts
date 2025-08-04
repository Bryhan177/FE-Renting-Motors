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
    cedula: '1234567890',
    correo: 'bryhan@renthing.com',
    telefono: '3012345678',
    fechaIngreso: '2023-05-01',
    motosAsignadas: 3,
    estado: 'Activo', // puede ser: Activo, En vacaciones, Inactivo
    foto: 'https://img.freepik.com/foto-gratis/vista-frontal-joven-feliz-confiado-vistiendo-blusa-roja-sombrero-entregando-pedidos-sobre-fondo-amarillo_179666-35752.jpg?semt=ais_hybrid&w=740&q=80'
  };
  constructor(private router: Router) {}

  editarEmpleado() {
    alert('🔧 Funcionalidad para editar perfil próximamente...');
  }

  cambiarEstado() {
    const estados = ['Activo', 'En vacaciones', 'Inactivo'];
    const indexActual = estados.indexOf(this.empleado.estado);
    const nuevoEstado = estados[(indexActual + 1) % estados.length];
    this.empleado.estado = nuevoEstado;
  }
  goHome() {
    this.router.navigate(['']);
  }
}
