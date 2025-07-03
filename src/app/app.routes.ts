import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/pages/dashboard/dashboard.component';
import { EmpleadosComponent } from './Components/pages/empleados/empleados.component';
import { MotosComponent } from './Components/pages/motos/motos.component';
import { PagosComponent } from './Components/pages/pagos/pagos.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  // { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'empleados', component: EmpleadosComponent },
  { path: 'motos', component: MotosComponent },
  { path: 'pagos', component: PagosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

