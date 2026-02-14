import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MotosService } from '../../../service/motos.service';
import { PagosService } from '../../../service/pagos.service';
import { Moto } from '../../../shared/interfaces/moto';
import { Pago, Estadisticas } from '../../../shared/interfaces/pago';
import { Usuario } from '../../../shared/interfaces/usuario';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  motos: Moto[] = [];
  pagos: Pago[] = [];
  conductores: Usuario[] = [];
  estadisticas: Estadisticas | null = null;
  loading = true;
  conductoresPendientes: Usuario[] = [];

  semanaActual = this.obtenerSemanaActual();

  constructor(
    private motosService: MotosService,
    private pagosService: PagosService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;

    // Cargar estadísticas
    this.motosService.getEstadisticas().subscribe({
      next: (estadisticas) => {
        this.estadisticas = estadisticas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error cargando estadísticas:', error);
        this.loading = false;
      }
    });

    // Cargar motos
    this.motosService.getMotos().subscribe({
      next: (motos) => {
        this.motos = motos;
      },
      error: (error) => {
        console.error('Error cargando motos:', error);
      }
    });

    // Cargar pagos de la semana actual
    this.pagosService.getPagosBySemana(this.semanaActual).subscribe({
      next: (pagos) => {
        this.pagos = pagos;
        this.calcularConductoresPendientes();
      },
      error: (error) => {
        console.error('Error cargando pagos:', error);
      }
    });
  }

  calcularConductoresPendientes(): void {
    // Conductores que tienen pagos pendientes esta semana
    this.conductoresPendientes = this.pagos
      .filter(pago => !pago.pagado && pago.conductor)
      .map(pago => pago.conductor!)
      .filter((conductor, index, self) =>
        index === self.findIndex(c => c._id === conductor._id)
      );
  }

  obtenerSemanaActual(): string {
    const date = new Date();
    const inicio = new Date(date.getFullYear(), 0, 1);
    const dias = Math.floor((date.getTime() - inicio.getTime()) / (24 * 60 * 60 * 1000));
    const semana = Math.ceil((dias + inicio.getDay() + 1) / 7);
    return `${date.getFullYear()}-W${semana.toString().padStart(2, '0')}`;
  }

  // Getters para compatibilidad con template
  get empleadosActivos(): number {
    return this.estadisticas?.motosAsignadas || 0;
  }

  get motosOperativas(): number {
    return this.estadisticas?.motosAsignadas || 0;
  }

  get totalRecaudado(): number {
    return this.estadisticas?.totalRecaudadoSemana || 0;
  }

  get empleadosPendientes(): Usuario[] {
    return this.conductoresPendientes;
  }

  // Métodos adicionales para métricas
  getMotosDisponiblesPorcentaje(): number {
    const totalMotos = this.estadisticas?.totalMotos || 0;
    const motosDisponibles = this.estadisticas?.motosDisponibles || 0;
    return totalMotos > 0 ? Math.round((motosDisponibles / totalMotos) * 100) : 0;
  }

  getPendientesPorcentaje(): number {
    const totalConductores = this.estadisticas?.motosAsignadas || 0;
    return totalConductores > 0 ? Math.round((this.conductoresPendientes.length / totalConductores) * 100) : 0;
  }

  getEficienciaPorcentaje(): number {
    const totalConductores = this.estadisticas?.motosAsignadas || 0;
    const conductoresPagados = totalConductores - this.conductoresPendientes.length;
    return totalConductores > 0 ? Math.round((conductoresPagados / totalConductores) * 100) : 0;
  }

  getTotalAlertas(): number {
    let alertas = 0;
    if (this.conductoresPendientes.length > 0) alertas++;
    // Aquí se pueden agregar más alertas en el futuro
    return alertas;
  }

  // Métodos para mostrar estado de motos
  getEstadoClass(estado: string): string {
    switch (estado) {
      case 'disponible':
        return 'bg-green-500/10 text-green-400 border border-green-500/20';
      case 'en_uso':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'en_mantenimiento':
        return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
      case 'fuera_servicio':
        return 'bg-red-500/10 text-red-400 border border-red-500/20';
      default:
        return 'bg-gray-700 text-gray-400';
    }
  }

  getEstadoText(estado: string): string {
    switch (estado) {
      case 'disponible':
        return 'Disponible';
      case 'en_uso':
        return 'En Uso';
      case 'en_mantenimiento':
        return 'Mantenimiento';
      case 'fuera_servicio':
        return 'Fuera de Servicio';
      default:
        return estado;
    }
  }
}
