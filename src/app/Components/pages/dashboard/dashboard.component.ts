import { Component } from '@angular/core';
import { Empleado } from '../../../shared/interfaces/empleados';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  empleados: Empleado[] = [
    {
      nombre: 'Jhon Perez', cedula: '123456789', telefono: '3001234567',
      moto: 'ABC123', descanso: 'Miércoles', pagos: [
        { semana: '2025-W17', monto: 220000, pagado: true }
      ]
    },
    {
      nombre: 'Carlos Manuel', cedula: '987654321', telefono: '3009876543',
      moto: 'XYZ456', descanso: 'Viernes', pagos: []
    },
  ];

  semanaActual = this.obtenerSemanaActual();
  motosOperativas = this.empleados.length;
  totalRecaudado = this.calcularTotalRecaudado();
  empleadosPendientes = this.obtenerPendientes();

  obtenerSemanaActual(): string {
    const date = new Date();
    const inicio = new Date(date.getFullYear(), 0, 1);
    const dias = Math.floor((date.getTime() - inicio.getTime()) / (24 * 60 * 60 * 1000));
    const semana = Math.ceil((dias + inicio.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${semana.toString().padStart(2, '0')}`;
  }

  calcularTotalRecaudado(): number {
    let total = 0;
    this.empleados.forEach(emp => {
      emp.pagos?.forEach(p => {
        if (p.semana === this.semanaActual && p.pagado) {
          total += p.monto;
        }
      });
    });
    return total;
  }

  obtenerPendientes(): Empleado[] {
    return this.empleados.filter(emp =>
      !emp.pagos?.some(p => p.semana === this.semanaActual && p.pagado)
    );
  }

  // Métricas adicionales
  getEmpleadosActivosPorcentaje(): number {
    const totalEmpleados = this.empleados.length;
    const empleadosActivos = this.empleados.filter(emp => emp.moto).length;
    return totalEmpleados > 0 ? Math.round((empleadosActivos / totalEmpleados) * 100) : 0;
  }

  getMotosDisponiblesPorcentaje(): number {
    const totalMotos = 10; // Simulado - en realidad vendría de un servicio
    return totalMotos > 0 ? Math.round((this.motosOperativas / totalMotos) * 100) : 0;
  }

  getPendientesPorcentaje(): number {
    const totalEmpleados = this.empleados.length;
    return totalEmpleados > 0 ? Math.round((this.empleadosPendientes.length / totalEmpleados) * 100) : 0;
  }

  getEficienciaPorcentaje(): number {
    const pagosCompletados = this.empleados.filter(emp =>
      emp.pagos?.some(p => p.semana === this.semanaActual && p.pagado)
    ).length;
    const totalEmpleados = this.empleados.length;
    return totalEmpleados > 0 ? Math.round((pagosCompletados / totalEmpleados) * 100) : 0;
  }

  getPromedioSemanal(): number {
    const pagosSemana = this.empleados.flatMap(emp =>
      emp.pagos?.filter(p => p.semana === this.semanaActual) || []
    );
    if (pagosSemana.length === 0) return 0;
    const total = pagosSemana.reduce((sum, p) => sum + p.monto, 0);
    return Math.round(total / pagosSemana.length);
  }

  getMinimoSemanal(): number {
    const pagosSemana = this.empleados.flatMap(emp =>
      emp.pagos?.filter(p => p.semana === this.semanaActual) || []
    );
    if (pagosSemana.length === 0) return 0;
    return Math.min(...pagosSemana.map(p => p.monto));
  }

  getMaximoSemanal(): number {
    const pagosSemana = this.empleados.flatMap(emp =>
      emp.pagos?.filter(p => p.semana === this.semanaActual) || []
    );
    if (pagosSemana.length === 0) return 0;
    return Math.max(...pagosSemana.map(p => p.monto));
  }

  getTotalAlertas(): number {
    let alertas = 0;
    if (this.getMotosVencimiento() > 0) alertas++;
    if (this.empleadosPendientes.length > 0) alertas++;
    if (this.getMotosMantenimiento() > 0) alertas++;
    return alertas;
  }

  getMotosVencimiento(): number {
    // Simulado - en realidad vendría de un servicio de motos
    return Math.floor(Math.random() * 3); // 0-2 motos con documentos vencidos
  }

  getMotosMantenimiento(): number {
    // Simulado - en realidad vendría de un servicio de motos
    return Math.floor(Math.random() * 2); // 0-1 motos en mantenimiento
  }
}
