import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  message: string = 'Futuro Emprendedor'
  title = 'control-motos';

  constructor(private router: Router) {}

  showSidebar(): boolean {
    const route = this.router.url;
    return route !== '/' && route !== '/login' && route !== '/register';
  }
}

