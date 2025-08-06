import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotosService, Moto } from '../../service/motos.service';

@Component({
  selector: 'app-motos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold mb-6 text-center">Gestión de Motos</h1>

      <!-- Formulario para crear/editar moto -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar Moto' : 'Agregar Nueva Moto' }}</h2>
        <form (ngSubmit)="onSubmit()" #motoForm="ngForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Marca</label>
              <input
                type="text"
                [(ngModel)]="moto.marca"
                name="marca"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Modelo</label>
              <input
                type="text"
                [(ngModel)]="moto.modelo"
                name="modelo"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Placa</label>
              <input
                type="text"
                [(ngModel)]="moto.placa"
                name="placa"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Estado</label>
              <select
                [(ngModel)]="moto.estado"
                name="estado"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Seleccionar estado</option>
                <option value="Disponible">Disponible</option>
                <option value="En uso">En uso</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Fuera de servicio">Fuera de servicio</option>
              </select>
            </div>
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              [disabled]="!motoForm.valid"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {{ isEditing ? 'Actualizar' : 'Crear' }}
            </button>
            <button
              type="button"
              (click)="cancelEdit()"
              *ngIf="isEditing"
              class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>

      <!-- Tabla de motos -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Lista de Motos</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr *ngFor="let moto of motos" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ moto.marca }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ moto.modelo }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ moto.placa }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    [ngClass]="{
                      'bg-green-100 text-green-800': moto.estado === 'Disponible',
                      'bg-blue-100 text-blue-800': moto.estado === 'En uso',
                      'bg-yellow-100 text-yellow-800': moto.estado === 'Mantenimiento',
                      'bg-red-100 text-red-800': moto.estado === 'Fuera de servicio'
                    }"
                  >
                    {{ moto.estado }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    (click)="editMoto(moto)"
                    class="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </button>
                  <button
                    (click)="deleteMoto(moto._id!)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MotosComponent implements OnInit {
  motos: Moto[] = [];
  moto: Moto = {
    marca: '',
    modelo: '',
    placa: '',
    estado: ''
  };
  isEditing = false;
  editingId: string | null = null;

  constructor(private motosService: MotosService) {}

  ngOnInit(): void {
    this.loadMotos();
  }

  loadMotos(): void {
    this.motosService.getMotos().subscribe({
      next: (motos) => {
        this.motos = motos;
      },
      error: (error) => {
        console.error('Error cargando motos:', error);
        alert('Error al cargar las motos');
      }
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.motosService.updateMoto(this.editingId!, this.moto).subscribe({
        next: () => {
          this.loadMotos();
          this.resetForm();
          alert('Moto actualizada exitosamente');
        },
        error: (error) => {
          console.error('Error actualizando moto:', error);
          alert('Error al actualizar la moto');
        }
      });
    } else {
      this.motosService.createMoto(this.moto).subscribe({
        next: () => {
          this.loadMotos();
          this.resetForm();
          alert('Moto creada exitosamente');
        },
        error: (error) => {
          console.error('Error creando moto:', error);
          alert('Error al crear la moto');
        }
      });
    }
  }

  editMoto(moto: Moto): void {
    this.moto = { ...moto };
    this.isEditing = true;
    this.editingId = moto._id!;
  }

  cancelEdit(): void {
    this.resetForm();
  }

  deleteMoto(id: string): void {
    if (confirm('¿Estás seguro de que quieres eliminar esta moto?')) {
      this.motosService.deleteMoto(id).subscribe({
        next: () => {
          this.loadMotos();
          alert('Moto eliminada exitosamente');
        },
        error: (error) => {
          console.error('Error eliminando moto:', error);
          alert('Error al eliminar la moto');
        }
      });
    }
  }

  private resetForm(): void {
    this.moto = {
      marca: '',
      modelo: '',
      placa: '',
      estado: ''
    };
    this.isEditing = false;
    this.editingId = null;
  }
}
