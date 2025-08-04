import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEmpleadosComponent } from './home-empleados.component';

describe('HomeEmpleadosComponent', () => {
  let component: HomeEmpleadosComponent;
  let fixture: ComponentFixture<HomeEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
