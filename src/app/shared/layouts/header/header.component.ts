import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuAbierto: boolean = false;
  constructor(public router: Router) {}

  showMenu(): boolean {
    const ruta = this.router.url;
    return ruta !== '/' && ruta !== '/login';
  }
  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }
  seleccionarOpcion(opcion: string) {
    console.log(`Opción seleccionada: ${opcion}`);
    this.menuAbierto = false; // Cerrar el menú al seleccionar una opción
    // Aquí puedes agregar la lógica para manejar cada opción
    if (opcion === 'login') {
      this.router.navigate(['login']);
    } else if (opcion === 'register') {
      this.router.navigate(['register']);
    }
  }
  goHome() {
    this.router.navigate(['']);
  }

  goLogin() {
    this.router.navigate(['login']);
  }
}

