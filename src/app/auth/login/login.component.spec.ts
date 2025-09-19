import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: any;

  beforeEach(async () => {
    const routerSpy = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty values', () => {
    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.role).toBe('');
    expect(component.error).toBe('');
  });

  it('should show error when no role is selected', () => {
    component.onLogin();
    expect(component.error).toBe('Por favor, seleccione un rol');
  });

  it('should navigate to dashboard for valid administrador credentials', () => {
    component.role = 'administrador';
    component.email = 'administrador@gmail.com';
    component.password = 'administrador123';

    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
    expect(component.error).toBe('');
  });

  it('should navigate to empleados for valid empleado credentials', () => {
    component.role = 'empleado';
    component.email = 'empleado@gmail.com';
    component.password = 'empleado123';

    component.onLogin();

    expect(router.navigate).toHaveBeenCalledWith(['empleados']);
    expect(component.error).toBe('');
  });

  it('should show error for asesor role', () => {
    component.role = 'asesor';
    component.email = 'asesor@gmail.com';
    component.password = 'asesor123';

    component.onLogin();

    expect(component.error).toBe('Acceso de asesor en proceso');
  });

  it('should show error for invalid credentials', () => {
    component.role = 'administrador';
    component.email = 'wrong@gmail.com';
    component.password = 'wrong123';

    component.onLogin();

    expect(component.error).toBe('Credenciales inválidas');
  });

  it('should navigate to register when goToRegister is called', () => {
    component.goToRegister();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should navigate to home when goHome is called', () => {
    component.goHome();
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should render form elements', () => {
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
    const roleSelect = fixture.debugElement.query(By.css('select[name="role"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(roleSelect).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });

  it('should display error message when error is set', () => {
    component.error = 'Test error message';
    fixture.detectChanges();

    const errorElement = fixture.debugElement.query(By.css('.text-red-600'));
    expect(errorElement).toBeTruthy();
    expect(errorElement.nativeElement.textContent).toContain('Test error message');
  });
});
