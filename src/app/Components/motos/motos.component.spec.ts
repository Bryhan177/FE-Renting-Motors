// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { By } from '@angular/platform-browser';
// import { of, throwError } from 'rxjs';
// import { MotosService, Moto } from '../../service/motos.service';

// import { MotosComponent } from './motos.component';

// describe('MotosComponent', () => {
//   let component: MotosComponent;
//   let fixture: ComponentFixture<MotosComponent>;
//   let motosService: any;

//   const mockMotos: Moto[] = [
//     { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'Disponible' },
//     { _id: '2', marca: 'Yamaha', modelo: 'R6', placa: 'XYZ789', estado: 'En uso' }
//   ];

//   beforeEach(async () => {
//     const motosServiceSpy = {
//       getMotos: jest.fn(),
//       createMoto: jest.fn(),
//       updateMoto: jest.fn(),
//       deleteMoto: jest.fn()
//     };

//     await TestBed.configureTestingModule({
//       imports: [MotosComponent, HttpClientTestingModule],
//       providers: [
//         { provide: MotosService, useValue: motosServiceSpy }
//       ]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(MotosComponent);
//     component = fixture.componentInstance;
//     motosService = TestBed.inject(MotosService) as any;
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize with empty moto and not editing', () => {
//     expect(component.moto.marca).toBe('');
//     expect(component.moto.modelo).toBe('');
//     expect(component.moto.placa).toBe('');
//     expect(component.moto.estado).toBe('');
//     expect(component.isEditing).toBeFalse();
//     expect(component.editingId).toBeNull();
//   });

//   it('should load motos on init', () => {
//     motosService.getMotos.and.returnValue(of(mockMotos));

//     component.ngOnInit();

//     expect(motosService.getMotos).toHaveBeenCalled();
//     expect(component.motos).toEqual(mockMotos);
//   });

//   it('should handle error when loading motos', () => {
//     spyOn(console, 'error');
//     spyOn(window, 'alert');
//     motosService.getMotos.and.returnValue(throwError(() => new Error('Load error')));

//     component.loadMotos();

//     expect(console.error).toHaveBeenCalledWith('Error cargando motos:', jasmine.any(Error));
//     expect(window.alert).toHaveBeenCalledWith('Error al cargar las motos');
//   });

//   it('should create a new moto', () => {
//     const newMoto: Moto = { marca: 'Kawasaki', modelo: 'Ninja', placa: 'DEF456', estado: 'Disponible' };
//     component.moto = newMoto;
//     motosService.createMoto.and.returnValue(of({ _id: '3', ...newMoto }));
//     motosService.getMotos.and.returnValue(of(mockMotos));
//     spyOn(component, 'resetForm');
//     spyOn(window, 'alert');

//     component.onSubmit();

//     expect(motosService.createMoto).toHaveBeenCalledWith(newMoto);
//     expect(component.resetForm).toHaveBeenCalled();
//     expect(window.alert).toHaveBeenCalledWith('Moto creada exitosamente');
//   });

//   it('should update an existing moto', () => {
//     const updatedMoto: Moto = { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'Mantenimiento' };
//     component.moto = updatedMoto;
//     component.isEditing = true;
//     component.editingId = '1';
//     motosService.updateMoto.and.returnValue(of(updatedMoto));
//     motosService.getMotos.and.returnValue(of(mockMotos));
//     spyOn(component, 'resetForm');
//     spyOn(window, 'alert');

//     component.onSubmit();

//     expect(motosService.updateMoto).toHaveBeenCalledWith('1', updatedMoto);
//     expect(component.resetForm).toHaveBeenCalled();
//     expect(window.alert).toHaveBeenCalledWith('Moto actualizada exitosamente');
//   });

//   it('should handle error when creating moto', () => {
//     const newMoto: Moto = { marca: 'Kawasaki', modelo: 'Ninja', placa: 'DEF456', estado: 'Disponible' };
//     component.moto = newMoto;
//     motosService.createMoto.and.returnValue(throwError(() => new Error('Create error')));
//     spyOn(console, 'error');
//     spyOn(window, 'alert');

//     component.onSubmit();

//     expect(console.error).toHaveBeenCalledWith('Error creando moto:', jasmine.any(Error));
//     expect(window.alert).toHaveBeenCalledWith('Error al crear la moto');
//   });

