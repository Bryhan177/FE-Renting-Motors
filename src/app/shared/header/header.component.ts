import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {
    // do nothing
   }
   goHome() {
    this.router.navigate(['']);
  }
  goEmpleados() {
    this.router.navigate(['empleados']);
  }
  goPagos() {
    this.router.navigate(['pagos']);
  }
  goDashboard() {
    this.router.navigate(['dashboard']);
  }
  goMisMotos() {
    this.router.navigate(['motos']);
  }
}
