import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MotosService } from '../../../service/motos.service';
import { Moto } from '../../../shared/interfaces/moto';
import { Usuario } from '../../../shared/interfaces/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-motos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './motos.component.html',
  styleUrl: './motos.component.css'
})
export class MotosComponent implements OnInit {
  motos: Moto[] = [];
  conductoresDisponibles: Usuario[] = [];
  modalVisible: boolean = false;
  modalAsignarVisible: boolean = false;
  motoSeleccionada: Moto | null = null;
  motoEditada: Moto = {
    marca: '',
    modelo: '',
    placa: '',
    precio: 0,
    estado: 'disponible'
  };
  formularioInvalido: boolean = false;
  isEditing = false;
  editingId: string | null = null;

  nuevaMoto: Moto = {
    marca: '',
    modelo: '',
    placa: '',
    precio: 0,
    estado: 'disponible'
  };

  constructor(private motosService: MotosService) {}

  ngOnInit(): void {
    this.loadMotos();
    this.loadConductoresDisponibles();
  }

  loadMotos(): void {
    this.motosService.getMotos().subscribe({
      next: (motos) => {
        this.motos = motos;
      },
      error: (error) => {
        console.error('Error cargando motos:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al cargar las motos',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#FF4136',
          color: 'white',
        });
      }
    });
  }

  loadConductoresDisponibles(): void {
    this.motosService.getConductoresDisponibles().subscribe({
      next: (conductores) => {
        this.conductoresDisponibles = conductores;
      },
      error: (error) => {
        console.error('Error cargando conductores disponibles:', error);
      }
    });
  }

  agregarMoto() {
    // Validación del formulario
    if (!this.nuevaMoto.marca.trim() || !this.nuevaMoto.modelo.trim() ||
        !this.nuevaMoto.placa.trim() || !this.nuevaMoto.estado.trim()) {
      this.formularioInvalido = true;
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '⚠️ Completa todos los campos requeridos',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#FF4136',
        color: 'white',
      });
      return;
    }

    this.formularioInvalido = false;

    this.motosService.createMoto(this.nuevaMoto).subscribe({
      next: () => {
        this.loadMotos();
        this.resetForm();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '✅ Moto agregada correctamente!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#28A745',
          color: 'white',
        });
      },
      error: (error) => {
        console.error('Error creando moto:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al crear la moto',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#FF4136',
          color: 'white',
        });
      }
    });
  }

  abrirModalAsignar(moto: Moto) {
    this.motoSeleccionada = moto;
    this.modalAsignarVisible = true;
    this.loadConductoresDisponibles();
  }

  cerrarModalAsignar() {
    this.modalAsignarVisible = false;
    this.motoSeleccionada = null;
  }

  asignarConductor(conductorId: string) {
    if (!this.motoSeleccionada) return;

    this.motosService.asignarConductor(this.motoSeleccionada._id!, conductorId).subscribe({
      next: () => {
        this.loadMotos();
        this.loadConductoresDisponibles();
        this.cerrarModalAsignar();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '✅ Conductor asignado correctamente!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#28A745',
          color: 'white',
        });
      },
      error: (error) => {
        console.error('Error asignando conductor:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al asignar conductor',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#FF4136',
          color: 'white',
        });
      }
    });
  }

  removerConductor(motoId: string) {
    this.motosService.removerConductor(motoId).subscribe({
      next: () => {
        this.loadMotos();
        this.loadConductoresDisponibles();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '✅ Conductor removido correctamente!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#28A745',
          color: 'white',
        });
      },
      error: (error) => {
        console.error('Error removiendo conductor:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al remover conductor',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#FF4136',
          color: 'white',
        });
      }
    });
  }

  abrirModal(moto: Moto) {
    this.motoEditada = { ...moto };
    this.isEditing = true;
    this.editingId = moto._id!;
    this.modalVisible = true;
  }

  cerrarModal() {
    this.modalVisible = false;
    this.resetForm();
  }

  editarMoto() {
    if (!this.editingId) return;

    this.motosService.updateMoto(this.editingId, this.motoEditada).subscribe({
      next: () => {
        this.loadMotos();
        this.cerrarModal();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '✅ Moto editada correctamente!',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#28A745',
          color: 'white',
        });
      },
      error: (error) => {
        console.error('Error actualizando moto:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Error al actualizar la moto',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
          background: '#FF4136',
          color: 'white',
        });
      }
    });
  }

  eliminarMoto(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.motosService.deleteMoto(id).subscribe({
          next: () => {
            this.loadMotos();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '✅ Moto eliminada correctamente!',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              background: '#28A745',
              color: 'white',
            });
          },
          error: (error) => {
            console.error('Error eliminando moto:', error);
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Error al eliminar la moto',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
              background: '#FF4136',
              color: 'white',
            });
          }
        });
      }
    });
  }

  private resetForm(): void {
    this.nuevaMoto = {
      marca: '',
      modelo: '',
      placa: '',
      precio: 0,
      estado: 'disponible'
    };
    this.motoEditada = {
      marca: '',
      modelo: '',
      placa: '',
      precio: 0,
      estado: 'disponible'
    };
    this.isEditing = false;
    this.editingId = null;
  }
}
