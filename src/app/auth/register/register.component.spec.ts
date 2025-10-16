import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { UsuariosService } from '../../service/usuarios.service';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let usuariosService: any;

  beforeEach(async () => {
    const usuariosServiceSpy = {
      createUsuario: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [
        { provide: UsuariosService, useValue: usuariosServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    usuariosService = TestBed.inject(UsuariosService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.nuevoUsuario.nombre).toBe('');
    expect(component.nuevoUsuario.apellido).toBe('');
    expect(component.nuevoUsuario.email).toBe('');
    expect(component.nuevoUsuario.cedula).toBe(0);
    expect(component.nuevoUsuario.telefono).toBe('');
    expect(component.nuevoUsuario.rol).toBe('usuario');
    expect(component.nuevoUsuario.activo).toBe(true);
    expect(component.nuevoUsuario.password).toBe('');
    expect(component.nuevoUsuario.confirmPassword).toBe('');
  });

  it('should not call service when required fields are missing', () => {
    component.nuevoUsuario.nombre = '';
    component.nuevoUsuario.apellido = 'Test';
    component.nuevoUsuario.email = 'test@test.com';
    component.nuevoUsuario.telefono = '123456789';

    component.agregarUsuario();

    expect(usuariosService.createUsuario).not.toHaveBeenCalled();
  });

  it('should not call service when cedula is invalid', () => {
    component.nuevoUsuario.nombre = 'Test';
    component.nuevoUsuario.apellido = 'User';
    component.nuevoUsuario.email = 'test@test.com';
    component.nuevoUsuario.telefono = '123456789';
    component.nuevoUsuario.cedula = -1;

    component.agregarUsuario();

    expect(usuariosService.createUsuario).not.toHaveBeenCalled();
  });

  it('should not call service when password is too short', () => {
    component.nuevoUsuario.nombre = 'Test';
    component.nuevoUsuario.apellido = 'User';
    component.nuevoUsuario.email = 'test@test.com';
    component.nuevoUsuario.telefono = '123456789';
    component.nuevoUsuario.cedula = 12345678;
    component.nuevoUsuario.password = '123';
    component.nuevoUsuario.confirmPassword = '123';

    component.agregarUsuario();

    expect(usuariosService.createUsuario).not.toHaveBeenCalled();
  });

  it('should not call service when passwords do not match', () => {
    component.nuevoUsuario.nombre = 'Test';
    component.nuevoUsuario.apellido = 'User';
    component.nuevoUsuario.email = 'test@test.com';
    component.nuevoUsuario.telefono = '123456789';
    component.nuevoUsuario.cedula = 12345678;
    component.nuevoUsuario.password = 'password123';
    component.nuevoUsuario.confirmPassword = 'different123';

    component.agregarUsuario();

    expect(usuariosService.createUsuario).not.toHaveBeenCalled();
  });

  it('should call service with correct payload when all validations pass', () => {
    const mockUsuario = {
      nombre: 'Test',
      apellido: 'User',
      email: 'test@test.com',
      cedula: 12345678,
      telefono: '123456789',
      rol: 'usuario',
      activo: true,
      password: 'password123'
    };

    component.nuevoUsuario = {
      ...mockUsuario,
      confirmPassword: 'password123'
    };

    usuariosService.createUsuario.and.returnValue(of(mockUsuario));

    component.agregarUsuario();

    expect(usuariosService.createUsuario).toHaveBeenCalledWith(mockUsuario);
  });

  it('should reset form after successful user creation', () => {
    const mockUsuario = {
      nombre: 'Test',
      apellido: 'User',
      email: 'test@test.com',
      cedula: 12345678,
      telefono: '123456789',
      rol: 'usuario',
      activo: true,
      password: 'password123'
    };

    component.nuevoUsuario = {
      ...mockUsuario,
      confirmPassword: 'password123'
    };

    usuariosService.createUsuario.and.returnValue(of(mockUsuario));

    component.agregarUsuario();

    expect(component.nuevoUsuario.nombre).toBe('');
    expect(component.nuevoUsuario.apellido).toBe('');
    expect(component.nuevoUsuario.email).toBe('');
    expect(component.nuevoUsuario.cedula).toBe(0);
    expect(component.nuevoUsuario.telefono).toBe('');
    expect(component.nuevoUsuario.rol).toBe('usuario');
    expect(component.nuevoUsuario.activo).toBe(true);
    expect(component.nuevoUsuario.password).toBe('');
    expect(component.nuevoUsuario.confirmPassword).toBe('');
  });

  it('should handle service error', () => {
    const mockUsuario = {
      nombre: 'Test',
      apellido: 'User',
      email: 'test@test.com',
      cedula: 12345678,
      telefono: '123456789',
      rol: 'usuario',
      activo: true,
      password: 'password123'
    };

    component.nuevoUsuario = {
      ...mockUsuario,
      confirmPassword: 'password123'
    };

    usuariosService.createUsuario.and.returnValue(throwError(() => new Error('Service error')));

    component.agregarUsuario();

    expect(usuariosService.createUsuario).toHaveBeenCalledWith(mockUsuario);
  });

  it('should render form elements', () => {
    const nombreInput = fixture.debugElement.query(By.css('input[name="nombre"]'));
    const apellidoInput = fixture.debugElement.query(By.css('input[name="apellido"]'));
    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
    const cedulaInput = fixture.debugElement.query(By.css('input[name="cedula"]'));
    const telefonoInput = fixture.debugElement.query(By.css('input[name="telefono"]'));
    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
    const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

    expect(nombreInput).toBeTruthy();
    expect(apellidoInput).toBeTruthy();
    expect(emailInput).toBeTruthy();
    expect(cedulaInput).toBeTruthy();
    expect(telefonoInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(confirmPasswordInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  });
});