//   it('should handle error when updating moto', () => {
//     const updatedMoto: Moto = { _id: '1', marca: 'Honda', modelo: 'CBR600', placa: 'ABC123', estado: 'Mantenimiento' };
//     component.moto = updatedMoto;
//     component.isEditing = true;
//     component.editingId = '1';
//     motosService.updateMoto.and.returnValue(throwError(() => new Error('Update error')));
//     spyOn(console, 'error');
//     spyOn(window, 'alert');

//     component.onSubmit();

//     expect(console.error).toHaveBeenCalledWith('Error actualizando moto:', jasmine.any(Error));
//     expect(window.alert).toHaveBeenCalledWith('Error al actualizar la moto');
//   });

//   it('should edit a moto', () => {
//     const motoToEdit = mockMotos[0];

//     component.editMoto(motoToEdit);

//     expect(component.moto).toEqual(motoToEdit);
//     expect(component.isEditing).toBeTrue();
//     expect(component.editingId).toBe(motoToEdit._id);
//   });

//   it('should cancel edit', () => {
//     component.isEditing = true;
//     component.editingId = '1';
//     spyOn(component, 'resetForm');

//     component.cancelEdit();

//     expect(component.resetForm).toHaveBeenCalled();
//   });

//   it('should delete a moto when confirmed', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     motosService.deleteMoto.and.returnValue(of({}));
//     motosService.getMotos.and.returnValue(of(mockMotos));
//     spyOn(window, 'alert');

//     component.deleteMoto('1');

//     expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar esta moto?');
//     expect(motosService.deleteMoto).toHaveBeenCalledWith('1');
//     expect(window.alert).toHaveBeenCalledWith('Moto eliminada exitosamente');
//   });

//   it('should not delete a moto when not confirmed', () => {
//     spyOn(window, 'confirm').and.returnValue(false);

//     component.deleteMoto('1');

//     expect(window.confirm).toHaveBeenCalledWith('¿Estás seguro de que quieres eliminar esta moto?');
//     expect(motosService.deleteMoto).not.toHaveBeenCalled();
//   });

//   it('should handle error when deleting moto', () => {
//     spyOn(window, 'confirm').and.returnValue(true);
//     motosService.deleteMoto.and.returnValue(throwError(() => new Error('Delete error')));
//     spyOn(console, 'error');
//     spyOn(window, 'alert');

//     component.deleteMoto('1');

//     expect(console.error).toHaveBeenCalledWith('Error eliminando moto:', jasmine.any(Error));
//     expect(window.alert).toHaveBeenCalledWith('Error al eliminar la moto');
//   });

//   it('should reset form', () => {
//     component.moto = { marca: 'Test', modelo: 'Test', placa: 'TEST123', estado: 'Disponible' };
//     component.isEditing = true;
//     component.editingId = '1';

//     component.resetForm();

//     expect(component.moto.marca).toBe('');
//     expect(component.moto.modelo).toBe('');
//     expect(component.moto.placa).toBe('');
//     expect(component.moto.estado).toBe('');
//     expect(component.isEditing).toBeFalse();
//     expect(component.editingId).toBeNull();
//   });

//   it('should render form elements', () => {
//     fixture.detectChanges();

//     const marcaInput = fixture.debugElement.query(By.css('input[name="marca"]'));
//     const modeloInput = fixture.debugElement.query(By.css('input[name="modelo"]'));
//     const placaInput = fixture.debugElement.query(By.css('input[name="placa"]'));
//     const estadoSelect = fixture.debugElement.query(By.css('select[name="estado"]'));
//     const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));

//     expect(marcaInput).toBeTruthy();
//     expect(modeloInput).toBeTruthy();
//     expect(placaInput).toBeTruthy();
//     expect(estadoSelect).toBeTruthy();
//     expect(submitButton).toBeTruthy();
//   });

//   it('should render motos table', () => {
//     component.motos = mockMotos;
//     fixture.detectChanges();

//     const table = fixture.debugElement.query(By.css('table'));
//     const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

//     expect(table).toBeTruthy();
//     expect(rows.length).toBe(2);
//   });

//   it('should show cancel button when editing', () => {
//     component.isEditing = true;
//     fixture.detectChanges();

//     const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
//     expect(cancelButton).toBeTruthy();
//     expect(cancelButton.nativeElement.textContent).toContain('Cancelar');
//   });

//   it('should not show cancel button when not editing', () => {
//     component.isEditing = false;
//     fixture.detectChanges();

//     const cancelButton = fixture.debugElement.query(By.css('button[type="button"]'));
//     expect(cancelButton).toBeFalsy();
//   });
// });
