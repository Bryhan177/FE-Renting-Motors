import { Routes } from '@angular/router';

import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { UsuariosComponent } from './Components/pages/usuarios/usuarios.component';
import { MotosComponent } from './Components/pages/motos/motos.component';
import { PagosComponent } from './Components/pages/pagos/pagos.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LayoutComponent } from './shared/layouts/layout/layout.component';
import { HomeEmpleadosComponent } from './empleados/home-empleados/home-empleados.component';

export const routes: Routes = [
  // Rutas sin Layout
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas con Layout (header + sidebar + footer)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'motos', component: MotosComponent },
      { path: 'pagos', component: PagosComponent }
    ]
  },
  { path: 'empleados', component: HomeEmpleadosComponent },

  // Ruta 404
  { path: '**', redirectTo: '' }
];
