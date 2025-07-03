import { Component } from '@angular/core';
import { Empleado } from '../../../shared/interfaces/empleados';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css',
})
export class EmpleadosComponent {
  mostrarModal: boolean = false;
  empleadoEditando: Empleado | null = null;
  modoEdicion = false;
  empleadoSeleccionado: Empleado | null = null;
  mostrarPagos = false;

  empleados: Empleado[] = [
    {
      nombre: 'Jhon Perez',
      cedula: '123456789',
      telefono: '3001234567',
      moto: 'ABC123',
      descanso: 'Miércoles',
    },
    {
      nombre: 'Carlos Manuel',
      cedula: '123456789',
      telefono: '3001234567',
      moto: 'ABC123',
      descanso: 'Viernes',
    },
    {
      nombre: 'Fredy Arroyabe',
      cedula: '123456789',
      telefono: '3001234567',
      moto: 'ABC123',
      descanso: 'Lunes',
    },
    {
      nombre: 'Rafael Rojas',
      cedula: '123456789',
      telefono: '3001234567',
      moto: 'ABC123',
      descanso: 'Miércoles',
    },
  ];

  nuevoEmpleado: Empleado = {
    nombre: '',
    cedula: '',
    telefono: '',
    moto: '',
    descanso: '',
  };

  editarEmpleado(empleado: Empleado) {
    this.modoEdicion = true;
    this.empleadoEditando = { ...empleado };
    this.nuevoEmpleado = { ...empleado };
    this.mostrarModal = true;
  }
  abrirModal() {
    this.mostrarModal = true;
    this.nuevoEmpleado = {
      nombre: '',
      cedula: '',
      telefono: '',
      moto: '',
      descanso: '',
    };
    this.modoEdicion = false;
    this.empleadoEditando = null;
  }

  agregarEmpleado() {
    if (!this.nuevoEmpleado.nombre || !this.nuevoEmpleado.cedula || !this.nuevoEmpleado.telefono || !this.nuevoEmpleado.descanso) {
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

    if (this.modoEdicion && this.empleadoEditando) {
      const index = this.empleados.findIndex((e: Empleado) => e.cedula === this.empleadoEditando!.cedula);
      if (index !== -1) {
        this.empleados[index] = { ...this.nuevoEmpleado };
      }
      Swal.fire({
        icon: 'success',
        title: 'Empleado actualizado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1300,
        background: '#22C55E',
        color: 'white',
      });
    } else {
      this.empleados.push({ ...this.nuevoEmpleado });
      Swal.fire({
        icon: 'success',
        title: 'Empleado agregado',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1300,
        background: '#22C55E',
        color: 'white',
      });
    }
    this.mostrarModal = false;
    this.cerrarModal();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevoEmpleado = {
      nombre: '',
      cedula: '',
      telefono: '',
      moto: '',
      descanso: '',
    };
    this.modoEdicion = false;
    this.empleadoEditando = null;
  }

  abrirPagos(empleado: Empleado) {
    this.empleadoSeleccionado = empleado;
    this.mostrarPagos = true;
    if (!empleado.pagos) {
      empleado.pagos = [];
    }
  }

  registrarPago() {
    const semanaActual = this.obtenerSemanaActual();
    const yaRegistrado = this.empleadoSeleccionado?.pagos?.some((p: { semana: string }) => p.semana === semanaActual);
    if (!yaRegistrado && this.empleadoSeleccionado) {
      this.empleadoSeleccionado.pagos!.push({
        semana: semanaActual,
        monto: 220000,
        pagado: true,
      });
    }
  }

  cerrarPagos() {
    this.empleadoSeleccionado = null;
    this.mostrarPagos = false;
  }

  obtenerSemanaActual(): string {
    const now = new Date();
    const primera = new Date(now.getFullYear(), 0, 1);
    const dias = Math.floor((now.getTime() - primera.getTime()) / (24 * 60 * 60 * 1000));
    const semana = Math.ceil((dias + primera.getDay() + 1) / 7);
    return `${now.getFullYear()} - Semana:${semana.toString().padStart(2, '0')}`;
  }

  getResumenSemanal() {
    const semanaActual = this.obtenerSemanaActual();
    return this.empleados.map((empleado: Empleado) => {
      const pago = empleado.pagos?.find((p: { semana: string }) => p.semana === semanaActual);
      return {
        nombre: empleado.nombre,
        cedula: empleado.cedula,
        descanso: empleado.descanso,
        pagado: pago?.pagado ?? false,
        monto: pago?.monto ?? 0,
      };
    });
  }

}
