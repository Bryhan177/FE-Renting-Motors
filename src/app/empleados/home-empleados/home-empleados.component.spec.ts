import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeEmpleadosComponent } from './home-empleados.component';

describe('HomeEmpleadosComponent', () => {
  let component: HomeEmpleadosComponent;
  let fixture: ComponentFixture<HomeEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEmpleadosComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar el título "Lista de empleados"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Lista de empleados');
  });
});
