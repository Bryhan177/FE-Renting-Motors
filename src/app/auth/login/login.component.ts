import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin123') {
      this.error = '';
      this.router.navigate(['dashboard']);
    } else {
      this.error = 'Credenciales incorrectas';
    }
  }
}
