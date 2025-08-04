import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

    constructor(private router: Router) {}

    showSidebar(): boolean {
    const route = this.router.url;
    return route !== '/' && route !== '/login' && route !== '/register';
  }
}
